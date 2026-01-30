import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import img1 from '../../img/Achivement 1.jpg';
import img2 from '../../img/Achivement2.jpg';
import img3 from '../../img/achivement-3.jpg';
import img4 from '../../img/achivement_4.jpg';
import img5 from '../../img/achivement-5.jpg';
import img6 from '../../img/achivement_6.jpg';

export const ISO_CREDENTIALS = () => {


  const BeamUnderline = ({ 
  children, 
  thickness = 8, 
  className = "" 
}) => {
  const gradientId = "formalBeamGradient";

  return (
    <span className={`relative inline-block group ${className}`}>
      {children}
      <span 
        className="absolute left-0 right-0 -bottom-2 block overflow-visible pointer-events-none"
        style={{ height: `${thickness * 1.5}px` }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 20" 
          preserveAspectRatio="none"
          className="block"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="48%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="52%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          
          {/* The Formal Beam Path */}
          <path 
            d="
              M 0 10 
              Q 25 10, 50 4
              Q 75 10, 100 10
              Q 75 10, 50 16
              Q 25 10, 0 10
              Z
            " 
            fill={`url(#${gradientId})`}
          />
          
          {/* Minimalist Central Pivot Point */}
          <circle cx="50" cy="10" r="0.6" fill="#fef3c7" opacity="0.8" />
        </svg>
      </span>
    </span>
  );
};
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const containerRef = useRef(null);

  const credentials = [
    {
      title: "Effective Training Program",
      description:
        "Effective Training Program.",
      image: img1,
      year: "",
      icon: ""
    },
    {
      title: "Photoxx",
      description:
        "Photoxx.",
      image: img2,
      year: "",
      icon: ""
    },
    {
      title: " CEO is Appreciated in Dubai",
      description:
        "CEO is Appreciated in Dubai",
      image: img3,
      year: "",
      icon: ""
    },
     {
      title: " EIMCTA Receiving Award",
      description:
        "EIMCTA Receiving Award",
      image: img4,
      year: "",
      icon: ""
    }, {
      title: " Galleries",
      description:
        "Galleries",
      image: img5,
      year: "",
      icon: ""
    },
    {
      title: " Performing Certification Audit : ISO 39001 : 2012",
      description:
        "Performing Certification Audit : ISO 39001 : 2012",
      image: img6,
      year: "",
      icon: ""
    },
  ];

  /* ---------------- Auto Play ---------------- */
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % credentials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, credentials.length]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % credentials.length);
    pauseAutoPlay();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + credentials.length) % credentials.length);
    pauseAutoPlay();
  };

  /* ---------------- ESC to close image ---------------- */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsImageOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ---------------- Title ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <BeamUnderline thickness={10}>
          <h2 className="text-2xl sm:text-xs  md:text-3xl lg:text-4xl  
          font-bold  text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 font-['Arial Narrow']">
            Our Achievements & Accreditations
          </h2>
            </BeamUnderline>
          <p className="text-lg text-gray-600">
            Recognized excellence in quality, security, and innovation
          </p>
        </motion.div>

        {/* ---------------- Content ---------------- */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">

          {/* Left List */}
          <div className="w-full lg:w-2/5 space-y-4">
            {credentials.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer p-5 rounded-xl transition-all ${
                  activeIndex === index
                    ? 'bg-white shadow-lg border-l-4 border-amber-400'
                    : 'bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-amber-900">{item.title}</h3>
                    <p className="text-sm text-amber-700">{item.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Display */}
          <div className="w-full lg:w-3/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Image */}
                <div
                  className="relative h-64 md:h-80 lg:h-96 cursor-zoom-in"
                  onClick={() => setIsImageOpen(true)}
                >
                  <img
                    src={credentials[activeIndex].image}
                    alt={credentials[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-4xl">{credentials[activeIndex].icon}</div>
                    <h3 className="text-2xl font-bold">
                      {credentials[activeIndex].title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6">
                  <p className="text-gray-700 mb-6">
                    {credentials[activeIndex].description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button onClick={handlePrev} className="nav-btn">◀</button>
                      <button onClick={handleNext} className="nav-btn">▶</button>
                    </div>
                    <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm">
                      Awarded {credentials[activeIndex].year}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------------- Full Image Modal ---------------- */}
        <AnimatePresence>
          {isImageOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setIsImageOpen(false)}
            >
              <motion.img
                src={credentials[activeIndex].image}
                alt="Full View"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="
                  max-w-full
                  max-h-[90vh]
                  object-contain
                  rounded-xl
                  shadow-2xl
                  cursor-zoom-out
                "
                onClick={(e) => e.stopPropagation()}
              />

              {/* Close Button */}
              <button
                onClick={() => setIsImageOpen(false)}
                className="absolute top-6 right-6 text-white text-3xl font-bold"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Small helper style */}
      <style jsx>{`
        .nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          background: #fffbeb;
          color: #d97706;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};
