import { motion } from 'framer-motion';
import React from 'react';
import {
    Building,
    Factory,
    Heart,
    Hospital,
    Utensils,
    Banknote,
    GraduationCap,
    Server,
    Truck,
    Warehouse,
    Star,
    FactoryIcon,
    ToolboxIcon,
    Construction,
    Drill,
    Building2,
    BuildingIcon
} from 'lucide-react';
import { FaBuilding } from 'react-icons/fa';

// BeamUnderline Component - UPDATED
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

 const CraneIcon = ({ size = 28, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ground */}
      <path d="M3 21h18" />

      {/* tower */}
      <path d="M6 21V4" />
      <path d="M6 4h3" />

      {/* boom */}
      <path d="M9 4l12 4" />

      {/* brace */}
      <path d="M9 4v6" />
      <path d="M6 9h5" />

      {/* hook */}
      <path d="M16 10v5" />
      <path d="M15 15c0 1 1 2 2 2" />

      {/* load */}
      <rect x="14" y="17" width="4" height="3" rx="0.6" />
    </svg>
  );
};

const ISOShowcase = () => {
    const categories = [
        {
            id: 'construction',
            title: 'Construction',
            icon: <CraneIcon size={28} />,
            certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
            description: 'Quality, environmental and safety management for construction projects'
        },
        {
            id: 'manufacturer',
            title: 'Factory / Manufacturer',
            icon: <Factory size={28} />,
            certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
            description: 'Standards for manufacturing excellence and operational safety'
        },
        {
            id: 'ngo',
            title: 'NGOs / INGOs',
            icon: <Heart size={28} />,
            certifications: ['ISO 9001', 'ISO 26000', 'SA 8000'],
            description: 'Social responsibility and accountability for non-profit organizations'
        },
        {
            id: 'healthcare',
            title: 'Hospital / Clinic / Lab',
            icon: <Hospital size={28} />,
            certifications: ['ISO 710001', 'ISO 13485', 'ISO 15189'],
            description: 'Healthcare quality management and medical laboratory standards'
        },
        {
            id: 'food',
            title: 'Hotel / Food Industry',
            icon: <Utensils size={28} />,
            certifications: ['ISO 22000', 'HACCP', 'GMP'],
            description: 'Food safety and quality management for hospitality industry'
        },
        {
            id: 'finance',
            title: 'Bank / Finance / Insurance',
            icon: <Banknote size={28} />,
            certifications: ['ISO 9001', 'ISO 27001', 'SA 8001'],
            description: 'Financial services quality and information security standards'
        },
        {
            id: 'education',
            title: 'ISO School / College / EDU',
            icon: <GraduationCap size={28} />,
            certifications: ['ISO 21001'],
            description: 'Educational organizations management system for learning environments'
        },
        {
            id: 'service',
            title: 'Service Industries',
            icon: <Server size={28} />,
            certifications: ['ISO 9001', 'ISO 45001'],
            description: 'Quality and safety management for service providers'
        },
        {
            id: 'transport',
            title: 'Transport / Logistic',
            icon: <Truck size={28} />,
            certifications: ['ISO 9001', 'ISO 28000', 'ISO 39001'],
            description: 'Supply chain security and road traffic safety management'
        },
        {
            id: 'warehousing',
            title: 'Exim / Warehousing',
            icon: <Warehouse size={28} />,
            certifications: ['ISO 9001', 'ISO 45001'],
            description: 'Quality management for warehousing and storage operations'
        },
        {
            id: 'technology',
            title: 'Info. Technology',
            icon: <Server size={28} />,
            certifications: ['ISO 9001', 'ISO 27000'],
            description: 'IT service management and information security standards'
        }
    ];

    // Card animation variants
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.9,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-slate-900" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
            <div className="max-w-6xl mx-auto">
                {/* Header Section - UPDATED */}
                <div className="text-center mb-16">
                    <div className="relative inline-block mb-10">
                        <div className="absolute -top-2 -left-2 z-10">
                            <Star className="text-amber-400 fill-amber-400 w-8 h-8" />
                        </div>
                        <BeamUnderline>
                          <h1 className="text-4xl md:text-5xl 
                          font-extrabold text-transparent bg-clip-text
                           bg-linear-to-r from-orange-600 to-amber-500 relative z-10 pb-4">
                              OPERATE YOUR BUSINESS WITH GLOBAL RECOGNITION!
                          </h1>
                        </BeamUnderline>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-12">
                        Achieve international standards and demonstrate your commitment to excellence with our ISO certification services.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group bg-white border-2 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border-gray-100 hover:border-orange-400"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex items-center mb-6">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-orange-50 text-orange-600 mr-4 transition-colors duration-300 group-hover:bg-orange-600 group-hover:text-white">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl font-bold group-hover:text-orange-600 transition-colors">
                                        {category.title}
                                    </h3>
                                </div>
                                
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 grow">
                                    {category.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                                    {category.certifications.map((cert, i) => (
                                        <span
                                            key={`${cert}-${i}`}
                                            className="px-3 py-1 bg-amber-50 text-amber-800 text-sm font-medium rounded-full"
                                        >
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ISOShowcase;