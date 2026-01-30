// 📌 BusinessQuoteForm.js
import useEmailAPI from "../utilities/SocialMedia/AllApi"; 
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  ChevronDown,
  X,
  CheckCircle,
  AlertTriangle,
  Users,
  FileText,
  CreditCard,
  Briefcase,
} from "lucide-react";

// --- Utility Components ---

// 1. Confetti Effect
const ConfettiEffect = () => {
  const pieces = Array.from({ length: 50 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((i) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 12 + 4}px`,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
          animation: `fall ${Math.random() * 2 + 3}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        };
        return <div key={i} style={style} className="absolute opacity-80 rounded-sm" />;
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// 2. Beam Underline Component
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

// 3. InputField Component
const InputField = ({ label, icon, error, fullWidth, ...props }) => (
  <div className={`group ${fullWidth ? 'col-span-1 md:col-span-2' : ''}`}>
    <label className="block text-sm font-semibold text-slate-700 mb-2 required-field">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-50 p-1.5 rounded-full">
        {icon}
      </div>
      <input
        {...props}
        className={`pl-12 w-full border ${error ? "border-red-300" : "border-slate-300"} rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200 shadow-sm hover:shadow hover:border-amber-400`}
      />
    </div>
    {error && <p className="mt-1 text-xs font-medium text-red-600 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />{error}</p>}
  </div>
);

// 4. ServicesDropdown Component
const ServicesDropdown = ({
  servicesInterested,
  formData,
  toggleService,
  setFormData,
  errors,
  showDropdown,
  setShowDropdown,
  showCustomInput,
  setShowCustomInput,
  handleChange,
  addCustomService,
}) => (
  <div className="services-dropdown-container group col-span-1 md:col-span-2">
    <label className="block text-sm font-semibold text-slate-700 mb-2 required-field">
      Services You Are Looking For
    </label>
    <div
      className={`flex flex-wrap gap-2 p-3 border rounded-lg min-h-12 transition duration-200 ${errors.selectedServices
        ? "border-red-300 bg-red-50"
        : "border-slate-300 bg-slate-50 hover:border-amber-400"
        } shadow-inner`}
    >
      {(formData.selectedServices.concat(formData.customServices).length > 0) ? (
        formData.selectedServices.concat(formData.customServices).map((service,idx) => (
          <div
            key={idx}
            className="flex items-center bg-amber-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow transition-colors hover:bg-amber-700 cursor-default"
          >
            <span>{service}</span>
            <button
              type="button"
              onClick={() => {
                if (formData.selectedServices.includes(service)) toggleService(service);
                else setFormData((prev) => ({
                  ...prev,
                  customServices: prev.customServices.filter((s) => s !== service),
                }));
              }}
              className="ml-2 -mr-1 p-0.5 rounded-full text-white/90 hover:bg-white/20 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-slate-500 self-center px-1 text-sm italic">Select services below...</p>
      )}
    </div>

    {errors.selectedServices && (
      <p className="mt-1 text-xs font-medium text-red-600 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />{errors.selectedServices}</p>
    )}

    <div className="relative mt-3">
      <button
        type="button"
        className="w-full border border-slate-300 rounded-lg p-3 cursor-pointer flex justify-between items-center text-left bg-white hover:bg-slate-50 transition-colors shadow-sm hover:border-amber-400"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="text-slate-800 font-semibold">
          {showDropdown ? "Hide Services List" : "View and Select Services"}
        </span>
        <ChevronDown 
          className={`h-5 w-5 text-slate-600 transition-transform duration-300 ${showDropdown ? "rotate-180" : "rotate-0"}`} 
        />
      </button>
      {showDropdown && (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 max-h-72 overflow-y-auto border border-amber-300 bg-white rounded-lg shadow-lg p-3"
        >
          {servicesInterested.map((service, idx) => (
            <label
              key={idx}
              className="flex items-center p-2 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={formData.selectedServices.includes(service)}
                onChange={() => toggleService(service)}
                className="h-5 w-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 mr-3"
              />
              <span className="text-sm text-slate-700">{service}</span>
            </label>
          ))}
          <div className="p-2 mt-3 border-t border-slate-200">
            {showCustomInput ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.customService}
                  onChange={handleChange}
                  name="customService"
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 mr-2 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none hover:border-amber-400"
                  placeholder="Enter custom service"
                  onKeyDown={(e) => e.key === 'Enter' && addCustomService()}
                />
                <button
                  type="button"
                  onClick={addCustomService}
                  className="text-white bg-amber-600 px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm font-semibold shadow"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="text-amber-600 hover:text-amber-700 transition-colors text-sm font-medium flex items-center p-1"
              >
                <PlusCircle className="w-4 h-4 mr-1"/> Add other service...
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  </div>
);

// PlusCircle Icon
const PlusCircle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
);


// --- Main Component ---
export default function BusinessQuoteForm() {
  const form = useRef();

 const servicesInterested = [
  "ISO 9001:2015 QMS (Quality Management System)",
  "ISO 45001:2018 OHSMS (Occupational Health & Safety Management System)",
  "ISO 14001:2015 EMS (Environmental Management System)",
  "ISO 27001:2022 ISMS (Information Security Management System)",
  "ISO 22000:2018 FSMS (Food Safety Management System)",
  "ISO 21001:2025 EOMS (Educational Organizations Management System)", // updated
  "ISO 50001:2018 EnMS (Energy Management System)",
  "ISO 15189:2022 Medical Laboratory QMS",
  "ISO 26000:2010 Social Responsibility Guidance",
  "ISO 55001:2024 Asset Management System", // updated
  "ISO 41001:2018 Facility Management System",
  "ISO 28001:2007 Security Management System for Supply Chains",
  "IATF 16949:2016 Automotive QMS",
  "SMETA Sedex Audits",
  "RBA (Responsible Business Alliance) Compliance",
  "CoC (SVAP / SeQ) Audits",
  "HACCP Certification (Hazard Analysis & Critical Control Points)",
  "HALAL Certification",
  "CE Marking (Conformité Européenne)",
  "GMP (Good Manufacturing Practices)",
  "ISO 39001:2012 RTSMS (Road Traffic Safety Management System)",
  "Training Programs",
  "OHS Consultancy",
  "Environmental Services",
  "Safety Equipment",
  "Third Party Audits",
  "Emergency Planning"
];


  const employeeOptions = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+"
  ];

  const initialFormData = {
    // 1. Organization Name
    organization: "",
    
    // 2. Address(location)
    address: "",
    
    // 3. No of Employees
    employees: "",
    
    // 4. company registration number
    registrationNumber: "",
    
    // 5. VAT/PAN Number
    vatPanNumber: "",
    
    // 6. Service you are looking for
    selectedServices: [],
    customServices: [],
    customService: "",
    
    // 7. Your Name
    name: "",
    
    // 8. your Role in an organizational
    role: "",
    
    // 9. Your Contact Number
    phone: "",
    
    // 10. Your Email
    email: "",
    
    // 11. Write more about you and service description
    message: "",
    
    CurrentDate: new Date().toDateString(),
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Auto-clear status
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const fetchLocation = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await res.json();
      const admin = data.localityInfo?.administrative || [];
      const city = data.city || "";
      const district = admin.find((a) => a.adminLevel === 6)?.name || "";
      const province = admin.find((a) => a.adminLevel === 4)?.name || "";
      const addressParts = [city, district, province].filter(Boolean);
      const address = addressParts.join(", ");

      setFormData((prev) => ({
        ...prev,
        address: address,
      }));
    } catch (err) {
      console.error("Failed to fetch location:", err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchLocation(pos.coords.latitude, pos.coords.longitude),
        () => console.log("User denied geolocation or failed to retrieve location.")
      );
    }
  }, []);

  const headerVariant = { 
    initial: { opacity: 0, y: 20 }, 
    animate: { opacity: 1, y: 0 }, 
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleService = (service) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const addCustomService = () => {
    const trimmed = formData.customService.trim();
    if (trimmed && !formData.customServices.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        customServices: [...prev.customServices, trimmed],
        customService: "",
      }));
      setShowCustomInput(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // 1. Organization Name - Compulsory
    if (!formData.organization.trim()) {
      newErrors.organization = "Organization name is required.";
    } else if (formData.organization.length < 2) {
      newErrors.organization = "Please enter a valid organization name.";
    }
    
    // 2. Address - Compulsory
    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (formData.address.length < 5) {
      newErrors.address = "Please enter a valid address.";
    }
    
    // 3. No of Employees - Compulsory
    if (!formData.employees) {
      newErrors.employees = "Please select number of employees.";
    }
    
    // 4. Company registration number - Compulsory
    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Company registration number is required.";
    } else if (formData.registrationNumber.length < 3) {
      newErrors.registrationNumber = "Please enter a valid registration number.";
    }
    
    // 5. VAT/PAN Number - Compulsory
    if (!formData.vatPanNumber.trim()) {
      newErrors.vatPanNumber = "VAT/PAN number is required.";
    } else if (formData.vatPanNumber.length < 5) {
      newErrors.vatPanNumber = "Please enter a valid VAT/PAN number.";
    }
    
    // 6. Service you are looking for - At least one required
    if (formData.selectedServices.length + formData.customServices.length === 0) {
      newErrors.selectedServices = "Please select at least one service you are interested in.";
    }
    
    // 7. Your Name - Compulsory
    if (!formData.name.trim()) {
      newErrors.name = "Your full name is required.";
    } else if (formData.name.length < 2) {
      newErrors.name = "Please enter a valid name.";
    }
    
    // 8. Your Role in organization - Compulsory
    if (!formData.role.trim()) {
      newErrors.role = "Your role in organization is required.";
    } else if (formData.role.length < 2) {
      newErrors.role = "Please enter a valid role.";
    }
    
    // 9. Your Contact Number - Compulsory with validation
    const phone = formData.phone.trim();
    if (!phone) {
      newErrors.phone = "Contact number is required.";
    } else if (!/^\+?(\d[\s-]?){7,15}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number (7-15 digits, optionally starting with +).";
    }
    
    // 10. Your Email - Compulsory with validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    // 11. Message - Compulsory with minimum word requirement
    const message = formData.message.trim();
    const wordCount = message.split(/\s+/).filter(word => word.length > 0).length;
    
    if (!message) {
      newErrors.message = "Please provide details about your requirements.";
    } else if (wordCount < 10) {
      newErrors.message = "Please provide more details (minimum 10 words required).";
    } else if (wordCount > 250) {
      newErrors.message = "Please keep your message under 250 words.";
    } else if (message.length > 1500) {
      newErrors.message = "Message is too long. Maximum 1500 characters allowed.";
    }
    
    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      // Preserve the auto-detected location if available
      address: formData.address || ""
    });
    setErrors({});
    setShowDropdown(false);
    setShowCustomInput(false);
  };

  const { sendEmail } = useEmailAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      
      // Scroll to first error if exists
      const firstErrorKey = Object.keys(validationErrors)[0];
      if (firstErrorKey) {
        setTimeout(() => {
          const element = document.querySelector(`[name="${firstErrorKey}"]`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();
          }
        }, 100);
      }
      
      return;
    }

    const payload = {
      ...formData,
      selectedServices: formData.selectedServices,
      customServices: formData.customServices,
    };

    const result = await sendEmail(payload);
    setIsSubmitting(false);

    if (result?.success) {
      setSubmitStatus({ 
        success: true, 
        message: result.message || "Thank you for contacting us! We will get back to you as soon as possible." 
      });
      resetForm();
    } else {
      let errorMsg = "Failed to submit inquiry. Please try again.";
      if (result?.error) {
        if (typeof result.error === "string") errorMsg = result.error;
        else if (Array.isArray(result.error)) errorMsg = result.error.join(", ");
        else if (typeof result.error === "object" && result.error.text) errorMsg = result.error.text;
      }
      setSubmitStatus({ success: false, message: errorMsg });
    }
  };

  // Calculate word count for message
  const messageWordCount = formData.message.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 bg-slate-50 font-['Arial Narrow', Arial, sans-serif]">
      <style>{`
        .required-field::after {
          content: " *";
          color: #dc2626;
        }
      `}</style>
      <div className="max-w-6xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-lg border border-slate-200">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-center relative"
          initial="initial"
          whileInView="animate"
          variants={headerVariant}
          viewport={{ once: true }}
        >
          <BeamUnderline thickness={8}>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-500">
              
            Get Your Service Proposal Right Here!
            </span>
          </BeamUnderline>
        </motion.h2>
        <p className="text-slate-600 text-center mb-6 text-base">
          Tell Us About Your Organization And The Services You Are Interested In.
        </p>
        
        {/* Compulsory Fields Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-amber-800 font-medium text-center flex items-center justify-center">
            <AlertTriangle className="inline-block w-4 h-4 mr-2" />
            All fields marked with * are compulsory. Please fill in all details accurately.
          </p>
        </div>

        <form ref={form} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Organization Name */}
          <InputField 
            label="Organization Name" 
            name="organization" 
            value={formData.organization} 
            onChange={handleChange} 
            error={errors.organization} 
            icon={<Building className="h-4 w-4 text-slate-600" />} 
            placeholder="Your organization name" 
            required
          />

          {/* 2. Address(location) */}
          <InputField 
            label="Address/Location" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            error={errors.address} 
            icon={<MapPin className="h-4 w-4 text-slate-600" />} 
            placeholder="Street, City, District, Province" 
            required
          />

          {/* 3. No of Employees */}
          <div className="group">
            <label className="block text-sm font-semibold text-slate-700 mb-2 required-field">
              No. of Employees
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-50 p-1.5 rounded-full">
                <Users className="h-4 w-4 text-slate-600" />
              </div>
              <select
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                className={`pl-12 w-full border ${errors.employees ? "border-red-300" : "border-slate-300"} rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200 shadow-sm hover:shadow hover:border-amber-400 appearance-none`}
                required
              >
                <option value="">Select employee range</option>
                {employeeOptions.map((option, idx) => (
                  <option key={idx} value={option}>{option} employees</option>
                ))}
              </select>
            </div>
            {errors.employees && <p className="mt-1 text-xs font-medium text-red-600 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />{errors.employees}</p>}
          </div>

          {/* 4. company registration number */}
          <InputField 
            label="Company Registration Number" 
            name="registrationNumber" 
            value={formData.registrationNumber} 
            onChange={handleChange} 
            error={errors.registrationNumber} 
            icon={<FileText className="h-4 w-4 text-slate-600" />} 
            placeholder="Registration number" 
            required
          />

          {/* 5. VAT/PAN Number */}
          <InputField 
            label="VAT/PAN Number" 
            name="vatPanNumber" 
            value={formData.vatPanNumber} 
            onChange={handleChange} 
            error={errors.vatPanNumber} 
            icon={<CreditCard className="h-4 w-4 text-slate-600" />} 
            placeholder="VAT or PAN number" 
            required
          />

          {/* 6. Service you are looking for (Full width) */}
          <ServicesDropdown
            servicesInterested={servicesInterested}
            formData={formData}
            toggleService={toggleService}
            setFormData={setFormData}
            errors={errors}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            showCustomInput={showCustomInput}
            setShowCustomInput={setShowCustomInput}
            handleChange={handleChange}
            addCustomService={addCustomService}
          />

          {/* 7. Your Name */}
          <InputField 
            label="Your Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            error={errors.name} 
            icon={<User className="h-4 w-4 text-slate-600" />} 
            placeholder="Your full name" 
            required
          />

          {/* 8. your Role in an organizational */}
          <InputField 
            label="Your Role in Organization" 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            error={errors.role} 
            icon={<Briefcase className="h-4 w-4 text-slate-600" />} 
            placeholder="e.g., CEO, Manager, Director" 
            required
          />

          {/* 9. Your Contact Number */}
          <InputField 
            label="Phone/Mobile" 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            error={errors.phone} 
            icon={<Phone className="h-4 w-4 text-slate-600" />} 
            placeholder="+977 1234567890" 
            required
          />

          {/* 10. Your Email */}
          <InputField 
            label="Email" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            error={errors.email} 
            icon={<Mail className="h-4 w-4 text-slate-600" />} 
            placeholder="your.email@example.com" 
            required
          />

          {/* 11. Write more about you and service description (Full width) */}
          <div className="group col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2 required-field">
              Write more about you and service description (minimum 10 words, maximum 250 words)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-4 bg-slate-50 p-1.5 rounded-full">
                <MessageSquare className="h-4 w-4 text-slate-600" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`pl-12 w-full border ${errors.message ? "border-red-300" : "border-slate-300"} rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200 shadow-sm hover:shadow hover:border-amber-400`}
                placeholder="Tell us more about your organization, specific needs, timeline, budget considerations, and any other relevant details..."
                required
              />
            </div>
            <div className="flex justify-between mt-1">
              {errors.message ? (
                <p className="text-xs font-medium text-red-600 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {errors.message}
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  {messageWordCount}/250 words (minimum 10 words required)
                </p>
              )}
            </div>
          </div>

          {/* Submit Button (Full width) */}
          <div className="text-center mt-4 col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-10 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow hover:shadow-lg flex items-center justify-center mx-auto"
            >
              {isSubmitting ? (
                <div className="flex items-center text-base">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                </div>
              ) : (
                <span className="flex items-center text-base">
                  <Send className="mr-2 h-5 w-5" /> Submit Inquiry
                </span>
              )}
            </button>
          </div>

          {/* Status Message (Full width) */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 p-4 rounded-lg text-center font-medium shadow flex items-center justify-center transition-all col-span-1 md:col-span-2 ${submitStatus.success ? "bg-amber-50 border border-amber-200 text-amber-700" : "bg-red-50 border border-red-200 text-red-700"}`}
            >
              {submitStatus.success ? <CheckCircle className="h-5 w-5 mr-3 text-amber-600" /> : <AlertTriangle className="h-5 w-5 mr-3 text-red-600" />}
              <span className="text-sm">{submitStatus.message}</span>
            </motion.div>
          )}
        </form>

        {/* Confetti */}
        {submitStatus?.success && <ConfettiEffect />}
      </div>
    </main>
  );
}