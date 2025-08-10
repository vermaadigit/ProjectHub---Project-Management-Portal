import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FolderOpen,
  CheckSquare,
  Users,
  MessageSquare,
  Plus,
  TrendingUp,
  Clock,
  Calendar,
  Target,
  Activity,
  Star,
  ArrowRight,
  BarChart3,
  Zap,
  Award,
  Coffee,
} from "lucide-react";
import { projectService } from "../services/projectService";
import useAuthStore from "../store/authStore";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { formatRelativeTime, getStatusColor } from "../utils/helpers";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    recentProjects: [],
    stats: {
      totalProjects: 0,
      activeTasks: 0,
      completedTasks: 0,
      teamMembers: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await projectService.getProjects({ limit: 5 });

      const projects = response.data;
      const stats = {
        totalProjects: response.pagination.totalItems,
        activeTasks: projects.reduce(
          (acc, project) =>
            acc +
            (project.tasks?.filter((task) => task.status !== "completed")
              .length || 0),
          0
        ),
        completedTasks: projects.reduce(
          (acc, project) =>
            acc +
            (project.tasks?.filter((task) => task.status === "completed")
              .length || 0),
          0
        ),
        teamMembers: new Set(
          projects.flatMap(
            (project) =>
              project.teamMembers?.map((member) => member.userId) || []
          )
        ).size,
      };

      setDashboardData({
        recentProjects: projects,
        stats,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✨ FIXED: Stats Cards with proper color definitions
  const statCards = [
    {
      name: "Total Projects",
      value: dashboardData.stats.totalProjects,
      icon: FolderOpen,
      gradient: "#3b82f6, #06b6d4", // Blue to Cyan
      bgColor: "#eff6ff",
      textColor: "#1d4ed8",
      change: "+12%",
      trend: "up",
    },
    {
      name: "Active Tasks",
      value: dashboardData.stats.activeTasks,
      icon: Clock,
      gradient: "#f59e0b, #ea580c", // Amber to Orange
      bgColor: "#fffbeb",
      textColor: "#d97706",
      change: "+8%",
      trend: "up",
    },
    {
      name: "Completed Tasks",
      value: dashboardData.stats.completedTasks,
      icon: CheckSquare,
      gradient: "#10b981, #059669", // Emerald to Green
      bgColor: "#ecfdf5",
      textColor: "#059669",
      change: "+23%",
      trend: "up",
    },
    {
      name: "Team Members",
      value: dashboardData.stats.teamMembers,
      icon: Users,
      gradient: "#8b5cf6, #ec4899", // Purple to Pink
      bgColor: "#faf5ff",
      textColor: "#7c3aed",
      change: "+5%",
      trend: "up",
    },
  ];

  const quickActions = [
    {
      title: "Create New Project",
      description: "Start organizing your next big idea",
      icon: Plus,
      color: "#3b82f6, #1d4ed8", // Blue gradient
      link: "/projects",
      popular: true,
    },
    {
      title: "View Analytics",
      description: "Track your team's performance",
      icon: BarChart3,
      color: "#10b981, #059669", // Green gradient
      link: "/projects",
    },
    {
      title: "Team Management",
      description: "Manage your team members",
      icon: Users,
      color: "#8b5cf6, #7c3aed", // Purple gradient
      link: "/projects",
    },
    {
      title: "Activity Feed",
      description: "See what your team is working on",
      icon: Activity,
      color: "#f59e0b, #d97706", // Orange gradient
      link: "/projects",
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 1rem",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "40%",
            height: "40%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-10%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Welcome Header */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {user?.firstName
                    ? user.firstName.charAt(0)
                    : user?.username?.charAt(0) || "U"}
                </div>
                <div>
                  <h1
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "800",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    Welcome back, {user?.firstName || user?.username}! 👋
                  </h1>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "1.1rem",
                      margin: "0.5rem 0 0 0",
                    }}
                  >
                    Here's what's happening with your projects today
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div
                style={{
                  padding: "0.75rem 1rem",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Award size={16} />
                Pro Member
              </div>
              <div
                style={{
                  padding: "0.75rem 1rem",
                  background: "rgba(67, 56, 202, 0.1)",
                  color: "#4338ca",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Coffee size={16} />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ✨ FIXED: Stats Grid with proper colors and styling */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const [color1, color2] = stat.gradient.split(", ");

            return (
              <div
                key={stat.name}
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "24px",
                  padding: "2rem",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                }}
              >
                {/* ✨ Enhanced Background Decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "150px",
                    height: "150px",
                    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
                    opacity: 0.08,
                    borderRadius: "50%",
                    animation: "float 6s ease-in-out infinite",
                  }}
                />

                {/* ✨ Secondary Decoration */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-30px",
                    left: "-30px",
                    width: "100px",
                    height: "100px",
                    background: `linear-gradient(135deg, ${color2} 0%, ${color1} 100%)`,
                    opacity: 0.05,
                    borderRadius: "50%",
                    animation: "float 4s ease-in-out infinite reverse",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* ✨ Enhanced Icon Container */}
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      boxShadow: `0 8px 25px rgba(${color1
                        .replace("#", "")
                        .match(/.{2}/g)
                        .map((hex) => parseInt(hex, 16))
                        .join(", ")}, 0.3)`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Icon Shine Effect */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-2px",
                        left: "-2px",
                        right: "-2px",
                        bottom: "-2px",
                        background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
                        borderRadius: "22px",
                        animation: "shimmer 3s infinite",
                      }}
                    />
                    <Icon
                      style={{
                        width: "32px",
                        height: "32px",
                        color: "white",
                        position: "relative",
                        zIndex: 1,
                      }}
                    />
                  </div>

                  {/* ✨ Enhanced Stats Display */}
                  <div style={{ marginBottom: "1rem" }}>
                    <h3
                      style={{
                        fontSize: "3rem",
                        fontWeight: "900",
                        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        margin: "0 0 0.5rem 0",
                        lineHeight: 1,
                        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      {stat.value}
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "1rem",
                        fontWeight: "600",
                        margin: "0 0 1rem 0",
                        letterSpacing: "0.025em",
                      }}
                    >
                      {stat.name}
                    </p>
                  </div>

                  {/* ✨ Enhanced Change Indicator */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      background: "rgba(16, 185, 129, 0.1)",
                      borderRadius: "16px",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        background:
                          "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TrendingUp
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "white",
                        }}
                      />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "700",
                          color: "#10b981",
                        }}
                      >
                        {stat.change}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#6b7280",
                          marginLeft: "0.5rem",
                        }}
                      >
                        this month
                      </span>
                    </div>
                  </div>
                </div>

                {/* ✨ Hover Glow Effect */}
                <div
                  style={{
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    right: "-2px",
                    bottom: "-2px",
                    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
                    borderRadius: "26px",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    zIndex: -1,
                  }}
                  className="hover-glow"
                />
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth > 1024 ? "1fr 420px" : "1fr",
            gap: "2rem",
          }}
        >
          {/* Recent Projects */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "2rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FolderOpen
                    style={{ width: "20px", height: "20px", color: "white" }}
                  />
                </div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  Recent Projects
                </h2>
              </div>
              <Link to="/projects">
                <button
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  View All
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            {dashboardData.recentProjects.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: "16px",
                  border: "2px dashed #cbd5e1",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem auto",
                  }}
                >
                  <FolderOpen
                    style={{ width: "40px", height: "40px", color: "white" }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#374151",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  No projects yet
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    marginBottom: "1.5rem",
                  }}
                >
                  Get started by creating your first project
                </p>
                <Link to="/projects">
                  <button
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      padding: "0.75rem 1.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "all 0.2s",
                    }}
                  >
                    <Plus size={16} />
                    Create Project
                  </button>
                </Link>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {dashboardData.recentProjects.map((project, index) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        padding: "1.5rem",
                        background:
                          index % 2 === 0
                            ? "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
                            : "linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%)",
                        borderRadius: "16px",
                        border: "1px solid rgba(203, 213, 225, 0.5)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              fontSize: "1.125rem",
                              fontWeight: "600",
                              color: "#1f2937",
                              margin: "0 0 0.5rem 0",
                            }}
                          >
                            {project.name}
                          </h3>
                          <p
                            style={{
                              color: "#6b7280",
                              fontSize: "0.875rem",
                              margin: "0 0 1rem 0",
                              lineHeight: 1.5,
                            }}
                          >
                            {project.description || "No description available"}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                padding: "0.25rem 0.75rem",
                                background: getStatusColor(
                                  project.status
                                ).includes("green")
                                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                  : getStatusColor(project.status).includes(
                                      "yellow"
                                    )
                                  ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                                  : "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
                                color: "white",
                                borderRadius: "20px",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                textTransform: "uppercase",
                              }}
                            >
                              {project.status.replace("-", " ")}
                            </span>
                            <span
                              style={{
                                color: "#6b7280",
                                fontSize: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                            >
                              <Calendar size={12} />
                              {formatRelativeTime(project.createdAt)}
                            </span>
                            <span
                              style={{
                                color: "#6b7280",
                                fontSize: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                            >
                              <Target size={12} />
                              {project.tasks?.length || 0} tasks
                            </span>
                          </div>
                        </div>
                        <ArrowRight
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#9ca3af",
                            marginLeft: "1rem",
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar with Quick Actions */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Quick Actions */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                padding: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Zap
                    style={{ width: "18px", height: "18px", color: "white" }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  Quick Actions
                </h3>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  const [color1, color2] = action.color.split(", ");

                  return (
                    <Link
                      key={index}
                      to={action.link}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          padding: "1.25rem",
                          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
                          borderRadius: "16px",
                          color: "white",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                          minHeight: "80px",
                          display: "flex",
                          alignItems: "center",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(-3px) scale(1.02)";
                          e.currentTarget.style.boxShadow =
                            "0 12px 24px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(0, 0, 0, 0.15)";
                        }}
                      >
                        {action.popular && (
                          <div
                            style={{
                              position: "absolute",
                              top: "0.75rem",
                              right: "0.75rem",
                              background: "rgba(255, 255, 255, 0.25)",
                              borderRadius: "20px",
                              padding: "0.375rem 0.75rem",
                              fontSize: "0.7rem",
                              fontWeight: "700",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.375rem",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            <Star size={12} />
                            POPULAR
                          </div>
                        )}

                        <div
                          style={{
                            position: "absolute",
                            top: "-20px",
                            right: "-20px",
                            width: "80px",
                            height: "80px",
                            background: "rgba(255, 255, 255, 0.1)",
                            borderRadius: "50%",
                            opacity: 0.7,
                          }}
                        />

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            width: "100%",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              background: "rgba(255, 255, 255, 0.2)",
                              borderRadius: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(255, 255, 255, 0.3)",
                              flexShrink: 0,
                            }}
                          >
                            <Icon style={{ width: "24px", height: "24px" }} />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4
                              style={{
                                fontSize: "1rem",
                                fontWeight: "700",
                                margin: "0 0 0.375rem 0",
                                lineHeight: 1.2,
                                color: "white",
                              }}
                            >
                              {action.title}
                            </h4>
                            <p
                              style={{
                                fontSize: "0.8rem",
                                opacity: 0.9,
                                margin: 0,
                                lineHeight: 1.3,
                                color: "rgba(255, 255, 255, 0.9)",
                              }}
                            >
                              {action.description}
                            </p>
                          </div>

                          <ArrowRight
                            style={{
                              width: "20px",
                              height: "20px",
                              opacity: 0.8,
                              flexShrink: 0,
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Activity Timeline */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                padding: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Activity
                    style={{ width: "18px", height: "18px", color: "white" }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  Recent Activity
                </h3>
              </div>

              <div
                style={{
                  textAlign: "center",
                  padding: "2rem 1rem",
                  color: "#6b7280",
                }}
              >
                <Activity
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto 1rem auto",
                    opacity: 0.5,
                  }}
                />
                <p style={{ fontSize: "0.875rem", margin: 0 }}>
                  Your recent activity will appear here once you start working
                  on projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Enhanced CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(-5px) rotate(-1deg); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .hover-glow:hover {
            opacity: 0.1 !important;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
