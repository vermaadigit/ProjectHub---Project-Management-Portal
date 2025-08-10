import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  FolderOpen,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  Activity,
  Settings,
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import { getInitials } from "../../utils/helpers";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
      if (!event.target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowUserMenu(false);
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Projects", href: "/projects", icon: FolderOpen },
  ];

  const isActiveLink = (href) => {
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Main Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${
            scrolled ? "rgba(229, 231, 235, 0.8)" : "rgba(229, 231, 235, 0.3)"
          }`,
          boxShadow: scrolled
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "4rem",
            }}
          >
            {/* Logo Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  transition: "transform 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
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
                <h1
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "800",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    margin: 0,
                  }}
                >
                  ProjectHub
                </h1>
              </Link>

              {/* Desktop Navigation */}
              <div
                style={{
                  display: "none",
                  "@media (min-width: 768px)": { display: "flex" },
                  gap: "0.5rem",
                  alignItems: "center",
                }}
                className="hidden md:flex"
              >
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveLink(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        background: isActive
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "transparent",
                        color: isActive ? "white" : "#6b7280",
                        boxShadow: isActive
                          ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                          : "none",
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor =
                            "rgba(102, 126, 234, 0.1)";
                          e.currentTarget.style.color = "#667eea";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#6b7280";
                          e.currentTarget.style.transform = "translateY(0)";
                        }
                      }}
                    >
                      <Icon style={{ width: "18px", height: "18px" }} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Search Bar (Desktop) */}
              <div
                style={{
                  display: "none",
                  position: "relative",
                }}
                className="hidden lg:block"
              >
                <div
                  style={{
                    position: "relative",
                    width: "280px",
                  }}
                >
                  <Search
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "18px",
                      height: "18px",
                      color: "#9ca3af",
                      zIndex: 1,
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search projects, tasks..."
                    style={{
                      width: "100%",
                      paddingLeft: "2.5rem",
                      paddingRight: "1rem",
                      paddingTop: "0.625rem",
                      paddingBottom: "0.625rem",
                      backgroundColor: "rgba(243, 244, 246, 0.8)",
                      border: "1px solid rgba(229, 231, 235, 0.5)",
                      borderRadius: "25px",
                      fontSize: "0.875rem",
                      outline: "none",
                      transition: "all 0.2s ease",
                      backdropFilter: "blur(10px)",
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(255, 255, 255, 0.9)";
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(243, 244, 246, 0.8)";
                      e.target.style.borderColor = "rgba(229, 231, 235, 0.5)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Notifications */}
              <button
                style={{
                  position: "relative",
                  padding: "0.75rem",
                  backgroundColor: "rgba(243, 244, 246, 0.8)",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "rgba(102, 126, 234, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "rgba(243, 244, 246, 0.8)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <Bell
                  style={{ width: "18px", height: "18px", color: "#6b7280" }}
                />
                {/* Notification badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#ef4444",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
              </button>

              {/* User Menu (Desktop) */}
              <div
                className="hidden md:block user-menu-container"
                style={{ position: "relative" }}
              >
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.5rem",
                    backgroundColor: "rgba(243, 244, 246, 0.8)",
                    border: "none",
                    borderRadius: "15px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(102, 126, 234, 0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(243, 244, 246, 0.8)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                    }}
                  >
                    {getInitials(
                      user?.firstName,
                      user?.lastName,
                      user?.username
                    )}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.username}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {user?.email}
                    </p>
                  </div>
                  <ChevronDown
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#6b7280",
                      transform: showUserMenu
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      marginTop: "0.5rem",
                      width: "240px",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      borderRadius: "16px",
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      padding: "0.75rem",
                      zIndex: 50,
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem",
                        borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: "#1f2937",
                          margin: "0 0 0.25rem 0",
                        }}
                      >
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.username}
                      </p>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem",
                        borderRadius: "10px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#374151",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        marginBottom: "0.25rem",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(102, 126, 234, 0.1)";
                        e.currentTarget.style.color = "#667eea";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#374151";
                      }}
                    >
                      <User style={{ width: "16px", height: "16px" }} />
                      Profile Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "transparent",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#ef4444",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor =
                          "rgba(239, 68, 68, 0.1)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <LogOut style={{ width: "16px", height: "16px" }} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden mobile-menu-container">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "rgba(243, 244, 246, 0.8)",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "rgba(102, 126, 234, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "rgba(243, 244, 246, 0.8)";
                  }}
                >
                  {isMenuOpen ? (
                    <X
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#6b7280",
                      }}
                    />
                  ) : (
                    <Menu
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#6b7280",
                      }}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "4rem",
            left: 0,
            right: 0,
            zIndex: 40,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(229, 231, 235, 0.3)",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          className="md:hidden"
        >
          <div style={{ padding: "1rem" }}>
            {/* Mobile Search */}
            <div
              style={{
                position: "relative",
                marginBottom: "1rem",
              }}
            >
              <Search
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "18px",
                  height: "18px",
                  color: "#9ca3af",
                  zIndex: 1,
                }}
              />
              <input
                type="text"
                placeholder="Search..."
                style={{
                  width: "100%",
                  paddingLeft: "2.5rem",
                  paddingRight: "1rem",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  backgroundColor: "rgba(243, 244, 246, 0.8)",
                  border: "1px solid rgba(229, 231, 235, 0.5)",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Mobile Navigation Links */}
            <div style={{ marginBottom: "1rem" }}>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "1rem",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      textDecoration: "none",
                      marginBottom: "0.5rem",
                      background: isActive
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "rgba(243, 244, 246, 0.5)",
                      color: isActive ? "white" : "#374151",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Icon style={{ width: "20px", height: "20px" }} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile User Section */}
            <div
              style={{
                padding: "1rem",
                backgroundColor: "rgba(243, 244, 246, 0.5)",
                borderRadius: "16px",
                borderTop: "1px solid rgba(229, 231, 235, 0.5)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {getInitials(user?.firstName, user?.lastName, user?.username)}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 0.25rem 0",
                    }}
                  >
                    {user?.firstName && user?.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user?.username}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      margin: 0,
                    }}
                  >
                    {user?.email}
                  </p>
                </div>
              </div>

              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "10px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  textDecoration: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  marginBottom: "0.5rem",
                  transition: "all 0.2s ease",
                }}
              >
                <User style={{ width: "18px", height: "18px" }} />
                Profile Settings
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#ef4444",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
              >
                <LogOut style={{ width: "18px", height: "18px" }} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div style={{ height: "4rem" }} />
    </>
  );
};

export default Navbar;
