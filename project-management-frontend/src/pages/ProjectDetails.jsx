import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  Users,
  CheckSquare,
  Clock,
  Calendar,
  MoreVertical,
  Star,
  Award,
  Activity,
  Target,
  TrendingUp,
  Zap,
  Eye,
  FileText,
  Settings,
  Share2,
  Download,
  Bookmark,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { projectService } from "../services/projectService";
import { taskService } from "../services/taskService";
import { teamService } from "../services/teamService";
import useAuthStore from "../store/authStore";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Loader from "../components/common/Loader";
import ProjectForm from "../components/projects/ProjectForm";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import TeamList from "../components/teams/TeamList";
import AddMemberForm from "../components/teams/AddMemberForm";
import {
  formatDate,
  getStatusColor,
  formatRelativeTime,
  getInitials,
} from "../utils/helpers";
import { TASK_STATUS } from "../utils/constants";
import toast from "react-hot-toast";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  // Task filtering
  const [taskFilter, setTaskFilter] = useState("all");

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
      fetchTasks();
      fetchTeamMembers();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await projectService.getProject(id);
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
      if (error.response?.status === 404) {
        navigate("/projects");
        toast.error("Project not found");
      }
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks(id);
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await teamService.getTeamMembers(id);
      setTeamMembers(response.data || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async (formData) => {
    try {
      setUpdating(true);
      await projectService.updateProject(id, formData);
      toast.success("Project updated successfully! 🎉");
      setShowEditModal(false);
      fetchProjectDetails();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      setDeleting(true);
      await projectService.deleteProject(id);
      toast.success("Project deleted successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(id, taskData);
      toast.success("Task created successfully! 🚀");
      setShowTaskModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  const handleAddTeamMember = async (memberData) => {
    try {
      await teamService.addTeamMember(id, memberData);
      toast.success("Team member added successfully! 👥");
      setShowTeamModal(false);
      fetchTeamMembers();
    } catch (error) {
      console.error("Error adding team member:", error);
      toast.error("Failed to add team member");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "all") return true;
    return task.status === taskFilter;
  });

  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === TASK_STATUS.TODO).length,
    "in-progress": tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS)
      .length,
    completed: tasks.filter((t) => t.status === TASK_STATUS.COMPLETED).length,
  };

  const isOwnerOrAdmin = teamMembers.find(
    (member) =>
      member.userId === user?.id && ["owner", "admin"].includes(member.role)
  );

  const getProjectStatusInfo = (status) => {
    switch (status) {
      case "active":
        return {
          color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          icon: Activity,
          label: "Active",
        };
      case "completed":
        return {
          color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          icon: CheckSquare,
          label: "Completed",
        };
      case "on-hold":
        return {
          color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          icon: Clock,
          label: "On Hold",
        };
      default:
        return {
          color: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
          icon: Clock,
          label: "Unknown",
        };
    }
  };

  const projectStatusInfo = getProjectStatusInfo(project?.status);
  const StatusIcon = projectStatusInfo.icon;

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "3rem",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "3px solid rgba(255, 255, 255, 0.3)",
                borderTop: "3px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.1rem",
              margin: 0,
            }}
          >
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "3rem",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(20px)",
          }}
        >
          <AlertTriangle
            style={{
              width: "4rem",
              height: "4rem",
              color: "#ef4444",
              margin: "0 auto 1.5rem auto",
            }}
          />
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.125rem",
              marginBottom: "2rem",
            }}
          >
            Project not found
          </p>
          <Link to="/projects">
            <button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                margin: "0 auto",
                transition: "transform 0.2s ease",
              }}
            >
              <ArrowLeft size={16} />
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "2rem 1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Spectacular Header */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "32px",
            padding: "3rem",
            marginBottom: "2rem",
            boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.3,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Left section */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "2rem",
                flex: 1,
              }}
            >
              {/* Back button */}
              <Link to="/projects">
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(243, 244, 246, 0.8)",
                    color: "#374151",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "rgba(102, 126, 234, 0.1)";
                    e.target.style.color = "#667eea";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "rgba(243, 244, 246, 0.8)";
                    e.target.style.color = "#374151";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              </Link>

              {/* Project info */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "3rem",
                      fontWeight: "900",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      margin: 0,
                      lineHeight: 1.1,
                    }}
                  >
                    {project.name}
                  </h1>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      background: projectStatusInfo.color,
                      color: "white",
                      borderRadius: "20px",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <StatusIcon size={16} />
                    {projectStatusInfo.label}
                  </div>
                </div>

                {/* Project meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    flexWrap: "wrap",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    <Calendar size={16} />
                    Created {formatRelativeTime(project.createdAt)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    <Users size={16} />
                    {teamMembers.length} team member
                    {teamMembers.length !== 1 ? "s" : ""}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    <Target size={16} />
                    {tasks.length} task{tasks.length !== 1 ? "s" : ""}
                  </div>
                </div>

                {/* Project description */}
                {project.description && (
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "1.1rem",
                      lineHeight: 1.6,
                      margin: 0,
                      maxWidth: "600px",
                    }}
                  >
                    {project.description}
                  </p>
                )}
              </div>
            </div>

            {/* Right section - Action buttons */}
            {isOwnerOrAdmin && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <button
                  onClick={() => setShowEditModal(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.25rem",
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(16, 185, 129, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(16, 185, 129, 0.3)";
                  }}
                >
                  <Edit size={16} />
                  Edit
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.25rem",
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(239, 68, 68, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(239, 68, 68, 0.3)";
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Project Stats Dashboard */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {[
            {
              title: "Completed Tasks",
              value: taskCounts.completed,
              icon: CheckSquare,
              color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              bgColor: "rgba(16, 185, 129, 0.1)",
              change: "+12%",
            },
            {
              title: "In Progress",
              value: taskCounts["in-progress"],
              icon: Clock,
              color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              bgColor: "rgba(245, 158, 11, 0.1)",
              change: "+8%",
            },
            {
              title: "To Do",
              value: taskCounts.todo,
              icon: Target,
              color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              bgColor: "rgba(59, 130, 246, 0.1)",
              change: "+5%",
            },
            {
              title: "Team Members",
              value: teamMembers.length,
              icon: Users,
              color: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              bgColor: "rgba(139, 92, 246, 0.1)",
              change: "+3%",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "20px",
                  padding: "2rem",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Background decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "120px",
                    height: "120px",
                    background: stat.color,
                    opacity: 0.1,
                    borderRadius: "50%",
                  }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: stat.color,
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <Icon
                      style={{ width: "28px", height: "28px", color: "white" }}
                    />
                  </div>

                  <h3
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "900",
                      color: "#1f2937",
                      margin: "0 0 0.5rem 0",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </h3>

                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "1rem",
                      fontWeight: "500",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    {stat.title}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <TrendingUp
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#10b981",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#10b981",
                      }}
                    >
                      {stat.change} this month
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tasks Section */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* Tasks header */}
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
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckSquare
                  style={{ width: "24px", height: "24px", color: "white" }}
                />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    color: "#1f2937",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  Project Tasks
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    margin: 0,
                  }}
                >
                  Manage and track task progress
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowTaskModal(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(102, 126, 234, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 12px rgba(102, 126, 234, 0.3)";
              }}
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>

          {/* Task Filters */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(taskCounts).map(([status, count]) => {
              const isActive = taskFilter === status;
              const getFilterColor = (status) => {
                switch (status) {
                  case "completed":
                    return "#10b981";
                  case "in-progress":
                    return "#f59e0b";
                  case "todo":
                    return "#3b82f6";
                  default:
                    return "#667eea";
                }
              };

              return (
                <button
                  key={status}
                  onClick={() => setTaskFilter(status)}
                  style={{
                    padding: "0.75rem 1.25rem",
                    backgroundColor: isActive
                      ? getFilterColor(status)
                      : "rgba(243, 244, 246, 0.8)",
                    color: isActive ? "white" : "#6b7280",
                    border: "none",
                    borderRadius: "25px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    whiteSpace: "nowrap",
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor =
                        "rgba(102, 126, 234, 0.1)";
                      e.target.style.color = "#667eea";
                    }
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor =
                        "rgba(243, 244, 246, 0.8)";
                      e.target.style.color = "#6b7280";
                    }
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  {status === "all"
                    ? "All Tasks"
                    : status.replace("-", " ").toUpperCase()}
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      backgroundColor: isActive
                        ? "rgba(255, 255, 255, 0.2)"
                        : getFilterColor(status),
                      color: isActive ? "white" : "white",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tasks Grid */}
          {filteredTasks.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                borderRadius: "20px",
                border: "2px dashed #cbd5e1",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <CheckSquare
                  style={{ width: "50px", height: "50px", color: "white" }}
                />
              </div>

              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 0.75rem 0",
                }}
              >
                {taskFilter === "all"
                  ? "No tasks yet"
                  : `No ${taskFilter.replace("-", " ")} tasks`}
              </h3>

              <p
                style={{
                  color: "#6b7280",
                  marginBottom: "2rem",
                  fontSize: "1.1rem",
                }}
              >
                {taskFilter === "all"
                  ? "Start by creating your first task to organize the project work"
                  : `No tasks found with status: ${taskFilter.replace(
                      "-",
                      " "
                    )}`}
              </p>

              <button
                onClick={() => setShowTaskModal(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 2rem",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "15px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <Plus size={20} />
                {taskFilter === "all" ? "Create First Task" : "Add New Task"}
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filteredTasks.map((task, index) => (
                <div
                  key={task.id}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <TaskCard
                    task={task}
                    onUpdate={fetchTasks}
                    showProject={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team Section */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* Team header */}
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
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users
                  style={{ width: "24px", height: "24px", color: "white" }}
                />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    color: "#1f2937",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  Team Members
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    margin: 0,
                  }}
                >
                  Collaborate with your team
                </p>
              </div>
            </div>

            {isOwnerOrAdmin && (
              <button
                onClick={() => setShowTeamModal(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 8px 25px rgba(139, 92, 246, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(139, 92, 246, 0.3)";
                }}
              >
                <Plus size={18} />
                Add Member
              </button>
            )}
          </div>

          <TeamList
            members={teamMembers}
            onUpdate={fetchTeamMembers}
            currentUserId={user?.id}
            canManage={!!isOwnerOrAdmin}
          />
        </div>

        {/* Modals */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Project"
          size="md"
        >
          <ProjectForm
            project={project}
            onSubmit={handleUpdateProject}
            onCancel={() => setShowEditModal(false)}
            loading={updating}
          />
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Project"
          size="sm"
        >
          <div
            style={{
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto",
              }}
            >
              <Trash2
                style={{ width: "40px", height: "40px", color: "white" }}
              />
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              Delete "{project.name}"?
            </h3>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "2rem",
                lineHeight: 1.6,
              }}
            >
              This action cannot be undone. All tasks, team members, and project
              data will be permanently deleted.
            </p>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                disabled={deleting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  background: deleting
                    ? "#9ca3af"
                    : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  cursor: deleting ? "not-allowed" : "pointer",
                }}
              >
                {deleting ? (
                  <>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderTop: "2px solid white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Project
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          title="Create New Task"
          size="md"
        >
          <TaskForm
            projectId={id}
            teamMembers={teamMembers}
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskModal(false)}
          />
        </Modal>

        <Modal
          isOpen={showTeamModal}
          onClose={() => setShowTeamModal(false)}
          title="Add Team Member"
          size="sm"
        >
          <AddMemberForm
            onSubmit={handleAddTeamMember}
            onCancel={() => setShowTeamModal(false)}
          />
        </Modal>

        {/* CSS Animations */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            
            @media (max-width: 1024px) {
              .responsive-grid {
                grid-template-columns: 1fr !important;
              }
            }
            
            @media (max-width: 768px) {
              .header-content {
                flex-direction: column !important;
                text-align: center !important;
              }
              
              .stats-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            
            @media (max-width: 640px) {
              .stats-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ProjectDetails;
