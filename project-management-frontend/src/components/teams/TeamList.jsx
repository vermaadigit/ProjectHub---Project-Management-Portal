import React, { useState } from "react";
import {
  Crown,
  Shield,
  User,
  Trash2,
  Mail,
  Calendar,
  MoreVertical,
  Award,
  Activity,
  Clock,
  MapPin,
  Phone,
  Globe,
  Edit,
  UserCheck,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { teamService } from "../../services/teamService";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { getInitials, formatRelativeTime } from "../../utils/helpers";
import toast from "react-hot-toast";

const TeamList = ({ members, onUpdate, currentUserId, canManage = false }) => {
  const [removingMember, setRemovingMember] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);

  const handleRemoveMember = async (memberId) => {
    try {
      setDeleting(true);
      await teamService.removeTeamMember(memberId);
      toast.success("Team member removed successfully! 👋");
      setRemovingMember(null);
      onUpdate && onUpdate();
    } catch (error) {
      console.error("Error removing team member:", error);
      toast.error("Failed to remove team member");
    } finally {
      setDeleting(false);
    }
  };

  const getRoleInfo = (role) => {
    switch (role) {
      case "owner":
        return {
          icon: Crown,
          color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          bgColor: "rgba(245, 158, 11, 0.1)",
          textColor: "#92400e",
          borderColor: "rgba(245, 158, 11, 0.2)",
          label: "Owner",
        };
      case "admin":
        return {
          icon: Shield,
          color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          bgColor: "rgba(59, 130, 246, 0.1)",
          textColor: "#1e40af",
          borderColor: "rgba(59, 130, 246, 0.2)",
          label: "Admin",
        };
      default:
        return {
          icon: User,
          color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          bgColor: "rgba(16, 185, 129, 0.1)",
          textColor: "#065f46",
          borderColor: "rgba(16, 185, 129, 0.2)",
          label: "Member",
        };
    }
  };

  if (members.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem 2rem",
          background:
            "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)",
          borderRadius: "20px",
          border: "2px dashed rgba(203, 213, 225, 0.8)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-25%",
            width: "200px",
            height: "200px",
            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
            opacity: 0.05,
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            width: "100px",
            height: "100px",
            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
            borderRadius: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem auto",
            boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Users style={{ width: "50px", height: "50px", color: "white" }} />
        </div>

        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#374151",
            margin: "0 0 0.75rem 0",
          }}
        >
          No team members yet
        </h3>

        <p
          style={{
            color: "#6b7280",
            fontSize: "1.1rem",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Start building your team by adding collaborators to this project
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {members.map((member, index) => {
          const roleInfo = getRoleInfo(member.role);
          const RoleIcon = roleInfo.icon;
          const isCurrentUser = member.userId === currentUserId;
          const isHovered = hoveredMember === member.id;

          return (
            <div
              key={member.id}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.5rem",
                background: isCurrentUser
                  ? "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
                borderRadius: "16px",
                border: isCurrentUser
                  ? "2px solid rgba(102, 126, 234, 0.2)"
                  : isHovered
                  ? "2px solid rgba(102, 126, 234, 0.3)"
                  : "1px solid rgba(226, 232, 240, 0.5)",
                boxShadow: isHovered
                  ? "0 10px 25px rgba(0, 0, 0, 0.1)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                position: "relative",
                overflow: "hidden",
                animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Background decoration */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "80px",
                  height: "80px",
                  background: roleInfo.color,
                  opacity: 0.05,
                  borderRadius: "50%",
                }}
              />

              {/* Current user indicator */}
              {isCurrentUser && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.25rem 0.75rem",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  <Sparkles size={12} />
                  You
                </div>
              )}

              {/* Left section - User info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flex: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: roleInfo.color,
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {getInitials(
                      member.user.firstName,
                      member.user.lastName,
                      member.user.username
                    )}
                  </div>

                  {/* Online status indicator */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      right: "-2px",
                      width: "16px",
                      height: "16px",
                      backgroundColor: "#10b981",
                      borderRadius: "50%",
                      border: "3px solid white",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>

                {/* User details */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {member.user.firstName && member.user.lastName
                        ? `${member.user.firstName} ${member.user.lastName}`
                        : member.user.username}
                    </h3>

                    {isCurrentUser && (
                      <div
                        style={{
                          padding: "0.25rem 0.5rem",
                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                          color: "#667eea",
                          borderRadius: "8px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                        }}
                      >
                        That's you!
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <Mail style={{ width: "14px", height: "14px" }} />
                    {member.user.email}
                  </div>

                  {/* Member stats */}
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <Calendar style={{ width: "12px", height: "12px" }} />
                      Joined{" "}
                      {member.createdAt
                        ? formatRelativeTime(member.createdAt)
                        : "recently"}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <Activity style={{ width: "12px", height: "12px" }} />
                      Active contributor
                    </div>
                  </div>
                </div>
              </div>

              {/* Right section - Role and actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Role badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: roleInfo.bgColor,
                    borderRadius: "12px",
                    border: `1px solid ${roleInfo.borderColor}`,
                    minWidth: "100px",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      background: roleInfo.color,
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RoleIcon
                      style={{ width: "12px", height: "12px", color: "white" }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: roleInfo.textColor,
                      textTransform: "capitalize",
                    }}
                  >
                    {roleInfo.label}
                  </span>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {/* More options (placeholder) */}
                  <button
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "rgba(243, 244, 246, 0.8)",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      color: "#6b7280",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(102, 126, 234, 0.1)";
                      e.target.style.color = "#667eea";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(243, 244, 246, 0.8)";
                      e.target.style.color = "#6b7280";
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>

                  {/* Remove button */}
                  {canManage &&
                    member.userId !== currentUserId &&
                    member.role !== "owner" && (
                      <button
                        onClick={() => setRemovingMember(member)}
                        style={{
                          padding: "0.5rem",
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          color: "#dc2626",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor =
                            "rgba(239, 68, 68, 0.2)";
                          e.target.style.transform = "scale(1.1)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor =
                            "rgba(239, 68, 68, 0.1)";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Summary */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background:
            "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)",
          borderRadius: "16px",
          border: "1px solid rgba(226, 232, 240, 0.5)",
        }}
      >
        <h4
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#374151",
            margin: "0 0 1rem 0",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Award style={{ width: "18px", height: "18px", color: "#8b5cf6" }} />
          Team Overview
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
          }}
        >
          {["owner", "admin", "member"].map((role) => {
            const count = members.filter((m) => m.role === role).length;
            const roleInfo = getRoleInfo(role);
            const RoleIcon = roleInfo.icon;

            return (
              <div
                key={role}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  backgroundColor: roleInfo.bgColor,
                  borderRadius: "12px",
                  border: `1px solid ${roleInfo.borderColor}`,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: roleInfo.color,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <RoleIcon
                    style={{ width: "16px", height: "16px", color: "white" }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: roleInfo.textColor,
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  {count}
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: roleInfo.textColor,
                    margin: 0,
                    textTransform: "capitalize",
                  }}
                >
                  {role}
                  {count !== 1 ? "s" : ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Remove Member Modal */}
      <Modal
        isOpen={!!removingMember}
        onClose={() => setRemovingMember(null)}
        title="Remove Team Member"
        size="sm"
      >
        {removingMember && (
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
              Remove{" "}
              {removingMember.user.firstName && removingMember.user.lastName
                ? `${removingMember.user.firstName} ${removingMember.user.lastName}`
                : removingMember.user.username}
              ?
            </h3>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "2rem",
                lineHeight: 1.6,
              }}
            >
              This team member will lose access to the project and all its
              contents. This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setRemovingMember(null)}
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
                onClick={() => handleRemoveMember(removingMember.id)}
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
                    Removing...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Remove Member
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @media (max-width: 768px) {
            .team-member-card {
              flex-direction: column !important;
              text-align: center !important;
              gap: 1rem !important;
            }
            
            .team-summary-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
          
          @media (max-width: 640px) {
            .team-summary-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default TeamList;
