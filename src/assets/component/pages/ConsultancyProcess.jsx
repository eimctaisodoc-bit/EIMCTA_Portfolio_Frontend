import React, { useState } from 'react';
import { 
  MessageCircle, 
  CreditCard, 
  FileText, 
  ClipboardList, 
  UserCheck, 
  Search, 
  BookOpen, 
  Headphones, 
  Wallet, 
  CheckCircle, 
  Star,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

// BeamUnderline Component
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

const ConsultancyProcess = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Free Consultation",
      description: "Understanding client needs, scope of certification, and organizational goals.",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      id: 2,
      title: "Initial Payment",
      description: "Commencement of the project following the initial agreement and fee structure.",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      id: 3,
      title: "Contract Signing",
      description: "Formalizing the partnership with a clear Service Level Agreement (SLA).",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      id: 4,
      title: "Job Card Opening",
      description: "Administrative setup of the project in our tracking system for quality control.",
      icon: <ClipboardList className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      id: 5,
      title: "Consultant Deployment",
      description: "Assignment of a dedicated ISO specialist tailored to your specific industry.",
      icon: <UserCheck className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      id: 6,
      title: "Gap Analysis",
      description: "Initial assessment to identify differences between current state and ISO standards.",
      icon: <Search className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      id: 7,
      title: "Documentation & Training",
      description: "Developing required manuals and training your team on compliance procedures.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      id: 8,
      title: "24/7 Support",
      description: "Continuous assistance throughout the implementation and audit phases.",
      icon: <Headphones className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      id: 9,
      title: "Part Payment",
      description: "Milestone payment upon completion of key documentation and training modules.",
      icon: <Wallet className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      id: 10,
      title: "Job Card Closing",
      description: "Final project review and closure of administrative tasks post-certification.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      id: 11,
      title: "Client Feedback",
      description: "Post-service evaluation to ensure total satisfaction and identify improvements.",
      icon: <Star className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      borderColor: "border-amber-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-slate-900" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <BeamUnderline thickness={10}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              ISO Consultancy Journey
            </span>
          </BeamUnderline>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-8">
          A structured approach to achieving global standards for your organization.
          Our 11-step methodology ensures seamless implementation and certification.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            onMouseEnter={() => setActiveStep(step.id)}
            onMouseLeave={() => setActiveStep(null)}
            className={`relative group bg-white border-2 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${activeStep === step.id ? 'border-orange-400' : 'border-gray-100'}`}
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
      </div>
    </div>
  );
};

export default ConsultancyProcess;