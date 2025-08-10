import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Eye,
  Edit,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Star,
  ArrowRight,
} from "lucide-react";
import { formatRelativeTime, getStatusColor } from "../../utils/helpers";

const ProjectCard = ({ project, viewMode = "grid" }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Play size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      case "on-hold":
        return <AlertCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return {
          bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          text: "white",
        };
      case "completed":
        return {
          bg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          text: "white",
        };
      case "on-hold":
        return {
          bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          text: "white",
        };
      default:
        return {
          bg: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
          text: "white",
        };
    }
  };

  const statusInfo = getStatusColor(project.status);

  if (viewMode === "list") {
    return (
      <Link to={`/projects/${project.id}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1.5rem",
            background:
              "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)",
            borderRadius: "16px",
            border: "1px solid rgba(226, 232, 240, 0.5)",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#667eea";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.5)";
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "40px",
                background: statusInfo.bg,
                borderRadius: "6px",
              }}
            />

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
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {project.description}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: statusInfo.bg,
                color: statusInfo.text,
                borderRadius: "20px",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              {getStatusIcon(project.status)}
              {project.status.replace("-", " ").toUpperCase()}
            </div>

            <div
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                textAlign: "right",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Calendar size={14} />
                {formatRelativeTime(project.createdAt)}
              </div>
            </div>

            <ArrowRight
              style={{ width: "20px", height: "20px", color: "#9ca3af" }}
            />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/projects/${project.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
          borderRadius: "20px",
          padding: "0",
          border: "1px solid rgba(226, 232, 240, 0.5)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
          e.currentTarget.style.boxShadow =
            "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
          e.currentTarget.style.borderColor = "#667eea";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.5)";
        }}
      >
        {/* Card Header */}
        <div
          style={{
            height: "80px",
            background: statusInfo.bg,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "white",
            }}
          >
            {getStatusIcon(project.status)}
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {project.status.replace("-", " ")}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Star size={16} />
            <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
              Featured
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div style={{ padding: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#1f2937",
              margin: "0 0 0.75rem 0",
              lineHeight: 1.3,
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              margin: "0 0 1.5rem 0",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description ||
              "No description available for this project."}
          </p>

          {/* Project Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderRadius: "12px",
              }}
            >
              <CheckCircle
                style={{ width: "16px", height: "16px", color: "#3b82f6" }}
              />
              <div>
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#3b82f6",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {project.tasks?.length || 0}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  Tasks
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem",
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Users
                style={{ width: "16px", height: "16px", color: "#8b5cf6" }}
              />
              <div>
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#8b5cf6",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {project.teamMembers?.length || 0}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  Members
                </p>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(229, 231, 235, 0.5)",
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
              <Calendar size={14} />
              {formatRelativeTime(project.createdAt)}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "rgba(102, 126, 234, 0.1)",
                color: "#667eea",
                borderRadius: "20px",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              <Eye size={14} />
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
