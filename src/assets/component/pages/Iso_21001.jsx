import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "../utilities/image";
import VideoPlayer from "../utilities/Video";
import image16 from "../../img/16.jpg";
import isoIcon from "../../img/iso_.png";
import {
  BookOpen,
  Star,
  Building,
  Target,
  Trophy,
  GraduationCap,
  Award,
  Users,
  Zap,
  Globe,
} from "lucide-react";
import InnerSidebar from "../utilities/innserSidebar";

// --- Beam Underline Component ---
const BeamUnderline = ({ children, thickness = 6, className = "" }) => {
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
          <path
            d="M 0 10 Q 25 10, 50 4 Q 75 10, 100 10 Q 75 10, 50 16 Q 25 10, 0 10 Z"
            fill={`url(#${gradientId})`}
          />
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
      staggerChildren: 0.2,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const paragraphVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardHover = {
  y: -8,
  rotateX: "2deg",
  rotateY: "-1deg",
  transition: { duration: 0.3, ease: "easeOut" },
};

const animationVariants = {
  scaleUp: {
    hidden: { scale: 0.92, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  sectionHeader: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  paragraph: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12 } },
  },
};

const ISO21001Guide = () => {
  const benefits = [
    {
      title: "Enhanced Learner Satisfaction",
      description: "Create a more effective and personalized learning environment by aligning educational delivery with learner needs and expectations.",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: "Global Recognition",
      description: "Align with international best practices to strengthen prestige and competitiveness on a global scale.",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      title: "Improved Process Consistency",
      description: "Streamline operations from curriculum development to admissions and assessments, reducing errors and inefficiency.",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Inclusive Education",
      description: "Emphasize accessibility and equity so all learners—regardless of background or abilities—have equal opportunities.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Evidence-Based Growth",
      description: "Use data-driven insights and KPIs to continually improve educational outcomes and institutional performance.",
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: "Stakeholder Trust",
      description: "Build stronger relationships with parents, government bodies, and employers via transparent, accountable management practices.",
      icon: <Trophy className="w-5 h-5" />,
    },
  ];

  const requirements = [
    {
      title: "Leadership & Commitment",
      description: "Top management must take responsibility for the EOMS and ensure educational policies align with the institution’s strategic direction.",
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: "Context Analysis",
      description: "Identify internal and external factors affecting educational delivery, including beneficiary needs (learners, parents, staff, and stakeholders).",
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Resource Management",
      description: "Ensure adequate facilities, technology, and competent human resources to support effective learning environments.",
      icon: <Building className="w-5 h-5" />,
    },
    {
      title: "Operational Planning",
      description: "Define how curriculum is designed, developed, and delivered, including effective management of learner assessments.",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      title: "Performance Evaluation",
      description: "Implement internal audits, management reviews, monitoring, and feedback mechanisms to measure performance and improve outcomes.",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      title: "Continuous Improvement",
      description: "Maintain a formal process to address nonconformities, apply corrective actions, and prevent recurrence through continual improvement.",
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  const whyEIMCTA = [
    {
      title: "Sector-Specific Expertise",
      description: "EIMCTA specializes in education—understanding pedagogy, curriculum compliance, and learner-centered requirements beyond generic consulting.",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: "Tailored Methodology",
      description: "We customize the ISO 21001:2025 framework to match your institution’s size, culture, and educational goals—no one-size-fits-all templates.",
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Seamless Digital Integration",
      description: "We help integrate EOMS requirements into your LMS and administrative tools for a paperless, efficient, and modern transition.",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "End-to-End Support",
      description: "From gap analysis and staff training to audit readiness, our team stays with you through every step of your certification journey.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Proven Track Record",
      description: "Trusted by schools, colleges, and corporate training centers—EIMCTA has a strong history of successful certifications and real-world results.",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const SectionHeader = ({ icon, children, subtitle }) => {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    React.useEffect(() => {
      if (inView) controls.start("visible");
    }, [inView, controls]);

    return (
      <div ref={ref} className="mb-8 text-center w-full max-w-4xl mx-auto">
        <motion.div
          animate={controls}
          initial="hidden"
          variants={animationVariants.scaleUp}
          className="mb-4"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-amber-50 border border-amber-200 rounded-full">
            <span className="text-amber-600">{icon}</span>
          </div>
        </motion.div>

        <motion.h2
          animate={controls}
          initial="hidden"
          variants={animationVariants.sectionHeader}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 mb-3 tracking-tight relative inline-block"
        >
          <BeamUnderline>{children}</BeamUnderline>
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
    <div className="bg-white w-full min-h-screen py-12 font-sans px-4 sm:px-6">
      {/* Outer Article Container: uses flex to enable parallel columns */}
      <article className="relative w-full max-w-7xl mx-auto bg-white flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Parallel Sticky Sidebar */}
        <aside className="hidden lg:block w-80 sticky top-16 self-start">
          <InnerSidebar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 w-full">
          {/* Hero Section */}
          <section className="pb-12 text-center w-full relative">
            <motion.div variants={slideInRight} initial="hidden" animate="visible">
              <div className="inline-flex items-center justify-center">
                <img src={isoIcon} alt="ISO Icon" className="w-58 h-44 object-contain" />
              </div>
            </motion.div>

            <motion.h1
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-900 tracking-tight relative inline-block"
            >
              <BeamUnderline thickness={8} className="pb-2">
                <span className="flex items-center justify-center gap-3">
                  ISO 21001:2025 EOMS 
                </span>
              </BeamUnderline>
            </motion.h1>

            <motion.p
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              className="text-amber-800 mt-6 text-xl lg:text-2xl font-semibold mx-auto max-w-3xl"
            >
              Professional ISO 21001:2025 Implementation & Certification Services by EIMCTA
            </motion.p>
          </section>

          {/* Featured Image */}
          <div className="w-full mb-16">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src={image16}
                alt="ISO 21001 Certification"
                caption=""
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Content Blocks */}
          <main className="space-y-20">
            {/* 1. What is ISO 21001:2025 */}
            <motion.section
              className="group p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-amber-50 to-slate-50 border border-amber-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionHeader icon={<BookOpen className="w-8 h-8" />}>
                What is ISO 21001:2025 EOMS?
              </SectionHeader>

              <motion.p
                variants={paragraphVariant}
                className="text-slate-700 leading-relaxed text-base md:text-lg text-justify mt-8 max-w-5xl mx-auto"
              >
                <strong>ISO 21001:2025</strong> is the international standard for <strong>Educational Organization Management Systems (EOMS)</strong>.
                It provides a common management tool for organizations delivering educational products and services capable of meeting learner and beneficiary requirements. Built on the High-Level Structure of ISO 9001, the 2025 version is tailored to the education sector.
              </motion.p>
            </motion.section>

            {/* 2. Benefits */}
            <motion.section
              className="group p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50 border border-slate-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <SectionHeader icon={<Trophy className="w-8 h-8" />}>
                Benefits of Implementing ISO 21001:2025
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm"
                    variants={slideInUp}
                    whileHover={cardHover}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-100 p-2 rounded-lg mr-3">
                        {benefit.icon}
                      </div>
                      <h3 className="font-bold text-amber-900 text-lg">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 3. Requirements */}
            <motion.section
              className="group p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-amber-50 to-slate-50 border border-amber-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <SectionHeader icon={<Star className="w-8 h-8" />}>
                Requirements for Implementation
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {requirements.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm"
                    variants={slideInUp}
                    whileHover={cardHover}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-100 p-2 rounded-lg mr-3">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-amber-900 text-lg">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-700 text-sm md:text-base">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 4. Why EIMCTA */}
            <motion.section
              className="group p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50 border border-slate-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <SectionHeader icon={<Award className="w-8 h-8" />}>
                Why Should You Select EIMCTA?
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {whyEIMCTA.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm"
                    variants={slideInUp}
                    whileHover={cardHover}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-100 p-2 rounded-lg mr-3">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-amber-900 text-lg">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-700 text-sm md:text-base">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Video Resources */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={slideInUp}
              viewport={{ once: true }}
              className="p-6 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <SectionHeader icon={<GraduationCap className="w-8 h-8" />}>
                Video Resources
              </SectionHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                <VideoPlayer
                  src="https://www.youtube.com/watch?v=klV_zZPDVdc&list=PLooyxSs0Y2Y4A9lVB24BMctYSkjAUFvIP&index=4"
                  title="ISO 21001 Overview"
                />
                <VideoPlayer
                  src="https://www.youtube.com/watch?v=PUHNu3Id-Sg"
                  title="ISO 21001 Implementation Guide"
                />
              </div>
            </motion.section>
          </main>
        </div>
      </article>
    </div>
  );
};

export default ISO21001Guide;