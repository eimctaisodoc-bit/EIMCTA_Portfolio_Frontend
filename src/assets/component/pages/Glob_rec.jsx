import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
  Factory,
  Heart,
  Hospital,
  Utensils,
  Banknote,
  GraduationCap,
  Server,
  Truck,
  Warehouse,
  X,
  Target,
  Award,
  ShieldCheck,
  HelpCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- Custom Scrollbar CSS ---
const CraneIcon = ({ size = 28, color = "currentColor" }) => (
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
    <path d="M3 21h18" />
    <path d="M6 21V4" />
    <path d="M6 4h3" />
    <path d="M9 4l12 4" />
    <path d="M9 4v6" />
    <path d="M6 9h5" />
    <path d="M16 10v5" />
    <path d="M15 15c0 1 1 2 2 2" />
    <rect x="14" y="17" width="4" height="3" rx="0.6" />
  </svg>
);

const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #fbbf24; }
  .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e4e4e7 transparent; }
`;

// --- Dataset ---
const categories = [
  {
    id: "construction",
    title: "Construction",
    icon: <CraneIcon size={28} />,
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001"],
    description: "Quality, environmental and safety management for construction projects",
    details: {
      q1: "What type of Construction can be certified?",
      a1: "Residential and commercial builders, civil engineering firms, infrastructure contractors, and specialized trade contractors (electrical, plumbing, HVAC).",
      q2: "Which ISO standards are relevant for this industry?",
      a2: "ISO 9001 (Quality), ISO 14001 (Environmental Management), and ISO 45001 (Occupational Health & Safety).",
      q3: "What are the benefits of certification?",
      a3: "Reduced workplace accidents, higher eligibility for government tenders, improved project delivery timelines, and better risk management.",
      q4: "What are the requirements for implementation?",
      a4: "Site-specific risk assessments, documented safety protocols, equipment maintenance logs, and rigorous staff safety training records.",
    },
  },
  {
    id: "manufacturer",
    title: "Factory / Manufacturer",
    icon: <Factory size={28} />,
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001"],
    description: "Standards for manufacturing excellence and operational safety",
    details: {
      q1: "What type of Factories can be certified?",
      a1: "Discrete manufacturing plants, assembly lines, chemical processing units, automotive parts producers, and textile factories.",
      q2: "Which ISO standards are relevant?",
      a2: "ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Safety), and ISO 50001 (Energy Management).",
      q3: "What are the benefits?",
      a3: "Minimized production waste, improved resource efficiency, higher product consistency, and global supply chain readiness.",
      q4: "What are the requirements?",
      a4: "Creation of Standard Operating Procedures (SOPs), quality control checkpoints, and environmental impact monitoring systems.",
    },
  },
  {
    id: "ngo",
    title: "NGOs / INGOs",
    icon: <Heart size={28} />,
    certifications: ["ISO 9001", "ISO 26000", "SA 8000"],
    description: "Social responsibility and accountability for non-profit organizations",
    details: {
      q1: "What type of NGOs/INGOs can be certified?",
      a1: "Humanitarian aid organizations, social service non-profits, international development agencies, and community foundations.",
      q2: "Which ISO standards are relevant?",
      a2: "ISO 9001 (Quality Management), ISO 26000 (Social Responsibility), and SA 8000 (Social Accountability).",
      q3: "What are the benefits?",
      a3: "Enhanced donor trust, transparency in fund utilization, improved operational efficiency, and proof of ethical labor practices.",
      q4: "What are the requirements?",
      a4: "Transparent financial reporting, stakeholder engagement plans, and documented social impact assessment metrics.",
    },
  },
  {
    id: "healthcare",
    title: "Hospital / Clinic / Lab",
    icon: <Hospital size={28} />,
    certifications: ["ISO 71001", "ISO 13485", "ISO 15189"],
    description: "Healthcare quality management and medical laboratory standards",
    details: {
      q1: "What type of Healthcare facilities can be certified?",
      a1: "General hospitals, specialized clinics, diagnostic laboratories, and medical device manufacturers.",
      q2: "Which ISO standards are relevant?",
      a2: "ISO 71001 (Healthcare Quality), ISO 13485 (Medical Devices), and ISO 15189 (Medical Laboratories).",
      q3: "What are the benefits?",
      a3: "Improved patient safety, increased accuracy in diagnostics, reduced medical errors, and compliance with health regulations.",
      q4: "What are the requirements?",
      a4: "Strict hygiene protocols, calibration records for medical equipment, and rigorous patient data privacy (HIPAA/GDPR) controls.",
    },
  },
  {
    id: "food",
    title: "Hotel / Food Industry",
    icon: <Utensils size={28} />,
    certifications: ["ISO 22000", "HACCP", "GMP"],
    description: "Food safety and quality management for hospitality industry",
    details: {
      q1: "What type of Food businesses can be certified?",
      a1: "Hotels, catering services, food processing plants, restaurants, and food packaging units.",
      q2: "Which ISO standards are relevant?",
      a2: "ISO 22000 (Food Safety), HACCP (Hazard Analysis), and GMP (Good Manufacturing Practice).",
      q3: "What are the benefits?",
      a3: "Prevention of foodborne illnesses, enhanced brand reputation, streamlined kitchen operations, and legal compliance.",
      q4: "What are the requirements?",
      a4: "Staff hygiene training, cross-contamination prevention plans, and rigorous supply chain traceability records.",
    },
  },
  {
    id: "finance",
    title: "Bank / Finance / Insurance",
    icon: <Banknote size={28} />,
    certifications: ["ISO 9001", "ISO 27001", "SA 8000"],
    description: "Financial services quality and information security standards",
    details: {
      q1: "What type of Finance firms can be certified?",
      a1: "Commercial banks, fintech companies, insurance providers, and microfinance institutions.",
      q2: "Which ISO standards are relevant?",
      a2: "ISO 9001 (Quality), ISO 27001 (Information Security), and ISO 22301 (Business Continuity).",
      q3: "What are the benefits?",
      a3: "Protection of sensitive financial data, mitigation of operational risks, and improved customer service consistency.",
      q4: "What are the requirements?",
      a4: "Robust IT security frameworks, disaster recovery plans, and ethical financial handling policies.",
    },
  },
  {
    id: "education",
    title: "ISO School / College / EDU",
    icon: <GraduationCap size={28} />,
    certifications: ["ISO 21001"],
    description: "Educational organizations management system for learning environments",
    details: {
      q1: "What type of Schools/Colleges can be certified?",
      a1: "K-12 schools, vocational training centers, universities, and e-learning platforms.",
      q2: "Which ISO standards are relevant?",
      a2: "ISO 21001 (Educational Organization Management Systems).",
      q3: "What are the benefits?",
      a3: "Better alignment of curriculum with student needs, improved global recognition, and efficient administrative processes.",
      q4: "What are the requirements?",
      a4: "Learner-centered teaching methodologies, regular faculty evaluations, and documented educational goals.",
    },
  },
  {
    id: "technology",
    title: "Info. Technology",
    icon: <Server size={28} />,
    certifications: ["ISO 9001", "ISO 27001"],
    description: "IT service management and information security standards",
    details: {
      q1: "What type of IT companies can be certified?",
      a1: "Software development houses, data centers, IT managed service providers (MSPs), and SaaS startups.",
      q2: "Which ISO standards are relevant?",
      a2: "ISO 27001 (Information Security Management) and ISO 20000-1 (IT Service Management).",
      q3: "What are the benefits?",
      a3: "Robust defense against data breaches, increased client trust in data handling, and structured development lifecycles.",
      q4: "What are the requirements?",
      a4: "Information security policies, access control management, and regular vulnerability assessments/penetration testing.",
    },
  },
  {
    id: "transport",
    title: "Transport / Logistic",
    icon: <Truck size={28} />,
    certifications: ["ISO 9001", "ISO 28000", "ISO 39001"],
    description: "Supply chain security and road traffic safety management",
    details: {
      q1: "What type of Logistics firms can be certified?",
      a1: "Freight forwarders, trucking companies, shipping lines, and courier services.",
      q2: "Which ISO standards are relevant?",
      a2: "ISO 28000 (Supply Chain Security) and ISO 39001 (Road Traffic Safety Management).",
      q3: "What are the benefits?",
      a3: "Reduced transit damage, improved fuel efficiency, lower insurance premiums, and improved supply chain security.",
      q4: "What are the requirements?",
      a4: "Vehicle maintenance schedules, driver safety training programs, and cargo security protocols.",
    },
  },
  {
    id: "warehousing",
    title: "Exim / Warehousing",
    icon: <Warehouse size={28} />,
    certifications: ["ISO 9001", "ISO 45001"],
    description: "Quality management for warehousing and storage operations",
    details: {
      q1: "What type of Warehouses can be certified?",
      a1: "Cold storage facilities, export-import hubs, and third-party logistics (3PL) warehouses.",
      q2: "Which ISO standards are relevant?",
      a2: "ISO 9001 (Quality) and ISO 45001 (Occupational Health & Safety).",
      q3: "What are the benefits?",
      a3: "Optimized inventory accuracy, faster dispatch times, and reduced workplace injuries in high-risk zones.",
      q4: "What are the requirements?",
      a4: "Inventory tracking systems, warehouse safety layouts, and rigorous loading/unloading procedures.",
    },
  },
];

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
const ISOShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <style>{scrollbarStyles}</style>

      <div className="min-h-screen bg-[#FAFAFA] p-6 md:p-16 text-zinc-900">
        <div className="max-w-6xl mx-auto">
          {/* Heading (text size fixed across breakpoints) */}
          <header className="text-center mb-16">
            <BeamUnderline thickness={10}>

            <h1 className="lg:text-4xl  md:text-3xl text-lg font-black tracking-tight">
              OPERATE WITH <br />
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent uppercase">
                Global Recognition
              </span>
            </h1>
            </BeamUnderline>
            <p className="text-sm pt-2 text-zinc-500">
              Professional ISO Certification & Implementation Services
            </p>
          </header>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white p-8 rounded-3xl border border-zinc-200 cursor-pointer hover:border-amber-400 transition-all"
              >
                <div onClick={() => setSelectedCategory(cat)}>
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                  <p className="text-sm text-zinc-400 mb-4">{cat.description}</p>
                </div>

                <div className="flex gap-3 flex-wrap items-center mt-2">
                  <Link to="/service/iso/2100">
                    <span className="bg-amber-500 px-2 py-1 text-center text-[10px] text-white border border-amber-500 hover:bg-amber-400 transition-colors hover:border-amber-400 rounded-2xl">
                      ISO 21001:2025
                    </span>
                  </Link>

                  <Link to="/service/iso/2200">
                    <span className="bg-amber-500 px-2 py-1 text-center text-[10px] text-white border border-amber-500 hover:bg-amber-400 transition-colors hover:border-amber-400 rounded-2xl">
                      ISO 22000:2018 FSMS
                    </span>
                  </Link>

                  <Link to="/service/iso/9001">
                    <span className="bg-amber-500 px-2 py-1 text-center text-[10px] text-white border border-amber-500 hover:bg-amber-400 transition-colors hover:border-amber-400 rounded-2xl">
                      ISO 9001:2015 QMS
                    </span>
                  </Link>

                  <Link to="/service/iso/45001">
                    <span className="bg-amber-500 px-2 py-1 text-center text-[10px] text-white border border-amber-500 hover:bg-amber-400 transition-colors hover:border-amber-400 rounded-2xl">
                      ISO 45001:2018 OHSMS
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          <AnimatePresence>
            {selectedCategory && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedCategory(null)}
                  className="absolute inset-0 bg-zinc-900/10 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="relative bg-white w-full max-w-2xl rounded-[2rem] border border-zinc-200 flex flex-col overflow-hidden max-h-[90vh]"
                >
                  {/* Header */}
                  <div className="px-8 py-5 border-b border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-amber-500">{selectedCategory.icon}</div>
                      <h2 className="text-base font-bold text-zinc-800 uppercase tracking-tight">
                        {selectedCategory.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="p-2 hover:bg-zinc-50 rounded-full transition-colors"
                    >
                      <X size={20} className="text-zinc-400" />
                    </button>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12">
                    {/* Q&A Section */}
                    <div className="space-y-8">
                      <QABlock
                        icon={<Target size={18} />}
                        question={selectedCategory.details.q1}
                        answer={selectedCategory.details.a1}
                      />
                      <QABlock
                        icon={<Award size={18} />}
                        question={selectedCategory.details.q2}
                        answer={selectedCategory.details.a2}
                      />
                      <QABlock
                        icon={<ShieldCheck size={18} />}
                        question={selectedCategory.details.q3}
                        answer={selectedCategory.details.a3}
                      />
                      <QABlock
                        icon={<HelpCircle size={18} />}
                        question={selectedCategory.details.q4}
                        answer={selectedCategory.details.a4}
                      />
                    </div>

                    {/* Expert Consultation Call */}
                    <div className="p-6 bg-zinc-900 rounded-3xl text-white">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold flex items-center gap-2">
                            <Phone size={16} className="text-amber-400" />
                            6. Book Free Consultation
                          </h4>
                          <p className="text-xs text-zinc-400">
                            Speak with our lead ISO expert today.
                          </p>
                        </div>

                        <a
                          href="tel:+1234567890"
                          className="bg-amber-500 hover:bg-amber-400 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                        >
                          +977 9766 561697 <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-zinc-100 flex gap-3 bg-white">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="flex-1 py-3 px-4 rounded-xl font-bold text-sm border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-all"
                    >
                      Close
                    </button>

                    <button
                      onClick={() => {
                        window.scrollTo({
                          top:
                            document.documentElement.scrollHeight -
                            window.innerHeight -
                            1350,
                          behavior: "smooth",
                        });
                        setSelectedCategory(null);
                      }}
                      className="flex-[2] py-3 px-4 rounded-xl font-bold text-sm bg-amber-500 text-white hover:shadow-lg shadow-amber-100 transition-all"
                    >
                      Get Final Quote
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

const QABlock = ({ question, answer, icon }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-zinc-400 mb-1">
      <div className="p-1.5 bg-zinc-50 rounded-lg text-lg">{icon}</div>
    
    </div>

    <div className="pl-10">
      <h4 className="text-lg font-bold text-zinc-900 mb-2">{question}</h4>
      <p className="text-lg text-zinc-500 leading-relaxed border-l-2 border-zinc-100 pl-4">
        {answer}
      </p>
    </div>
  </div>
);

export default ISOShowcase;
