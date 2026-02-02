import React, { useEffect, useState } from "react";
import src from "../../img/updateCertificationProcess.jpg";

const CertificationProcess = ({ zoomLevel = 2, magnifierSize = 150 }) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  // ✅ Mobile-only magnifier (Tailwind md = 768px)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseEnter = (e) => {
    if (!isMobile) return;

    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e) => {
    if (!isMobile) return;

    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();

    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 rounded-xl shadow-md">

      <div
        className="relative inline-block overflow-hidden border border-gray-200 rounded-lg"
        // ✅ only crosshair on mobile
        style={{ cursor: isMobile ? "crosshair" : "default" }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowMagnifier(false)}
      >
        {/* Main Image */}
        <img
          src={src || "https://via.placeholder.com/600x400?text=Certification+Flowchart"}
          alt="Certification Process"
          className="max-w-full h-auto block"
        />

        {/* ✅ Magnifier Lens (MOBILE ONLY) */}
        {isMobile && showMagnifier && (
          <div
            style={{
              position: "absolute",
              pointerEvents: "none",
              height: `${magnifierSize}px`,
              width: `${magnifierSize}px`,
              top: `${y - magnifierSize / 2}px`,
              left: `${x - magnifierSize / 2}px`,
              opacity: 1,
              border: "2px solid lightgray",
              backgroundColor: "white",
              backgroundImage: `url('${src}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
              backgroundPosition: `${-x * zoomLevel + magnifierSize / 2}px ${
                -y * zoomLevel + magnifierSize / 2
              }px`,
              borderRadius: "50%",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              zIndex: 20,
            }}
          />
        )}
      </div>

      <p className="mt-4 text-gray-500 italic">
        {isMobile ? "Tap/hover over the document to inspect the details" : "Open on mobile to zoom with magnifier"}
      </p>
    </div>
  );
};

export default CertificationProcess;
