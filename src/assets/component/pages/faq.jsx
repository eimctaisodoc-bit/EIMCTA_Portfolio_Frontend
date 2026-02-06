import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Layers, BookText, HelpCircle, CheckCircle,
  FileText, Leaf, ShieldCheck, Lock, FileCheck2, Clock,
  Globe, Users, ClipboardList, CreditCard
} from "lucide-react";

// --- Data Configuration ---
const servicesData = [
  { parent: "ISO Services", 
    children: ["ISO Consultancy", "ISO Audit", "ISO Lead Auditor Training", "ISO Internal Auditor Training", "ISO Certification"] },
  { parent: "Environmental Services", 
    children: [
      "Environmental Impact Assessment (EIA)",
      "ISO 14001 Consultancy",
      "ISO 14001 Audit",
      "ISO 14001 Certification",
      "Waste Reduction Plan",
      "Environmental Testing / Calibration / Monitoring",
    ], },
  {
    parent: "Occupational Health & Safety",
     children: [
      "ISO 45001",
      "OSHS Management System Plan",
      "OHS Expert / Engineer / Office Sourcing",
      "OHS Trainings",
      "Emergency Drill",
      "PPE Sourcing / Supplies",
      "OHS Incident Investigation",
      "OHS Risk Assessment / Management",
    ],
  },
  {
    parent: "Audit, Gap Analysis, Training & Development",
    children: [
      "Training Need Analysis",
      "Post Training Evaluation",
      "Training & Development / HRD / HRM Consultancy",
      "OHS Trainings",
      "HRD Trainings",
      "Training Business Risk Management",
      "HR & Functional Gap Analysis",
      "Process Gap Analysis",
      "Lean Management",
      "Lean Six Sigma",
      "5S Implementation",
      "Lead Auditor – ISO Standards",
      "Documentation & Data Transformation",
      "MIS Consultancy",
    ]
  },
  { parent: "Sales & Supplies", children: ["Personal Protective Equipment (PPE)", "Emergency Aids", "Safety Signage Supplies"] },
];

export const faqData = [
  {
    icon: BookText,
    question: "What Is Eimcta?",
    answer:
      "EIMCTA stands for Everest International Management Consultancy & Training Agency Pvt. Ltd. We help businesses get certified, trained, and compliant with international standards like ISO.",
  },
  {
    icon: HelpCircle,
    question: "Why Should I Choose Eimcta?",
    answer:
      "We are experienced, friendly, and provide all services in one place: training, documentation, certification, equipment, and support.",
  },
  {
    icon: CheckCircle,
    question: "What Is Iso Certification And Its Benefits?",
    answer:
      "ISO certification proves your business follows international standards. It helps gain customer trust, improve efficiency, ensure legal compliance, and reduce risks.",
  },
  {
    icon: FileText,
    question: "What Iso Certificates Does Eimcta Support?",
    answer:
      "We support ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (OHS), ISO 22000 (Food Safety), ISO 27001 (Info Security), ISO 21001 (Education), ISO 50001 (Energy), and many more.",
  },
  {
    icon: CheckCircle,
    question: "What Is Iso 9001 (Quality Management)?",
    answer:
      "ISO 9001:2015 is the standard for Quality Management Systems (QMS). It helps businesses reduce errors, ensure consistent quality, and increase customer satisfaction.",
  },
  {
    icon: Leaf,
    question: "What Is Iso 14001 And Environmental Services?",
    answer:
      "ISO 14001 focuses on environmental management. We also provide Environmental Impact Assessments (EIA), waste reduction planning, and eco-friendly operational testing.",
  },
  {
    icon: ShieldCheck,
    question: "What Is Iso 45001 (Occupational Health & Safety)?",
    answer:
      "ISO 45001 ensures a safe workplace. We help develop safety plans, conduct risk assessments, and train staff to prevent accidents and injuries.",
  },
  {
    icon: Lock,
    question: "What Is Iso 27001 (Information Security)?",
    answer:
      "ISO 27001 helps organizations protect sensitive data from hacking, leaks, or misuse by establishing a robust Information Security Management System.",
  },
  {
    icon: CheckCircle,
    question: "What Is Haccp And Iso 22000?",
    answer:
      "These are food safety standards that ensure hygiene and safety throughout the food supply chain, essential for restaurants, factories, and catering businesses.",
  },
  {
    icon: FileCheck2,
    question: "What Is The Process For Iso Certification?",
    answer:
      "We offer two paths: Certification Only for audit-ready firms, and Full Consultancy including gap analysis, documentation, training, implementation, and final audit.",
  },
  {
    icon: Clock,
    question: "How Long Does The Iso Certification Process Take?",
    answer:
      "Certification Only typically takes 2–4 weeks. Full Consultancy projects usually take 6–12 weeks depending on readiness.",
  },
  {
    icon: ShieldCheck,
    question: "What Is The Difference Between Consultancy And Certification Services?",
    answer:
      "Consultancy includes preparation such as gap analysis, documentation, and staff training. Certification is the official audit and certificate issuance.",
  },
  {
    icon: Globe,
    question: "How Much Does Iso Certification Cost?",
    answer:
      "Cost depends on standard, company size, and service type. Certification Only is more affordable, while Full Consultancy requires higher investment.",
  },
  {
    icon: Users,
    question: "What Training Programs Do You Offer?",
    answer:
      "We offer ISO Lead Auditor training, First Aid, Fire Safety, OHS awareness, Food Hygiene, and HR development programs.",
  },
  {
    icon: ClipboardList,
    question: "What Is Lead Auditor Training?",
    answer:
      "This professional course certifies individuals to audit companies against ISO standards and supports career growth.",
  },
  {
    icon: FileText,
    question: "Do You Help With Technical Documentation And Tenders?",
    answer:
      "Yes, we assist with technical reports, SOPs, tender proposals, feasibility studies, and other business documentation.",
  },
  {
    icon: Globe,
    question: "What Is Ce Marking?",
    answer:
      "CE Marking shows that a product meets European safety, health, and environmental requirements for export.",
  },
  {
    icon: ShieldCheck,
    question: "What Safety Supplies Do You Sell?",
    answer:
      "We supply PPE, safety signage, fire extinguishers, emergency rescue kits, and first aid materials.",
  },
  {
    icon: CreditCard,
    question: "What Are The Payment Terms?",
    answer:
      "For Certification Only, payment is due after submission. For Consultancy, payments are made in milestones.",
  },
];


// Combine Data: Insert services into the FAQ list after index 2
const combinedData = [...faqData];
combinedData.splice(3, 0, {
  type: "service_group",
  icon: Layers,
  question: "What ISO Service does EIMCTA Provide?",
  services: servicesData
});

// --- Components ---

const FAQItem = ({ item, isOpen, onClick }) => {
  const Icon = item.icon || Layers;
  const isServiceGroup = item.type === "service_group";

  return (
    <div
      className={`mb-4 rounded-xl transition-all duration-300 border ${isOpen ? 'border-orange-500 bg-amber-50 shadow-md' : 'border-slate-200 bg-white hover:border-orange-300'
        }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left focus:outline-none rounded-xl"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-lg bg-orange-100 text-orange-600">
            <Icon size={20} />
          </div>
          <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
            {item.question}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-orange-400 ml-4">
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-0 px-5 sm:px-10 text-slate-700">
              {isServiceGroup ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {item.services.map((service, idx) => (
                    <div key={idx} className="bg-white/50 p-3 rounded-lg border border-orange-100">
                      <h4 className="font-bold text-orange-700 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {service.parent}
                      </h4>
                      <ul className="space-y-1 pl-4">
                        {service.children.map((child, cIdx) => (
                          <li key={cIdx} className="text-sm hover:text-orange-600 transition-colors list-disc marker:text-orange-300">
                            {child}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="leading-relaxed border-l-4 border-orange-200 pl-4">
                  {item.answer}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
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
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen w-full bg-slate-50 py-16 px-4"
      style={{ fontFamily: 'Arial Narrow ' }}>
      <div className="mx-auto max-w-4xl">

        <header className="mb-12 text-center">
          <BeamUnderline thickness={10}>
          <h2 className=" text-4xl font-black text-orange-700 uppercase tracking-tighter">
            Information Center
          </h2>
            </BeamUnderline>
          <p className="text-lg text-amber-800">
            Find everything you need to know about EIMCTA services and ISO standards.
          </p>
        </header>

        <div className="rounded-3xl bg-white p-2 sm:p-8 shadow-xl shadow-orange-900/5">
          {combinedData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;