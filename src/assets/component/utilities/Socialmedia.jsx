import React, { useState } from "react";
import axios from "axios";

const socialMediaLinks = [
  { 
    name: "Facebook", 
    url: "https://your-backend.com/fb", 
    icon: "📘",
    color: "from-blue-600 to-blue-800",
    hover: "hover:from-blue-700 hover:to-blue-900"
  },
  { 
    name: "Instagram", 
    url: "https://your-backend.com/insta", 
    icon: "📸",
    color: "from-pink-600 via-red-500 to-yellow-500",
    hover: "hover:from-pink-700 hover:via-red-600 hover:to-yellow-600"
  },
  { 
    name: "TikTok", 
    url: "https://your-backend.com/tiktok", 
    icon: "🎵",
    color: "from-gray-900 via-gray-800 to-pink-600",
    hover: "hover:from-black hover:via-gray-900 hover:to-pink-700"
  },
  { 
    name: "LinkedIn", 
    url: "https://your-backend.com/linkedin", 
    icon: "💼",
    color: "from-blue-700 to-blue-900",
    hover: "hover:from-blue-800 hover:to-blue-950"
  },
];

const SocialButtons = () => {
  const [loading, setLoading] = useState(null);
  const [clickedButtons, setClickedButtons] = useState({});

  const handleClick = async (url, name) => {
    setLoading(name);
    try {
      const res = await axios.post(url);
      if (res.status === 200) {
        setClickedButtons(prev => ({ ...prev, [name]: true }));
        setTimeout(() => {
          setClickedButtons(prev => ({ ...prev, [name]: false }));
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-8  bg-transparent max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-2">
          Connect With Us
        </h2>
        <p className="text-gray-600 font-medium">Click to share or follow us on social media</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {socialMediaLinks.map((social) => (
          <div key={social.name} className="relative group">
            <button
              onClick={() => handleClick(social.url, social.name)}
              disabled={loading === social.name}
              className={`
                w-full h-full p-6 rounded-2xl 
                bg-gradient-to-br ${social.color}
                ${social.hover}
                transform transition-all duration-500
                group-hover:scale-105
                group-hover:shadow-2xl
                group-hover:shadow-black/20
                ${clickedButtons[social.name] ? 'ring-4 ring-yellow-300 ring-opacity-50' : ''}
                relative overflow-hidden
                disabled:opacity-70
              `}
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
              
              {/* Success checkmark */}
              {clickedButtons[social.name] && (
                <div className="absolute top-3 right-3 animate-pulse">
                  <span className="text-2xl">✅</span>
                </div>
              )}

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  {social.icon}
                </div>
                
                <span className="text-white font-bold text-xl tracking-wide">
                  {social.name}
                </span>
                
                <div className="flex items-center gap-2">
                  {loading === social.name ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white/90 text-sm">Processing...</span>
                    </>
                  ) : (
                    <span className="text-white/90 text-sm group-hover:text-white transition-colors">
                      {clickedButtons[social.name] ? 'Success!' : 'Click to share'}
                    </span>
                  )}
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            </button>

            {/* Decorative corner elements */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
     
    </div>
  );
};

export default SocialButtons;