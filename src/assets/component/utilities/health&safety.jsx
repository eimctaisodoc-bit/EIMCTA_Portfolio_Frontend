import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ShieldCheck, Users, ListChecks, FileText, BarChart, Video, ThumbsUp } from 'lucide-react';
import BusinessQuoteForm from '../pages/form';

// Animation variants based on your specifications
const animationVariants = {
  slideInRight: {
    hidden: { x: 80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  slideInLeft: {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  slideInUp: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  sectionHeaderVariant: {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  paragraphVariant: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
  },
  scaleUp: {
    hidden: { scale: 0.92, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.7 } },
  },
};

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

// Reusable component to trigger animations on scroll
const AnimatedComponent = ({ children, variants, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const HealthSafety = () => {
  // Helper component for list items with icons
  const BenefitItem = ({ children }) => (
    <li className="flex items-start text-amber-800 mb-4">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
        <ShieldCheck className="w-4 md:w-5 h-4 md:h-5 text-amber-600" />
      </div>
      <span className="text-sm md:text-base text-justify">{children}</span>
    </li>
  );

  // Helper component for section headers with animation
  const SectionHeader = ({ icon, title }) => {
    const Icon = icon;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const textControls = useAnimation();

    useEffect(() => {
      if (isInView) {
        textControls.start('visible');
      }
    }, [isInView, textControls]);

    return (
      <div ref={ref} className="flex flex-col md:flex-row items-center justify-center text-center mb-8 w-[90%] max-w-4xl mx-auto">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3 md:mb-0 md:mr-5">
          <Icon className="w-5 md:w-6 h-5 md:h-6 text-amber-600" />
        </div>
        <div className="relative">
          <motion.div
            variants={animationVariants.sectionHeaderVariant}
            initial="hidden"
            animate={textControls}
            className="inline-block relative text-center"
          >
            <BeamUnderline className="inline-block">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-amber-900">
                {title}
              </h2>
            </BeamUnderline>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 font-['Arial_Narrow',_sans-serif] text-amber-800">
      {/* Hero Section with Image */}
      <div className="relative h-96 w-full">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
          alt="Healthcare professionals discussing ISO standards"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1600x600/f9f5f0/8B5A2B?text=Healthcare+ISO+Standards'; }}
        />
        <div className="absolute inset-0 bg-amber-900 bg-opacity-30 flex items-center justify-center">
          <div className="text-center px-6">
            <motion.div
              variants={animationVariants.slideInRight}
              initial="hidden"
              animate="visible"
              className="mb-4 drop-shadow-lg relative inline-block"
            >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
                  Ensuring Quality and Safety in Healthcare
                </h1>
             
            </motion.div>
            <motion.p
              variants={animationVariants.slideInLeft}
              initial="hidden"
              animate="visible"
              className="text-base md:text-lg lg:text-xl text-amber-100 max-w-3xl mx-auto drop-shadow-md mt-6 text-justify">
              Implementing ISO Standards for Superior Patient Care and Operational Excellence
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-200">

          {/* Intro Section */}
          <section className="px-8 py-12 sm:px-12 text-center transition-colors duration-300">
            <AnimatedComponent variants={animationVariants.paragraphVariant}>
              <p className="text-base md:text-lg lg:text-xl text-amber-800 max-w-3xl mx-auto text-justify leading-relaxed">
                In an era of rapid medical advancement, managing complexity and risk is paramount. A robust Health and Safety Plan, guided by international standards, is the key to protecting patients and enhancing care.
              </p>
            </AnimatedComponent>
          </section>

          {/* Why ISO Matters Section */}
          <section className="px-8 py-12 sm:px-12 bg-amber-100/50 transition-colors duration-300">
            <SectionHeader icon={ShieldCheck} title="Why ISO Standards Matter in Healthcare?" />
            <AnimatedComponent variants={animationVariants.paragraphVariant}>
              <p className="mb-8 text-lg text-amber-800">
                ISO standards provide healthcare organizations with structured processes to manage risks, improve patient safety, and protect sensitive data. Some of the most relevant ISO standards in healthcare include:
              </p>
            </AnimatedComponent>
            <div className="space-y-6">
              {[
                { title: "ISO 9001 (Quality Management)", description: "Ensures consistent quality in patient care and services through standardized processes and continuous improvement." },
                { title: "ISO 45001 (Occupational Health & Safety)", description: "Protects healthcare workers and reduces workplace hazards through systematic risk management." },
                { title: "ISO 27001 (Information Security)", description: "Safeguards sensitive medical and patient data against breaches and cyber threats." }
              ].map((item, index) => (
                <AnimatedComponent key={index} variants={animationVariants.slideInUp}>
                  <motion.div
                    whileHover={{ y: -8, rotateX: 2, rotateY: -1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="p-6 bg-white rounded-xl border border-amber-200 shadow-sm hover:shadow-md hover:border-amber-300"
                  >
                    <div className="mb-2">
                        <strong className="text-lg md:text-xl font-semibold text-amber-900">
                          {item.title}
                        </strong>
                   
                    </div>
                    <p className="text-sm md:text-base text-amber-800 text-justify">{item.description}</p>
                  </motion.div>
                </AnimatedComponent>
              ))}
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="px-8 py-12 sm:px-12 transition-colors duration-300">
            <SectionHeader icon={BarChart} title="Key Benefits of ISO Standards" />
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedComponent variants={animationVariants.slideInLeft}>
                <motion.div
                  whileHover={{ y: -8, rotateX: 2, rotateY: -1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-amber-100/50 p-8 rounded-xl border h-full border-amber-200 shadow-sm hover:shadow-md hover:border-amber-300"
                >
                  <ul className="space-y-5">
                    <BenefitItem><strong>Improved Patient Safety</strong> – Streamlined processes reduce errors and risks, leading to better outcomes and higher quality care.</BenefitItem>
                    <BenefitItem><strong>Data Protection</strong> – Strengthened cybersecurity measures safeguard sensitive patient information and maintain confidentiality.</BenefitItem>
                    <BenefitItem><strong>Regulatory Compliance</strong> – Aligns healthcare facilities with national and international requirements, reducing legal risks.</BenefitItem>
                  </ul>
                </motion.div>
              </AnimatedComponent>
              <AnimatedComponent variants={animationVariants.slideInRight}>
                <motion.div
                  whileHover={{ y: -8, rotateX: 2, rotateY: -1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-amber-100/50 p-8 rounded-xl border h-full border-amber-200 shadow-sm hover:shadow-md hover:border-amber-300"
                >
                  <ul className="space-y-5">
                    <BenefitItem><strong>Operational Efficiency</strong> – Optimized systems reduce costs, eliminate redundancies, and improve clinical workflows.</BenefitItem>
                    <BenefitItem><strong>Enhanced Reputation</strong> – ISO certification builds trust with patients, staff, and stakeholders through demonstrated commitment to quality.</BenefitItem>
                    <BenefitItem><strong>Risk Management</strong> – Proactive identification and mitigation of potential hazards in healthcare delivery.</BenefitItem>
                  </ul>
                </motion.div>
              </AnimatedComponent>
            </div>
          </section>

          {/* Who Can Apply Section */}
          <section className="px-8 py-12 sm:px-12 bg-amber-100/50 transition-colors duration-300">
            <SectionHeader icon={Users} title="Who Can Apply ISO Standards?" />
            <p className="mb-8 text-sm md:text-base text-amber-800 text-justify">ISO certification is not limited to hospitals. Any healthcare-related organization can benefit, including:</p>
            <AnimatedComponent variants={{}} className="flex flex-wrap gap-4 justify-center">
              {['Hospitals & Clinics', 'Nursing Homes', 'Diagnostic Laboratories', 'Pharmaceutical Companies', 'Medical Device Manufacturers', 'Healthcare IT Providers', 'Dental Practices', 'Rehabilitation Centers'].map((item, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
                  }}
                  initial="hidden"
                  animate="visible"
                  className="bg-amber-100 text-amber-900 px-4 py-2 rounded-full font-medium text-sm md:text-base hover:bg-amber-200 hover:shadow-sm transition-all duration-300 cursor-default"
                >
                    {item}
                  
                </motion.span>
              ))}
            </AnimatedComponent>
          </section>

          {/* Steps to Apply Section */}
          <section className="px-8 py-12 sm:px-12 transition-colors duration-300">
            <SectionHeader icon={ListChecks} title="Steps to Apply ISO Standards" />
            <ol className="relative border-l-2 border-amber-200 ml-6 space-y-10">
              {[
                { step: "1", title: "Understand the Requirements", description: "Study relevant standards like ISO 9001, ISO 45001, and ISO 27001 to determine which apply to your healthcare organization." },
                { step: "2", title: "Conduct a Gap Analysis", description: "Identify areas where your current practices fall short of ISO requirements through comprehensive assessment." },
                { step: "3", title: "Develop an Action Plan", description: "Create a detailed roadmap with training programs, policy updates, and necessary system upgrades." },
                { step: "4", title: "Implementation", description: "Integrate ISO guidelines into daily healthcare operations across all departments and levels." },
                { step: "5", title: "Audit & Certification", description: "Perform rigorous internal audits, then apply for external certification from accredited bodies." },
                { step: "6", title: "Continuous Improvement", description: "Regularly review and update processes through PDCA (Plan-Do-Check-Act) cycles to maintain compliance." }
              ].map((item, index) => (
                <AnimatedComponent key={index} variants={animationVariants.slideInRight}>
                  <li className="relative pl-8 group">
                    <span className="absolute flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full -left-5 ring-4 ring-white text-lg font-bold text-amber-900 group-hover:bg-amber-200 transition-colors duration-300">
                      {item.step}
                    </span>
                    <div className="mb-2">
                        <h3 className="text-lg md:text-xl font-semibold text-amber-900">
                          {item.title}
                        </h3>
                    </div>
                    <p className="text-sm md:text-base text-amber-800 text-justify">{item.description}</p>
                  </li>
                </AnimatedComponent>
              ))}
            </ol>
          </section>

          {/* Essential Documentation Section */}
          <section className="px-8 py-12 sm:px-12 bg-amber-100/50 transition-colors duration-300">
            <SectionHeader icon={FileText} title="Essential Documentation" />
            <p className="mb-8 text-sm md:text-base text-amber-800 text-justify">
              Proper documentation is the backbone of ISO certification. While specific requirements vary by standard, here are some common documents you'll need to prepare and maintain:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Quality Manual & Policies", description: "The high-level document outlining your quality management system and commitment to standards." },
                { title: "Standard Operating Procedures (SOPs)", description: "Detailed, step-by-step instructions for all routine clinical and administrative tasks." },
                { title: "Risk Assessment Records", description: "Documentation of identified hazards, risk analysis, and mitigation strategies." },
                { title: "Internal Audit Reports", description: "Findings from your internal reviews and records of corrective actions taken." },
                { title: "Management Review Minutes", description: "Records of leadership meetings discussing the performance and effectiveness of the QMS." },
                { title: "Employee Training Records", description: "Proof that all staff members are competent in their roles and understand relevant procedures." }
              ].map((doc, index) => (
                <AnimatedComponent key={index} variants={animationVariants.scaleUp}>
                  <motion.div
                    whileHover={{ y: -8, rotateX: 2, rotateY: -1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-white p-6 h-full rounded-xl border border-amber-200 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <FileText className="w-4 md:w-5 h-4 md:h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="mb-2">
                          
                            <h3 className="text-lg md:text-xl font-semibold text-amber-900">
                              {doc.title}
                            </h3>
                          
                        </div>
                        <p className="text-sm md:text-base text-amber-700 text-justify">{doc.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedComponent>
              ))}
            </div>
          </section>
        </div>
      </div>
      <BusinessQuoteForm />
    </div>
  );
};

export default HealthSafety;