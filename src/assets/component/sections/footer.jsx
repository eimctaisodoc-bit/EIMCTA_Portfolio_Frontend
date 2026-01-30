import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Clock,
  ChevronRight,
  Twitter,
  MessageCircle,
  Building,
  Globe,
  Headphones,
  Download,
  X,
  Eye,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../../img/eimcta.png';
import { FaCodeBranch } from "react-icons/fa";

// 1) Import the PDF (Vite/CRA will turn this into a file URL)
import EimctaBrochureFile from "../../img/Brochure Design -.pdf";

const Footer = () => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const isVideoInView = useInView(videoRef, { margin: "-10%" });
  const [playVideo, setPlayVideo] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    if (isVideoInView) setPlayVideo(true);
  }, [isVideoInView]);

  // 2) Download helper
  const handleDownload = (fileSource, fileName) => {
    const tempLink = document.createElement("a");
    tempLink.href = fileSource;     // URL to the PDF
    tempLink.download = fileName;   // saved file name
    tempLink.click();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const socialLinks = [
    { icon: Facebook, url: "https://www.facebook.com/eimctanepal", bgColor: "bg-blue-600", hoverColor: "hover:bg-blue-700", label: "Facebook" },
    { icon: Youtube, url: "https://www.youtube.com/watch?v=pqaihirDdBU", bgColor: "bg-red-600", hoverColor: "hover:bg-red-700", label: "YouTube" },
    { icon: Instagram, url: "https://www.instagram.com/everest_consultrain/", bgColor: "bg-gradient-to-r from-purple-500 to-pink-500", hoverColor: "hover:from-purple-600 hover:to-pink-600", label: "Instagram" },
    { icon: Twitter, url: "https://twitter.com", bgColor: "bg-blue-400", hoverColor: "hover:bg-blue-500", label: "Twitter" },
    { icon: MessageCircle, url: "https://tiktok.com", bgColor: "bg-black", hoverColor: "hover:bg-gray-800", label: "TikTok" },
    { icon: Linkedin, url: "https://www.linkedin.com/company/everest-international-management-consultancy-training-agency-pvt-ltd/", bgColor: "bg-blue-700", hoverColor: "hover:bg-blue-800", label: "LinkedIn" },
  ];

  const faqData = [
    {
      id: 1,
      question: "What is ISO?",
      answer: "ISO stands for the International Organization for Standardization. It develops globally recognized standards that help businesses ensure quality, safety, efficiency, and consistency in their products, services, and management systems."
    },
    {
      id: 2,
      question: "Which ISO is suitable for our business?",
      answer: "The suitable ISO depends on your business type: ISO 9001 – Quality Management System (for any business wanting consistent quality), ISO 14001 – Environmental Management (if your business impacts the environment), ISO 45001 – Occupational Health & Safety (for workplaces prioritizing employee safety), ISO 22000 / HACCP – Food Safety (for food-related businesses), ISO 27001 – Information Security Management (if handling sensitive data)."
    },
  ];

  const brochureDownloads = [
    { title: "Service Profile", fileName: "EIMCTA_Service_Profile.pdf" },
    { title: "ISO 21001", fileName: "EIMCTA_ISO_21001_Brochure.pdf" },
    { title: "Calendar", fileName: "EIMCTA_Calendar.pdf" },
    { title: "Full Brochure", fileName: "EIMCTA_Full_Brochure.pdf" },
  ];

  const handleFaqClick = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const ytVideoId = "pqaihirDdBU";
  const ytThumbnail = `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg`;

  return (
    <footer
      ref={ref}
      className="relative text-amber-900 bg-linear-to-b from-amber-50 to-amber-100 font-['Arial_Narrow'] overflow-hidden"
    >
      {/* Decorative Top Pattern */}
      <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-amber-400 via-amber-500 to-amber-400" />

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-amber-600 via-amber-700 to-amber-600" />

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-amber-400"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-amber-300"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* ================= COLUMN 1: LOGO & COMPANY INFO ================= */}
          <motion.div
            variants={slideFromLeft}
            className="space-y-8"
          >
            {/* Logo Section */}
            <div className="flex flex-col items-center lg:items-start space-y-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <img
                  src={logo}
                  alt="EIMCTA Logo"
                  className="w-48 md:w-56 h-auto object-contain drop-shadow-lg"
                />
              </motion.div>

              <p className="text-center lg:text-left text-amber-800 max-w-md leading-relaxed font-semibold">
                Everest International Management Consultancy Training & Agency Pvt. Ltd.
              </p>

              {/* Websites */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {["everestconsultrain.com", "eimcta.com.np"].map((site, idx) => (
                  <a
                    key={idx}
                    href={`https://${site}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-700 hover:text-amber-800 hover:underline text-sm font-medium transition-colors"
                  >
                    <Globe size={14} />
                    {site}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-amber-800">Explore With Us</h3>
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
          </motion.div>

          {/* ================= COLUMN 2: CONTACT INFORMATION ================= */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            {/* Contact Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Head Office */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Building className="text-amber-600" size={20} />
                  <h3 className="text-lg font-bold text-amber-800">Head Office</h3>
                </div>
                <div className="space-y-3 bg-linear-to-br from-white to-amber-50 rounded-xl p-4 border border-amber-100 shadow">
                  <p className="text-sm text-amber-700 flex items-start gap-2">
                    <MapPin size={14} className="mt-1 shrink-0" />
                    Kageswarimanohara-05, Kathmandu
                  </p>
                  <div className="space-y-2">
                    <a href="tel:+977015903211" className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors text-sm">
                      <Phone size={14} />
                      +977 1 5903 211
                    </a>
                    <a href="tel:+9779761754799" className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors text-sm">
                      <Phone size={14} />
                      +977 9766 561697
                    </a>

  <div className="flex items-center  gap-2 text-xs 
                    text-amber-600 bg-amber-100 px-3 py-1 rounded-full w-fit">

                      <div className="flex justify-between gap-2 items-center text-center">
                        <Headphones size={10} />
                        <span>24/7 Support </span>
                      </div>
                      <div>
                        <span className="relative flex h-2 w-2 ml-1">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 animate-ping [animation-duration:2.5s] opacity-60" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-current opacity-90" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Office */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <FaCodeBranch className="text-amber-600" size={20} />
                  <h3 className="text-lg font-bold text-amber-800">Branch</h3>
                </div>
                <div className="space-y-3 bg-linear-to-br from-white to-amber-50 rounded-xl p-4 border border-amber-100 shadow">
                  <p className="text-sm text-amber-700">
                    Hospital Line, Itahari-9 (Biratnagar Line)
                  </p>
                  <div className="space-y-2">
                    <a href="tel:+97702590259" className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors text-sm">
                      <Phone size={14} />
                      +977 25 590 259
                    </a>
                    <a href="tel:+9779764595999" className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors text-sm">
                      <Phone size={14} />
                      +977 9764 595 999
                    </a>
                    <div className="flex items-center  gap-2 text-xs 
                    text-amber-600 bg-amber-100 px-3 py-1 rounded-full w-fit">

                      <div className="flex justify-between gap-2 items-center text-center">
                        <Headphones size={10} />
                        <span>24/7 Support </span>
                      </div>
                      <div>
                        <span className="relative flex h-2 w-2 ml-1">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-current animate-ping opacity-60" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-current opacity-90" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Email Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="text-amber-600" size={20} />
                <h3 className="text-lg font-bold text-amber-800">Email</h3>
              </div>
              <div className="space-y-3 bg-linear-to-br from-white to-amber-50 rounded-xl p-4 border border-amber-100 shadow">
                <a href="mailto:eimcta.care@gmail.com" className="block text-sm text-amber-700 hover:text-amber-800 transition-colors">
                  eimcta.care@gmail.com
                </a>
                <a href="mailto:info@everestconsultrain.com" className="block text-sm text-amber-700 hover:text-amber-800 transition-colors">
                  info@everestconsultrain.com
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="text-amber-600" size={20} />
                <h3 className="text-lg font-bold text-amber-800">Working Hours</h3>
              </div>
              <div className="space-y-3 bg-linear-to-br from-white to-amber-50 rounded-xl p-4 border border-amber-100 shadow">
                <p className="text-sm text-amber-700">Sun–Fri: 10 AM – 6 PM</p>

              </div>
            </div>
          </motion.div>

          {/* ================= COLUMN 3: GET QUOTE & FAQ TILES ================= */}
          <motion.div
            variants={slideFromRight}
            className="space-y-8"
          >
            {/* Get Quote Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-800">Get Instant Quote</h3>
              <motion.div
                variants={itemVariants}
                className="bg-linear-to-br from-white to-amber-50 rounded-2xl p-6 shadow border border-amber-200"
              >
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <img
                       src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://docs.google.com/forms/d/e/1FAIpQLScx_B-qvhNtZgOqOZEoZKZtZrWMSv1ThgU0mak5xtoGaiinsw/viewform?pli=1"
                      alt="Get Quote QR Code"
                      className="w-40 h-40 object-contain rounded-xl p-2"
                    />
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Scan Me
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <h4 className="text-xl font-bold text-amber-800">Get Your Quote Now</h4>
                    <p className="text-sm text-amber-700">
                      Scan The QR Code To Get A Personalized Quote For Our Services
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* FAQ Tiles Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-800">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 gap-4">
                {faqData.map((faq) => (
                  <motion.div
                    key={faq.id}
                    variants={itemVariants}
                    className={`bg-linear-to-r from-amber-50 to-white rounded-xl p-3 border border-amber-200 shadow hover:shadow transition-all duration-300 cursor-pointer ${expandedFaq === faq.id ? 'ring-2 ring-amber-400' : ''
                      }`}
                    onClick={() => handleFaqClick(faq.id)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-amber-800 text-sm flex-1">{faq.question}</h4>
                      <motion.div
                        animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-amber-600 shrink-0"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xs text-amber-700 mt-2 overflow-hidden"
                        >
                          {faq.answer}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Download Brochures Section */}


              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Link
                  to="/Blog-Offers/FAQ"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm flex-1 text-center"
                >
                  View All FAQs
                  <ChevronRight size={16} />
                </Link>

                <button
                  onClick={() => handleDownload(EimctaBrochureFile, "EIMCTA_Complete_Brochure.pdf")}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all text-sm flex-1"
                >
                  <Download size={16} />
                  Download Brochure
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= VIDEO SECTION ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="border-t border-amber-200 pt-8"
        >
          <motion.div
            variants={slideFromLeft}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-bold text-amber-800 flex items-center justify-center gap-2">
              <Youtube className="text-red-600" size={20} />
              Featured Video
            </h3>
            <motion.div
              ref={videoRef}
              className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border-2 border-amber-300 shadow-xl group"
              whileHover={{ scale: 1.01 }}
            >
              {playVideo ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&rel=0&modestbranding=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="EIMCTA Featured Video"
                />
              ) : (
                <>
                  <img
                    src={ytThumbnail}
                    alt="YouTube Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all cursor-pointer"
                    onClick={() => setPlayVideo(true)}
                  >
                    <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-2xl">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                    Click To Play
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ================= COPYRIGHT ================= */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-amber-200 text-center"
        >
          <p className="text-sm text-amber-700 font-semibold">
            © {new Date().getFullYear()} Everest International Management Consultancy Training & Agency Pvt. Ltd.
            All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;