import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from '../utilities/image';
import VideoPlayer from '../utilities/Video';
import image16 from "../../img/16.jpg";
import isoIcon from "../../img/iso_.png";
import { 
  BookOpen, Star, Building, Target, Trophy, 
  CheckCircle, Circle, School, GraduationCap,
  Award, Users, Zap, Globe, ArrowRight
} from 'lucide-react';

// --- Beam Underline Component ---
const BeamUnderline = ({ 
  children, 
  thickness = 6, 
  className = "" 
}) => {
  const gradientId = "amberBeamGradient";

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
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="48%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="52%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#fbbf24" />
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
          
          {/* Central Pivot Point */}
          <circle cx="50" cy="10" r="0.6" fill="#fffbeb" opacity="0.9" />
        </svg>
      </span>
    </span>
  );
};

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2
    }
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const paragraphVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardHover = {
  y: -8,
  rotateX: "2deg",
  rotateY: "-1deg",
  transition: { duration: 0.3, ease: "easeOut" }
};

// Animation variants used by SectionHeader
const animationVariants = {
  scaleUp: { 
    hidden: { scale: 0.92, opacity: 0 }, 
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    } 
  },
  sectionHeader: { 
    hidden: { opacity: 0, y: 20 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    } 
  },
  underline: { 
    hidden: { scaleX: 0 }, 
    visible: { 
      scaleX: 1, 
      transition: { 
        duration: 0.8, 
        delay: 0.25, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    } 
  },
  paragraph: { 
    hidden: { opacity: 0, y: 12 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: 0.12 
      } 
    } 
  }
};

const ISO21001Guide = () => {
  // Data arrays for different sections of the guide
  const features = [
    'Enhanced focus on learning outcomes',
    'Inclusive education for learners with diverse needs',
    'Consistent stakeholder satisfaction',
    'Improved processes for assessment and evaluation',
  ];

  const benefits = [
    { 
      title: 'Improved Quality of Education', 
      description: 'Provides a structured approach to enhancing the quality of education through systematic planning and monitoring.',
      icon: <Trophy className="w-5 h-5" />
    },
    { 
      title: 'Better Stakeholder Satisfaction', 
      description: 'Effectively meets the needs and expectations of learners, parents, staff, and other stakeholders.',
      icon: <Users className="w-5 h-5" />
    },
    { 
      title: 'Increased Operational Efficiency', 
      description: 'Optimizes processes, reduces inefficiencies, and allocates resources more effectively.',
      icon: <Zap className="w-5 h-5" />
    },
    { 
      title: 'Global Recognition', 
      description: 'Certification provides international recognition, giving institutions a competitive edge.',
      icon: <Globe className="w-5 h-5" />
    },
    { 
      title: 'Enhanced Learner Focus', 
      description: 'Emphasizes learner-centered education, ensuring learners\' needs are prioritized.',
      icon: <GraduationCap className="w-5 h-5" />
    },
  ];

  const applicants = [
    'Primary and secondary schools',
    'Colleges and universities',
    'Technical and vocational training institutions',
    'E-Learning providers',
    'Corporate training departments',
  ];

  const applicationSteps = [
    { title: 'Evaluate Current Systems', description: 'Conduct a thorough evaluation of your existing management system to identify gaps and areas for improvement.' },
    { title: 'Develop Policies and Objectives', description: 'Align your policies and objectives with the requirements of ISO 21001:2018 to ensure they meet the needs of learners and stakeholders.' },
    { title: 'Implement and Monitor', description: 'Introduce necessary changes and continuously monitor your processes to maintain alignment with the standard.' },
    { title: 'Internal Audits', description: 'Perform internal audits to assess your institution\'s readiness for certification.' },
    { title: 'Engage a Certification Body', description: 'Contact an accredited certification body to perform the external audit and grant certification upon compliance.' },
  ];

  // A reusable SectionHeader component with beam underline
  const SectionHeader = ({ icon, children, subtitle }) => {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    React.useEffect(() => {
      if (inView) controls.start('visible');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
      <div ref={ref} className="mb-8 text-center w-[90%] max-w-4xl mx-auto">
        <motion.div 
          animate={controls} 
          initial="hidden" 
          variants={animationVariants.scaleUp} 
          className="mb-4"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-amber-50 border border-amber-200 rounded-full shadow-sm">
            <span className="text-amber-600">
              {icon}
            </span>
          </div>
        </motion.div>
        <motion.h2
          animate={controls}
          initial="hidden"
          variants={animationVariants.sectionHeader}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 mb-3 tracking-tight relative inline-block"
        >
          <BeamUnderline>
            {children}
          </BeamUnderline>
        </motion.h2>
        {subtitle && (
          <motion.p 
            animate={controls} 
            initial="hidden" 
            variants={animationVariants.paragraph} 
            className="text-base md:text-lg text-amber-700 max-w-3xl mx-auto text-center mt-2"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }; 

  return (
    <div className="bg-slate-50 w-full min-h-screen py-12 font-sans">
      <article className="w-full max-w-7xl mx-auto bg-white  rounded-2xl overflow-hidden border
       border-slate-200">
        {/* Hero Section */}
        <section className="p-6 sm:p-8 lg:p-12 text-center w-full relative">
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className=""
          >
            <div className="inline-flex items-center justify-center   ">
          <img src={isoIcon} alt="ISO Icon" className="w-58 h-44 " />
            </div>
          </motion.div>

          <motion.h1
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold
             text-amber-900 tracking-tight relative inline-block"
          >
            <BeamUnderline thickness={8} className="pb-2">
              <span className="flex items-center justify-center gap-3">
                ISO 21001 Education System
              </span>
            </BeamUnderline>
          </motion.h1>

          <motion.p
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="text-amber-800 mt-6 text-xl lg:text-2xl font-semibold mx-auto max-w-3xl"
          >
            A Comprehensive Guide to Educational Organization Management Systems
          </motion.p>
        </section>

        {/* Full-width Image */}
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="rounded-xl overflow-hidden  ">
            <Image src={image16} alt="ISO 21001 Certification" caption="" className="w-full" />
          </div>
        </div>

        <main className="w-full p-6 sm:p-8 lg:p-12 space-y-16">
          {/* --- ABOUT THE STANDARD --- */}
          <motion.section
            className="group p-6 sm:p-8 rounded-xl bg-linear-to-br from-amber-50 to-slate-50 border border-amber-100 shadow-sm w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeader icon={<BookOpen className="w-8 h-8" />}>
              About The Standard
            </SectionHeader>
            <motion.p
              variants={paragraphVariant}
              className="text-slate-700 leading-relaxed text-base md:text-lg text-justify mt-8 max-w-5xl mx-auto"
            >
              ISO 21001:2018 is a management system standard specifically developed for educational organizations, including schools, colleges, universities, and training institutions. It focuses on optimizing the delivery of educational services to meet learners' needs and ensure consistent quality. The standard helps educational institutions establish policies and procedures that align with their vision and mission, thereby promoting continuous improvement and learner engagement.
            </motion.p>
          </motion.section>

          {/* --- KEY FEATURES & WHO CAN APPLY --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 space-y-12 lg:space-y-0 w-full">
            {/* --- KEY FEATURES --- */}
            <motion.section
              className="group p-6 sm:p-8 rounded-xl bg-linear-to-br from-slate-50 to-amber-50 border border-slate-200 shadow-sm w-full"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <SectionHeader icon={<Star className="w-8 h-8" />}>
                Key Features
              </SectionHeader>
              <ul className="space-y-4 mt-8 max-w-5xl mx-auto">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start text-base md:text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="flex-shrink-0 bg-amber-100 p-1 rounded-full mr-3 mt-1">
                      <CheckCircle className="w-5 h-5 text-amber-600" />
                    </span>
                    <span className="text-slate-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* --- WHO CAN APPLY --- */}
            <motion.section
              className="group p-6 sm:p-8 rounded-xl bg-linear-to-br from-amber-50 to-slate-50 border border-amber-100 shadow-sm w-full"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <SectionHeader icon={<Building className="w-8 h-8" />}>
                Who Can Apply?
              </SectionHeader>
              <p className="text-slate-700 mb-6 text-base md:text-lg text-justify mt-8 max-w-5xl mx-auto">
                This standard is applicable to all types of educational organizations, including:
              </p>
              <ul className="space-y-3 text-slate-700 text-base md:text-lg max-w-5xl mx-auto">
                {applicants.map((applicant, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start text-justify"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="flex-shrink-0 bg-amber-100 p-1 rounded-full mr-3 mt-1">
                      <School className="w-5 h-5 text-amber-600" />
                    </span>
                    {applicant}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* --- BENEFITS --- */}
          <motion.section
            className="group p-6 sm:p-8 rounded-xl bg-linear-to-br from-slate-50 to-amber-50 border border-slate-200 shadow-sm w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <SectionHeader icon={<Trophy className="w-8 h-8" />}>
              Benefits of ISO 21001:2018
            </SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  variants={slideInUp}
                  whileHover={cardHover}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 p-2 rounded-lg mr-3">
                      {benefit.icon}
                    </div>
                    <h3 className="font-bold text-amber-900 text-lg">{benefit.title}</h3>
                  </div>
                  <p className="text-slate-700 text-justify">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* --- HOW TO APPLY --- */}
          <motion.section
            className="group p-6 sm:p-8 rounded-xl bg-gradient-to-br from-amber-50 to-slate-50 border border-amber-100 shadow-sm w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <SectionHeader icon={<Target className="w-8 h-8" />}>
              How Can You Apply?
            </SectionHeader>
            <div className="relative mt-8 max-w-5xl mx-auto">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-linear-to-b from-amber-200 to-amber-400" />
              <ol className="space-y-6">
                {applicationSteps.map((step, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start relative"
                    variants={slideInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="absolute left-3 top-3 -translate-x-1/2 w-4 h-4 bg-white border-2 border-amber-500 rounded-full z-10" />
                    <div className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 hover:scale-110 transition-transform duration-300 shadow-lg z-20 relative">
                      {index + 1}
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm flex-1">
                      <div className="flex items-center mb-2">
                        <ArrowRight className="w-4 h-4 text-amber-600 mr-2" />
                        <h3 className="font-bold text-amber-900 text-lg">{step.title}</h3>
                      </div>
                      <p className="text-slate-700 text-justify">{step.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.section>

          {/* --- VIDEO PLAYER --- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={slideInUp}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-200 shadow-sm"
          >
            <SectionHeader icon={<GraduationCap className="w-8 h-8" />}>
              Video Resources
            </SectionHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 max-w-6xl mx-auto">
              <VideoPlayer 
                src="https://www.youtube.com/watch?v=klV_zZPDVdc&list=PLooyxSs0Y2Y4A9lVB24BMctYSkjAUFvIP&index=4" 
                title="ISO 21001:2018 Overview" 
              />
              <VideoPlayer 
                src="https://www.youtube.com/watch?v=PUHNu3Id-Sg&embeds_referring_euri=http%3A%2F%2Flocalhost%3A5173%2F&source_ve_path=MzY4NDIsMzY4NDIsMzY4NDIsMzY4NDIsMA" 
                title="ISO 21001 Implementation Guide" 
              />
            </div>
          </motion.section>
        </main>
      </article>
    </div>
  );
};

export default ISO21001Guide;
