import React from "react";
import { motion } from "framer-motion";
import VideoPlayer from "../utilities/Video";
import Image from "../utilities/image";
import { Link } from "react-router-dom";
import imag20 from "../../img/iso/10.jpg";
import isoIcon from "../../img/iso_.png";

// ✅ Added icons for all sections
import {
  ShieldCheck,
  BadgeCheck,
  ClipboardList,
  Building2,
  Globe,
  AlertTriangle,
  Users,
  Scale,
  Zap,
  FileText,
  Target,
  BarChart,
  CheckCircle,
  Lightbulb,
  Clock,
  Award,
  HeartHandshake,
} from "lucide-react";
import InnerSidebar from "../utilities/innserSidebar";

/**
 * ✅ BeamUnderline improvements:
 * - bottom-0 (instead of -bottom-2)
 * - underline width matches content (span wraps only text, not full width containers)
 * - no w-full usage needed
 */
const BeamUnderline = ({ children, thickness = 8, className = "" }) => {
  const gradientId = "formalBeamGradient";

  return (
    <span className={`relative inline-block align-middle ${className}`}>
      {children}

      <span
        className="absolute left-0 right-0 bottom-0 block pointer-events-none"
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

const ISO22000Certification = () => {
  
  const slideIn = (direction, delay = 0) => {
    const dist = 28; // smaller = smoother
    return {
      hidden: {
        x: direction === "left" ? -dist : direction === "right" ? dist : 0,
        y: direction === "up" ? dist : 0,
        opacity: 0,
      },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 90,
          damping: 18,
          mass: 0.7,
          delay,
        },
      },
    };
  };

  const sectionHeaderVariant = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 95,
        damping: 18,
        mass: 0.7,
      },
    },
  };

  const cardHover = {
    y: -6,
    transition: { duration: 0.25, ease: "easeOut" },
  };

  /**
   * ✅ AnimatedHeader now supports icon (no numbering needed)
   */
  const AnimatedHeader = ({ title, icon: Icon }) => (
    <motion.div
      className="text-center mb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        variants={sectionHeaderVariant}
        className="inline-flex items-center justify-center gap-3"
      >
        {Icon ? (
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 border border-amber-300">
            <Icon className="w-5 h-5 text-amber-700" />
          </span>
        ) : null}

        {/* ✅ underline now matches content width */}
        <BeamUnderline className="pb-2">
          <h2 className="text-xl lg:text-3xl md:text-3xl font-bold text-amber-900 leading-tight">
            {title}
          </h2>
        </BeamUnderline>
      </motion.div>
    </motion.div>
  );

  // Data arrays with icons
  const haccpItems = [
    {
      title: "HACCP (Hazard Analysis and Critical Control Points)",
      desc: "A systematic, preventive approach to food safety. It identifies physical, chemical, and biological hazards in production processes and designs measurements to reduce these risks to a safe level.",
      icon: ShieldCheck,
    },
    {
      title: "ISO 22000 (Food Safety Management System)",
      desc: "The international standard that maps out what an organization needs to do to demonstrate its ability to control food safety hazards. It incorporates HACCP principles and integrates them into a high-level management structure compatible with ISO 9001.",
      icon: Target,
    },
  ];

  const benefits = [
    { 
      title: "Market Access", 
      desc: "Open doors to international retailers and high-end supply chains.",
      icon: Globe 
    },
    { 
      title: "Risk Mitigation", 
      desc: "Dramatically reduce the likelihood of food contamination and costly product recalls.",
      icon: AlertTriangle 
    },
    { 
      title: "Consumer Trust", 
      desc: "Build a reputation for transparency and uncompromising quality.",
      icon: Users 
    },
    { 
      title: "Legal Compliance", 
      desc: "Ensure your operations consistently meet local and international food safety regulations.",
      icon: Scale 
    },
    { 
      title: "Operational Efficiency", 
      desc: "Streamline processes, reduce waste, and improve resource management.",
      icon: Zap 
    },
  ];

  const requirements = [
    {
      title: "Prerequisite Programs (PRPs)",
      desc: "Establish the basic environmental and operational conditions (e.g., hygiene, pest control, sanitation) necessary for food safety.",
      icon: FileText,
    },
    {
      title: "The 7 Principles of HACCP",
      desc: "Conduct a thorough hazard analysis, identify Critical Control Points (CCPs), and establish monitoring procedures.",
      icon: Target,
    },
    {
      title: "Documentation",
      desc: "Create a robust FSMS manual, policy statements, and records that prove the system is working.",
      icon: ClipboardList,
    },
    {
      title: "Management Commitment",
      desc: "Top-level leadership must provide the resources and vision to sustain the safety culture.",
      icon: BarChart,
    },
    {
      title: "Internal Audit & Review",
      desc: "Periodically test your own system to find gaps before the official certification audit.",
      icon: CheckCircle,
    },
    {
      title: "The Certification Audit",
      desc: "An independent assessment by a third-party body to verify compliance with the ISO 22000 standard.",
      icon: Award,
    },
  ];

  const eimctaBenefits = [
    {
      title: "Industry-Specific Expertise",
      desc: "We don't believe in cookie-cutter solutions. Our consultants have deep experience in diverse food sectors, from dairy and meat to logistics and packaging.",
      icon: Lightbulb,
    },
    {
      title: "Practical Approach",
      desc: "We translate complex ISO jargon into actionable steps that your team can actually follow on the shop floor.",
      icon: CheckCircle,
    },
    {
      title: "End-to-End Support",
      desc: "From initial gap analysis and staff training to the final audit day, we are with you every step of the way.",
      icon: HeartHandshake,
    },
    {
      title: "Proven Track Record",
      desc: "Our high success rate in first-time certifications speaks to our meticulous preparation and dedication to excellence.",
      icon: Award,
    },
    {
      title: "Future-Proofing",
      desc: "We don't just help you get the certificate; we help you build a culture of safety that evolves with your business.",
      icon: Clock,
    },
  ];

  return (
    <>
      <div className="flex flex-row gap-4">
        <aside className="hidden lg:block w-80 sticky top-16 self-start">
          <InnerSidebar />
        </aside>
        
        <div className="flex-1 bg-white font-sans min-h-screen p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section with ISO Icon */}
            <div className="mb-10 text-center">
              <motion.div
                className="flex flex-col items-center"
                variants={slideIn("right")}
                initial="hidden"
                animate="visible"
              >
                <div>
                  <img
                    src={isoIcon}
                    alt="ISO Icon"
                    className="w-24 h-18 sm:w-32 sm:h-24 md:w-40 md:h-30 object-contain"
                  />
                </div>

                {/* ✅ Underline fits title width */}
                <BeamUnderline thickness={10} className="pb-2">
                  <h1 className=" text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent uppercase leading-tight">
                    ISO 22000:2018 FSMS & HACCP
                  </h1>
                </BeamUnderline>
              </motion.div>

              <motion.p
                className="text-amber-800 text-base md:text-lg mt-4"
                variants={slideIn("left")}
                initial="hidden"
                animate="visible"
              >
                ISO 22000 & HACCP Excellence — build trust, reduce risk, and unlock global recognition.
              </motion.p>
            </div>

            <Image src={imag20} caption="" alt="ISO 22000 & HACCP Food Safety" />

            {/* Intro */}
            <motion.div
              className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-all duration-300 hover:border-amber-300"
              variants={slideIn("up")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                In an era where consumer trust is the ultimate currency, ensuring the safety and integrity of your food products
                isn't just a legal requirement—it's a competitive edge. Whether you are a primary producer, a food processor, or
                a catering service, mastering Food Safety Management Systems (FSMS) is your path to global recognition.
              </p>
            </motion.div>

            {/* 1. What is ISO 22000 & HACCP */}
            <div className="mb-8">
              <AnimatedHeader title="What is ISO 22000 & HACCP?" icon={ShieldCheck} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {haccpItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-amber-300"
                      variants={slideIn("up", index * 0.06)}
                      initial="hidden"
                      whileInView="visible"
                      whileHover={cardHover}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-amber-100 rounded-lg p-3 mr-4 shrink-0 border border-amber-300">
                          <Icon className="w-6 h-6 text-amber-500" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-amber-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="bg-white rounded-xl p-6 mt-6 border border-amber-300"
                variants={slideIn("up", 0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <p className="text-amber-900 font-semibold text-center text-base md:text-lg">
                  In short: HACCP focuses on the technical process of hazard control, while ISO 22000 provides the comprehensive
                  management framework to run it efficiently across your entire business.
                </p>
              </motion.div>
            </div>

            {/* 2. Benefits */}
            <div className="mb-8 p-4 rounded-xl   

 ">
              <AnimatedHeader title="Benefits of the Standard" icon={BadgeCheck} />

              <motion.div
                className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-300 hover:border-amber-300"
                variants={slideIn("up")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-gray-700 text-justify leading-relaxed text-justify text-base md:text-lg">
                  Implementing ISO 22000 and HACCP isn't just about checking a box; it's a strategic investment in your brand's future.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-amber-300"
                      variants={slideIn("up", index * 0.06)}
                      initial="hidden"
                      whileInView="visible"
                      whileHover={cardHover}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="flex items-center align-middle mb-4">
                        <div className="bg-amber-100 rounded-lg lg:p-3 md:p-3 p-2 mr-4 shrink-0 border border-amber-300">
                          <Icon className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-amber-900">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                        {benefit.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 3. Requirements */}
            <div className="mb-8">
              <AnimatedHeader title="Requirements for Implementation & Certification" icon={ClipboardList} />

              <motion.div
                className="bg-amber-100/70 rounded-xl p-6 mb-6 border border-amber-300"
                variants={slideIn("up")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <p className="text-amber-900 font-semibold text-center text-base md:text-lg">
                  Getting certified is a journey of continuous improvement. The process generally follows these core requirements:
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requirements.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-amber-300"
                      variants={slideIn("up", index * 0.06)}
                      initial="hidden"
                      whileInView="visible"
                      whileHover={cardHover}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="flex items-center align-center mb-4">
                        <div className="bg-amber-100 rounded-lg lg:p-3  md:p-3 p-2 mr-4 shrink-0 border border-amber-300">
                          <Icon className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-amber-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                        {step.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 4. Why EIMCTA */}
            <div className="mb-8">
              <AnimatedHeader title="Why Should You Select EIMCTA?" icon={Building2} />

              <motion.div
                className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-300 hover:border-amber-300"
                variants={slideIn("up")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                  Expertise matters when the stakes are as high as public health.{" "}
                  <span className="font-semibold text-amber-900">EIMCTA</span> (Excellence in Management Consulting, Training, and Audit)
                  is your dedicated partner in navigating the complexities of food safety.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eimctaBenefits.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white border border-amber-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-amber-300"
                      variants={slideIn("up", index * 0.06)}
                      initial="hidden"
                      whileInView="visible"
                      whileHover={cardHover}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="flex  text-center items-center mb-4">
                        <div className="bg-amber-100 rounded-lg lg:p-3 md:p-3 p-2 mr-4 shrink-0 border border-amber-300">
                          <Icon className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-amber-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <VideoPlayer title="" src="https://www.youtube.com/watch?v=urED3XEGOuc" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ISO22000Certification;