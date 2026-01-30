import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Search, Filter, AlertTriangle, Flame, Shield, Eye, Ear, Hand, 
  HardHat, Zap, Thermometer, Magnet, AlertCircle, ChevronDown,
  ShieldCheck, Ban, ArrowRight, CheckCircle, Info, X, AlertOctagon,
  Maximize2, Ruler, MapPin, BookOpen
} from "lucide-react";

// Custom Scrollbar Styles
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(251, 191, 36, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #d97706, #b45309);
  }
  
  /* Modal Animation */
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .modal-animate {
    animation: modalIn 0.2s ease-out forwards;
  }
`;

// --- Dynamic Image Imports (Kept exactly as requested) ---
const importFireSafetyImages = () => {
  const modules = import.meta.glob('../../img/FIRESAFETYSIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
  const images = {};
  for (const path in modules) {
    const fileName = path.split('/').pop();
    const cleanName = fileName.replace(/\s+/g, ' ').trim();
    images[cleanName] = modules[path].default;
  }
  return images;
};

const importWarningImages = () => {
  const modules = import.meta.glob('../../img/WARNING SIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
  const images = {};
  for (const path in modules) {
    const fileName = path.split('/').pop();
    const cleanName = fileName.replace(/\s+/g, ' ').trim();
    images[cleanName] = modules[path].default;
  }
  return images;
};

const importProhibitionImages = () => {
  const modules = import.meta.glob('../../img/PROHIBITION SIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
  const images = {};
  for (const path in modules) {
    const fileName = path.split('/').pop();
    const cleanName = fileName.replace(/\s+/g, ' ').trim();
    images[cleanName] = modules[path].default;
  }
  return images;
};

const importMandatoryImages = () => {
  const modules = import.meta.glob('../../img/MANDATORY SIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
  const images = {};
  for (const path in modules) {
    const fileName = path.split('/').pop();
    const cleanName = fileName.replace(/\s+/g, ' ').trim();
    images[cleanName] = modules[path].default;
  }
  return images;
};

const importSafeConditionImages = () => {
  const modules = import.meta.glob('../../img/SAFECONDITIONEMERGENCYSIGNS/*.{png,jpg,jpeg,svg,gif}', { eager: true });
  const images = {};
  for (const path in modules) {
    const fileName = path.split('/').pop();
    const cleanName = fileName.replace(/\s+/g, ' ').trim();
    images[cleanName] = modules[path].default;
  }
  return images;
};

// --- Animation Component ---
const AnimateOnScroll = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Metadata Configuration ---
const categoryMeta = {
  "Fire Safety": {
    icon: <Flame className="w-5 h-5" />,
    gradient: "from-red-500 to-orange-500",
    lightGradient: "from-red-50 to-orange-50",
    border: "border-red-200",
    bgHover: "hover:shadow-red-100",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    color: "text-red-700",
  },
  "Warning": {
    icon: <AlertTriangle className="w-5 h-5" />,
    gradient: "from-amber-500 to-yellow-500",
    lightGradient: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
    bgHover: "hover:shadow-amber-100",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    color: "text-amber-700",
  },
  "Prohibition": {
    icon: <Ban className="w-5 h-5" />,
    gradient: "from-rose-500 to-pink-500",
    lightGradient: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    bgHover: "hover:shadow-rose-100",
    badgeColor: "bg-rose-100 text-rose-700 border-rose-200",
    color: "text-rose-700",
  },
  "Mandatory": {
    icon: <ShieldCheck className="w-5 h-5" />,
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    border: "border-blue-200",
    bgHover: "hover:shadow-blue-100",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    color: "text-blue-700",
  },
  "Safe Condition": {
    icon: <CheckCircle className="w-5 h-5" />,
    gradient: "from-emerald-500 to-green-500",
    lightGradient: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
    bgHover: "hover:shadow-emerald-100",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    color: "text-emerald-700",
  },
};

const safetyStandards = [
  "ISO 7010:2011",
  "ANSI Z535",
  "OSHA 1910.145",
  "BS 5499"
];

// --- Modal Component ---
const SignDetailModal = ({ sign, onClose, meta }) => {
  if (!sign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl modal-animate flex flex-col max-h-[90vh] overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between bg-gradient-to-r ${meta.lightGradient}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm ${meta.color}`}>
              {meta.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{sign.name}</h2>
              <p className={`text-sm font-medium ${meta.color}`}>{sign.category} • {sign.code}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 custom-scrollbar">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left: Image & Specs */}
            <div className="md:w-1/3 flex flex-col gap-4">
              <div className="aspect-square rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center p-6 relative overflow-hidden group">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${meta.gradient}`} />
                {sign.img ? (
                  <img
                    src={sign.img}
                    alt={sign.name}
                    className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(sign.name)}`;
                    }}
                  />
                ) : (
                   <span className="text-gray-400 font-medium">No Image</span>
                )}
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Shape</div>
                  <div className="font-medium text-gray-900">{sign.shape}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                   <div className="flex items-center gap-2 mb-2">
                      <Ruler className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Available Sizes</span>
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {sign.size_mm.map((size, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white rounded border border-gray-200 text-xs text-gray-600 shadow-sm">
                          {size}mm
                        </span>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="md:w-2/3 space-y-6">
              
              {/* Meaning Section */}
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  Meaning & Application
                </h3>
                <p className="text-gray-600 leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                  {sign.meaning}
                </p>
              </div>

              {/* Usage & Position Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <h4 className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Usage Guidelines
                   </h4>
                   <p className="text-sm text-gray-600">{sign.usage}</p>
                </div>
                <div className="space-y-2">
                   <h4 className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      Placement
                   </h4>
                   <p className="text-sm text-gray-600">{sign.position}</p>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                 <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                 <div>
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Technical Note</h4>
                    <p className="text-sm text-blue-800">{sign.notes}</p>
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const SafetySignPPE = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSign, setSelectedSign] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const [
          fireSafety,
          warning,
          prohibition,
          mandatory,
          safeCondition
        ] = await Promise.all([
          importFireSafetyImages(),
          importWarningImages(),
          importProhibitionImages(),
          importMandatoryImages(),
          importSafeConditionImages()
        ]);
        
        setImages({ fireSafety, warning, prohibition, mandatory, safeCondition });
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImages();
  }, []);

  const safetySigns = useMemo(() => {
    if (!images.fireSafety) return [];

    return [
      // =========================
      // FIRE SAFETY SIGNS (2)
      // =========================
      {
        category: "Fire Safety",
        name: "Fire Extinguisher",
        img: images.fireSafety?.["iso Fire Extinguisher.png"],
        code: "F001",
        color: ["#FF0000", "#FFFFFF"],
        colorNames: "Red / White",
        shape: "Square",
        meaning: "Fire extinguisher (ISO 7010).",
        usage: "To indicate the location of a fire extinguisher.",
        size_mm: ["100x100", "150x150", "200x200", "300x300"],
        position: "Place above/near the extinguisher so it is visible from approach routes and not obstructed.",
        notes: "Use standard ISO safety colour/shape conventions; keep clean and clearly visible."
      },
      {
        category: "Fire Safety",
        name: "Fire Hose Reel",
        img: images.fireSafety?.["iso Fire Hose Reel.png"],
        code: "F002",
        color: ["#FF0000", "#FFFFFF"],
        colorNames: "Red / White",
        shape: "Square",
        meaning: "Fire hose reel (ISO 7010).",
        usage: "To indicate the location of a fire hose reel / fire hose equipment.",
        size_mm: ["150x150", "200x200", "300x300", "450x450"],
        position: "Place above/near the hose reel cabinet so it is visible from approach routes and not obstructed.",
        notes: "Maintain clear access; keep sign legible and well-lit where required."
      },

      // =========================
      // MANDATORY SIGNS (5)
      // =========================
      {
        category: "Mandatory",
        name: "Wear Eye Protection",
        img: images.mandatory?.["iso Wear Eye Protection.png"],
        code: "M004",
        color: ["#0055FF", "#FFFFFF"],
        colorNames: "Blue / White",
        shape: "Circle",
        meaning: "Wear eye protection (ISO 7010).",
        usage: "Used where eye protection is required due to hazards (particles, chemicals, radiation, etc.).",
        size_mm: ["100x100", "150x150", "200x200"],
        position: "Place at entrances to the hazard area and at points where the requirement starts.",
        notes: "Ensure PPE requirement is enforceable; keep sign visible at decision points."
      },
      {
        category: "Mandatory",
        name: "Wear Hearing Protection",
        img: images.mandatory?.["iso Wear Hearing Protection.png"],
        code: "M003",
        color: ["#0055FF", "#FFFFFF"],
        colorNames: "Blue / White",
        shape: "Circle",
        meaning: "Wear hearing protection (ISO 7010).",
        usage: "Used where hearing protection is required due to high noise levels.",
        size_mm: ["150x150", "200x200", "250x250"],
        position: "Place before entering noisy zones and near noisy equipment access points.",
        notes: "Use with workplace noise controls; keep sign where people decide to enter."
      },
      {
        category: "Mandatory",
        name: "Wear Safety Gloves",
        img: images.mandatory?.["iso Wear Safety Gloves.png"],
        code: "M009",
        color: ["#0055FF", "#FFFFFF"],
        colorNames: "Blue / White",
        shape: "Circle",
        meaning: "Wear protective gloves (ISO 7010).",
        usage: "Used where hands must be protected from cuts, chemicals, heat, abrasion, etc.",
        size_mm: ["100x100", "150x150", "200x200"],
        position: "Place at entrances to glove-required areas and near task stations.",
        notes: "Specify glove type in SOPs where needed; keep sign at decision points."
      },
      {
        category: "Mandatory",
        name: "Wear Safety Harness",
        img: images.mandatory?.["iso Wear Safety Harness.png"],
        code: "M018",
        color: ["#0055FF", "#FFFFFF"],
        colorNames: "Blue / White",
        shape: "Circle",
        meaning: "Wear a safety harness (ISO 7010).",
        usage: "Used where fall protection is mandatory (work at height, edges, platforms, etc.).",
        size_mm: ["150x150", "200x200", "250x250"],
        position: "Place at access points to elevated work areas and before fall-risk zones.",
        notes: "Harness use must be supported by anchor points and rescue plan where required."
      },
      {
        category: "Mandatory",
        name: "Wear Safety Helmet",
        img: images.mandatory?.["iso Wear Safety Helmet.png"],
        code: "M014",
        color: ["#0055FF", "#FFFFFF"],
        colorNames: "Blue / White",
        shape: "Circle",
        meaning: "Wear a safety helmet (ISO 7010).",
        usage: "Used where head protection is required due to falling objects or head-impact risk.",
        size_mm: ["150x150", "200x200", "250x250"],
        position: "Place at entrances to construction/industrial zones and overhead-risk areas.",
        notes: "Keep sign visible before entry; helmet type depends on site hazards."
      },

      // =========================
      // PROHIBITION SIGNS (9)
      // =========================
      {
        category: "Prohibition",
        name: "Do Not Touch",
        img: images.prohibition?.["iso do not touch.png"],
        code: "P010",
        color: ["#FF0000", "#FFFFFF", "#000000"],
        colorNames: "Red / White / Black",
        shape: "Circle with diagonal bar",
        meaning: "Do not touch (ISO 7010).",
        usage: "Used where touching could cause injury, damage, contamination, or electrical hazard.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place directly on/near the object and before people can reach it.",
        notes: "Use with guarding/interlocks where needed; keep sign unobstructed."
      },
      {
        category: "Prohibition",
        name: "No Eating or Drinking",
        img: images.prohibition?.["iso No Eating or Drinking.png"],
        code: "P022",
        color: ["#FF0000", "#FFFFFF", "#000000"],
        colorNames: "Red / White / Black",
        shape: "Circle with diagonal bar",
        meaning: "No eating or drinking (ISO 7010).",
        usage: "Used in labs, chemical areas, clean zones, contamination-control areas.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place at entrances and inside areas where the restriction applies.",
        notes: "Pair with hygiene/contamination procedures where relevant."
      },
      {
        category: "Prohibition",
        name: "No Parking",
        img: images.prohibition?.["iso No Parking.png"],
        code: "P001",
        color: ["#FF0000", "#FFFFFF", "#000000"],
        colorNames: "Red / White / Black",
        shape: "Circle with diagonal bar",
        meaning: "Prohibition (use with clear local instruction for 'No Parking').",
        usage: "Used to prohibit parking in front of exits, equipment, fire points, access routes, etc.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place at boundaries/entrances to the restricted parking zone and near the no-parking area.",
        notes: "If strict ISO 7010 code is required for 'No Parking', confirm the registered symbol; otherwise use clear supplementary text locally."
      },
      {
        category: "Prohibition",
        name: "No Unauthorized Entry",
        img: images.prohibition?.["iso No Unauthorized Entry.png"],
        code: "P080",
        color: ["#FF0000", "#FFFFFF", "#000000"],
        colorNames: "Red / White / Black",
        shape: "Circle with diagonal bar",
        meaning: "No access for unauthorized persons (ISO 7010).",
        usage: "Used to restrict access to controlled/hazardous areas.",
        size_mm: ["300x300", "400x400", "600x600"],
        position: "Place on doors, gates, barriers, and boundary points of restricted zones.",
        notes: "Often combined with access control and training requirements."
      },
      {
        category: "Prohibition",
        name: "Road Closed",
        img: images.prohibition?.["iso Road Closed.png"],
        code: "P004",
        color: ["#FF0000", "#FFFFFF", "#000000"],
        colorNames: "Red / White / Black",
        shape: "Circle with diagonal bar",
        meaning: "No thoroughfare / Do not pass (ISO 7010-style prohibition).",
        usage: "Used to prevent passage into a closed route/area within workplaces or sites.",
        size_mm: ["300x300", "400x400", "600x600"],
        position: "Place at the start of the closed route and where alternate routes branch.",
        notes: "For regulated public road traffic signage, use the applicable local traffic standards."
      },
      {
        category: "Prohibition",
        name: "No Entry",
        img: images.prohibition?.["iso No Entry.png"],
        code: "P080",
        color: ["#FF0000", "#FFFFFF", "#000000"],
        colorNames: "Red / White / Black",
        shape: "Circle with diagonal bar",
        meaning: "No access for unauthorized persons (ISO 7010).",
        usage: "Used to prohibit entry to restricted areas.",
        size_mm: ["300x300", "400x400", "600x600"],
        position: "Place at doors/gates/boundaries so it is visible before entry.",
        notes: "Combine with barrier/access control where needed."
      },
      {
        category: "Prohibition",
        name: "No Mobile Phone",
        img: images.prohibition?.["iso_no mobile phone.png"],
        code: "P013",
        color: ["#FF0000", "#FFFFFF", "#000000"],
        colorNames: "Red / White / Black",
        shape: "Circle with diagonal bar",
        meaning: "No activated mobile phone (ISO 7010).",
        usage: "Used in explosive atmospheres, EMC-sensitive zones, or secure areas.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place at entrances to the restricted zone and near sensitive equipment rooms.",
        notes: "Clarify whether phones must be off or prohibited completely as per site rules."
      },
      {
        category: "Prohibition",
        name: "No Open Flame",
        img: images.prohibition?.["iso_no open Flame.png"],
        code: "P003",
        color: ["#FF0000", "#FFFFFF", "#000000"],
        colorNames: "Red / White / Black",
        shape: "Circle with diagonal bar",
        meaning: "No open flame (ISO 7010).",
        usage: "Used where ignition sources are prohibited (flammables, gases, vapours, etc.).",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place at entrances and boundaries of flammable/explosive hazard zones.",
        notes: "Use together with controls for hot work permits where applicable."
      },
      {
        category: "Prohibition",
        name: "No Smoking",
        img: images.prohibition?.["ISOSmoking.png"],
        code: "P002",
        color: ["#FF0000", "#FFFFFF", "#000000"],
        colorNames: "Red / White / Black",
        shape: "Circle with diagonal bar",
        meaning: "No smoking (ISO 7010).",
        usage: "Used where smoking is prohibited for fire, health, hygiene, or process reasons.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place at entrances and inside zones where smoking is prohibited.",
        notes: "Ensure designated smoking areas (if any) are clearly marked separately."
      },

      // =========================
      // SAFE CONDITION / EMERGENCY SIGNS (5)
      // =========================
      {
        category: "Safe Condition",
        name: "Assembly Point",
        img: images.safeCondition?.["iso Assembly Point.png"],
        code: "E007",
        color: ["#00AA00", "#FFFFFF"],
        colorNames: "Green / White",
        shape: "Square",
        meaning: "Evacuation assembly point (ISO 7010).",
        usage: "Indicates where people gather after evacuation for headcount and instructions.",
        size_mm: ["150x150", "200x200", "300x300"],
        position: "Place at the designated muster point and along approach routes if needed.",
        notes: "Keep area unobstructed; ensure it matches the site emergency plan."
      },
      {
        category: "Safe Condition",
        name: "Emergency Exit",
        img: images.safeCondition?.["iso Emergency Exit.png"],
        code: "E001",
        color: ["#00AA00", "#FFFFFF"],
        colorNames: "Green / White",
        shape: "Rectangle",
        meaning: "Emergency exit (ISO 7010).",
        usage: "Indicates an emergency exit / escape route direction (use arrows where required).",
        size_mm: ["150x300", "200x400", "300x600"],
        position: "Place above exit doors and at route decision points along escape paths.",
        notes: "Ensure continuous wayfinding; keep visible during power loss (photoluminescent where required)."
      },
      {
        category: "Safe Condition",
        name: "Emergency Shower",
        img: images.safeCondition?.["iso Emergency Shower.png"],
        code: "E012",
        color: ["#00AA00", "#FFFFFF"],
        colorNames: "Green / White",
        shape: "Square",
        meaning: "Safety shower (ISO 7010).",
        usage: "Indicates the location of an emergency/safety shower for chemical exposure response.",
        size_mm: ["150x150", "200x200", "250x250"],
        position: "Place directly above/near the shower and along approach routes in chemical areas.",
        notes: "Keep access unobstructed; maintain equipment per safety procedures."
      },
      {
        category: "Safe Condition",
        name: "Eyewash Station",
        img: images.safeCondition?.["iso Eyewash Station.png"],
        code: "E011",
        color: ["#00AA00", "#FFFFFF"],
        colorNames: "Green / White",
        shape: "Square",
        meaning: "Eyewash station (ISO 7010).",
        usage: "Indicates the location of an eyewash station for emergency eye irrigation.",
        size_mm: ["150x150", "200x200", "250x250"],
        position: "Place directly above/near the eyewash and along approach routes in chemical areas.",
        notes: "Keep access unobstructed; test/flush as per safety procedures."
      },
      {
        category: "Safe Condition",
        name: "First Aid",
        img: images.safeCondition?.["iso First Aid.png"],
        code: "E003",
        color: ["#00AA00", "#FFFFFF"],
        colorNames: "Green / White",
        shape: "Square",
        meaning: "First aid (ISO 7010).",
        usage: "Indicates location of first-aid equipment, room, or assistance.",
        size_mm: ["150x150", "200x200", "250x250"],
        position: "Place above first-aid kits/rooms and along approach routes if needed.",
        notes: "Keep updated; ensure trained personnel and supplies per site requirements."
      },

      // =========================
      // WARNING SIGNS (8)
      // =========================
      {
        category: "Warning",
        name: "Blind Corner",
        img: images.warning?.["iso Blind Corner.png"],
        code: "N/A",
        color: ["#FFCC00", "#000000"],
        colorNames: "Yellow / Black",
        shape: "Equilateral triangle",
        meaning: "Warning; Blind corner.",
        usage: "Warns of collision risk at blind corners/intersections.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place before the blind corner so it is seen in time to slow down and take care.",
        notes: "Use with mirrors/one-way systems where required; confirm ISO code if you need strict ISO 7010 registry."
      },
      {
        category: "Warning",
        name: "Electrical Room",
        img: images.warning?.["iso Electrical Room.png"],
        code: "W012",
        color: ["#FFCC00", "#000000"],
        colorNames: "Yellow / Black",
        shape: "Equilateral triangle",
        meaning: "Warning; Electricity / electrical hazard (ISO 7010-style).",
        usage: "Warns of electrical hazards in electrical rooms/panels/substations.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place on electrical room doors and near electrical panels where shock risk exists.",
        notes: "Combine with access restriction and PPE requirements where applicable."
      },
      {
        category: "Warning",
        name: "Explosive Material",
        img: images.warning?.["iso Explosive Material.png"],
        code: "W002",
        color: ["#FFCC00", "#000000"],
        colorNames: "Yellow / Black",
        shape: "Equilateral triangle",
        meaning: "Warning; Explosive material (ISO 7010).",
        usage: "Warns of explosive materials or explosive atmosphere risks.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place at storage areas, process zones, and entry points to explosive hazard areas.",
        notes: "Use with ignition source prohibitions and area classification controls."
      },
      {
        category: "Warning",
        name: "High Voltage",
        img: images.warning?.["iso High Voltage.png"],
        code: "W012",
        color: ["#FFCC00", "#000000"],
        colorNames: "Yellow / Black",
        shape: "Equilateral triangle",
        meaning: "Warning; Electricity / high voltage hazard (ISO 7010-style).",
        usage: "Warns of dangerous electrical shock hazard/high voltage equipment.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place on/near electrical panels, switchgear, transformers, and HV rooms.",
        notes: "Maintain clearances; apply lockout/tagout and arc-flash controls where needed."
      },
      {
        category: "Warning",
        name: "Hot Surface",
        img: images.warning?.["iso Hot Surface.png"],
        code: "N/A",
        color: ["#FFCC00", "#000000"],
        colorNames: "Yellow / Black",
        shape: "Equilateral triangle",
        meaning: "Warning; Hot surface.",
        usage: "Warns of burn hazard from hot surfaces, pipes, heaters, ovens, etc.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place near hot equipment surfaces and before contact is possible.",
        notes: "Use with guarding/insulation where required; confirm ISO code if you need strict ISO 7010 registry."
      },
      {
        category: "Warning",
        name: "Magnetic Field",
        img: images.warning?.["iso Magnetic Field.png"],
        code: "W006",
        color: ["#FFCC00", "#000000"],
        colorNames: "Yellow / Black",
        shape: "Equilateral triangle",
        meaning: "Warning; Magnetic field (ISO 7010).",
        usage: "Warns of strong magnetic fields (MRI zones, magnets, magnetic hazards).",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place at entrances to magnetic field areas and near magnetic equipment.",
        notes: "Include access restrictions for pacemakers/implants per site rules."
      },
      {
        category: "Warning",
        name: "Moving Parts",
        img: images.warning?.["iso Moving Parts.png"],
        code: "N/A",
        color: ["#FFCC00", "#000000"],
        colorNames: "Yellow / Black",
        shape: "Equilateral triangle",
        meaning: "Warning; Moving parts.",
        usage: "Warns of injury risk from moving machinery parts (entanglement/pinch points).",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place on guards, near access points, and where moving parts may be exposed.",
        notes: "Use with guarding/interlocks; confirm ISO code if you need strict ISO 7010 registry."
      },
      {
        category: "Warning",
        name: "Slippery Floor",
        img: images.warning?.["iso Slippery Floor.png"],
        code: "W011",
        color: ["#FFCC00", "#000000"],
        colorNames: "Yellow / Black",
        shape: "Equilateral triangle",
        meaning: "Warning; Slippery surface (ISO 7010).",
        usage: "Warns of slip hazard from wet/oily/polished surfaces or cleaning operations.",
        size_mm: ["200x200", "300x300", "400x400"],
        position: "Place before entering slippery areas and around temporary wet zones.",
        notes: "Remove when hazard ends if temporary; maintain housekeeping controls."
      }
    ];
  }, [images]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(safetySigns.map((s) => s.category)));
    return ["All", ...unique];
  }, [safetySigns]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return safetySigns.filter((s) => {
      const matchCategory = activeCategory === "All" || s.category === activeCategory;
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        s.usage.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [query, activeCategory, safetySigns]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-amber-700 font-medium">Loading safety signs...</div>
          <div className="text-sm text-amber-600 mt-2">Preparing comprehensive safety database</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{customScrollbarStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 px-4 py-8 md:px-6 md:py-12 font-sans">
        <div className="mx-auto w-full max-w-7xl custom-scrollbar">
          
          {/* Header Section */}
          <AnimateOnScroll>
            <div className="mb-10">
              <div className="flex items-center text-center flex-col lg:flex-row md:flex-row  gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400
                 to-orange-500 rounded-xl flex items-center justify-center shadow-lg
                  shadow-amber-200">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="lg:text-4xl md:text-3xl text-xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
                    Safety Signs Library
                  </h1>
                  <p className="text-amber-600 mt-1">Comprehensive ISO 7010 Compliant Signage</p>
                </div>
              </div>

              {/* Search and Filter Container */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5 group-focus-within:text-amber-600 transition-colors" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name, code, or meaning..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-100 bg-amber-50/30 text-gray-800 placeholder-amber-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((category) => {
                      const meta = categoryMeta[category] || { 
                        icon: <Filter className="w-5 h-5" />,
                        lightGradient: "from-gray-50 to-gray-50",
                        border: "border-gray-200",
                        color: "text-gray-700"
                      };
                      return (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all whitespace-nowrap ${
                            activeCategory === category
                              ? `bg-gradient-to-r ${meta.lightGradient} ${meta.border} ${meta.color} font-bold shadow-sm`
                              : "bg-white border-transparent hover:border-amber-100 text-gray-600 hover:bg-amber-50"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {meta.icon}
                            {category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-amber-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                     <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                     Total Signs: <strong>{safetySigns.length}</strong>
                  </div>
                   <div className="hidden md:block w-px h-4 bg-amber-200"></div>
                  <div className="flex flex-wrap gap-2">
                    {safetyStandards.map((std) => (
                      <span key={std} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs font-medium border border-gray-200">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Results Grid */}
          {filtered.length === 0 ? (
            <AnimateOnScroll>
              <div className="bg-white rounded-2xl p-16 text-center border-2 border-dashed border-amber-200">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-50 flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No matching signs found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            </AnimateOnScroll>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((sign, i) => {
                const meta = categoryMeta[sign.category];
                
                return (
                  <AnimateOnScroll key={sign.code} delay={i * 0.05}>
                    <div 
                      onClick={() => setSelectedSign(sign)}
                      className={`h-full bg-white rounded-2xl border ${meta.border} p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${meta.badgeColor}`}>
                          {sign.code}
                        </span>
                        <div className={`p-1.5 rounded-lg bg-gray-50 text-gray-400 group-hover:text-amber-500 transition-colors`}>
                           <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Sign Image */}
                      <div className="flex-1 flex items-center justify-center py-4 mb-4">
                        <div className="relative w-32 h-32 md:w-40 md:h-40">
                          {sign.img ? (
                            <img
                              src={sign.img}
                              alt={sign.name}
                              className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/160x160/fff8e1/f59e0b?text=${encodeURIComponent(sign.name)}`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center rounded-xl bg-gray-50 border-2 border-dashed border-gray-200">
                              <span className="text-xs text-gray-400 font-medium text-center px-2">Image N/A</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="mt-auto text-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-amber-700 transition-colors">
                          {sign.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 px-2">
                           {sign.meaning}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center">
                           <button className="text-sm font-semibold text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
                              View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </button>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          )}

          {/* Modal Overlay */}
          {selectedSign && (
             <SignDetailModal 
               sign={selectedSign} 
               onClose={() => setSelectedSign(null)} 
               meta={categoryMeta[selectedSign.category]}
             />
          )}

          {/* Footer */}
        
        </div>
      </div>
    </>
  );
};

export default SafetySignPPE;