import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
  User,
  Flag,
  CheckSquare,
  PlayCircle,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  Activity,
  Target,
  Users,
  Eye,
  Share2,
  Star,
  Bookmark,
  MoreVertical,
  FileText,
  Tag,
} from "lucide-react";
import { taskService } from "../../services/taskService";
import useAuthStore from "../../store/authStore";
import Modal from "../common/Modal";
import TaskForm from "./TaskForm";
import CommentList from "../comments/CommentList";
import {
  formatRelativeTime,
  formatDate,
  getInitials,
} from "../../utils/helpers";
import toast from "react-hot-toast";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTaskDetails();
    }
  }, [id]);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTask(id);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
      if (error.response?.status === 404) {
        navigate("/tasks");
        toast.error("Task not found");
      } else {
        toast.error("Failed to load task details");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (formData) => {
    try {
      setUpdating(true);
      await taskService.updateTask(id, formData);
      toast.success("Task updated successfully! 🎉");
      setShowEditModal(false);
      fetchTaskDetails();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      setDeleting(true);
      await taskService.deleteTask(id);
      toast.success("Task deleted successfully! 🗑️");
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "todo":
        return {
          icon: CheckSquare,
          color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          bgColor: "rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(59, 130, 246, 0.2)",
          textColor: "#1e40af",
          label: "To Do",
        };
      case "in-progress":
        return {
          icon: PlayCircle,
          color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          bgColor: "rgba(245, 158, 11, 0.1)",
          borderColor: "rgba(245, 158, 11, 0.2)",
          textColor: "#92400e",
          label: "In Progress",
        };
      case "completed":
        return {
          icon: CheckCircle,
          color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          bgColor: "rgba(16, 185, 129, 0.1)",
          borderColor: "rgba(16, 185, 129, 0.2)",
          textColor: "#065f46",
          label: "Completed",
        };
      default:
        return {
          icon: Clock,
          color: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
          bgColor: "rgba(107, 114, 128, 0.1)",
          borderColor: "rgba(107, 114, 128, 0.2)",
          textColor: "#374151",
          label: "Unknown",
        };
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case "low":
        return {
          color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          bgColor: "rgba(16, 185, 129, 0.1)",
          textColor: "#065f46",
          label: "Low Priority",
        };
      case "medium":
        return {
          color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          bgColor: "rgba(245, 158, 11, 0.1)",
          textColor: "#92400e",
          label: "Medium Priority",
        };
      case "high":
        return {
          color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          bgColor: "rgba(239, 68, 68, 0.1)",
          textColor: "#991b1b",
          label: "High Priority",
        };
      default:
        return {
          color: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
          bgColor: "rgba(107, 114, 128, 0.1)",
          textColor: "#374151",
          label: "Unknown",
        };
    }
  };

  const canEditTask = () => {
    if (!task || !user) return false;
    // User can edit if they are the assignee, project owner, or have admin role
    return task.assignedTo === user.id || task.project?.ownerId === user.id;
  };

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
            Loading task details...
          </p>
        </div>
      </div>
    );
  }

  if (!task) {
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
            Task not found
          </p>
          <Link to="/projects/:id">
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

  const statusInfo = getStatusInfo(task.status);
  const priorityInfo = getPriorityInfo(task.priority);
  const StatusIcon = statusInfo.icon;

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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header Section */}
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

          {/* Status color bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background: statusInfo.color,
              borderRadius: "32px 32px 0 0",
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
              marginTop: "1rem",
            }}
          >
            {/* Left section */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "2rem",
                flex: 1,
                minWidth: "0",
              }}
            >
              {/* Back button */}
              <Link to="/tasks">
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
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(102, 126, 234, 0.1)";
                    e.currentTarget.style.color = "#667eea";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(243, 244, 246, 0.8)";
                    e.currentTarget.style.color = "#374151";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              </Link>

              {/* Task info */}
              <div style={{ flex: 1, minWidth: "0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "900",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      margin: 0,
                      lineHeight: 1.1,
                      flex: 1,
                      minWidth: "0",
                      wordBreak: "break-word",
                    }}
                  >
                    {task.title}
                  </h1>

                  {/* Status Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      background: statusInfo.color,
                      color: "white",
                      borderRadius: "20px",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      flexShrink: 0,
                    }}
                  >
                    <StatusIcon size={16} />
                    {statusInfo.label}
                  </div>
                </div>

                {/* Task meta */}
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
                    Created {formatRelativeTime(task.createdAt)}
                  </div>

                  {task.assignee && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#6b7280",
                        fontSize: "0.875rem",
                      }}
                    >
                      <User size={16} />
                      Assigned to{" "}
                      {task.assignee.firstName && task.assignee.lastName
                        ? `${task.assignee.firstName} ${task.assignee.lastName}`
                        : task.assignee.username}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    <Flag size={16} />
                    {priorityInfo.label}
                  </div>

                  {task.project && (
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
                      {task.project.name}
                    </div>
                  )}
                </div>

                {/* Task description */}
                {task.description && (
                  <div
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "rgba(248, 250, 252, 0.8)",
                      borderRadius: "16px",
                      border: "1px solid rgba(226, 232, 240, 0.5)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#374151",
                        margin: "0 0 0.75rem 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <FileText size={16} />
                      Description
                    </h3>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        margin: 0,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {task.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right section - Action buttons */}
            {canEditTask() && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  flexShrink: 0,
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

        {/* Task Details Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Priority Card */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "80px",
                height: "80px",
                background: priorityInfo.color,
                opacity: 0.1,
                borderRadius: "50%",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background: priorityInfo.color,
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <Flag
                  style={{ width: "24px", height: "24px", color: "white" }}
                />
              </div>

              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1f2937",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Priority Level
              </h3>

              <p
                style={{
                  color: "#6b7280",
                  fontSize: "1rem",
                  margin: "0 0 1rem 0",
                }}
              >
                Task priority classification
              </p>

              <div
                style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: priorityInfo.bgColor,
                  borderRadius: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: priorityInfo.textColor,
                  }}
                >
                  {priorityInfo.label}
                </span>
              </div>
            </div>
          </div>

          {/* Assignee Card */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                opacity: 0.1,
                borderRadius: "50%",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <User
                  style={{ width: "24px", height: "24px", color: "white" }}
                />
              </div>

              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1f2937",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Assigned To
              </h3>

              <p
                style={{
                  color: "#6b7280",
                  fontSize: "1rem",
                  margin: "0 0 1rem 0",
                }}
              >
                Task responsibility
              </p>

              {task.assignee ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
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
                      task.assignee.firstName,
                      task.assignee.lastName,
                      task.assignee.username
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#6b21a8",
                        margin: "0 0 0.25rem 0",
                      }}
                    >
                      {task.assignee.firstName && task.assignee.lastName
                        ? `${task.assignee.firstName} ${task.assignee.lastName}`
                        : task.assignee.username}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#8b5cf6",
                        margin: 0,
                      }}
                    >
                      {task.assignee.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(156, 163, 175, 0.1)",
                    borderRadius: "12px",
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    fontStyle: "italic",
                  }}
                >
                  Unassigned
                </div>
              )}
            </div>
          </div>

          {/* Timeline Card */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                opacity: 0.1,
                borderRadius: "50%",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <Clock
                  style={{ width: "24px", height: "24px", color: "white" }}
                />
              </div>

              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1f2937",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Timeline
              </h3>

              <p
                style={{
                  color: "#6b7280",
                  fontSize: "1rem",
                  margin: "0 0 1rem 0",
                }}
              >
                Task activity history
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    color: "#374151",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#10b981",
                      borderRadius: "50%",
                    }}
                  />
                  <strong>Created:</strong> {formatDate(task.createdAt)}
                </div>

                {task.updatedAt !== task.createdAt && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#374151",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#f59e0b",
                        borderRadius: "50%",
                      }}
                    />
                    <strong>Updated:</strong> {formatDate(task.updatedAt)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "2rem 2rem 0 2rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
              }}
            >
              Discussion
            </h2>

            <button
              onClick={() => setShowComments(!showComments)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                backgroundColor: "rgba(102, 126, 234, 0.1)",
                color: "#667eea",
                border: "none",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <MessageSquare size={16} />
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
          </div>

          {showComments && (
            <div style={{ padding: "0 2rem 2rem 2rem" }}>
              <CommentList entityType="task" entityId={task.id} />
            </div>
          )}
        </div>

        {/* Modals */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Task"
          size="md"
        >
          <TaskForm
            task={task}
            onSubmit={handleUpdateTask}
            onCancel={() => setShowEditModal(false)}
            loading={updating}
          />
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Task"
          size="sm"
        >
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
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
              <AlertTriangle
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
              Delete "{task.title}"?
            </h3>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "2rem",
                lineHeight: 1.6,
              }}
            >
              This action cannot be undone. The task and all its data will be
              permanently deleted.
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
                disabled={deleting}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: deleting ? "not-allowed" : "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTask}
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
                    Delete Task
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>

        {/* CSS Animations */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default TaskDetail;
