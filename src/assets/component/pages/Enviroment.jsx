import React from "react";
import Image from "../utilities/image";
import img1 from "../../img/banner/6.jpg";
import InnerSidebar from "../utilities/innserSidebar";

// --- SVG Icon Components (Keep existing icons) ---
const FaLeaf = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M576 64a64 64 0 0 0-64-64H64A64 64 0 0 0 0 64v384a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V64zM320 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-160 0c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm224 256H128V288h384v96z"></path>
  </svg>
);
const FaRecycle = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M480 182.21v147.58a23.94 23.94 0 0 1-13.31 21.51l-183.2 105.77a24 24 0 0 1-26.62 0L73.31 351.3a23.94 23.94 0 0 1-13.31-21.51V182.21a23.94 23.94 0 0 1 13.31-21.51l183.2-105.77a24 24 0 0 1 26.62 0l183.2 105.77a23.94 23.94 0 0 1 13.31 21.51z"></path>
  </svg>
);
const FaFlask = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M480 416V256l-64-64V96h-32v96l-64-64V32h-32v96l-64-64V32h-32v96L128 192V96H96v96L32 256v160H0v32h512v-32h-32zM288 320a32 32 0 1 1-64 0 32 32 0 0 1 64 0z"></path>
  </svg>
);
const FaChartLine = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 64h384v32H64V64zm384 64H64v32h384v-32zM64 256h384v32H64v-32zm384 64H64v32h384v-32zM64 416h384v32H64v-32z"></path>
  </svg>
);
const FaShieldAlt = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-41 0l-192 80A48 48 0 0 0 0 127.9v192.2a48 48 0 0 0 45.5 47.8l192 40a48.2 48.2 0 0 0 41 0l192-40A48 48 0 0 0 512 320.1V127.9a48 48 0 0 0-45.5-44.2z"></path>
  </svg>
);
const FaUsers = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M624 208h-64v-64c0-35.3-28.7-64-64-64h-32V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64H80c-35.3 0-64 28.7-64 64v64H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 35.3 28.7 64 64 64h32v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h16c35.3 0 64-28.7 64-64v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z"></path>
  </svg>
);
const FaCheck = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"></path>
  </svg>
);
const FaCertificate = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M480 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm-48 112c-22.09 0-40-17.91-40-40s17.91-40 40-40 40 17.91 40 40-17.91 40-40 40zM96 144c-22.09 0-40-17.91-40-40s17.91-40 40-40 40 17.91 40 40-17.91 40-40 40zm320 272H96V224h320v192z"></path>
  </svg>
);

// Pattern background component
const PatternBackground = () => (
  <div
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: `
        linear-gradient(
          135deg,
          #f59e0b 10%,
          transparent 10%,
          transparent 50%,
          #f59e0b 50%,
          #f59e0b 60%,
          transparent 60%,
          transparent 100%
        )
      `,
      backgroundSize: '20px 20px',
    }}
  ></div>
);


// BeamUnderline Component
const BeamUnderline = ({ 
  children, 
  thickness = 8, 
  className = "" 
}) => {
  const gradientId = React.useMemo(() => `beamGradient${Math.random().toString(36).substr(2, 9)}`, []);

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
          <path 
            d="M 0 10 Q 25 10, 50 4 Q 75 10, 100 10 Q 75 10, 50 16 Q 25 10, 0 10 Z" 
            fill={`url(#${gradientId})`}
          />
          <circle cx="50" cy="10" r="0.6" fill="#fef3c7" opacity="0.8" />
        </svg>
      </span>
    </span>
  );
};

// Main Component
const EnvironmentalServices = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes slideInLeft { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes slideInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes itemVariants { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes paragraph-anim { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes scaleUp { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      @keyframes beamAppear { 0% { opacity: 0; transform: scaleX(0.3); } 100% { opacity: 1; transform: scaleX(1); } }

      .animate-on-scroll { opacity: 0; transition: opacity 0.5s ease-out; }
      .animate-on-scroll.is-visible { opacity: 1; }
      .is-visible .animate-slideInRight { animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .is-visible .animate-slideInLeft { animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .is-visible .animate-itemVariants { animation: itemVariants 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .is-visible .animate-paragraph { animation: paragraph-anim 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards; }
      .is-visible .animate-slideInUp { animation: slideInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .is-visible .beam-underline svg { animation: beamAppear 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards; transform-origin: center center; }

      .card-hover { transition: transform 0.3s ease-out; }
      .card-hover:hover { transform: translateY(-8px) perspective(800px) rotateX(2deg); }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    return () => {
        if (document.head.contains(style)) document.head.removeChild(style);
        elements.forEach(el => observer.unobserve(el));
    }
  }, []);

  return (
    <>
     <Image 
        src={img1} 
        alt='ISO EIA Process Flow'
        className="w-full rounded-lg shadow-md mb-12 border-4 border-amber-100"
      />
     <div className="flex flex-row gap-4" >
           <aside className="hidden lg:block w-80 sticky top-16 self-start">
                  <InnerSidebar />
                </aside>
    <div className="bg-white text-gray-800 px-4 py-8 md:px-8 lg:px-20 max-w-7xl mx-auto font-['Inter',_sans-serif]">
      
      {/* 1. Hero: What is ISO EIA? */}

      <section className="text-center mb-12 relative
       overflow-hidden rounded-xl bg-tranparent
       p-8 md:p-12 animate-on-scroll">
        {/* <PatternBackground /> */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideInRight text-amber-800">
              <span className=" drop-shadow-md bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent uppercase">
                ISO Environmental Impact Assessment (EIA)
              </span>
          </h1>
          <p className="text-lg md:text-xl text-amber-800 bg-transparent
           p-6  max-w-4xl mx-auto leading-relaxed animate-slideInLeft text-justify">
            An ISO-aligned Environmental Impact Assessment is a systematic process used to identify, predict, and evaluate the environmental effects of proposed projects. Guided by international standards like <strong>ISO 14001</strong>, it integrates environmental considerations into the decision-making process to ensure sustainable and compliant project development.
          </p>
        </div>
      </section>
     

      {/* 2. Benefits of this Standard */}
      <section className="mb-16 bg-white rounded-xl p-8 shadow-lg border border-amber-200 animate-on-scroll">
        <h2 className="text-2xl md:text-3xl font-semibold text-amber-900 mb-8 text-center relative pb-4 animate-itemVariants">
          <BeamUnderline thickness={8} className="beam-underline">
            Strategic Benefits of ISO EIA Standards
          </BeamUnderline>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Risk Mitigation", desc: "Identify environmental liabilities early to avoid costly project delays or legal hurdles.", icon: <FaShieldAlt /> },
            { title: "Regulatory Ease", desc: "Streamline permits and approvals by adhering to globally recognized compliance frameworks.", icon: <FaCertificate /> },
            { title: "Resource Efficiency", desc: "Lower operational costs through optimized energy and raw material usage.", icon: <FaRecycle /> },
            { title: "Enhanced Reputation", desc: "Build trust with stakeholders and investors through transparent ESG reporting.", icon: <FaUsers /> },
            { title: "Global Compliance", desc: "Ensure your project meets both local environmental laws and international trade requirements.", icon: <FaLeaf /> },
            { title: "Sustainable Growth", desc: "Balance economic development with environmental stewardship for long-term viability.", icon: <FaChartLine /> }
          ].map((benefit, idx) => (
            <div key={idx} className="p-5 border border-amber-100 rounded-xl bg-amber-50/50 card-hover animate-slideInUp" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="text-amber-600 mb-3 text-2xl">{benefit.icon}</div>
              <h3 className="font-bold text-amber-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Requirements & Implementation */}
      <section className="mb-16 animate-on-scroll">
        <div className="flex items-center mb-8 justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-amber-900 relative pb-4 animate-itemVariants">
            <BeamUnderline thickness={8} className="beam-underline">
              Requirements for Implementation & Certification
            </BeamUnderline>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white p-8 rounded-xl shadow-md border-l-8 border-amber-500 animate-paragraph">
            <h3 className="text-xl font-bold text-amber-800 mb-4 uppercase tracking-wider">Implementation Steps</h3>
            <ul className="space-y-4">
              {[
                "Initial Screening & Project Scoping",
                "Baseline Environmental Study (Air, Water, Soil)",
                "Impact Prediction & Evaluation Modeling",
                "Mitigation Strategy Development",
                "Environmental Management Plan (EMP) Creation"
              ].map((step, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <span className="bg-amber-100 text-amber-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 font-bold text-xs">{i+1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-900 text-white p-8 rounded-xl shadow-md animate-slideInRight">
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-amber-200">Certification Requirements</h3>
            <p className="mb-4 text-amber-100 italic">To achieve ISO-aligned certification, projects must demonstrate:</p>
            <ul className="space-y-3">
              {[
                "Evidence of Stakeholder Consultation",
                "Documentation of Impact Analysis",
                "Adherence to ISO 14001 Audit Criteria",
                "Continuous Monitoring Post-Implementation",
                "Transparent Reporting of Mitigation Results"
              ].map((req, i) => (
                <li key={i} className="flex items-start">
                  <FaCheck className="text-amber-400 mt-1 mr-3 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Why EIMCTA? */}
      <section className="mb-16 bg-white rounded-xl p-8 relative overflow-hidden border border-amber-200 shadow-2xl animate-on-scroll">
        <PatternBackground />
        <div className="relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-amber-900 mb-10 relative pb-4 animate-itemVariants">
            <BeamUnderline thickness={8} className="beam-underline">
              Why Choose EIMCTA for Your EIA?
            </BeamUnderline>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Expert Calibrated Tools", text: "We use high-precision, ISO-calibrated monitoring equipment for 100% accurate data." },
              { title: "Industry Specialists", text: "Our team consists of certified environmental scientists and ISO Lead Auditors." },
              { title: "Bespoke Solutions", text: "Custom EIA frameworks designed specifically for your industry and region." },
              { title: "End-to-End Support", text: "From initial screening to final certification, we handle every technical detail." }
            ].map((item, i) => (
              <div key={i} className="bg-amber-50 p-6 rounded-lg border border-amber-100 animate-slideInUp" style={{animationDelay: `${i * 0.15}s`}}>
                <h4 className="font-bold text-amber-800 mb-2">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-4 bg-amber-100 rounded-lg inline-block border-2 border-dashed border-amber-400">
            <p className="text-amber-900 font-medium">
              EIMCTA: Precision in Assessment, Integrity in Compliance.
            </p>
          </div>
        </div>
      </section>
    </div>
    </div>
    </>
  );
};

export default EnvironmentalServices;