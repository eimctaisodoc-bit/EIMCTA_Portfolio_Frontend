import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from '../utilities/image';
import VideoPlayer from '../utilities/Video';
import image21 from "../../img/banner/4.jpg";
import isoIcon from "../../img/iso_.png";
import InnerSidebar from '../utilities/innserSidebar';

// --- BeamUnderline Component ---
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

const animationVariants = {
  slideInRight: {
    hidden: { x: 80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  slideInLeft: {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  sectionHeader: {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  underline: {
    hidden: { width: '0%' },
    visible: { width: '90%', transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  paragraph: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
  },
  slideInUp: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7 } }
  },
  scaleUp: {
    hidden: { scale: 0.92, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.7 } }
  }
};

const gridContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// --- Components ---

const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {path}
  </svg>
);

const ICONS = {
  about: <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></>,
  benefits: <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.78l1.37.37a2 2 0 0 0 1.95 0l1.37-.37a4 4 0 0 1 4.78 4.78l-.37 1.37a2 2 0 0 0 0 1.95l.37 1.37a4 4 0 0 1-4.78 4.78l-1.37-.37a2 2 0 0 0-1.95 0l-1.37.37a4 4 0 0 1-4.78-4.78l.37-1.37a2 2 0 0 0 0-1.95l-.37-1.37z" /><path d="m9 12 2 2 4-4" /></>,
  who: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  how: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>,
  why: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05A5.73 5.73 0 0 0 4.5 16.5z" /><path d="m12 15-3-3a2.25 2.25 0 0 1 0-3l3-3a2.25 2.25 0 0 1 3 0l3 3a2.25 2.25 0 0 1 0 3l-3 3a2.25 2.25 0 0 1-3 0z" /><path d="m21 21-1.5-1.5" /></>,
  improvement: <><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M21 21v-5h-5" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  video: <><path d="m22 8-6 4 6 4V8Z" /><path d="M14 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" /></>
};

const SectionTitle = ({ icon, children, subtitle }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div ref={ref} className="relative mb-10 text-center">
      <div className="flex items-center justify-center gap-3">
        <motion.div animate={controls} initial="hidden" variants={animationVariants.scaleUp}>
          <div className="text-yellow-400 bg-yellow-100 rounded-full p-2">{icon}</div>
        </motion.div>
        <div className="relative">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 leading-tight inline-block"
            variants={animationVariants.sectionHeader}
            initial="hidden"
            animate={controls}
          >
            <BeamUnderline>
              {children}
            </BeamUnderline>
          </motion.h2>
        </div>
      </div>
      {subtitle && (
        <motion.p
          className="mt-4 text-gray-700 max-w-3xl mx-auto text-justify leading-relaxed"
          variants={animationVariants.paragraph}
          initial="hidden"
          animate={controls}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

const InfoCard = ({ icon, title, children, customVariant }) => (
  <motion.div
    className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm"
    variants={customVariant}
    whileHover={{ y: -8, rotateX: "2deg", rotateY: "-1deg", scale: 1.03, boxShadow: "0px 15px 30px -10px rgba(0,0,0,0.1)", transition: { duration: 0.3, ease: "easeOut" } }}
  >
    <div className="flex items-center gap-4">
      <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">{icon}</div>
      <h3 className="text-lg font-bold text-amber-900">{title}</h3>
    </div>
    <p className="mt-4 text-gray-700 leading-relaxed text-justify">{children}</p>
  </motion.div>
);

const AnimatedGrid = ({ children, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={gridContainerVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}


const RequirementTable = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={tableVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="overflow-x-auto rounded-xl border border-amber-200 shadow-sm bg-white"
    >
      <table className="min-w-full divide-y divide-amber-100">
        <thead className="bg-amber-50 hidden md:table-header-group">
          <tr>
            <th className="px-6 py-4 text-left text-base font-semibold text-amber-900">
              Phase
            </th>
            <th className="px-6 py-4 text-left text-base font-semibold text-amber-900">
              Key Requirements
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-amber-100">
          {[
            {
              phase: "Context & Leadership",
              desc: "Understanding internal/external issues and ensuring top management commitment.",
            },
            {
              phase: "Planning",
              desc: "Identifying hazards, assessing risks, and setting measurable OH&S objectives.",
            },
            {
              phase: "Support & Operation",
              desc: "Providing necessary resources, ensuring competence, and managing operational controls.",
            },
            {
              phase: "Performance Evaluation",
              desc: "Monitoring, measuring, and analyzing the OHSMS through internal audits.",
            },
            {
              phase: "Improvement",
              desc: "Reacting to nonconformities and taking corrective actions to enhance performance.",
            },
          ].map((item, index) => (
            <tr
              key={index}
              className="hover:bg-amber-50 transition-colors block md:table-row"
            >
              {/* Mobile view */}
              <td className="px-6 py-4 text-base font-bold text-amber-900 block md:table-cell">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                  <span className="truncate">{item.phase}</span>
                </div>
                <p className="mt-2 text-base text-gray-700 leading-relaxed md:hidden">
                  {item.desc}
                </p>
              </td>

              {/* Desktop view */}
              <td className="px-6 py-4 text-base text-gray-700 leading-relaxed hidden md:table-cell">
                {item.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};




export default function ISO45001Certification() {
  const { ref: introRef, inView: introInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <div className="">
        <Image src={image21} alt="Workplace Safety" caption="" />
      </div>
      <div className="flex flex-row gap-4 pb-4"  >
        <aside className="hidden lg:block w-80 sticky top-16 self-start">
          <InnerSidebar />
        </aside>
        <div className="min-h-screen pb-3 mt-[2rem] bg-white antialiased overflow-x-hidden">
          <div className="bg-white shadow-lg rounded-lg border-2 border-amber-100 max-w-7xl mx-auto">
            {/* Header Section */}
            <header className="relative overflow-hidden bg-white text-white p-8 text-center rounded-t-lg">
              <div className="absolute inset-0 "></div>

              <div className="flex justify-center -mt-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={isoIcon}
                    alt="ISO Certification Icon"
                    className="w-24 h-18 sm:w-32 sm:h-24 md:w-40 md:h-30 object-contain"
                  />
                </motion.div>
              </div>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={animationVariants.slideInRight}
                className="text-3xl md:text-5xl font-bold text-amber-800 leading-tight mt-6 relative z-10"
              >
                <BeamUnderline className="text-amber-800" thickness={6}>
                  <span className='bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent uppercase'>

                    ISO 45001:2018
                  </span>
                </BeamUnderline>
              </motion.h1>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={animationVariants.slideInLeft}
                className="mt-4 text-base md:text-lg text-amber-800 max-w-3xl mx-auto relative z-10 leading-relaxed"
              >
                Occupational Health & Safety Management System (OHSMS)
              </motion.p>
            </header>

            {/* Hero Statement */}


            {/* Main Image */}


            <main className="container mx-auto px-4 py-16 space-y-20">
              {/* Section 1: What is ISO 45001:2018 */}
              <section>
                <SectionTitle
                  icon={<Icon path={ICONS.about} />}
                  subtitle="ISO 45001:2018 is the first and only international standard for Occupational Health and Safety Management Systems (OHSMS). It provides a robust framework for organizations to manage risks and prevent work-related injuries and ill health."
                >
                  What is ISO 45001:2018 (OHSMS)?
                </SectionTitle>

                <motion.div
                  ref={introRef}
                  initial="hidden"
                  animate={introInView ? "visible" : "hidden"}
                  variants={animationVariants.paragraph}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-white p-6 md:p-8 rounded-xl border border-amber-200 shadow-sm">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
                      Unlike previous standards, ISO 45001 focuses on the interaction between an organization and its business environment, emphasizing <span className="font-semibold text-amber-900">proactive risk prevention</span> rather than reactive problem-solving. It follows the High-Level Structure (HLS), making it easy to integrate with other standards like ISO 9001 (Quality) and ISO 14001 (Environment).
                    </p>
                  </div>
                </motion.div>
              </section>

              {/* Section 2: Benefits */}
              <section>
                <SectionTitle
                  icon={<Icon path={ICONS.benefits} />}
                  subtitle="Implementing ISO 45001 is a strategic move that pays dividends in both culture and capital."
                >
                  Benefits of the Standard
                </SectionTitle>

                <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InfoCard
                    icon={<Icon path={ICONS.check} />}
                    title="Reduced Workplace Incidents"
                    customVariant={animationVariants.scaleUp}
                  >
                    Minimize the risk of accidents, injuries, and long-term health issues.
                  </InfoCard>
                  <InfoCard
                    icon={<Icon path={ICONS.check} />}
                    title="Lower Insurance Premiums"
                    customVariant={animationVariants.scaleUp}
                  >
                    Demonstrating a commitment to safety often leads to reduced commercial insurance costs.
                  </InfoCard>
                  <InfoCard
                    icon={<Icon path={ICONS.check} />}
                    title="Legal Compliance"
                    customVariant={animationVariants.scaleUp}
                  >
                    Stay ahead of evolving health and safety legislation, avoiding costly fines and litigation.
                  </InfoCard>
                  <InfoCard
                    icon={<Icon path={ICONS.check} />}
                    title="Enhanced Reputation"
                    customVariant={animationVariants.scaleUp}
                  >
                    Position your brand as an ethical employer of choice to clients, investors, and talent.
                  </InfoCard>
                  <InfoCard
                    icon={<Icon path={ICONS.check} />}
                    title="Operational Efficiency"
                    customVariant={animationVariants.scaleUp}
                  >
                    Reduce downtime caused by employee absence and stop-work orders.
                  </InfoCard>
                </AnimatedGrid>
              </section>

              {/* Section 3: Requirements Table */}
              <section>
                <SectionTitle
                  icon={<Icon path={ICONS.how} />}
                  subtitle="Getting certified involves a systematic approach to identifying and mitigating workplace hazards."
                >
                  <span className='text-xl lg:text-3xl md:text-3xl'>

                    Requirements for Implementation & Certification
                  </span>
                </SectionTitle>

                <div className="mt-8">
                  <RequirementTable />
                </div>
              </section>

              {/* Section 4: Why Choose EIMCTA */}
              <section>
                <SectionTitle
                  icon={<Icon path={ICONS.why} />}
                  subtitle="At EIMCTA, we don't just 'check boxes.' We partner with you to build a culture of safety that actually works for your specific industry."
                >
                  Why Should You Select EIMCTA?
                </SectionTitle>

                <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  <InfoCard
                    icon={<Icon path={ICONS.check} />}
                    title="Expert Guidance"
                    customVariant={animationVariants.slideInLeft}
                  >
                    Our consultants bring years of boots-on-the-ground experience across diverse sectors.
                  </InfoCard>
                  <InfoCard
                    icon={<Icon path={ICONS.check} />}
                    title="Tailored Solutions"
                    customVariant={animationVariants.slideInRight}
                  >
                    We skip the "one-size-fits-all" templates, designing a system that fits your unique workflow.
                  </InfoCard>
                  <InfoCard
                    icon={<Icon path={ICONS.check} />}
                    title="End-to-End Support"
                    customVariant={animationVariants.slideInLeft}
                  >
                    From initial gap analysis to the final certification audit, we walk the path with you.
                  </InfoCard>
                  <InfoCard
                    icon={<Icon path={ICONS.check} />}
                    title="Efficiency First"
                    customVariant={animationVariants.slideInRight}
                  >
                    We focus on simplifying documentation, ensuring your team spends more time working safely and less time on paperwork.
                  </InfoCard>
                </AnimatedGrid>
              </section>

              {/* CTA Section */}

            </main>

            {/* Video Section */}
            <div className="px-4 pb-16">
              <VideoPlayer src="https://www.youtube.com/watch?v=kiDe9QhUpDM" title="" />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}