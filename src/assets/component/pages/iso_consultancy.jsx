import React, { useState } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import { 
  Award, Globe, Shield, FileText, CheckCircle, 
  Users, Target, Zap, ShieldCheck, BarChart, Info
} from 'lucide-react';
import consultationProcess from '../../img/consulatancy process.jpg';
import Image from '../utilities/image';
import VideoPlayer from '../utilities/Video';
import InnerSidebar from '../utilities/innserSidebar';

// --- CUSTOM UNDERLINE COMPONENT ---
const BeamUnderline = ({ children, thickness = 8, className = "" }) => {
  const gradientId = "formalBeamGradient";
  return (
    <span className={`relative inline-block align-middle ${className}`}>
      {children}
      <span
        className="absolute left-0 right-0 -bottom-2 block pointer-events-none"
        style={{ height: `${thickness * 1.5}px` }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none" className="block">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="48%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="52%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path d="M 0 10 Q 25 10, 50 4 Q 75 10, 100 10 Q 75 10, 50 16 Q 25 10, 0 10 Z" fill={`url(#${gradientId})`} />
          <circle cx="50" cy="10" r="0.6" fill="#fef3c7" opacity="0.8" />
        </svg>
      </span>
    </span>
  );
};

// --- ANIMATION VARIANTS ---
const heroVariant = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8 } }
};

const cardVariants = {
  slideInUp: { hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6 } } }
};

// --- MAIN COMPONENT ---
const ISOConsultancy = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "overview",
      title: "Overview & Benefits",
      icon: <Info size={18} />,
      content: (
        <div className="space-y-16">
          <motion.div initial="hidden" whileInView="show" variants={cardVariants.slideInUp} className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100">
            <BeamUnderline className="mb-8">
              <h2 className="text-3xl font-bold text-amber-900">What is ISO Consultancy?</h2>
            </BeamUnderline>
            <p className="text-lg leading-relaxed text-gray-700 mt-6">
              <strong className="text-amber-800">ISO Consultancy</strong> is a strategic partnership designed to align your internal processes with International Organization for Standardization (ISO) requirements. We act as your navigational experts, transforming complex global standards into functional business strategies that drive growth.
            </p>
          </motion.div>

          <div>
            <div className="text-center mb-12">
              <BeamUnderline>
                <h2 className="text-3xl font-bold text-amber-900">Benefits of this Standard</h2>
              </BeamUnderline>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Target className="text-amber-600" />, title: "Global Credibility", desc: "Access international markets and high-value tenders with ease." },
                { icon: <Zap className="text-amber-600" />, title: "Operational Efficiency", desc: "Streamline workflows to eliminate waste and reduce overheads." },
                { icon: <ShieldCheck className="text-amber-600" />, title: "Risk Management", desc: "Proactively identify and mitigate organizational risks." },
                { icon: <Users className="text-amber-600" />, title: "Customer Trust", desc: "Prove your unwavering commitment to quality and security." },
                { icon: <BarChart className="text-amber-600" />, title: "Continuous Growth", desc: "Embed a culture of systematic improvement and scalability." },
                { icon: <Globe className="text-amber-600" />, title: "Market Advantage", desc: "Stand out against competitors in complex procurement rounds." },
              ].map((benefit, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-amber-50 shadow-sm text-center">
                  <div className="bg-amber-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">{benefit.icon}</div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "requirements",
      title: "Implementation Path",
      icon: <FileText size={18} />,
      content: (
        <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm">
          <BeamUnderline className="mb-8">
            <h2 className="text-3xl font-bold text-amber-900">Certification Requirements</h2>
          </BeamUnderline>
          <div className="mt-8 overflow-hidden rounded-xl border border-amber-100">
            <table className="w-full text-left">
              <thead className="bg-amber-900 text-amber-50">
                <tr>
                  <th className="p-5">Phase</th>
                  <th className="p-5">Strategic Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {[
                  ["Gap Analysis", "Mapping current processes against ISO requirements."],
                  ["Documentation", "Structuring policies, manuals, and SOPs."],
                  ["Implementation", "Staff training and process integration."],
                  ["Internal Audit", "Pre-assessment to ensure system integrity."],
                  ["Management Review", "Leadership evaluation of system performance."],
                  ["Certification Audit", "The final validation by an external Registrar."]
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-amber-50/50 transition-colors">
                    <td className="p-5 font-bold text-amber-800">{row[0]}</td>
                    <td className="p-5 text-gray-700">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
     <div className="flex flex-row gap-4" >
           <aside className="hidden lg:block w-80 sticky top-16 self-start">
                  <InnerSidebar />
                </aside>
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 min-h-screen font-arial-narrow text-gray-800">
      {/* Hero */}
      <motion.div initial="hidden" animate="show" variants={heroVariant} className="text-center mb-16">
        <BeamUnderline thickness={12}>
          <h1 className="text-4xl md:text-6xl font-black text-amber-900 uppercase tracking-tight">
            ISO Consultancy Services
          </h1>
        </BeamUnderline>
        <p className="mt-8 text-xl text-amber-800 max-w-2xl mx-auto">
          Precision-driven guidance to implement international standards and secure your global certification.
        </p>
      </motion.div>

      <div className="mb-16">
        <Image src={consultationProcess} alt="ISO Process" className="rounded-[2rem] shadow-xl" />
      </div>

      {/* Tabs Navigation */}
      <div className="flex justify-start space-x-2 md:space-x-8 mb-12 border-b border-amber-200">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 px-6 py-4 font-bold transition-all relative ${activeTab === i ? 'text-amber-900' : 'text-amber-600 hover:text-amber-700'}`}
          >
            {tab.icon} {tab.title}
            {activeTab === i && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600" />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] mb-20">{tabs[activeTab].content}</div>

      {/* Why EIMCTA Section */}
      <div className="bg-gradient-to-br from-amber-900 to-amber-950 text-white rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-12">
            <BeamUnderline>
              <h2 className="text-3xl md:text-4xl font-bold">Why Select Only EIMCTA?</h2>
            </BeamUnderline>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { t: "Tailored Strategies", d: "We bypass generic templates to build a system that mirrors your unique operational DNA." },
              { t: "Expert Mentorship", d: "Benefit from consultants who are active industry auditors and subject matter experts." },
              { t: "100% Success Rate", d: "Our methodical approach guarantees your certification on the first attempt." },
              { t: "Seamless Integration", d: "ISO standards that work for you, not against you—integrated without disruption." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CheckCircle className="text-amber-400 mt-1 flex-shrink-0" size={28} />
                <div>
                  <h4 className="font-bold text-xl mb-2 text-amber-200">{item.t}</h4>
                  <p className="text-amber-50/80 leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="mt-20">
        <VideoPlayer />
      </div>
    </div>
    </div>
    </>
  );
};

export default ISOConsultancy;