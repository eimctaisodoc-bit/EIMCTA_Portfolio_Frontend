import { Award, ShieldCheck, Utensils, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React from 'react';
import img1 from '../../img/14.jpg';
import img2 from '../../img/21.jpg';
import img3 from '../../img/20.jpg';  
import eduimg from '../../img/educationSystem.jpg';

const AboutCard = () => {

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
            
            <circle cx="50" cy="10" r="0.6" fill="#fef3c7" opacity="0.8" />
          </svg>
        </span>
      </span>
    );
  };

  const services = [
    {
      id: 1,
      icon: <Award className="text-2xl text-amber-600" />,
      title: "ISO 9001:2015",
      subtitle: "Quality Management System",
      path: "/service/iso/9001", // Added leading slash
      description: "ISO 9001 Certification: Elevating Your Business with Quality Management",
      image: img1
    },
    {
      id: 2,
      icon: <ShieldCheck className="text-2xl text-amber-600" />,
      title: "ISO 45001:2018",
      subtitle: "Occupational Health, Safety & Environment",
      path: "/service/iso/45001", // Added leading slash
      description: "ISO 45001 Certification | Safety Management System: ISO 45001 - 2018",
      image: img2
    },
    {
      id: 3,
      icon: <Utensils className="text-2xl text-amber-600" />,
      title: "ISO 22000 & HACCP",
      subtitle: "Food Safety Standard",
      path: "/service/iso/2200", // Fixed typo (was 2200)
      description: "ISO 22000 Certification | Food Safety Management System: ISO 22000 & HACCP",
      image: img3
    },
    {
      id: 4,
      icon: <GraduationCap className="text-2xl text-amber-600" />,
      title: "ISO 21001:2018",
      subtitle: "Educational Organization Management System",
      path: "/service/iso/2100", // Fixed typo (was 2100)
      description: "ISO 21001:2018 Educational Organization Management System",
      image: eduimg
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-['Arial_Narrow'] overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <BeamUnderline thickness={10}>
            <h3 className="text-xl lg:text-3xl md:text-3xl font-bold
              bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent uppercase relative inline-block">
              ISO Consultancy Services
            </h3>
          </BeamUnderline>
          <p className="text-xl text-amber-800 font-normal max-w-3xl mx-auto mt-6">
            We are one of the leading global providers of accredited ISO certification. We offer a broad portfolio of services within management system ISO certification and related services.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="h-full"
            >
              {/* Removed onClick handler to make links functional */}
              <Link to={service.path} className="h-full block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl border border-yellow-300 h-full flex flex-col">
                  <div className="h-48 overflow-hidden relative flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shadow-md">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-amber-900 mb-2">{service.title}</h3>
                    <h4 className="text-lg font-medium text-amber-800 mb-3">{service.subtitle}</h4>
                    <p className="text-gray-700 bg-amber-100/50 p-3 rounded-lg flex-grow">{service.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutCard;