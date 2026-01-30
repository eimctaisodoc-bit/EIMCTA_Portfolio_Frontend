import React from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from '../utilities/Video';
import Image from '../utilities/image';
import { Link } from 'react-router-dom';
import imag20 from "../../img/20.jpg";
import isoIcon from "../../img/iso_.png";

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

const ISO22000Certification = () => {
  // Animation Variants
  const slideIn = (direction, delay = 0) => ({
    hidden: {
      x: direction === 'left' ? -80 : direction === 'right' ? 80 : 0,
      y: direction === 'up' ? 60 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  });

  const sectionHeaderVariant = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const cardHover = {
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' },
  };

  const AnimatedHeader = ({ title, width = "25%" }) => (
    <motion.div
      className="relative text-center mb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.h2 variants={sectionHeaderVariant} className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 ">
        {title}
      </motion.h2>
      <BeamUnderline className="w-full max-w-md mx-auto" />
    </motion.div>
  );

  return (
    <>
      <div className="bg-slate-100 font-sans min-h-screen p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">

          {/* Header Section with ISO Icon */}
          <div className="mb-10 text-center">
            <motion.div
              className="flex flex-col items-center"
              variants={slideIn('right')}
              initial="hidden"
              animate="visible"
            >
              {/* ISO Icon */}
              <div className="">
                <img 
                  src={isoIcon} 
                  alt="ISO Icon" 
                  className="w-24 h-18 sm:w-32 
                  sm:h-24 md:w-40 md:h-30 object-contain"
                />
              </div>
              
              {/* Title with Beam Underline */}
              <BeamUnderline thickness={10}>
                <h1 className="text-4xl md:text-5xl font-bold text-amber-900 pb-2">
                  ISO 22000:2018(FSMS)
                </h1>
              </BeamUnderline>
            </motion.div>
            
            <motion.p
              className="text-amber-800 text-base md:text-lg mt-4"
              variants={slideIn('left')}
              initial="hidden"
              animate="visible"
            >
              Food Safety Management System: ISO 22000 & HACCP
            </motion.p>
          </div>

          <Image
            src={imag20}
            caption=""
            alt="ISO 22000 Food Safety Management System"
          />
          
          <motion.div
            className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-all duration-300 hover:border-amber-300"
            variants={slideIn('up')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
              In today's globalized world, food safety is a top priority for businesses involved in food production, processing, packaging, and distribution. ISO 22000 is an internationally recognized standard that sets out the requirements for a comprehensive Food Safety Management System (FSMS), helping organizations ensure food safety across the entire supply chain. Together with HACCP (Hazard Analysis and Critical Control Points), ISO 22000 Certification ensures that food products are safe for consumption and meet regulatory and customer expectations.
            </p>
          </motion.div>

          <div className="mb-8">
            <AnimatedHeader title="Key Benefits of ISO 22000 Certification" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Enhanced Food Safety", desc: "Implement a systematic approach to managing food safety risks, ensuring products meet the highest safety standards and are free from contamination." },
                { title: "Compliance with Regulations", desc: "Globally recognized, ISO 22000 helps you comply with international and local food safety laws, minimizing legal risks." },
                { title: "Improved Consumer Trust", desc: "Demonstrate your commitment to food safety and quality, enhancing your brand reputation and building long-term customer trust." },
                { title: "Reduction in Food Safety Risks", desc: "Implementing HACCP and ISO 22000 reduces foodborne illnesses and contamination, leading to fewer recalls and less waste." },
                { title: "Increased Market Opportunities", desc: "Gain access to new markets and business opportunities, as many large retailers require suppliers to be ISO 22000 certified." },
                { title: "Streamlined Processes", desc: "Promote a structured approach to food safety management, helping you optimize processes, reduce costs, and improve efficiency." },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-amber-300"
                  variants={slideIn('up', index * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={cardHover}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full p-2 sm:p-3 mr-4 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-amber-900">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <AnimatedHeader title="How to Apply for ISO 22000" />
            <motion.div
              className="bg-amber-100/70 rounded-xl p-6 mb-6 border border-amber-300"
              variants={slideIn('up')} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.5 }}
            >
              <p className="text-amber-900 font-semibold text-center text-lg">
                Note: Implementing ISO 22000 Certification involves several key steps to meet the standard's requirements:
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Conduct a Gap Analysis", desc: "Assess your current food safety practices to identify areas for improvement and determine the changes needed to meet ISO 22000 requirements." },
                { title: "Develop a Food Safety Policy", desc: "Establish a clear policy outlining your organization's commitment to food safety, and communicate it to all employees and stakeholders." },
                { title: "Implement HACCP Principles", desc: "Integrate HACCP by identifying hazards, establishing critical control points, and implementing controls to prevent contamination." },
                { title: "Train Employees", desc: "Ensure all employees understand their roles in maintaining food safety and compliance with the ISO 22000 and HACCP standards." },
                { title: "Conduct Internal Audits", desc: "Perform regular internal audits to evaluate the effectiveness of your FSMS and identify any non-conformities before the main audit." },
                { title: "Certification Audit", desc: "Select an accredited body to conduct the certification audit. Upon successful compliance, you will receive ISO 22000 Certification." },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-amber-300"
                  variants={slideIn('up', index * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={cardHover}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex items-center justify-center mr-4 shrink-0 border border-amber-300">
                      <span className="text-amber-600 text-base sm:text-lg md:text-xl font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-amber-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <AnimatedHeader title="Conclusion" />
            <motion.div
              className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-amber-300"
              variants={slideIn('up')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                ISO 22000 Certification provides a comprehensive framework for managing food safety risks and ensuring compliance with global food safety regulations. Achieving certification demonstrates a strong commitment to safety and quality, enhancing your organization's reputation and competitiveness in the food industry.
              </p>
            </motion.div>
          </div>
          
          <VideoPlayer
            title=""
            src="https://www.youtube.com/watch?v=urED3XEGOuc"
          />
        </div>
      </div>
    </>
  );
};

export default ISO22000Certification;