import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import axios from "axios";

// --- Browser Extension Detection ---
const isBrowserExtension = () => {
  return typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
};

if (typeof window !== 'undefined' && !isBrowserExtension()) {
  console.warn('⚠️ YouTubePlaylists component is designed for browser extensions only.');
}

// --- Sub-Component: Individual Video Card (Plays Inline) ---
const VideoCard = ({ video, isActive, onClick, isClickDisabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const clickRef = useRef(null);

  const handleClick = useCallback((e) => {
    // Prevent double-click/double-play with multiple safeguards
    if (isClickDisabled || isProcessing) return;
    
    // Prevent default to avoid any native behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Check if this is the same click within a short time window
    const now = Date.now();
    if (clickRef.current && now - clickRef.current < 1000) {
      return;
    }
    
    clickRef.current = now;
    setIsProcessing(true);
    
    // Call the parent click handler
    onClick(video);
    
    // Reset processing state after delay
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  }, [video, onClick, isClickDisabled, isProcessing]);

  const isDisabled = isClickDisabled || isProcessing;

  return (
    <div
      onClick={handleClick}
      className={`flex-none w-80 m-3 cursor-pointer transition-all duration-500 transform 
        ${isActive ? "scale-105 z-10" : "scale-100 opacity-90 hover:opacity-100"}
        ${isDisabled ? 'pointer-events-none' : ''}`}
    >
      <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-xl border-4 transition-opacity
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isActive ? "border-orange-500 shadow-orange-200" : "border-white shadow-sm"}`}>
        
        {!isActive ? (
          <>
            {/* Thumbnail View */}
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-orange-500/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
            
            {/* Loading indicator */}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            )}
          </>
        ) : (
          /* Actual Video Player */
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="encrypted-media"
            allowFullScreen
            // Add key to force remount when changing videos
            key={video.videoId}
          />
        )}
      </div>
      
      <div className="mt-3 px-1">
        <p className={`text-sm font-black truncate transition-colors ${isActive ? 'text-orange-600' : 'text-gray-800'}`}>
          {video.title}
        </p>
        {isActive && (
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest animate-pulse">
            • Playing Now
          </span>
        )}
        {isProcessing && !isActive && (
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            • Loading...
          </span>
        )}
      </div>
    </div>
  );
};

// --- Sub-Component: The Scrolling Row ---
const ScrollingRow = ({ playlist, index, onVideoClick, currentVideoId, isClickDisabled }) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Deduplicate videos by videoId
  const uniqueVideos = useMemo(() => {
    const seen = new Set();
    return playlist.videos.filter(v => {
      if (seen.has(v.videoId)) return false;
      seen.add(v.videoId);
      return true;
    });
  }, [playlist.videos]);

  // Pause the row if the user is hovering OR if a video in THIS row is currently playing
  // When video is playing (autoplay=1), scroll pauses automatically
  // When video is paused/deselected, scroll resumes
  const isVideoInRowPlaying = uniqueVideos.some(v => v.videoId === currentVideoId);
  const shouldPause = isHovered || isVideoInRowPlaying;

  const direction = index % 2 === 0 ? 1 : -1; 
  const speed = 0.7;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || shouldPause) return;

    let animationFrameId;
    const scroll = () => {
      if (direction === 1) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      } else {
        el.scrollLeft -= speed;
        if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldPause, direction]);

  const doubledVideos = [...uniqueVideos, ...uniqueVideos];

  return (
    <div className="mb-12">
      <div className="flex items-center px-10 mb-4">
        <div className="h-1 w-10 bg-orange-500 rounded-full mr-4" />
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">
          {playlist.playlistTitle}
        </h3>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex overflow-x-hidden whitespace-nowrap py-4 mask-fade"
        >
          {doubledVideos.map((video, idx) => (
            <VideoCard
              key={`${video.videoId}-${idx}`}
              video={video}
              isActive={currentVideoId === video.videoId}
              onClick={onVideoClick}
              isClickDisabled={isClickDisabled}
            />
          ))}
        </div>

        {/* Left / Right handles */}
        <button
          aria-label="Scroll left"
          onClick={() => {
            const el = scrollRef.current;
            if (!el) return;
            el.scrollBy({ left: -300, behavior: 'smooth' });
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white"
        >
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          aria-label="Scroll right"
          onClick={() => {
            const el = scrollRef.current;
            if (!el) return;
            el.scrollBy({ left: 300, behavior: 'smooth' });
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white"
        >
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---
const YouTubePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  const [clickHistory, setClickHistory] = useState(new Map()); // Track recent clicks
  const clickTimeoutRef = useRef(null);
  const currentVideoRef = useRef(null); // Use ref to avoid stale closures

  // Keep ref in sync with state
  useEffect(() => {
    currentVideoRef.current = currentVideo;
  }, [currentVideo]);

  useEffect(() => {
    axios.get("http://localhost:5000/youtube/videos")
      .then((res) => {
        const deduplicatedPlaylists = res.data.map(playlist => ({
          ...playlist,
          videos: Array.from(new Map(playlist.videos.map(v => [v.videoId, v])).values())
        }));
        setPlaylists(deduplicatedPlaylists);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleVideoClick = useCallback((video) => {
    const now = Date.now();
    const videoId = video.videoId;
    
    // Check if this video was clicked very recently (within 500ms)
    const lastClickTime = clickHistory.get(videoId);
    if (lastClickTime && now - lastClickTime < 500) {
      return; // Ignore rapid successive clicks on same video
    }
    
    // Update click history
    setClickHistory(prev => {
      const newHistory = new Map(prev);
      newHistory.set(videoId, now);
      return newHistory;
    });
    
    // Check if we're already playing this video
    if (currentVideoRef.current?.videoId === videoId) {
      return; // Already playing this video, do nothing
    }
    
    // Prevent further clicks while processing
    if (isClickDisabled) return;
    
    setIsClickDisabled(true);
    
    // Clear previous timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    // Set the new current video
    setCurrentVideo(video);
    
    // Re-enable clicks after a short delay
    clickTimeoutRef.current = setTimeout(() => {
      setIsClickDisabled(false);
    }, 800); // Increased to 800ms for better safety margin
  }, [isClickDisabled, clickHistory]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    setIsClickDisabled(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Periodically clean old click history to prevent memory leak
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setClickHistory(prev => {
        const newHistory = new Map();
        for (const [videoId, timestamp] of prev) {
          if (now - timestamp < 5000) { // Keep for 5 seconds only
            newHistory.set(videoId, timestamp);
          }
        }
        return newHistory;
      });
    }, 10000); // Clean every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-orange-100"></div>
      <p className="mt-4 text-gray-500 font-bold tracking-widest uppercase text-xs">Loading Channels</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-orange-100">
      
      {/* Header */}
      <nav className="sticky top-0  bg-white/70 backdrop-blur-xl border-b border-gray-100 p-6 mb-8">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-gray-900">
              VIDEO<span className="text-orange-500">FEED</span>
            </h1>
          </div>
          {currentVideo && (
            <div className="flex items-center bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
               <span className="text-[10px] font-black text-orange-500 uppercase mr-3">Live Now:</span>
               <p className="text-sm font-bold text-gray-700 truncate max-w-[200px]">{currentVideo.title}</p>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-[1600px] mx-auto pb-24">
        {playlists.map((playlist, idx) => (
          <ScrollingRow
            key={playlist.playlistId}
            playlist={playlist}
            index={idx}
            onVideoClick={handleVideoClick}
            currentVideoId={currentVideo?.videoId}
            isClickDisabled={isClickDisabled}
          />
        ))}
      </div>

      <style jsx>{`
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        iframe::-webkit-scrollbar {
          display: none;
        }
        
        /* Disable text selection on cards for better UX */
        * {
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>
    </div>
  );
};

export default YouTubePlaylists;