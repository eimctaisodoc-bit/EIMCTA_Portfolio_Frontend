import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import ThemeToggle from "./themeSwitcher";
import { HiHand } from "react-icons/hi"; // Using react-icons for hand icon
import { ArrowRight, ExternalLink, Pointer } from "lucide-react";

const InnerSidebar = () => {
  const sidebarLinks = [
    { label: "ISO 2100 :2025 EOMS ", path: "/service/iso/2100" },
    { label: "ISO 22000:2018 FSMS & HACCP", path: "/service/iso/2200" },
    { label: "ISO 9001:2015 QMS", path: "/service/iso/9001" },
    { label: "ISO 45001:2018 OHSMS", path: "/service/iso/45001" },
    { label: "Health|Safety Plan/Doc.", path: "/services/iso-training/ohs/health-safety-plan-doc" },
    { label: "HSE Implementation/Training/Workshop", path: "/services/iso-training/ohs/implementation" },
    { label: "HSE Audits", path: "/services/iso-training/ohs/audits" },
    { label: "ISO certification", path: "/services/iso-certification" },
    { label: "Tender/Technical/Bid Preparation", path: "/services/tender-technical-bid-preparation" },
    { label: "Environmental Services,EIA,Env.Monitoring(Air,Water,Soil etc)", path: "/services/environmental-services-eta-env-monitoring-air-water-soil-etc" },
    { label: "Supply of Sign (Quality,safety,Env.,Companies)", path: "/services/supply-of-sign-quality-safety-env-companies" },
    { label: "About Us", path: "/about-us" },
    { label: "Contact Us", path: "/contact-us" }
  ];

  const location = useLocation();

  return (
    <div className="  ">
      <aside className="pt-8 w-64 p-4 bg-white h-1/2  backdrop-blur-sm bg-opacity-95 ">
        <ul className="space-y-3  ">
          {sidebarLinks
            .filter(link => link.path !== location.pathname)
            .map(link => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-amber-100 hover:pl-6 ${isActive
                      ? "bg-amber-50 border-l-4 border-amber-800 font-semibold"
                      : "hover:border-l-4 hover:border-amber-300"
                    }`
                  }
                >
                  <ExternalLink className="text-amber-800 flex-shrink-0" />
                  <span className="text-amber-800 text-sm font-medium truncate">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
        </ul>

        {/* Theme Toggle positioned at bottom */}

      </aside>
    </div>
  );
};

export default InnerSidebar;