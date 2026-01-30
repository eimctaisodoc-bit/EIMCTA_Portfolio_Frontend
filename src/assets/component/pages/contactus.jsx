import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Globe,
  ExternalLink,
  MapPin,
  QrCode,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  MessageSquare,
  Quote,
  Building,
  Map,
  Home,
  Mailbox,
  Globe as GlobeIcon,
  Share2,
  Users,
  Briefcase,
  Music,
  Twitter,
  MessageCircle
} from 'lucide-react';

// Animation variants
const slideInRight = {
  hidden: { x: 80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInLeft = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const rotate3D = {
  hidden: { y: 30, rotateX: -10, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const scaleUp = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Beam Underline Component
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

const socialLinks = [
  { icon: Facebook, url: "https://www.facebook.com/eimctanepal", bgColor: "bg-blue-600", hoverColor: "hover:bg-blue-700", label: "Facebook" },
  { icon: Youtube, url: "https://www.youtube.com/watch?v=pqaihirDdBU", bgColor: "bg-red-600", hoverColor: "hover:bg-red-700", label: "YouTube" },
  { icon: Instagram, url: "https://www.instagram.com/everest_consultrain/", bgColor: "bg-gradient-to-r from-purple-500 to-pink-500", hoverColor: "hover:from-purple-600 hover:to-pink-600", label: "Instagram" },
  { icon: Twitter, url: "https://twitter.com", bgColor: "bg-blue-400", hoverColor: "hover:bg-blue-500", label: "Twitter" },
  { icon: MessageCircle, url: "https://tiktok.com", bgColor: "bg-black", hoverColor: "hover:bg-gray-800", label: "TikTok" },
  { icon: Linkedin, url: "https://www.linkedin.com/company/everest-international-management-consultancy-training-agency-pvt-ltd/", bgColor: "bg-blue-700", hoverColor: "hover:bg-blue-800", label: "LinkedIn" },
];

// Card component with hover animations
const ThreeDCard = ({ children, className = "", variants = slideInUp, custom = 0 }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -8,
        rotateX: 2,
        rotateY: -1,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      custom={custom}
      className={`rounded-xl bg-white/95 backdrop-blur-sm border border-amber-200/60 shadow overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Contact QR Card Component
const ContactQRCard = ({ title, data, qrData, icon: Icon }) => {
  const [showQR, setShowQR] = useState(false);

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

  return (
    <ThreeDCard variants={slideInUp} className="p-5">
      <div className="flex flex-col h-full">
        <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3 shrink-0">
            <Icon className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-amber-900 font-semibold text-lg mb-2">{title}</h4>
            <div className="text-amber-700 text-sm space-y-1">
              {typeof data === 'string' ? (
                <p className="wrap-break-word">{data}</p>
              ) : (
                data.map((item, index) => (
                  <p key={index} className="wrap-break-word">{item}</p>
                ))
              )}
            </div>
          </div>
          <button
            onClick={() => setShowQR(!showQR)}
            className="ml-3 p-2 rounded-lg bg-amber-100 hover:bg-amber-200 transition-colors shrink-0"
            title={showQR ? "Hide QR Code" : "Show QR Code"}
          >
            <QrCode className="w-5 h-5 text-amber-700" />
          </button>
        </div>

        {showQR && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-amber-200"
          >
            <div className="bg-white p-3 rounded-lg border border-amber-200 inline-block shadow">
              <img
                src={qrCodeUrl}
                alt={`${title} QR Code`}
                className="w-32 h-32"
              />
            </div>
            <p className="text-xs text-amber-600 mt-2">Scan to save contact</p>
          </motion.div>
        )}
      </div>
    </ThreeDCard>
  );
};

// Get Quote QR Card Component
const GetQuoteQRCard = () => {
  const [showQR, setShowQR] = useState(false);
  const quoteFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScx_B-qvhNtZgOqOZEoZKZtZrWMSv1ThgU0mak5xtoGaiinsw/viewform?pli=1";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(quoteFormUrl)}`;

  return (
    <ThreeDCard variants={scaleUp} className="p-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-linear-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4">
          <Quote className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-xl font-bold text-amber-900 mb-2">
          <BeamUnderline thickness={6}>
            Get a Quote
          </BeamUnderline>
        </h3>
        <p className="text-amber-700 mb-4 max-w-md">
          Scan the QR code below to fill out our quote request form and get a personalized quote for our services.
        </p>

        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow mb-4">
          <img
            src={qrCodeUrl}
            alt="Get Quote QR Code"
            className="w-48 h-48"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-amber-600">Or click the button below:</p>
          <a
            href={quoteFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow hover:shadow"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Fill Quote Form
          </a>
        </div>
      </div>
    </ThreeDCard>
  );
};

// Main App component
export default function Contact() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Social media data with icons and platform-specific colors
  const socialMedia = [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/eimctanepal",
      qrData: "https://www.facebook.com/eimctanepal",
      icon: Facebook
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@ISO.EIMCTA",
      qrData: "https://www.youtube.com/@ISO.EIMCTA",
      icon: Youtube
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/everest-international-management-consultancy-training-agency-pvt-ltd/?originalSubdomain=np",
      qrData: "https://www.linkedin.com/company/everest-international-management-consultancy-training-agency-pvt-ltd/?originalSubdomain=np",
      icon: Linkedin
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/everest_consultrain/",
      qrData: "https://www.instagram.com/everest_consultrain/",
      icon: Instagram
    }
  ];

  // Close mobile nav when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="relative">
        {/* Enhanced Hero Section */}
        <div
          className="bg-cover bg-fixed bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
        >
          <div className="h-64 md:h-96 flex items-center justify-center bg-linear-to-r from-amber-900/80 to-amber-800/70 px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-4 md:mb-6">
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-amber-500/20 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  <Phone className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
                </motion.div>
                <motion.h1
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-3 md:mb-4 relative"
                  variants={slideInRight}
                  initial="hidden"
                  animate="visible"
                >
                  <BeamUnderline thickness={10} className="text-amber-50">
                    Contact Us
                  </BeamUnderline>
                </motion.h1>
              </div>
              <motion.p
                className="text-base md:text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed"
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
              >
                Get in touch with our team for any questions about our services or to schedule a consultation.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-10 md:mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.h2
                className="text-2xl md:text-4xl font-bold text-amber-900 mb-3 md:mb-4 relative inline-block"
                variants={itemVariants}
              >
                <BeamUnderline thickness={8}>
                  Get In Touch
                </BeamUnderline>
              </motion.h2>
              <motion.p
                className="text-amber-700 max-w-2xl mx-auto text-base md:text-lg"
                variants={itemVariants}
              >
                Reach out to us through any of these channels
              </motion.p>
            </motion.div>

            {/* Contact Grid with Get Quote */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Details with QR Codes */}
              <div className="lg:col-span-2">
                <ThreeDCard className="p-7">
                  <motion.div
                    className="space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    <motion.h3
                      className="text-xl md:text-2xl font-semibold text-amber-900 mb-5 pb-3 border-b border-amber-200 flex items-center"
                      variants={itemVariants}
                    >
                      <Phone className="w-6 h-6 mr-2 text-amber-600" />
                      Contact Information
                    </motion.h3>

                    <div className="space-y-5">
                      {/* Head Office QR Card */}
                      <ContactQRCard
                        title="Head Office - Kathmandu"
                        data={[
                          " Kageswarimanohara-05, Kathmandu",
                          " +977-01-5903211",
                          " +977 9761754799",
                          " info@everestconsultrain.com",
                          " https://everestconsultrain.com"
                        ]}
                        qrData={`Head Office - Everest International
Address: Kageswarimanohara-05, Kathmandu
Phone: +977-01-5903211
Mobile: +977 9761754799
Email: info@everestconsultrain.com
Website: https://everestconsultrain.com`}
                        icon={Building}
                      />

                      {/* Branch Office QR Card */}
                      <ContactQRCard
                        title="Branch Office - Biratnagar"
                        data={[
                          "Hospital Line, Ithari-09 Biratnagar",
                          "9725590259",
                          "9764595999",
                          "info@everestconsultrain.com",
                          "https://everestconsultrain.com"
                        ]}
                        qrData={`Branch Office - Everest International
Address: Hospital Line, Ithari-09 Biratnagar
Phone: 9725590259
Mobile: 9764595999
Email: info@everestconsultrain.com
Website: https://everestconsultrain.com`}
                        icon={MapPin}
                      />

                      {/* Email QR Card */}
                      <ContactQRCard
                        title="Email Addresses"
                        data={[
                          " info@everestconsultrain.com",
                          " eimcta.md@gmail.com",
                          " iso.kathmandu@gmail.com"
                        ]}
                        qrData={`Email Contacts:
Primary: info@everestconsultrain.com
Alternative: eimcta.md@gmail.com
Support: iso.kathmandu@gmail.com`}
                        icon={Mail}
                      />

                      {/* Website QR Card */}
                      <ContactQRCard
                        title="Website"
                        data="https://everestconsultrain.com"
                        qrData="https://everestconsultrain.com"
                        icon={GlobeIcon}
                      />
                    </div>
                  </motion.div>
                </ThreeDCard>
              </div>

              {/* Get Quote QR Card */}
              <div>
                <GetQuoteQRCard />
              </div>
            </div>

            {/* Social Media Section - Updated */}
            <motion.div
              className="mt-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.h3
                className="text-xl md:text-2xl font-semibold text-amber-900 mb-6 pb-3 flex items-center"
                variants={itemVariants}
              >
                <Users className="w-6 h-6 mr-2 text-amber-600" />
                Explore With Us
              </motion.h3>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${social.bgColor} ${social.hoverColor} text-white p-3 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group`}
                    aria-label={social.label}
                  >
                    <social.icon
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Locations Section */}
        <div className="container mx-auto px-4 sm:px-6 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-10 md:mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.h2
                className="text-2xl md:text-4xl font-bold text-amber-900 mb-3 md:mb-4 relative inline-block"
                variants={itemVariants}
              >
                <Map className="w-8 h-8 md:w-10 md:h-10 inline-block mr-3 mb-1" />
                <BeamUnderline thickness={8}>
                  Find Our Offices
                </BeamUnderline>
              </motion.h2>
              <motion.p
                className="text-amber-700 max-w-2xl mx-auto text-base md:text-lg"
                variants={itemVariants}
              >
                Visit us at our head office in Kathmandu or branch office in Biratnagar
              </motion.p>
            </motion.div>

            {/* Maps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              {/* Head Office Map */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
              >
                <ThreeDCard className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                    <Building className="w-6 h-6 mr-2 text-amber-600" />
                    Head Office - Kathmandu
                  </h3>
                  <div className="h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden mb-4">
                    <iframe
                      title="EIMCTA Head Office Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d268.7042138108887!2d85.37052462416652!3d27.72154897449241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b94991c2f69%3A0xa6d7df8340d039b1!2sEverest%20International%20Management%20Consultancy%20%26Training%20Agency%20Pvt.%20Ltd.!5e1!3m2!1sen!2snp!4v1768971459329!5m2!1sen!2snp"
                      width="100%"
                      height="100%"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="border-0"
                    ></iframe>
                  </div>
                  <div className="text-center">
                    <p className="text-amber-700 text-sm md:text-base mb-2">
                      <strong>Address:</strong> Head Office, Kageswarimanohara-05, Kathmandu
                    </p>
                    <a
                      href="https://www.google.com/maps/place/Everest+International+Management+Consultancy+%26Training+Agency+Pvt.+Ltd./@27.7215243,85.3708094,42m/data=!3m1!1e3!4m14!1m7!3m6!1s0x39eb1b94991c2f69:0xa6d7df8340d039b1!2sEverest+International+Management+Consultancy+%26Training+Agency+Pvt.+Ltd.!8m2!3d27.7215752!4d85.3708119!16s%2Fg%2F11vfb9tw0s!3m5!1s0x39eb1b94991c2f69:0xa6d7df8340d039b1!8m2!3d27.7215752!4d85.3708119!16s%2Fg%2F11vfb9tw0s?entry=ttu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-amber-600 hover:text-amber-800 font-medium transition-colors text-sm md:text-base"
                    >
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Open in Google Maps
                    </a>
                  </div>
                </ThreeDCard>
              </motion.div>

              {/* Branch Office Map */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                transition={{ delay: 0.2 }}
              >
                <ThreeDCard className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-amber-600" />
                    Branch Office - Biratnagar
                  </h3>
                  <div className="h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden mb-4">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2976.023938938018!2d87.27147437543076!3d26.659450076798972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDM5JzM0LjAiTiA4N8KwMTYnMjYuNiJF!5e1!3m2!1sen!2snp!4v1769515397681!5m2!1sen!2snp"
                   width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                  <div className="text-center">
                    <p className="text-amber-700 text-sm md:text-base mb-2">
                      <strong>Address:</strong> Branch Office, Hospital Line, Ithari-09 Biratnagar
                    </p>
                    <a
                      href="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d203.19886751506147!2d87.27407800041007!3d26.659472738733335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2snp!4v1769493810937!5m2!1sen!2snp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-amber-600 hover:text-amber-800 font-medium transition-colors text-sm md:text-base"
                    >
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Open in Google Maps
                    </a>
                  </div>
                </ThreeDCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}