// import React, { useState, useMemo, useEffect, useRef } from "react";
// import { 
//   Search, Filter, AlertTriangle, Flame, Shield, Eye, Ear, Hand, 
//   HardHat, Zap, Thermometer, Magnet, AlertCircle, ChevronDown,
//   ShieldCheck, Ban, ArrowRight, CheckCircle, Info, X, AlertOctagon,
  
//   ParkingCircle, RadioTower, Siren, WifiOff, Waves, TriangleAlert
// } from "lucide-react";

// // Custom Scrollbar Styles
// const customScrollbarStyles = `
//   .custom-scrollbar::-webkit-scrollbar {
//     width: 8px;
//     height: 8px;
//   }
//   .custom-scrollbar::-webkit-scrollbar-track {
//     background: rgba(251, 191, 36, 0.1);
//     border-radius: 10px;
//   }
//   .custom-scrollbar::-webkit-scrollbar-thumb {
//     background: linear-gradient(135deg, #f59e0b, #d97706);
//     border-radius: 10px;
//   }
//   .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//     background: linear-gradient(135deg, #d97706, #b45309);
//   }
// `;

// // Dynamic image imports
// const importFireSafetyImages = () => {
//   const modules = import.meta.glob('../../img/FIRESAFETYSIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
//   const images = {};
//   for (const path in modules) {
//     const fileName = path.split('/').pop();
//     const cleanName = fileName.replace(/\s+/g, ' ').trim();
//     images[cleanName] = modules[path].default;
//   }
//   return images;
// };

// const importWarningImages = () => {
//   const modules = import.meta.glob('../../img/WARNING SIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
//   const images = {};
//   for (const path in modules) {
//     const fileName = path.split('/').pop();
//     const cleanName = fileName.replace(/\s+/g, ' ').trim();
//     images[cleanName] = modules[path].default;
//   }
//   return images;
// };

// const importProhibitionImages = () => {
//   const modules = import.meta.glob('../../img/PROHIBITION SIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
//   const images = {};
//   for (const path in modules) {
//     const fileName = path.split('/').pop();
//     const cleanName = fileName.replace(/\s+/g, ' ').trim();
//     images[cleanName] = modules[path].default;
//   }
//   return images;
// };

// const importMandatoryImages = () => {
//   const modules = import.meta.glob('../../img/MANDATORY SIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
//   const images = {};
//   for (const path in modules) {
//     const fileName = path.split('/').pop();
//     const cleanName = fileName.replace(/\s+/g, ' ').trim();
//     images[cleanName] = modules[path].default;
//   }
//   return images;
// };

// const importSafeConditionImages = () => {
//   const modules = import.meta.glob('../../img/SAFECONDITIONEMERGENCYSIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
//   const images = {};
//   for (const path in modules) {
//     const fileName = path.split('/').pop();
//     const cleanName = fileName.replace(/\s+/g, ' ').trim();
//     images[cleanName] = modules[path].default;
//   }
//   return images;
// };

// // Animation Component
// const AnimateOnScroll = ({ children, delay = 0, className = "" }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setTimeout(() => setIsVisible(true), delay * 1000);
//           observer.unobserve(entry.target);
//         }
//       },
//       { threshold: 0.1, rootMargin: "50px" }
//     );

//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [delay]);

//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-700 ease-out ${
//         isVisible
//           ? "opacity-100 translate-y-0"
//           : "opacity-0 translate-y-10"
//       } ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// // Color Grid Component
// const ColorGrid = ({ colors }) => (
//   <div className="flex items-center gap-1.5">
//     {colors.map((color, index) => (
//       <div
//         key={index}
//         className="w-5 h-5 rounded-full border border-gray-300"
//         style={{ backgroundColor: color }}
//         title={color}
//       />
//     ))}
//   </div>
// );

// // Note Component
// const Note = ({ children, type = "info" }) => {
//   const config = {
//     info: { bg: "bg-blue-50", border: "border-blue-200", icon: <Info className="w-4 h-4 text-blue-600" /> },
//     warning: { bg: "bg-amber-50", border: "border-amber-200", icon: <AlertTriangle className="w-4 h-4 text-amber-600" /> },
//     success: { bg: "bg-emerald-50", border: "border-emerald-200", icon: <CheckCircle className="w-4 h-4 text-emerald-600" /> }
//   }[type];

//   return (
//     <div className={`rounded-lg ${config.bg} border ${config.border} p-3 flex items-start gap-2`}>
//       <div className="mt-0.5">{config.icon}</div>
//       <p className="text-sm text-gray-700 flex-1">{children}</p>
//     </div>
//   );
// };

// const categoryMeta = {
//   "Fire Safety": {
//     icon: <Flame className="w-5 h-5" />,
//     gradient: "from-red-500 to-orange-500",
//     lightGradient: "from-red-50 to-orange-50",
//     border: "border-red-200",
//     color: "text-red-700",
//     description: "Fire safety signs indicate locations of fire fighting equipment and escape routes"
//   },
//   "Warning": {
//     icon: <AlertTriangle className="w-5 h-5" />,
//     gradient: "from-amber-500 to-yellow-500",
//     lightGradient: "from-amber-50 to-yellow-50",
//     border: "border-amber-200",
//     color: "text-amber-700",
//     description: "Warning signs alert to potential hazards that could cause injury"
//   },
//   "Prohibition": {
//     icon: <Ban className="w-5 h-5" />,
//     gradient: "from-rose-500 to-pink-500",
//     lightGradient: "from-rose-50 to-pink-50",
//     border: "border-rose-200",
//     color: "text-rose-700",
//     description: "Prohibition signs indicate actions or behaviors that are not allowed"
//   },
//   "Mandatory": {
//     icon: <ShieldCheck className="w-5 h-5" />,
//     gradient: "from-blue-500 to-cyan-500",
//     lightGradient: "from-blue-50 to-cyan-50",
//     border: "border-blue-200",
//     color: "text-blue-700",
//     description: "Mandatory signs specify actions that must be taken for safety"
//   },
//   "Safe Condition": {
//     icon: <CheckCircle className="w-5 h-5" />,
//     gradient: "from-emerald-500 to-green-500",
//     lightGradient: "from-emerald-50 to-green-50",
//     border: "border-emerald-200",
//     color: "text-emerald-700",
//     description: "Safe condition signs show locations of safety equipment and escape routes"
//   },
// };

// const safetyStandards = [
//   "ISO 7010:2011",
//   "ANSI Z535",
//   "OSHA 1910.145",
//   "BS 5499"
// ];

// const SafetySignPPE = () => {
//   const [query, setQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [images, setImages] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadImages = async () => {
//       try {
//         const [
//           fireSafety,
//           warning,
//           prohibition,
//           mandatory,
//           safeCondition
//         ] = await Promise.all([
//           importFireSafetyImages(),
//           importWarningImages(),
//           importProhibitionImages(),
//           importMandatoryImages(),
//           importSafeConditionImages()
//         ]);
        
//         setImages({ fireSafety, warning, prohibition, mandatory, safeCondition });
//       } catch (error) {
//         console.error('Error loading images:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     loadImages();
//   }, []);

//   const safetySigns = useMemo(() => {
//     if (!images.fireSafety) return [];

//     return [
//       // Fire Safety Signs
//       {
//         category: "Fire Safety",
//         name: "Fire Extinguisher",
//         img: images.fireSafety?.['iso Fire Extinguisher.png'],
//         code: "F001",
//         color: ["#FF0000", "#FFFFFF"],
//         colorNames: "Red / White",
//         shape: "Square",
//         meaning: "Location of portable fire extinguisher equipment for initial fire fighting",
//         usage: "Indicates exact location where fire extinguishers are stored or mounted",
//         size_mm: ["100x100", "150x150", "200x200", "300x300"],
//         position: "Mounted at eye level (1.5-2m) above floor, near potential fire hazards",
//         notes: "Minimum visibility distance: 15m, Must be illuminated in low-light conditions"
//       },
//       {
//         category: "Fire Safety",
//         name: "Fire Hose Reel",
//         img: images.fireSafety?.['iso Fire Hose Reel.png'],
//         code: "F002",
//         color: ["#FF0000", "#FFFFFF"],
//         colorNames: "Red / White",
//         shape: "Square",
//         meaning: "Fixed fire fighting equipment location with pressurized water supply",
//         usage: "Identifies fire hose cabinets or reels for building fire suppression",
//         size_mm: ["150x150", "200x200", "300x300", "450x450"],
//         position: "Adjacent to hose cabinets, 1.5m above floor, unobstructed access",
//         notes: "Requires 1m clearance radius, Must indicate operating instructions nearby"
//       },

//       // Mandatory Signs
//       {
//         category: "Mandatory",
//         name: "Wear Eye Protection",
//         img: images.mandatory?.['iso Wear Eye Protection.png'],
//         code: "M001",
//         color: ["#0055FF", "#FFFFFF"],
//         colorNames: "Blue / White",
//         shape: "Circle",
//         meaning: "Mandatory requirement to wear approved eye protection equipment",
//         usage: "Required in areas with flying particles, chemicals, or optical radiation",
//         size_mm: ["100x100", "150x150", "200x200"],
//         position: "Entrances to labs, workshops, construction sites, at eye level",
//         notes: "Applicable PPE: Safety glasses, goggles, or face shields as per hazard"
//       },
//       {
//         category: "Mandatory",
//         name: "Wear Hearing Protection",
//         img: images.mandatory?.['iso Wear Hearing Protection.png'],
//         code: "M002",
//         color: ["#0055FF", "#FFFFFF"],
//         colorNames: "Blue / White",
//         shape: "Circle",
//         meaning: "Mandatory use of hearing protection devices",
//         usage: "Required where noise levels exceed 85 dB(A) for 8-hour exposure",
//         size_mm: ["150x150", "200x200", "250x250"],
//         position: "Entrances to noisy areas, near machinery, at decision points",
//         notes: "NRR rating must be appropriate for noise level, Regular hearing tests required"
//       },

//       // Prohibition Signs
//       {
//         category: "Prohibition",
//         name: "No Smoking",
//         img: images.prohibition?.['ISOSmoking.png'],
//         code: "P009",
//         color: ["#FF0000", "#FFFFFF", "#000000"],
//         colorNames: "Red / White / Black",
//         shape: "Circle with diagonal bar",
//         meaning: "Smoking and open flames strictly prohibited",
//         usage: "Prevents ignition sources in flammable/explosive atmospheres",
//         size_mm: ["200x200", "300x300", "400x400"],
//         position: "Entrances to flammable storage, fuel stations, hospitals",
//         notes: "Must be placed within 3m of hazard boundary, Illuminated at night"
//       },
//       {
//         category: "Prohibition",
//         name: "No Entry",
//         img: images.prohibition?.['iso No Entry.png'],
//         code: "P006",
//         color: ["#FF0000", "#FFFFFF", "#000000"],
//         colorNames: "Red / White / Black",
//         shape: "Circle",
//         meaning: "Unauthorized personnel entry strictly prohibited",
//         usage: "Restricts access to hazardous or controlled areas",
//         size_mm: ["300x300", "400x400", "600x600"],
//         position: "Doors, gates, barriers of restricted zones",
//         notes: "Often accompanied by physical barriers, Required training for authorized personnel"
//       },

//       // Warning Signs
//       {
//         category: "Warning",
//         name: "High Voltage",
//         img: images.warning?.['iso High Voltage.png'],
//         code: "W004",
//         color: ["#FFCC00", "#000000"],
//         colorNames: "Yellow / Black",
//         shape: "Equilateral triangle",
//         meaning: "Dangerous high voltage electrical equipment present",
//         usage: "Warns of electrical shock hazard exceeding 50V AC or 120V DC",
//         size_mm: ["200x200", "300x300", "400x400"],
//         position: "Electrical panels, transformers, substations, switch rooms",
//         notes: "Minimum approach distances apply, Required arc flash PPE in some cases"
//       },
//       {
//         category: "Warning",
//         name: "Slippery Floor",
//         img: images.warning?.['iso Slippery Floor.png'],
//         code: "W008",
//         color: ["#FFCC00", "#000000"],
//         colorNames: "Yellow / Black",
//         shape: "Equilateral triangle",
//         meaning: "Slippery surface conditions present",
//         usage: "Alerts to slip and fall hazards from wet, oily, or polished surfaces",
//         size_mm: ["200x200", "300x300", "400x400"],
//         position: "Entrances to wet areas, kitchens, pools, during cleaning",
//         notes: "Use appropriate footwear (slip-resistant), Clean spills immediately"
//       },

//       // Safe Condition Signs
//       {
//         category: "Safe Condition",
//         name: "Emergency Exit",
//         img: images.safeCondition?.['iso Emergency Exit.png'],
//         code: "S002",
//         color: ["#00AA00", "#FFFFFF"],
//         colorNames: "Green / White",
//         shape: "Rectangle",
//         meaning: "Designated emergency escape route and exit",
//         usage: "Shows direction to nearest safe exit during emergencies",
//         size_mm: ["150x300", "200x400", "300x600"],
//         position: "Above exit doors, along escape routes, at decision points",
//         notes: "Must be photoluminescent, Continuous visibility path required"
//       },
//       {
//         category: "Safe Condition",
//         name: "First Aid",
//         img: images.safeCondition?.['iso First Aid.png'],
//         code: "S005",
//         color: ["#00AA00", "#FFFFFF"],
//         colorNames: "Green / White",
//         shape: "Square",
//         meaning: "Location of first aid equipment and facilities",
//         usage: "Indicates availability of medical assistance and supplies",
//         size_mm: ["150x150", "200x200", "250x250"],
//         position: "First aid rooms, kits, stations, near high-risk areas",
//         notes: "Must list contents, Regular inventory checks required, Trained personnel needed"
//       }
//     ];
//   }, [images]);

//   const categories = useMemo(() => {
//     const unique = Array.from(new Set(safetySigns.map((s) => s.category)));
//     return ["All", ...unique];
//   }, [safetySigns]);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return safetySigns.filter((s) => {
//       const matchCategory = activeCategory === "All" || s.category === activeCategory;
//       const matchQuery =
//         !q ||
//         s.name.toLowerCase().includes(q) ||
//         s.code.toLowerCase().includes(q) ||
//         s.meaning.toLowerCase().includes(q) ||
//         s.usage.toLowerCase().includes(q);
//       return matchCategory && matchQuery;
//     });
//   }, [query, activeCategory, safetySigns]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white  flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <div className="text-amber-700 font-medium">Loading safety signs...</div>
//           <div className="text-sm text-amber-600 mt-2">Preparing comprehensive safety database</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{customScrollbarStyles}</style>
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 px-4 py-8 md:px-6 md:py-12 font-sans">
//         <div className="mx-auto w-full max-w-7xl custom-scrollbar">
//           {/* Header */}
//           <AnimateOnScroll>
//             <div className="mb-10">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
//                   <Shield className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
//                     Safety Signs Library
//                   </h1>
//                   <p className="text-amber-600 mt-1">Comprehensive ISO safety signage database</p>
//                 </div>
//               </div>

//               {/* Search and Filter */}
//               <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 mb-6">
//                 <div className="flex flex-col lg:flex-row gap-4">
//                   <div className="flex-1">
//                     <div className="relative">
//                       <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
//                       <input
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         placeholder="Search signs by name, code, meaning, or usage..."
//                         className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 bg-white text-gray-800 placeholder-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="flex gap-2 overflow-x-auto pb-2">
//                     {categories.map((category) => {
//                       const meta = categoryMeta[category] || { 
//                         icon: <Filter className="w-5 h-5" />,
//                         lightGradient: "from-gray-50 to-gray-50",
//                         border: "border-gray-200",
//                         color: "text-gray-700"
//                       };
//                       return (
//                         <button
//                           key={category}
//                           onClick={() => setActiveCategory(category)}
//                           className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all whitespace-nowrap ${
//                             activeCategory === category
//                               ? `bg-gradient-to-r ${meta.lightGradient} ${meta.border} ${meta.color} font-semibold shadow-sm`
//                               : "bg-white border-amber-200 text-gray-700 hover:bg-amber-50"
//                           }`}
//                         >
//                           <span className="flex items-center gap-2">
//                             {meta.icon}
//                             {category}
//                           </span>
//                           {activeCategory === category && (
//                             <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-amber-100">
//                   <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200">
//                     <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
//                     <span className="text-sm font-medium text-amber-800">
//                       Total: <span className="font-bold">{safetySigns.length}</span> signs
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-200">
//                     <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
//                     <span className="text-sm font-medium text-blue-800">
//                       Showing: <span className="font-bold">{filtered.length}</span>
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200">
//                     <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
//                     <span className="text-sm font-medium text-emerald-800">
//                       Categories: <span className="font-bold">{categories.length - 1}</span>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Standards Badges */}
//               <div className="flex flex-wrap gap-2 mb-6">
//                 <span className="text-sm font-medium text-gray-600">Compliance:</span>
//                 {safetyStandards.map((std) => (
//                   <span
//                     key={std}
//                     className="px-3 py-1.5 bg-white border border-amber-200 rounded-full text-xs font-medium text-amber-700"
//                   >
//                     {std}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </AnimateOnScroll>

//           {/* Results Grid */}
//           {filtered.length === 0 ? (
//             <AnimateOnScroll>
//               <div className="bg-white rounded-2xl p-12 text-center border-2 border-amber-200 shadow-lg">
//                 <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center border-2 border-amber-300">
//                   <AlertCircle className="w-10 h-10 text-amber-400" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">No matching signs found</h3>
//                 <p className="text-gray-600 max-w-md mx-auto">
//                   Try adjusting your search or select a different category. Ensure spelling is correct.
//                 </p>
//               </div>
//             </AnimateOnScroll>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filtered.map((sign, i) => {
//                 const meta = categoryMeta[sign.category];
//                 const isExpanded = expandedCard === sign.code;

//                 return (
//                   <AnimateOnScroll key={sign.code} delay={i * 0.05}>
//                     <div className={`bg-white rounded-2xl border-2 ${meta.border} p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
//                       isExpanded ? "ring-2 ring-amber-300" : ""
//                     }`}>
//                       {/* Header */}
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-center gap-2">
//                           <div className={`p-2 rounded-lg bg-gradient-to-r ${meta.lightGradient}`}>
//                             {meta.icon}
//                           </div>
//                           <div>
//                             <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
//                               {sign.category}
//                             </div>
//                             <div className="text-lg font-bold text-gray-900">{sign.code}</div>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => setExpandedCard(isExpanded ? null : sign.code)}
//                           className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                           <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
//                             isExpanded ? "rotate-180" : ""
//                           }`} />
//                         </button>
//                       </div>

//                       {/* Sign Image */}
//                       <div className="mb-4 flex justify-center">
//                         <div className="relative w-48 h-48 flex items-center justify-center">
//                           <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-amber-50 rounded-xl border border-amber-100"></div>
//                           {sign.img ? (
//                             <img
//                               src={sign.img}
//                               alt={sign.name}
//                               className="relative w-40 h-40 object-contain z-10 hover:scale-105 transition-transform duration-300"
//                               onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = `https://via.placeholder.com/160x160/fff8e1/f59e0b?text=${encodeURIComponent(sign.name)}`;
//                               }}
//                             />
//                           ) : (
//                             <div className="relative w-40 h-40 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-200">
//                               <span className="text-center text-sm font-medium text-amber-700 px-2">
//                                 {sign.name}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Sign Name */}
//                       <h3 className="text-xl font-bold text-gray-900 mb-3 text-center line-clamp-2">
//                         {sign.name}
//                       </h3>

//                       {/* Color and Shape Info */}
//                       <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-150">
//                         <div className="flex-1">
//                           <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">Colors</div>
//                           <ColorGrid colors={sign.color} />
//                         </div>
//                         <div className="flex-1">
//                           <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">Shape</div>
//                           <div className="text-sm font-medium text-gray-900">{sign.shape}</div>
//                         </div>
//                       </div>

//                       {/* Meaning Info */}
//                       <div className="mb-4 p-3 bg-white rounded-lg border border-amber-100">
//                         <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
//                           📋 Meaning
//                         </div>
//                         <p className="text-sm text-gray-700 leading-relaxed">
//                           {sign.meaning}
//                         </p>
//                       </div>

//                       {/* Expandable Details */}
//                       {isExpanded && (
//                         <div className="mt-4 pt-4 border-t border-gray-200 space-y-4 animate-fadeIn">
//                           <Note type="info">{sign.notes}</Note>
                          
//                           <div>
//                             <div className="flex items-center gap-2 mb-2">
//                               <Zap className="w-4 h-4 text-amber-600" />
//                               <span className="text-sm font-semibold text-gray-700">Usage Guidelines</span>
//                             </div>
//                             <p className="text-sm text-gray-600">{sign.usage}</p>
//                           </div>

//                           <div>
//                             <div className="flex items-center gap-2 mb-2">
//                               <Eye className="w-4 h-4 text-blue-600" />
//                               <span className="text-sm font-semibold text-gray-700">Position & Placement</span>
//                             </div>
//                             <p className="text-sm text-gray-600">{sign.position}</p>
//                           </div>

//                           <div>
//                             <div className="flex items-center gap-2 mb-2">
//                               <TriangleAlert className="w-4 h-4 text-amber-600" />
//                               <span className="text-sm font-semibold text-gray-700">Available Sizes (mm)</span>
//                             </div>
//                             <div className="flex flex-wrap gap-2">
//                               {sign.size_mm.map((size, idx) => (
//                                 <span
//                                   key={idx}
//                                   className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg text-xs font-medium text-amber-800 border border-amber-200"
//                                 >
//                                   {size}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       {/* Footer */}
//                       <div className="mt-4 pt-4 border-t border-gray-100">
//                         <div className="flex items-center justify-between">
//                           <div className="text-xs text-gray-500">
//                             ISO Compliant
//                           </div>
//                           <button
//                             onClick={() => setExpandedCard(isExpanded ? null : sign.code)}
//                             className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
//                           >
//                             {isExpanded ? "Show Less" : "More Details"}
//                             <ChevronDown className={`w-4 h-4 transition-transform ${
//                               isExpanded ? "rotate-180" : ""
//                             }`} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </AnimateOnScroll>
//                 );
//               })}
//             </div>
//           )}

//           {/* Footer Notes */}
//           <AnimateOnScroll className="mt-12">
//             <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-lg">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <Note type="warning">
//                   All safety signs must be properly illuminated or photoluminescent for visibility in low-light conditions. Regular inspection and maintenance are required.
//                 </Note>
//                 <Note type="success">
//                   Proper implementation of safety signage reduces workplace accidents by up to 80%. Ensure all employees receive training on sign meanings and protocols.
//                 </Note>
//               </div>
              
//               <div className="mt-6 pt-6 border-t border-amber-100 text-center">
//                 <p className="text-sm text-gray-600">
//                   © {new Date().getFullYear()} Safety Signs Library • Compliant with international safety standards
//                 </p>
//               </div>
//             </div>
//           </AnimateOnScroll>
//         </div>
//       </div>

//       {/* Custom Scrollbar Animation */}
//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//         ::-webkit-scrollbar {
//           width: 10px;
//           height: 10px;
//         }
//         ::-webkit-scrollbar-track {
//           background: rgba(251, 191, 36, 0.1);
//           border-radius: 10px;
//         }
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(135deg, #f59e0b, #d97706);
//           border-radius: 10px;
//           border: 2px solid rgba(251, 191, 36, 0.1);
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(135deg, #d97706, #b45309);
//         }
//       `}</style>
//     </>
//   );
// };

// export default SafetySignPPE;
// updte: instead expand when click with view more ,open modal and show ,
// safetySigns doont left even single objects ,
// remove color section ,
// consistent in design 