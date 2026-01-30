import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  HardHat,
  GraduationCap,
  TreePalm,
  Shield,
  Search,
  FileText,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  X,
  Users,
  Building,
  BookOpen,
  ChevronRight,
  Target,
  Briefcase,
  Package,
  ClipboardCheck,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

import QualityPolicyImage from "../../img/Qualitypolicy1_1695565086.jpg";
import HealthSafetyPolicyImage from "../../img/Sample HSE Policy_001_1694416109.jpg";
import ImpartialityPolicyImage from "../../img/Impartiality Policy_001_1694437730.jpg";
import AntiBriberyPolicyImage from "../../img/Antibibary_1695565570.jpg"; 

// Animation Variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } };
const slideInLeft = { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } } };
const slideInRight = { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } } };
const slideInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } };
const scaleUp = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } };
const rotate3D = { hidden: { opacity: 0, rotateX: -10, y: 30 }, visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } } };

// --- Reusable Helper Components ---
const PatternBackground = ({ color = "from-amber-700 to-amber-900" }) => (
  <div className={`absolute inset-0 opacity-5 bg-linear-to-r ${color}`}
    style={{
      backgroundImage: 'linear-gradient(135deg, #ffffff 10%, transparent 10%, transparent 50%, #ffffff 50%, #ffffff 60%, transparent 60%, transparent 100%)',
      backgroundSize: '15px 15px'
    }}
  ></div>
);

// Beam Underline Component
const BeamUnderline = ({ 
  children, 
  thickness = 8, 
  className = "",
  viewState = true 
}) => {
  const gradientId = React.useId();

  return (
    <motion.span 
      className={`relative inline-block group ${className}`}
      initial="hidden"
      animate={viewState ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.span
        variants={itemVariants}
        className="relative z-10"
      >
        {children}
      </motion.span>
      
      <motion.span 
        className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/3 bottom-0 block overflow-visible pointer-events-none"
        style={{ height: `${thickness * 1.5}px`, width: "100%",  }}
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={viewState ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.5 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        
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
      </motion.span>
    </motion.span>
  );
};

// Updated SectionHeader with BeamUnderline
const SectionHeader = ({ children, className = "", viewState = true }) => (
  <div className={`relative inline-block mb-12 ${className}`}>
    <BeamUnderline 
      thickness={6} 
      viewState={viewState}
      className="text-2xl md:text-3xl font-bold
       text-gray-900 text-center"
    >
      {children}
    </BeamUnderline>
  </div>
);

const ThreeDCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{
      y: -8,
      rotateX: 2,
      rotateY: -1,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    className={`transform-gpu transition-all duration-400 hover:shadow ${className}`}
    style={{
      transformStyle: 'preserve-3d',
      perspective: '1000px'
    }}
  >
    {children}
  </motion.div>
);

// Policy Modal Component
const PolicyModal = ({ isOpen, onClose, policy }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">{policy.title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <img
            src={policy.image}
            alt={policy.title}
            className="w-full h-auto rounded-lg shadow"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function About() {
  const [activeSection, setActiveSection] = useState("company");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const sectionsRef = useRef({});

  // Refs for scroll animations
  const companyRef = useRef(null);
  const teamRef = useRef(null);
  const policiesRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const expertiseRef = useRef(null);

  const isCompanyInView = useInView(companyRef, { once: true, margin: "-20%" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-20%" });
  const isPoliciesInView = useInView(policiesRef, { once: true, margin: "-20%" });
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-20%" });
  const isExpertiseInView = useInView(expertiseRef, { once: true, margin: "-20%" });

  // --- Data Arrays ---
  const policies = [
    { 
      title: "Quality Policy", 
      description: "Our commitment to maintaining the highest quality standards in all our services and processes.", 
      image: QualityPolicyImage,
    },
    { 
      title: "Health & Safety Policy", 
      description: "Ensuring a safe and healthy work environment for all our employees and stakeholders.", 
      image: HealthSafetyPolicyImage,
    },
    { 
      title: "Impartiality Policy", 
      description: "Maintaining objectivity and fairness in all our certification and consultancy activities.", 
      image: ImpartialityPolicyImage,
    },
    { 
      title: "Anti-Bribery Policy", 
      description: "Zero tolerance for bribery and corruption in any form throughout our operations.", 
      image: AntiBriberyPolicyImage,
    },
  ];

  // Training Categories Data
  const trainingCategories = [
    {
      category: "ISO Training",
      trainings: [
        "ISO Awareness Training",
        "ISO Internal Auditor Training",
        "ISO Lead Auditor Training"
      ]
    },
    {
      category: "HRD Training",
      trainings: [
        "Leadership Development",
        "Team Building",
        "Communication Skills",
        "Performance Management"
      ]
    },
    {
      category: "OHS Training",
      trainings: [
        "Manual Handling Safety",
        "Office Safety",
        "Electrical Safety",
        "Chemical Safety",
        "Work At Height Safety",
        "Confined Space Safety",
        "Basic Life Support & First Aid",
        "Safety Audit",
        "Incident Accident Investigation"
      ]
    },
    {
      category: "Specialized Training",
      trainings: [
        "Food Safety Training",
        "Road Safety",
        "Project Management",
        "Environmental Training",
        "Lean Six Sigma",
        "5S House Keeping",
        "Waste Management",
        "Customer Care",
        "Advance Excel",
        "AI Training for Business Support"
      ]
    }
  ];

  // Other Services Data
  const otherServices = [
    "Third Party Audits",
    "System Implementation Support",
    "Documentation Services",
    "Compliance Monitoring",
    "Risk Assessment",
    "Process Optimization",
    "Supplier Audits",
    "Management Review Support",
    "Pre-certification Audits",
    "Surveillance Audits"
  ];

  const salesAndSupplies = [
    { category: "Fire Safety Equipment", items: ["Fire Extinguishers", "Fire Alarms", "Fire Hose Reels", "Emergency Lights"] },
    { category: "Safety Signages", items: ["OHS Signages", "Food Safety Signages", "Road Safety Signages", "Electrical Safety Signages"] },
    { category: "Personal Protective Equipment", items: ["Safety Helmets", "Safety Shoes", "Safety Glasses", "Ear Protection", "Respirators"] },
    { category: "First Aid & Emergency", items: ["First Aid Kits", "Emergency Eyewash", "Spill Kits", "Rescue Equipment"] }
  ];

  // Core Services Data
  const coreServices = [
    {
      icon: <Target size={24} className="text-amber-700" />,
      title: "Consulting",
      description: "Professional consultancy services for system implementation and improvement",
      details: [
        "ISO Certification Consulting",
        "Process Improvement",
        "Risk Management",
        "Compliance Auditing"
      ]
    },
    {
      icon: <BookOpen size={24} className="text-amber-700" />,
      title: "Training",
      description: "Comprehensive training programs for skill development and certification",
      details: trainingCategories
    },
    {
      icon: <ClipboardCheck size={24} className="text-amber-700" />,
      title: "System Audit & Certification",
      description: "Complete audit and certification services for various standards",
      details: [
        "ISO Certification",
        "Internal Audits",
        "Supplier Audits",
        "Surveillance Audits",
        "Recertification Audits"
      ]
    },
    {
      icon: <Package size={24} className="text-amber-700" />,
      title: "Other Services & Supplies",
      description: "Additional services and safety equipment supplies",
      details: [
        {
          category: "Other Services",
          items: otherServices
        },
        {
          category: "Sales & Supplies",
          items: salesAndSupplies
        }
      ]
    }
  ];

  const teamMembers = [
    {
      name: "John Doe",
      position: "Lead Consultant",
      expertise: "ISO Standards & Quality Management",
      experience: "15+ years"
    },
    {
      name: "Jane Smith",
      position: "Training Director",
      expertise: "OHS & Safety Training",
      experience: "12+ years"
    },
    {
      name: "Robert Johnson",
      position: "Audit Manager",
      expertise: "System Audits & Compliance",
      experience: "10+ years"
    },
    {
      name: "Sarah Williams",
      position: "Technical Specialist",
      expertise: "Digital Transformation & AI",
      experience: "8+ years"
    }
  ];

  // --- Functions ---
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
  };

  const openPolicyModal = (policy) => {
    setSelectedPolicy(policy);
    setIsPolicyModalOpen(true);
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50 relative overflow-hidden font-sans">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-6 py-3">
            {[
              { id: "company", label: "Our Company" },
              { id: "team", label: "Our Team" },
              { id: "policies", label: "Our Policies" },
              { id: "services", label: "Our Services" },
              { id: "expertise", label: "Expertise" },
              { id: "contact", label: "Contact" }
            ].map((item, idx) => (
              <button key={idx} onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.id ? "bg-amber-100 text-amber-800" : "text-gray-600 hover:text-amber-700 hover:bg-amber-50"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto my-4 px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center mb-12 md:mb-16 relative overflow-hidden rounded-xl bg-linear-to-r from-amber-700 to-amber-900 p-8 md:p-12 text-white">
          <PatternBackground color="from-amber-700 to-amber-900" />
          <div className="relative z-10">
            <motion.h1 variants={slideInRight} className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              <span className="bg-linear-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">About EIMCTA - Your Partner in Excellence</span>
            </motion.h1>
            <motion.p variants={slideInLeft} className="text-lg sm:text-xl text-amber-100 max-w-3xl mx-auto">
              Everest International Management Consultancy & Training Agency (EIMCTA) - Your trusted partner for comprehensive management solutions.
            </motion.p>
          </div>
        </motion.div>

        {/* Our Company Section */}
        <div ref={el => { sectionsRef.current.company = el; companyRef.current = el; }} className="mb-16 md:mb-20">
          <div className="flex justify-center ">
            <SectionHeader viewState={isCompanyInView}>Our Company</SectionHeader>
          </div>
          
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate={isCompanyInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <motion.div variants={slideInLeft} className="bg-white p-8 rounded-xl shadow border border-amber-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Building size={24} className="text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Who We Are</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Everest International Management Consultancy & Training Agency (EIMCTA) is a premier consultancy firm dedicated to helping organizations achieve operational excellence through standardized management systems.
              </p>
              <p className="text-gray-600 mb-4">
                With years of experience and a team of certified professionals, we provide comprehensive solutions tailored to meet the unique needs of each client across various industries.
              </p>
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Our Commitment</h4>
                <p className="text-amber-700">
                  Delivering ethical, impartial, and professional services anytime, anywhere with a focus on long-term partnerships built on trust and results.
                </p>
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="bg-linear-to-br from-amber-700 to-amber-900 rounded-xl p-8 text-white relative overflow-hidden">
              <PatternBackground color="from-amber-800 to-amber-900" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6">Why Choose EIMCTA?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <ShieldCheck size={20} className="mt-1 text-amber-300" />
                    <span>Tailored solutions for your specific business needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp size={20} className="mt-1 text-amber-300" />
                    <span>Proven track record of client satisfaction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award size={20} className="mt-1 text-amber-300" />
                    <span>Certified and experienced consultants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Briefcase size={20} className="mt-1 text-amber-300" />
                    <span>Comprehensive service portfolio</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target size={20} className="mt-1 text-amber-300" />
                    <span>Focus on practical, implementable solutions</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Our Team Section */}
        <div ref={el => { sectionsRef.current.team = el; teamRef.current = el; }} className="mb-16 md:mb-20">
          <div className="flex justify-center mb-8">
            <SectionHeader viewState={isTeamInView}>Our Team</SectionHeader>
          </div>
          
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate={isTeamInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member, index) => (
              <ThreeDCard key={index}>
                <motion.div 
                  variants={slideInUp}
                  className="bg-white p-6 rounded-xl shadow border border-amber-100 text-center h-full"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-r from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                    <Users size={32} className="text-amber-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-amber-700 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-3">{member.expertise}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-500 text-sm">
                      <span className="font-semibold">Experience:</span> {member.experience}
                    </p>
                  </div>
                </motion.div>
              </ThreeDCard>
            ))}
          </motion.div>
        </div>

        {/* Our Policies Section */}
        <div ref={el => { sectionsRef.current.policies = el; policiesRef.current = el; }} className="mb-16 md:mb-20">
          <div className="flex justify-center mb-8">
            <SectionHeader viewState={isPoliciesInView}>Our Policies</SectionHeader>
          </div>
          
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate={isPoliciesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {policies.map((policy, index) => (
              <ThreeDCard key={index}>
                <motion.div 
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  className="bg-white rounded-xl overflow-hidden shadow border border-amber-100 group cursor-pointer"
                  onClick={() => openPolicyModal(policy)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={policy.image}
                      alt={policy.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full">
                        <ExternalLink size={20} className="text-amber-700" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h3>
                    <p className="text-gray-600 mb-4">{policy.description}</p>
                    <button className="text-amber-700 font-medium text-sm flex items-center gap-1 hover:text-amber-800">
                      Click to view full policy <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </ThreeDCard>
            ))}
          </motion.div>
        </div>

        {/* Our Services Section */}
        <div ref={el => { sectionsRef.current.services = el; servicesRef.current = el; }} className="mb-16 md:mb-20">
          <div className="flex justify-center mb-8">
            <SectionHeader viewState={isServicesInView}>Our Services</SectionHeader>
          </div>
          
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate={isServicesInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {coreServices.map((service, index) => (
              <ThreeDCard key={index}>
                <motion.div 
                  variants={slideInUp}
                  className="bg-white rounded-xl shadow border border-amber-100 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                        <p className="text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    {service.title === "Training" ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.details.map((category, catIndex) => (
                          <div key={catIndex} className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-amber-700 mb-3">{category.category}</h4>
                            <ul className="space-y-2">
                              {category.trainings.map((training, trainIndex) => (
                                <li key={trainIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                  <ChevronRight size={12} className="text-amber-500 mt-1 shrink-0" />
                                  {training}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : service.title === "Other Services & Supplies" ? (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-amber-700 mb-4 text-lg">Other Services</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.details[0].items.map((item, itemIndex) => (
                              <div key={itemIndex} className="bg-white p-3 rounded-lg border border-gray-200">
                                <p className="text-gray-700 text-sm">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-700 mb-4 text-lg">Sales & Supplies</h4>
                          <div className="space-y-6">
                            {service.details[1].items.map((category, catIndex) => (
                              <div key={catIndex}>
                                <h5 className="font-medium text-gray-800 mb-2">{category.category}</h5>
                                <div className="flex flex-wrap gap-2">
                                  {category.items.map((item, itemIndex) => (
                                    <span key={itemIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-300">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {service.details.map((detail, detailIndex) => (
                          <span key={detailIndex} className="px-4 py-2 bg-white border border-amber-200 text-gray-700 rounded-lg shadow">
                            {detail}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </ThreeDCard>
            ))}
          </motion.div>
        </div>

        {/* Expertise Section */}
      <div
  ref={(el) => {
    sectionsRef.current.expertise = el;
    expertiseRef.current = el;
  }}
  className="mb-16 md:mb-20"
>
  <div className="flex justify-center mb-8">
    <SectionHeader viewState={isExpertiseInView}>
      Our Expertise & Certifications
    </SectionHeader>
  </div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={isExpertiseInView ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="bg-linear-to-br from-amber-700 to-amber-900 rounded-xl p-8 relative overflow-hidden shadow"
  >
    <PatternBackground color="from-amber-800 to-amber-900" />

    <div className="relative z-10 text-white">
      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT: ISO Standards */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Award size={24} className="text-amber-300" />
            ISO Standards We Certify
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "ISO 9001:2015 (QMS)",
              "ISO 45001:2018 (OHSMS)",
              "ISO 14001:2015 (EMS)",
              "ISO 27001:2022 (ISMS)",
              "ISO 22000:2018 (FSMS)",
              "ISO 21001:2025 (EOMS)",
              "ISO 15189:2022 (Medical Labs)",
              "ISO 26000:2010 (Social Responsibility)",
              "ISO 50001:2018 (EnMS)",
              "ISO 41001:2018 (Facility Mgmt)",
              "ISO 55001:2014 (Asset Mgmt)",
              "ISO 28001 (Supply Chain Security)",
              "IATF 16949 (Automotive QMS)",
              "SA 8000 (Social Accountability)"
            ].map((standard, index) => (
              <motion.div
                key={standard}
                initial={{ opacity: 0, x: -20 }}
                animate={isExpertiseInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg"
              >
                <p className="font-medium">{standard}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Expertise & Compliance */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Shield size={24} className="text-amber-300" />
            Our Expertise
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "ISO Consultancy",
              "ISO Audit",
              "ISO Certification Support",
              "ISO Training",
              "Management System Audit",
              "Lead Auditor Training",
              "2nd Party Audit",
              "3rd Party Audit",
              "Due Diligence",
              "Tender Document / Technical Bid",
              "Waste Reduction Plan",
              "HRD Training",
              "Lean / 6σ Training",
              "OHS Training",
              "CE Marking",
              "SMETA (Sedex)",
              "RBA / QAA",
              "CoC (SVAP / SeQ)",
              "HACCP",
              "HALAL",
              "GMP"
            ].map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, x: 20 }}
                animate={isExpertiseInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg"
              >
                <p className="font-medium">{service}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</div>


        {/* Contact Section Placeholder */}
        <div ref={el => { sectionsRef.current.contact = el; contactRef.current = el; }}>
          {/* Contact form or contact information would go here */}
        </div>
      </div>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        policy={selectedPolicy}
      />
    </div>
  );
}