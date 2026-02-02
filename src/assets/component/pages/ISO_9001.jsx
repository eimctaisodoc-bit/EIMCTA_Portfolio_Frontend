import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "../utilities/image";
import VideoPlayer from "../utilities/Video";
import image14 from "../../img/14.jpg";
import isoIcon from "../../img/iso_.png";
import InnerSidebar from "../utilities/innserSidebar";

// BeamUnderline Component
const BeamUnderline = ({ children, thickness = 8, className = "" }) => {
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

export default function ISO9001Certification() {
  const introRef = useRef(null);
  const isIntroInView = useInView(introRef, { once: true, amount: 0.3 });

  const gridHeaderRef = useRef(null);
  const isGridHeaderInView = useInView(gridHeaderRef, { once: true, amount: 0.5 });

  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.2 });

  // Animation Variants
  const transition = { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] };

  const heroVariants = {
    slideInRight: {
      hidden: { opacity: 0, x: 80 },
      visible: { opacity: 1, x: 0, transition },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -80 },
      visible: { opacity: 1, x: 0, transition },
    },
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ...transition } },
  };

  const paragraphVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { ...transition, delay: 0.3 } },
  };

  const gridContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 60, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ...transition } },
  };

  return (
    <>
     <div className="flex flex-row gap-4" >
           <aside className="hidden lg:block w-80 sticky top-16 self-start">
                  <InnerSidebar />
                </aside>
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans text-amber-800 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section with ISO Icon --- */}
        <header className="text-center mb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants.slideInLeft}
            className="flex justify-center"
          >
            <img
              src={isoIcon}
              alt="ISO Certification Icon"
              className="w-24 h-18 sm:w-32 sm:h-24 md:w-40 md:h-30 object-contain"
            />
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={heroVariants.slideInRight}
            className="text-4xl md:text-5xl font-extrabold
             text-amber-900 tracking-tight mb-4"
          >
            <BeamUnderline thickness={8}> ISO 9001:2015 QMS</BeamUnderline>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroVariants.slideInLeft}
            className="text-lg text-amber-800 max-w-3xl mx-auto leading-relaxed mt-8"
          >
           Achieve ISO 9001:2015 QMS Certification with EIMCTA’s Expert Guidance
          </motion.p>
        </header>

        {/* --- Top Banner Image --- */}
        <Image src={image14} alt={image14} caption="" />

        {/* --- Introduction Text --- */}
        <motion.div
          ref={introRef}
          initial="hidden"
          animate={isIntroInView ? "visible" : "hidden"}
          variants={paragraphVariant}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <p className="text-xl text-gray-700 leading-relaxed">
            ISO 9001:2015 is the international standard for Quality Management Systems (QMS). It
            provides a proven framework of policies, processes, and procedures required for an
            organization to plan and execute core business areas with consistency and control.
          </p>
        </motion.div>

        {/* --- Grid Header --- */}
        <div ref={gridHeaderRef} className="text-center mb-12">
          <motion.h2
            initial="hidden"
            animate={isGridHeaderInView ? "visible" : "hidden"}
            variants={sectionHeaderVariants}
            className="text-3xl md:text-4xl font-bold text-amber-900 mb-4"
          >
            <BeamUnderline thickness={6}>ISO 9001:2015 Overview</BeamUnderline>
          </motion.h2>
        </div>

        {/* --- Content Grid --- */}
        <motion.div
          ref={gridRef}
          className="grid gap-8 md:grid-cols-2"
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          variants={gridContainerVariants}
        >
          {/* Card: What is ISO 9001:2015 (QMS)? */}
          <InfoCard
            icon={<InfoIcon />}
            title="1) What is ISO 9001:2015 (QMS)?"
            content={
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong className="text-amber-900">ISO 9001:2015</strong> is the international
                  standard for <strong className="text-amber-900">Quality Management Systems (QMS)</strong>.
                  Published by the International Organization for Standardization, it provides a structured
                  framework to manage quality consistently across your organization.
                </p>

                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-900 font-semibold mb-2">At its heart, the 2015 version focuses on:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-amber-800">•</span>
                      <span>
                        <strong className="text-amber-900">The PDCA Cycle:</strong> Plan-Do-Check-Act.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-amber-800">•</span>
                      <span>
                        <strong className="text-amber-900">Risk-Based Thinking:</strong> Identifying and mitigating risks before they become problems.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-amber-800">•</span>
                      <span>
                        <strong className="text-amber-900">Customer Centricity:</strong> Ensuring outputs consistently meet customer requirements.
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            }
            variants={cardVariant}
          />

          {/* Card: Benefits */}
          <InfoCard
            icon={<BenefitsIcon />}
            title="2) Benefits of the Standard"
            content={
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Implementing ISO 9001:2015 isn’t just about getting a certificate—it’s about transforming
                  how you do business.
                </p>
                <ul className="space-y-3">
                  <BenefitItem
                    text="Enhanced Customer Satisfaction"
                    detail="Streamlined processes ensure consistent quality, building loyal clients."
                  />
                  <BenefitItem
                    text="Operational Efficiency"
                    detail="Identify bottlenecks and eliminate waste to save time and resources."
                  />
                  <BenefitItem
                    text="Global Credibility"
                    detail="A globally recognized mark of trust for tenders and high-tier partnerships."
                  />
                  <BenefitItem
                    text="Evidence-Based Decision Making"
                    detail="Use data and facts to drive strategy instead of guesswork."
                  />
                  <BenefitItem
                    text="Employee Engagement"
                    detail="Clear roles and documented processes improve communication and morale."
                  />
                </ul>
              </>
            }
            variants={cardVariant}
          />

          {/* Card: Requirements */}
          <InfoCard
            icon={<ClipboardIcon />}
            title="3) Requirements for Implementation & Certification"
            content={
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Achieving certification is a journey of improvement. The standard is built on key phases (clauses)
                  your organization must address:
                </p>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-amber-50">
                      <tr>
                        <th className="px-4 py-3 font-bold text-amber-900">Phase</th>
                        <th className="px-4 py-3 font-bold text-amber-900">Key Requirements</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-t">
                        <td className="px-4 py-3 font-semibold text-amber-900">Context &amp; Leadership</td>
                        <td className="px-4 py-3 text-gray-700">
                          Define business goals and ensure top management commitment to quality.
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-3 font-semibold text-amber-900">Planning</td>
                        <td className="px-4 py-3 text-gray-700">
                          Identify risks/opportunities and set measurable quality objectives.
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-3 font-semibold text-amber-900">Support &amp; Operation</td>
                        <td className="px-4 py-3 text-gray-700">
                          Manage resources and control production/service delivery.
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-3 font-semibold text-amber-900">Performance Evaluation</td>
                        <td className="px-4 py-3 text-gray-700">
                          Monitor, measure, analyze, and run internal audits for your QMS.
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-3 font-semibold text-amber-900">Improvement</td>
                        <td className="px-4 py-3 text-gray-700">
                          Correct non-conformities and continuously evolve the system.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 bg-amber-100/60 p-4 rounded-lg border-l-4 border-amber-500">
                  <p className="text-sm text-amber-900 italic font-medium">
                    Path to Certification: After implementation and an internal audit, an external Certification Body
                    performs a formal audit. If requirements are met, you are awarded the ISO 9001:2015 certificate.
                  </p>
                </div>
              </>
            }
            variants={cardVariant}
          />

          {/* Card: Why EIMCTA */}
          <InfoCard
            icon={<SparklesIcon />}
            title="4) Why Should You Select Only EIMCTA?"
            content={
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Navigating the complexities of ISO standards can be daunting. <strong className="text-amber-900">EIMCTA</strong>{" "}
                  acts as your strategic partner to simplify the path to excellence.
                </p>

                <ul className="space-y-3">
                  <BulletItem
                    title="Expert Consulting"
                    detail='No “cookie-cutter” manuals—your QMS is tailored to your culture and industry.'
                  />
                  <BulletItem
                    title="Result-Oriented Approach"
                    detail="We focus on making your business better, not just compliant—ROI in every refinement."
                  />
                  <BulletItem
                    title="End-to-End Support"
                    detail="From gap analysis to the final certification audit, we support you at every step."
                  />
                  <BulletItem
                    title="Simplified Documentation"
                    detail="Lean, effective documentation that teams actually use—no death by paperwork."
                  />
                  <BulletItem
                    title="Proven Track Record"
                    detail="Years of experience across sectors with a 100% success rate in helping clients achieve certification."
                  />
                </ul>
              </>
            }
            variants={cardVariant}
          />
        </motion.div>

        {/* --- Video Section --- */}
        <VideoPlayer url="https://www.youtube.com/watch?v=kiDe9QhUpDM&t=1s" title=" " />
      </div>
    </div>
    </div>
    </>
  );
}

// --- Reusable Sub-components ---

const InfoCard = ({ icon, title, description, content, variants }) => (
  <motion.div
    variants={variants}
    whileHover={{ y: -8, rotateX: "2deg", rotateY: "-1deg" }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 h-full flex flex-col"
  >
    <div className="flex items-center mb-4">
      <div className="bg-amber-100 p-3 rounded-full mr-4">{icon}</div>
      <h2 className="text-xl font-bold text-amber-900">{title}</h2>
    </div>

    <div className="flex flex-col flex-grow">
      {description && <p className="text-gray-700 leading-relaxed flex-grow">{description}</p>}
      {content}
    </div>
  </motion.div>
);

const BenefitItem = ({ text, detail }) => (
  <li className="flex items-start">
    <span className="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 font-bold">
      ✓
    </span>
    <span className="text-gray-700">
      <strong className="text-amber-900">{text}:</strong> {detail}
    </span>
  </li>
);

const BulletItem = ({ title, detail }) => (
  <li className="flex items-start gap-3">
    <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
    <span className="text-gray-700">
      <strong className="text-amber-900">{title}:</strong> {detail}
    </span>
  </li>
);

// --- SVG Icons ---

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-amber-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const BenefitsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-amber-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-amber-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>
);

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-amber-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4-4 6.293-6.293a1 1 0 011.414 0z"
    />
  </svg>
);
