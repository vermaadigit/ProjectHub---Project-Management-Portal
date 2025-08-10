import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles } from "lucide-react";

const Modal = ({ isOpen, onClose, title, size = "md", children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle modal open/close animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Delay animation to ensure modal is rendered
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Delay unmounting to allow close animation
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPaddingRight = window.getComputedStyle(
        document.body
      ).paddingRight;

      // Calculate scrollbar width to prevent layout shift
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Lock scroll and compensate for scrollbar
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const getSizeStyles = (size) => {
    switch (size) {
      case "sm":
        return { maxWidth: "400px", minWidth: "320px" };
      case "md":
        return { maxWidth: "500px", minWidth: "400px" };
      case "lg":
        return { maxWidth: "800px", minWidth: "600px" };
      case "xl":
        return { maxWidth: "1200px", minWidth: "800px" };
      default:
        return { maxWidth: "500px", minWidth: "400px" };
    }
  };

  const sizeStyles = getSizeStyles(size);

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          backgroundColor: `rgba(0, 0, 0, ${isAnimating ? "0.5" : "0"})`,
          backdropFilter: `blur(${isAnimating ? "8px" : "0px"})`,
          WebkitBackdropFilter: `blur(${isAnimating ? "8px" : "0px"})`,
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {/* Animated background particles */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "4px",
                height: "4px",
                background: "rgba(255, 255, 255, 0.3)",
                borderRadius: "50%",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${
                  3 + Math.random() * 4
                }s ease-in-out infinite ${Math.random() * 2}s`,
                opacity: isAnimating ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            />
          ))}
        </div>

        {/* Modal Container */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "24px",
            boxShadow: isAnimating
              ? "0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            maxHeight: "90vh",
            overflowY: "auto",
            width: "100%",
            ...sizeStyles,
            zIndex: 51,
            transform: isAnimating
              ? "scale(1) translateY(0)"
              : "scale(0.9) translateY(20px)",
            opacity: isAnimating ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Decorative gradient border */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "2rem 2rem 1rem 2rem",
              borderBottom: "1px solid rgba(229, 231, 235, 0.3)",
              position: "relative",
            }}
          >
            {/* Header background decoration */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "200px",
                height: "100px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                opacity: 0.05,
                borderRadius: "50%",
                transform: "translate(50px, -25px)",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                }}
              >
                <Sparkles
                  style={{ width: "20px", height: "20px", color: "white" }}
                />
              </div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {title}
              </h2>
            </div>

            <button
              onClick={onClose}
              style={{
                padding: "0.75rem",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "rgba(243, 244, 246, 0.8)",
                cursor: "pointer",
                color: "#6b7280",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                e.target.style.color = "#ef4444";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "rgba(243, 244, 246, 0.8)";
                e.target.style.color = "#6b7280";
                e.target.style.transform = "scale(1)";
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              padding: "2rem",
              position: "relative",
            }}
          >
            {/* Content background decoration */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "150px",
                height: "150px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                opacity: 0.03,
                borderRadius: "50%",
                transform: "translate(-50px, 50px)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes fadeOutScale {
            0% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
            100% {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
          }
          
          /* Custom scrollbar for modal content */
          .modal-content::-webkit-scrollbar {
            width: 6px;
          }
          
          .modal-content::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
          }
          
          .modal-content::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
          }
          
          .modal-content::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          }
          
          /* Hide scrollbar for Firefox */
          .modal-content {
            scrollbar-width: thin;
            scrollbar-color: #667eea rgba(0, 0, 0, 0.05);
          }
          
          /* Responsive adjustments */
          @media (max-width: 640px) {
            .modal-responsive {
              margin: 0.5rem !important;
              border-radius: 16px !important;
              max-height: 95vh !important;
            }
            
            .modal-header {
              padding: 1.5rem 1rem 0.75rem 1rem !important;
            }
            
            .modal-content-padding {
              padding: 1.5rem 1rem !important;
            }
          }
          
          /* Smooth transitions for all elements */
          * {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}
      </style>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
