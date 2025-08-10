import React, { useState, useEffect } from "react";
import {
  FileText,
  User,
  Flag,
  CheckSquare,
  Calendar,
  Clock,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  Sparkles,
  Edit3,
  Plus,
} from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import { TASK_STATUS, TASK_PRIORITY } from "../../utils/constants";

const TaskForm = ({
  task,
  projectId,
  teamMembers = [],
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    assignedTo: "",
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || TASK_STATUS.TODO,
        priority: task.priority || TASK_PRIORITY.MEDIUM,
        assignedTo: task.assignedTo || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Task title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        assignedTo: formData.assignedTo || null,
      };
      await onSubmit(submitData);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case TASK_STATUS.TODO:
        return {
          icon: CheckSquare,
          color: "#3b82f6",
          bg: "rgba(59, 130, 246, 0.1)",
          border: "rgba(59, 130, 246, 0.2)",
          label: "To Do",
        };
      case TASK_STATUS.IN_PROGRESS:
        return {
          icon: PlayCircle,
          color: "#f59e0b",
          bg: "rgba(245, 158, 11, 0.1)",
          border: "rgba(245, 158, 11, 0.2)",
          label: "In Progress",
        };
      case TASK_STATUS.COMPLETED:
        return {
          icon: CheckCircle,
          color: "#10b981",
          bg: "rgba(16, 185, 129, 0.1)",
          border: "rgba(16, 185, 129, 0.2)",
          label: "Completed",
        };
      default:
        return {
          icon: CheckSquare,
          color: "#6b7280",
          bg: "rgba(107, 114, 128, 0.1)",
          border: "rgba(107, 114, 128, 0.2)",
          label: "Unknown",
        };
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case TASK_PRIORITY.LOW:
        return {
          icon: Flag,
          color: "#10b981",
          bg: "rgba(16, 185, 129, 0.1)",
          border: "rgba(16, 185, 129, 0.2)",
          label: "Low Priority",
        };
      case TASK_PRIORITY.MEDIUM:
        return {
          icon: Flag,
          color: "#f59e0b",
          bg: "rgba(245, 158, 11, 0.1)",
          border: "rgba(245, 158, 11, 0.2)",
          label: "Medium Priority",
        };
      case TASK_PRIORITY.HIGH:
        return {
          icon: Flag,
          color: "#ef4444",
          bg: "rgba(239, 68, 68, 0.1)",
          border: "rgba(239, 68, 68, 0.2)",
          label: "High Priority",
        };
      default:
        return {
          icon: Flag,
          color: "#6b7280",
          bg: "rgba(107, 114, 128, 0.1)",
          border: "rgba(107, 114, 128, 0.2)",
          label: "Unknown",
        };
    }
  };

  const statusInfo = getStatusInfo(formData.status);
  const priorityInfo = getPriorityInfo(formData.priority);
  const StatusIcon = statusInfo.icon;
  const PriorityIcon = priorityInfo.icon;

  const selectedMember = teamMembers.find(
    (m) => m.userId === formData.assignedTo
  );

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
        borderRadius: "16px",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            {task ? (
              <Edit3
                style={{ width: "24px", height: "24px", color: "white" }}
              />
            ) : (
              <Plus style={{ width: "24px", height: "24px", color: "white" }} />
            )}
          </div>
          <div>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "white",
                margin: "0 0 0.25rem 0",
              }}
            >
              {task ? "Edit Task" : "Create New Task"}
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.875rem",
                margin: 0,
              }}
            >
              {task
                ? "Update task details and assignments"
                : "Add a new task to organize your project work"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
        {/* Task Title */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FileText
              style={{ width: "16px", height: "16px", color: "#667eea" }}
            />
            Task Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            onFocus={() => setFocusedField("title")}
            onBlur={() => setFocusedField(null)}
            placeholder="Enter a clear and descriptive task title"
            required
            style={{
              width: "100%",
              padding: "1rem 1.25rem",
              backgroundColor: "rgba(248, 250, 252, 0.8)",
              border: errors.title
                ? "2px solid #ef4444"
                : focusedField === "title"
                ? "2px solid #667eea"
                : "2px solid rgba(226, 232, 240, 0.5)",
              borderRadius: "12px",
              fontSize: "0.875rem",
              fontWeight: "500",
              outline: "none",
              transition: "all 0.2s ease",
              backdropFilter: "blur(10px)",
              boxShadow:
                focusedField === "title"
                  ? "0 0 0 3px rgba(102, 126, 234, 0.1)"
                  : "none",
            }}
          />
          {errors.title && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <AlertCircle
                style={{ width: "16px", height: "16px", color: "#ef4444" }}
              />
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  margin: 0,
                }}
              >
                {errors.title}
              </p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: formData.title?.length > 180 ? "#ef4444" : "#9ca3af",
              }}
            >
              {formData.title?.length || 0}/200
            </span>
          </div>
        </div>

        {/* Task Description */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FileText
              style={{ width: "16px", height: "16px", color: "#667eea" }}
            />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            onFocus={() => setFocusedField("description")}
            onBlur={() => setFocusedField(null)}
            placeholder="Provide detailed information about this task, requirements, and expectations..."
            rows={4}
            style={{
              width: "100%",
              padding: "1rem 1.25rem",
              backgroundColor: "rgba(248, 250, 252, 0.8)",
              border: errors.description
                ? "2px solid #ef4444"
                : focusedField === "description"
                ? "2px solid #667eea"
                : "2px solid rgba(226, 232, 240, 0.5)",
              borderRadius: "12px",
              fontSize: "0.875rem",
              fontWeight: "500",
              outline: "none",
              transition: "all 0.2s ease",
              backdropFilter: "blur(10px)",
              resize: "vertical",
              minHeight: "100px",
              lineHeight: 1.6,
              boxShadow:
                focusedField === "description"
                  ? "0 0 0 3px rgba(102, 126, 234, 0.1)"
                  : "none",
            }}
          />
          {errors.description && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <AlertCircle
                style={{ width: "16px", height: "16px", color: "#ef4444" }}
              />
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  margin: 0,
                }}
              >
                {errors.description}
              </p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "#9ca3af",
              }}
            >
              Optional but recommended for clarity
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color:
                  formData.description?.length > 900 ? "#ef4444" : "#9ca3af",
              }}
            >
              {formData.description?.length || 0}/1000
            </span>
          </div>
        </div>

        {/* Status and Priority Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Status Selection */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <StatusIcon
                style={{
                  width: "16px",
                  height: "16px",
                  color: statusInfo.color,
                }}
              />
              Task Status
            </label>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                {
                  value: TASK_STATUS.TODO,
                  label: "To Do",
                  icon: CheckSquare,
                  color: "#3b82f6",
                },
                {
                  value: TASK_STATUS.IN_PROGRESS,
                  label: "In Progress",
                  icon: PlayCircle,
                  color: "#f59e0b",
                },
                {
                  value: TASK_STATUS.COMPLETED,
                  label: "Completed",
                  icon: CheckCircle,
                  color: "#10b981",
                },
              ].map((status) => {
                const StatusOptionIcon = status.icon;
                const isSelected = formData.status === status.value;

                return (
                  <label
                    key={status.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "1rem",
                      backgroundColor: isSelected
                        ? `${status.color}20`
                        : "rgba(248, 250, 252, 0.8)",
                      border: isSelected
                        ? `2px solid ${status.color}`
                        : "2px solid rgba(226, 232, 240, 0.5)",
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = `${status.color}10`;
                        e.currentTarget.style.borderColor = status.color;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(248, 250, 252, 0.8)";
                        e.currentTarget.style.borderColor =
                          "rgba(226, 232, 240, 0.5)";
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={isSelected}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: isSelected
                          ? status.color
                          : "rgba(156, 163, 175, 0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <StatusOptionIcon
                        style={{
                          width: "16px",
                          height: "16px",
                          color: isSelected ? "white" : "#6b7280",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: isSelected ? status.color : "#374151",
                      }}
                    >
                      {status.label}
                    </span>
                    {isSelected && (
                      <CheckCircle
                        style={{
                          width: "16px",
                          height: "16px",
                          color: "#10b981",
                          marginLeft: "auto",
                        }}
                      />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Priority Selection */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <PriorityIcon
                style={{
                  width: "16px",
                  height: "16px",
                  color: priorityInfo.color,
                }}
              />
              Priority Level
            </label>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                {
                  value: TASK_PRIORITY.LOW,
                  label: "Low Priority",
                  color: "#10b981",
                },
                {
                  value: TASK_PRIORITY.MEDIUM,
                  label: "Medium Priority",
                  color: "#f59e0b",
                },
                {
                  value: TASK_PRIORITY.HIGH,
                  label: "High Priority",
                  color: "#ef4444",
                },
              ].map((priority) => {
                const isSelected = formData.priority === priority.value;

                return (
                  <label
                    key={priority.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "1rem",
                      backgroundColor: isSelected
                        ? `${priority.color}20`
                        : "rgba(248, 250, 252, 0.8)",
                      border: isSelected
                        ? `2px solid ${priority.color}`
                        : "2px solid rgba(226, 232, 240, 0.5)",
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = `${priority.color}10`;
                        e.currentTarget.style.borderColor = priority.color;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(248, 250, 252, 0.8)";
                        e.currentTarget.style.borderColor =
                          "rgba(226, 232, 240, 0.5)";
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority.value}
                      checked={isSelected}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: isSelected
                          ? priority.color
                          : "rgba(156, 163, 175, 0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Flag
                        style={{
                          width: "16px",
                          height: "16px",
                          color: isSelected ? "white" : "#6b7280",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: isSelected ? priority.color : "#374151",
                      }}
                    >
                      {priority.label}
                    </span>
                    {isSelected && (
                      <CheckCircle
                        style={{
                          width: "16px",
                          height: "16px",
                          color: "#10b981",
                          marginLeft: "auto",
                        }}
                      />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team Assignment */}
        {teamMembers.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <User
                style={{ width: "16px", height: "16px", color: "#667eea" }}
              />
              Assign Task
            </label>

            <div
              style={{
                padding: "1rem",
                backgroundColor: "rgba(248, 250, 252, 0.8)",
                borderRadius: "12px",
                border: "1px solid rgba(226, 232, 240, 0.5)",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                {/* Unassigned option */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: !formData.assignedTo
                      ? "#667eea"
                      : "rgba(156, 163, 175, 0.2)",
                    color: !formData.assignedTo ? "white" : "#6b7280",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                >
                  <input
                    type="radio"
                    name="assignedTo"
                    value=""
                    checked={!formData.assignedTo}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <User style={{ width: "14px", height: "14px" }} />
                  Unassigned
                </label>

                {/* Team members */}
                {teamMembers.map((member) => {
                  const isSelected = formData.assignedTo === member.userId;

                  return (
                    <label
                      key={member.userId}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        backgroundColor: isSelected
                          ? "#667eea"
                          : "rgba(156, 163, 175, 0.2)",
                        color: isSelected ? "white" : "#6b7280",
                        borderRadius: "20px",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor =
                            "rgba(102, 126, 234, 0.2)";
                          e.currentTarget.style.color = "#667eea";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor =
                            "rgba(156, 163, 175, 0.2)";
                          e.currentTarget.style.color = "#6b7280";
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="assignedTo"
                        value={member.userId}
                        checked={isSelected}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: isSelected
                            ? "rgba(255, 255, 255, 0.3)"
                            : "#667eea",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        {member.user.firstName
                          ? member.user.firstName.charAt(0)
                          : member.user.username.charAt(0)}
                      </div>
                      {member.user.firstName && member.user.lastName
                        ? `${member.user.firstName} ${member.user.lastName}`
                        : member.user.username}
                    </label>
                  );
                })}
              </div>
            </div>

            {selectedMember && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "12px",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <CheckCircle
                  style={{ width: "18px", height: "18px", color: "#10b981" }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#065f46",
                      margin: "0 0 0.25rem 0",
                    }}
                  >
                    Assigned to:{" "}
                    {selectedMember.user.firstName &&
                    selectedMember.user.lastName
                      ? `${selectedMember.user.firstName} ${selectedMember.user.lastName}`
                      : selectedMember.user.username}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#047857",
                      margin: 0,
                    }}
                  >
                    {selectedMember.user.email} • {selectedMember.role}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(229, 231, 235, 0.5)",
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.5rem",
              backgroundColor: "#f3f4f6",
              color: "#374151",
              border: "none",
              borderRadius: "12px",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#e5e7eb";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#f3f4f6";
              }
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              background: loading
                ? "#9ca3af"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "0.875rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: loading
                ? "none"
                : "0 4px 12px rgba(102, 126, 234, 0.3)",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(102, 126, 234, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 12px rgba(102, 126, 234, 0.3)";
              }
            }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                {task ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                {task ? <Edit3 size={18} /> : <Plus size={18} />}
                {task ? "Update Task" : "Create Task"}
              </>
            )}
          </button>
        </div>
      </form>

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
              transform: translateY(20px);
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
          
          @media (max-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr !important;
            }
            
            .assignment-chips {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TaskForm;
