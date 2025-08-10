import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit,
  Trash2,
  User,
  Calendar,
  Clock,
  Flag,
  CheckSquare,
  PlayCircle,
  CheckCircle,
  AlertTriangle,
  MoreVertical,
  Eye,
  Star,
  Sparkles,
  Activity,
  Target,
  ExternalLink,
} from "lucide-react";
import { taskService } from "../../services/taskService";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TaskForm from "./TaskForm";
import {
  formatRelativeTime,
  getStatusColor,
  getPriorityColor,
  getInitials,
} from "../../utils/helpers";
import toast from "react-hot-toast";

const TaskCard = ({ task, onUpdate, showProject = true }) => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleUpdateTask = async (formData) => {
    try {
      setUpdating(true);
      await taskService.updateTask(task.id, formData);
      toast.success("Task updated successfully! 🎉");
      setShowEditModal(false);
      onUpdate && onUpdate();
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
      await taskService.deleteTask(task.id);
      toast.success("Task deleted successfully! 🗑️");
      setShowDeleteModal(false);
      onUpdate && onUpdate();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  // Handle card click to navigate to task detail
  const handleCardClick = (e) => {
    // Don't navigate if clicking on action buttons or modals are open
    if (e.target.closest("button") || showEditModal || showDeleteModal) {
      return;
    }
    navigate(`/projects/${task.projectId}/tasks/${task.id}`);
  };

  // Handle view detail button click
  const handleViewDetail = (e) => {
    e.stopPropagation();
    navigate(`/projects/${task.projectId}/tasks/${task.id}`);
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
          label: "Low",
        };
      case "medium":
        return {
          color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          bgColor: "rgba(245, 158, 11, 0.1)",
          textColor: "#92400e",
          label: "Medium",
        };
      case "high":
        return {
          color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          bgColor: "rgba(239, 68, 68, 0.1)",
          textColor: "#991b1b",
          label: "High",
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

  const statusInfo = getStatusInfo(task.status);
  const priorityInfo = getPriorityInfo(task.priority);
  const StatusIcon = statusInfo.icon;

  return (
    <>
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
          borderRadius: "20px",
          padding: "0",
          border: "1px solid rgba(226, 232, 240, 0.5)",
          boxShadow: isHovered
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          transform: isHovered
            ? "translateY(-8px) scale(1.02)"
            : "translateY(0) scale(1)",
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* Header Section with Status Color */}
        <div
          style={{
            height: "6px",
            background: statusInfo.color,
            borderRadius: "20px 20px 0 0",
          }}
        />

        {/* Background decorations */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "-30px",
            width: "120px",
            height: "120px",
            background: statusInfo.color,
            opacity: 0.03,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* Priority indicator */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "8px",
            height: "8px",
            background: priorityInfo.color,
            borderRadius: "50%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: 2,
          }}
        />

        {/* Click to view indicator */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 0.75rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: "600",
              zIndex: 3,
              animation: "slideInLeft 0.3s ease-out",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
            }}
          >
            <Eye size={12} />
            Click to view details
          </div>
        )}

        {/* Card Content */}
        <div style={{ padding: "1.5rem", position: "relative", zIndex: 1 }}>
          {/* Header with Title and Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1f2937",
                margin: "0",
                lineHeight: 1.4,
                flex: 1,
                paddingRight: "0.75rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {task.title}
            </h3>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "0.25rem",
                opacity: isHovered ? 1 : 0.7,
                transition: "opacity 0.2s ease",
              }}
            >
              {/* View Detail Button */}
              <button
                onClick={handleViewDetail}
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  color: "#8b5cf6",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "rgba(139, 92, 246, 0.2)";
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
                  e.target.style.transform = "scale(1)";
                }}
                title="View Task Details"
              >
                <ExternalLink size={14} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditModal(true);
                }}
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "rgba(59, 130, 246, 0.2)";
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
                  e.target.style.transform = "scale(1)";
                }}
                title="Edit Task"
              >
                <Edit size={14} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  color: "#ef4444",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                  e.target.style.transform = "scale(1)";
                }}
                title="Delete Task"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                margin: "0 0 1.25rem 0",
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {task.description}
            </p>
          )}

          {/* Status and Priority Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
              gap: "0.75rem",
            }}
          >
            {/* Status Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                backgroundColor: statusInfo.bgColor,
                borderRadius: "12px",
                border: `1px solid ${statusInfo.borderColor}`,
                flex: 1,
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  background: statusInfo.color,
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StatusIcon
                  style={{ width: "10px", height: "10px", color: "white" }}
                />
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: statusInfo.textColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {statusInfo.label}
              </span>
            </div>

            {/* Priority Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                backgroundColor: priorityInfo.bgColor,
                borderRadius: "12px",
                border: `1px solid rgba(0, 0, 0, 0.1)`,
              }}
            >
              <Flag
                style={{
                  width: "12px",
                  height: "12px",
                  color: priorityInfo.textColor,
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: priorityInfo.textColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {priorityInfo.label}
              </span>
            </div>
          </div>

          {/* Footer Information */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(229, 231, 235, 0.5)",
            }}
          >
            {/* Project Info */}
            {showProject && task.project && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  borderRadius: "8px",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                }}
              >
                <Target
                  style={{ width: "14px", height: "14px", color: "#8b5cf6" }}
                />
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    color: "#6b21a8",
                  }}
                >
                  {task.project.name}
                </span>
              </div>
            )}

            {/* Bottom Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              {/* Assignee */}
              {task.assignee ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {getInitials(
                      task.assignee.firstName,
                      task.assignee.lastName,
                      task.assignee.username
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    {task.assignee.firstName && task.assignee.lastName
                      ? `${task.assignee.firstName} ${task.assignee.lastName}`
                      : task.assignee.username}
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "rgba(156, 163, 175, 0.3)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User
                      style={{
                        width: "12px",
                        height: "12px",
                        color: "#9ca3af",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      fontStyle: "italic",
                    }}
                  >
                    Unassigned
                  </span>
                </div>
              )}

              {/* Created Date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <Calendar
                  style={{ width: "12px", height: "12px", color: "#9ca3af" }}
                />
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                  }}
                >
                  {formatRelativeTime(task.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: "-2px",
              left: "-2px",
              right: "-2px",
              bottom: "-2px",
              background: statusInfo.color,
              borderRadius: "22px",
              opacity: 0.1,
              pointerEvents: "none",
              zIndex: -1,
            }}
          />
        )}
      </div>

      {/* Edit Task Modal */}
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

      {/* Delete Task Modal */}
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
              boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
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
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                if (!deleting) {
                  e.target.style.backgroundColor = "#e5e7eb";
                }
              }}
              onMouseOut={(e) => {
                if (!deleting) {
                  e.target.style.backgroundColor = "#f3f4f6";
                }
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
                transition: "all 0.2s ease",
                boxShadow: deleting
                  ? "none"
                  : "0 4px 12px rgba(239, 68, 68, 0.3)",
              }}
              onMouseOver={(e) => {
                if (!deleting) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 8px 25px rgba(239, 68, 68, 0.4)";
                }
              }}
              onMouseOut={(e) => {
                if (!deleting) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(239, 68, 68, 0.3)";
                }
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
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default TaskCard;
