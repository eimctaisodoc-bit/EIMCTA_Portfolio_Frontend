import React, { useState } from 'react';
import { 
  MessageCircle, 
  Search, 
  ClipboardList, 
  ShieldCheck, 
  Users, 
  CheckCircle, 
  Award, 
  Package, 
  RefreshCw, 
  Flag,
  ChevronRight
} from 'lucide-react';

const CertificationProcess = () => {

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



  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Free Consultation",
      description: "Initial discovery session to understand organizational needs and certification scope.",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      phase: "PLANNING"
    },
    {
      id: 2,
      title: "Stage-I ISO Audit",
      description: "Comprehensive documentation review to ensure all required policies are in place.",
      icon: <Search className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      phase: "PLANNING"
    },
    {
      id: 3,
      title: "ISO Gap Analysis",
      description: "Identifying critical gaps between the current system and desired ISO standards.",
      icon: <ClipboardList className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      phase: "PLANNING"
    },
    {
      id: 4,
      title: "Stage-II ISO Audit",
      description: "A full process audit to verify the practical implementation of the quality system.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      phase: "AUDIT & REVIEW"
    },
    {
      id: 5,
      title: "Management Review",
      description: "A formal meeting with leadership to evaluate system effectiveness and alignment.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      phase: "AUDIT & REVIEW"
    },
    {
      id: 6,
      title: "Closeout of Audit",
      description: "Addressing and resolving any findings or non-conformities from the audit phase.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      phase: "AUDIT & REVIEW"
    },
    {
      id: 7,
      title: "ISO Registration",
      description: "Official registration of your ISO certificate with the accrediting body.",
      icon: <Award className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      phase: "CERTIFICATION"
    },
    {
      id: 8,
      title: "Handover",
      description: "Formal delivery of the certification documents and final project reporting.",
      icon: <Package className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      phase: "CERTIFICATION"
    },
    {
      id: 9,
      title: "Surveillance Audit",
      description: "Regular follow-up audits to maintain compliance and ensure continuous improvement.",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      phase: "CERTIFICATION"
    },
    {
      id: 10,
      title: "End of Services",
      description: "Final contract completion and transition to autonomous system management.",
      icon: <Flag className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      phase: "CERTIFICATION"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-slate-900" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <BeamUnderline thickness={10}>
        <h1 className="text-4xl md:text-5xl font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
          ISO Certification Process
        </h1>
          </BeamUnderline>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Our streamlined 10-step methodology guides your organization from initial 
          consultation to successful global certification.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div 
            key={step.id}
            onMouseEnter={() => setActiveStep(step.id)}
            onMouseLeave={() => setActiveStep(null)}
            className={`relative group bg-white border-2 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${activeStep === step.id ? 'border-orange-400 shadow-orange-100' : 'border-gray-100'}`}
          >
            {/* Step Number Badge */}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center font-bold shadow-lg text-sm border-2 border-white">
              {step.id}
            </div>

            <div className="flex flex-col h-full">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${step.color} group-hover:bg-orange-600 group-hover:text-white`}>
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {step.description}
              </p>

              
            </div>
          </div>
        ))}
        
        {/* Call to Action Tile */}
        
      </div>

      {/* Footer Branding */}
      
    </div>
  );
};

// export default App;
export default CertificationProcess;