import React, { useState } from "react";
import {
  UserPlus,
  Users,
  Crown,
  Shield,
  User,
  Mail,
  Search,
  Info,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import { TEAM_ROLES } from "../../utils/constants";

const AddMemberForm = ({ onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    userId: "",
    role: TEAM_ROLES.MEMBER,
  });
  const [errors, setErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    if (!formData.userId) {
      newErrors.userId = "User ID is required";
    } else if (
      !Number.isInteger(Number(formData.userId)) ||
      Number(formData.userId) <= 0
    ) {
      newErrors.userId = "Please enter a valid user ID";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSearching(true);
      try {
        await onSubmit({
          userId: parseInt(formData.userId),
          role: formData.role,
        });
      } finally {
        setIsSearching(false);
      }
    }
  };

  const roleOptions = [
    {
      value: TEAM_ROLES.MEMBER,
      label: "Member",
      icon: User,
      color: "#3b82f6",
      description: "Can view project and participate in discussions",
      permissions: ["View project", "Add comments", "View tasks"],
    },
    {
      value: TEAM_ROLES.ADMIN,
      label: "Admin",
      icon: Shield,
      color: "#f59e0b",
      description: "Can manage tasks, members, and project settings",
      permissions: [
        "All member permissions",
        "Manage tasks",
        "Add/remove members",
        "Edit project",
      ],
    },
    {
      value: TEAM_ROLES.OWNER,
      label: "Owner",
      icon: Crown,
      color: "#ef4444",
      description: "Full control over the project including deletion",
      permissions: [
        "All admin permissions",
        "Delete project",
        "Transfer ownership",
      ],
    },
  ];

  const selectedRole = roleOptions.find((role) => role.value === formData.role);
  const SelectedIcon = selectedRole?.icon || User;

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
            <UserPlus
              style={{ width: "24px", height: "24px", color: "white" }}
            />
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
              Add Team Member
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.875rem",
                margin: 0,
              }}
            >
              Invite someone to collaborate on this project
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
        {/* Info Banner */}
        <div
          style={{
            padding: "1.5rem",
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
            borderRadius: "16px",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Banner decoration */}
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
              opacity: 0.1,
              borderRadius: "50%",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Info style={{ width: "20px", height: "20px", color: "white" }} />
            </div>
            <div>
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#1e40af",
                  margin: "0 0 0.5rem 0",
                }}
              >
                How to find User ID
              </h4>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#1e40af",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                You need to know the User ID of the person you want to add. In a
                real application, this would typically be a user search
                component with email or username lookup.
              </p>
            </div>
          </div>
        </div>

        {/* User ID Input */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            User ID *
          </label>
          <div style={{ position: "relative" }}>
            <Search
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "18px",
                height: "18px",
                color: "#9ca3af",
                zIndex: 1,
              }}
            />
            <input
              type="number"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter user ID (e.g., 123)"
              min="1"
              required
              style={{
                width: "100%",
                paddingLeft: "3rem",
                paddingRight: "1rem",
                paddingTop: "0.875rem",
                paddingBottom: "0.875rem",
                backgroundColor: "rgba(248, 250, 252, 0.8)",
                border: errors.userId
                  ? "2px solid #ef4444"
                  : "2px solid rgba(226, 232, 240, 0.5)",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "500",
                outline: "none",
                transition: "all 0.2s ease",
                backdropFilter: "blur(10px)",
              }}
              onFocus={(e) => {
                if (!errors.userId) {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
              }}
              onBlur={(e) => {
                if (!errors.userId) {
                  e.target.style.borderColor = "rgba(226, 232, 240, 0.5)";
                  e.target.style.boxShadow = "none";
                }
                e.target.style.backgroundColor = "rgba(248, 250, 252, 0.8)";
              }}
            />
            {isSearching && (
              <div
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid rgba(102, 126, 234, 0.3)",
                    borderTop: "2px solid #667eea",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
            )}
          </div>
          {errors.userId && (
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
                {errors.userId}
              </p>
            </div>
          )}
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "1rem",
            }}
          >
            Select Role
          </label>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {roleOptions.map((role) => {
              const RoleIcon = role.icon;
              const isSelected = formData.role === role.value;

              return (
                <label
                  key={role.value}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1.5rem",
                    backgroundColor: isSelected
                      ? "rgba(102, 126, 234, 0.1)"
                      : "rgba(248, 250, 252, 0.8)",
                    border: isSelected
                      ? "2px solid #667eea"
                      : "2px solid rgba(226, 232, 240, 0.5)",
                    borderRadius: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(102, 126, 234, 0.05)";
                      e.currentTarget.style.borderColor = "#667eea";
                    }
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(248, 250, 252, 0.8)";
                      e.currentTarget.style.borderColor =
                        "rgba(226, 232, 240, 0.5)";
                    }
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Selection decoration */}
                  {isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        width: "60px",
                        height: "60px",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        opacity: 0.1,
                        borderRadius: "50%",
                      }}
                    />
                  )}

                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={isSelected}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />

                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: isSelected
                        ? `linear-gradient(135deg, ${role.color} 0%, ${role.color}dd 100%)`
                        : "rgba(156, 163, 175, 0.2)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <RoleIcon
                      style={{
                        width: "24px",
                        height: "24px",
                        color: isSelected ? "white" : "#6b7280",
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          color: isSelected ? "#667eea" : "#374151",
                          margin: 0,
                        }}
                      >
                        {role.label}
                      </h3>
                      {isSelected && (
                        <CheckCircle
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#10b981",
                          }}
                        />
                      )}
                    </div>

                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.875rem",
                        margin: "0 0 1rem 0",
                        lineHeight: 1.5,
                      }}
                    >
                      {role.description}
                    </p>

                    <div>
                      <h4
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          color: "#374151",
                          margin: "0 0 0.5rem 0",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Permissions:
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        {role.permissions.map((permission, index) => (
                          <span
                            key={index}
                            style={{
                              padding: "0.25rem 0.75rem",
                              backgroundColor: isSelected
                                ? "rgba(102, 126, 234, 0.2)"
                                : "rgba(156, 163, 175, 0.2)",
                              color: isSelected ? "#667eea" : "#6b7280",
                              borderRadius: "20px",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Selected Role Summary */}
        {selectedRole && (
          <div
            style={{
              padding: "1.5rem",
              background: `linear-gradient(135deg, ${selectedRole.color}20 0%, ${selectedRole.color}10 100%)`,
              borderRadius: "16px",
              border: `1px solid ${selectedRole.color}40`,
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <SelectedIcon
                style={{
                  width: "20px",
                  height: "20px",
                  color: selectedRole.color,
                }}
              />
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0,
                }}
              >
                Selected: {selectedRole.label}
              </h4>
            </div>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {selectedRole.description}
            </p>
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
            disabled={loading || isSearching}
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
              cursor: loading || isSearching ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              if (!loading && !isSearching) {
                e.target.style.backgroundColor = "#e5e7eb";
              }
            }}
            onMouseOut={(e) => {
              if (!loading && !isSearching) {
                e.target.style.backgroundColor = "#f3f4f6";
              }
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || isSearching}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              background:
                loading || isSearching
                  ? "#9ca3af"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "0.875rem",
              fontWeight: "600",
              cursor: loading || isSearching ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow:
                loading || isSearching
                  ? "none"
                  : "0 4px 12px rgba(102, 126, 234, 0.3)",
            }}
            onMouseOver={(e) => {
              if (!loading && !isSearching) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(102, 126, 234, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading && !isSearching) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 12px rgba(102, 126, 234, 0.3)";
              }
            }}
          >
            {loading || isSearching ? (
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
                {isSearching ? "Searching..." : "Adding..."}
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Add Member
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
        `}
      </style>
    </div>
  );
};

export default AddMemberForm;
