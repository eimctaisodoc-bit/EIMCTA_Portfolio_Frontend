import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 1. Import useLocation
import { X, ChevronRight, ShieldCheck, HardHat, TreePine, ClipboardCheck, ShoppingCart } from 'lucide-react';

const servicesData = [

    {

        parent: "ISO Services",

        children: ["ISO Consultancy", "ISO Audit", "ISO Lead Auditor Training", "ISO Internal Auditor Training", "ISO Certification"]

    },

    {

        parent: "Environmental Services",

        children: [

            "Environmental Impact Assessment (EIA)",

            "ISO 14001 Consultancy",

            "ISO 14001 Audit",

            "ISO 14001 Certification",

            "Waste Reduction Plan",

            "Environmental Testing / Calibration / Monitoring",

        ],

    },

    {

        parent: "Occupational Health & Safety",

        children: [

            "ISO 45001",

            "OSHS Management System Plan",

            "OHS Expert / Engineer / Office Sourcing",

            "OHS Trainings",

            "Emergency Drill",

            "PPE Sourcing / Supplies",

            "OHS Incident Investigation",

            "OHS Risk Assessment / Management",

        ],

    },

    {

        parent: "Audit, Gap Analysis, Training & Development",

        children: [

            "Training Need Analysis",

            "Post Training Evaluation",

            "Training & Development / HRD / HRM Consultancy",

            "OHS Trainings",

            "HRD Trainings",

            "Training Business Risk Management",

            "HR & Functional Gap Analysis",

            "Process Gap Analysis",

            "Lean Management",

            "Lean Six Sigma",

            "5S Implementation",

            "Lead Auditor – ISO Standards",

            "Documentation & Data Transformation",

            "MIS Consultancy",

        ]

    },

    { parent: "Sales & Supplies", children: ["Personal Protective Equipment (PPE)", "Emergency Aids", "Safety Signage Supplies"] },

];

const ServicesModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // 2. Listen to route changes

    // Auto-open effect on every path change
    useEffect(() => {
        // Optional: Add a slight delay so the page content loads first
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 800);

        return () => clearTimeout(timer);
    }, [location.pathname]); // 3. Re-run whenever the path changes

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="p-6 bg-amber-600 flex justify-between items-center text-white">
                    <div>
                        <h2 className="text-2xl font-bold">Our Professional Services</h2>
                        <p className="opacity-90 text-sm">Comprehensive solutions for ISO compliance and safety.</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicesData.map((category, idx) => (
                            <div key={idx} className="group p-4 rounded-xl border border-amber-100 bg-amber-50/30 hover:bg-amber-50 transition-all">
                                <div className="flex items-center gap-3 mb-3 text-amber-800">
                                    <span className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                                        {category.icon}
                                    </span>
                                    <h3 className="font-bold text-sm uppercase tracking-wider">{category.parent}</h3>
                                </div>

                                <ul className="space-y-2">
                                    {category.children.map((item, childIdx) => (
                                        <li key={childIdx} className="flex items-start gap-2 text-sm text-gray-600 hover:text-amber-700 cursor-pointer group/item">
                                            <ChevronRight className="w-4 h-4 mt-0.5 text-amber-400 group-hover/item:translate-x-1 transition-transform" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                    <button 
                        className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-lg shadow-amber-200 transition-all"
                        onClick={() => {
                            window.scrollTo({
                                top: document.documentElement.scrollHeight - window.innerHeight - 1440,
                                behavior: 'smooth'
                            });
                            setIsOpen(false);
                        }}
                    >
                        Get a Quote
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServicesModal;