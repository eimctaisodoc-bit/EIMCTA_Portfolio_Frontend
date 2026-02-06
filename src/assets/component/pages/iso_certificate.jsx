import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Search, Telescope, FileText, Users, Handshake, 
  ClipboardCheck, Wrench, Trophy, RefreshCw, Briefcase, TrendingUp,
  ShieldCheck, Target, Zap, Award, Globe, ListChecks
} from 'lucide-react';
import Image from '../utilities/image';
import ISOCertificationForm from '../utilities/gloabal';
import certificateProcess from '../../img/2.jpg'
import ISOShowcase from './Glob_rec';
import InnerSidebar from '../utilities/innserSidebar';

// Beam Underline Component
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
            d="M 0 10 Q 25 10, 50 4 Q 75 10, 100 10 Q 75 10, 50 16 Q 25 10, 0 10 Z" 
            fill={`url(#${gradientId})`}
          />
          <circle cx="50" cy="10" r="0.6" fill="#fef3c7" opacity="0.8" />
        </svg>
      </span>
    </span>
  );
};

const ISO_certification = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -55 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 55 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: -40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <>
     <div className="flex flex-row gap-4" >
           <aside className="hidden lg:block w-80 sticky top-16 self-start">
                  <InnerSidebar />
                </aside>
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <motion.article
          className="bg-white shadow rounded-2xl overflow-hidden max-w-7xl mx-auto"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Header Section */}
          <header className="bg-amber-600 p-6 sm:p-8 text-center rounded-t-2xl">
            <motion.h1
              className="text-xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight"
              variants={slideInRightVariants}
            >
              Excellence Through ISO Certification
            </motion.h1>
            <motion.p
              className="text-amber-100 text-base sm:text-lg md:text-xl font-light"
              variants={slideInLeftVariants}
            >
              Elevate Your Standards with Global Recognition
            </motion.p>
          </header>

          <Image src={certificateProcess} alt="ISO Process" caption="Global Standards for Quality & Excellence" />
          <ISOCertificationForm />
          <ISOShowcase />

          {/* Section 1: Definition */}
          <section className="p-8 border-b border-gray-100">
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 mb-6"
              variants={sectionHeaderVariants}
            >
              <BeamUnderline thickness={6} className="">Understanding ISO Certification</BeamUnderline>
            </motion.h2>
            <motion.div variants={cardVariants} className="text-gray-700 text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                <strong>ISO Certification</strong> is a globally recognized seal of approval from the International Organization for Standardization. It provides a blueprint for excellence, ensuring that your organization follows standardized protocols for quality management, safety, and operational efficiency.
              </p>
              <p>
                From <span className="text-amber-700 font-semibold">ISO 9001 (Quality)</span> to <span className="text-amber-700 font-semibold">ISO 27001 (Security)</span>, these certifications act as a "Global Passport," allowing your business to enter international markets with built-in trust and credibility.
              </p>
            </motion.div>
          </section>

          {/* Section 2: Benefits */}
          <section className="p-8 border-b border-gray-100 bg-amber-50/30">
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 mb-8"
              variants={sectionHeaderVariants}
            >
              <BeamUnderline thickness={6} className="">Strategic Benefits</BeamUnderline>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Operational Efficiency", desc: "Streamline workflows, reduce resource waste, and optimize performance.", icon: Zap },
                { title: "Global Credibility", desc: "Enhance your brand reputation and gain instant trust from international clients.", icon: ShieldCheck },
                { title: "Risk Management", desc: "Identify vulnerabilities early and implement robust mitigation strategies.", icon: Target },
                { title: "Market Access", desc: "Qualify for government tenders and large-scale corporate contracts.", icon: TrendingUp }
              ].map((benefit, idx) => (
                <motion.div key={idx} variants={cardVariants} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-amber-100">
                  <benefit.icon className="text-amber-600 shrink-0" size={28} />
                  <div>
                    <h4 className="font-bold text-amber-800">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section 3: Requirements */}
          <section className="p-8 border-b border-gray-100">
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 mb-8"
              variants={sectionHeaderVariants}
            >
              <BeamUnderline thickness={6} className="">Requirements and Implementation</BeamUnderline>
            </motion.h2>
            <div className="space-y-4">
              {[
                { step: "Gap Analysis", detail: "Evaluate your existing processes against the specific ISO standard requirements.", icon: Search },
                { step: "Documentation", detail: "Create Quality Manuals, SOPs, and record-keeping systems tailored to your workflow.", icon: FileText },
                { step: "Employee Training", detail: "Educate your staff on the new standards to ensure organization-wide adoption.", icon: Users },
                { step: "Internal Audit", detail: "Perform mock audits to identify non-conformities before the final assessment.", icon: ClipboardCheck },
                { step: "External Certification", detail: "A final audit by an accredited body to grant your formal certification.", icon: Trophy }
              ].map((item, idx) => (
                <motion.div key={idx} variants={slideInLeftVariants} className="flex items-center p-4 bg-white rounded-xl hover:bg-amber-50 transition-colors border-l-4 border-amber-500 shadow-sm">
                  <div className="bg-white p-2 rounded-full mr-4">
                    <item.icon className="text-amber-600 shrink-0" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-800">{item.step}</h4>
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section 4: Why EIMCTA */}
          <section className="p-8 bg-amber-600 text-white">
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl text-center font-bold mb-8"
              variants={sectionHeaderVariants}
            >
              Why Partner with EIMCTA?
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Expert Consultants", icon: Handshake, desc: "Direct access to lead auditors and industry veterans." },
                { title: "Lean Documentation", icon: Wrench, desc: "We focus on efficiency, not just heavy paperwork." },
                { title: "End-to-End Support", icon: RefreshCw, desc: "Assistance from the first gap analysis to the final audit." },
                { title: "Guaranteed Success", icon: Briefcase, desc: "Proven methodologies ensuring first-time certification." }
              ].map((box, idx) => (
                <motion.div 
                  key={idx} 
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className="bg-amber-700/50 p-6 rounded-xl border border-amber-400/30 text-center flex flex-col items-center"
                >
                  <box.icon size={40} className="mb-4 text-amber-200" />
                  <h4 className="font-bold mb-2">{box.title}</h4>
                  <p className="text-amber-100 text-xs sm:text-sm">{box.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.article>
      </div>
    </div>
    </div>
    </>
  );
};

export default ISO_certification;