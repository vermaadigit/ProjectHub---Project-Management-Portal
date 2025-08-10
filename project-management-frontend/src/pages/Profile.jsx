import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Calendar,
  Edit,
  Save,
  X,
  Shield,
  Activity,
  AlertCircle,
  Award,
  TrendingUp,
  Settings,
  Download,
  Trash2,
  Camera,
  Star,
  MapPin,
  Phone,
  Globe,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { authService } from "../services/authService";
import useAuthStore from "../store/authStore";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Loader from "../components/common/Loader";
import { formatDate, getInitials } from "../utils/helpers";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setAuth } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await authService.getProfile();
      setProfile(response.data);
      setFormData({
        username: response.data.username || "",
        email: response.data.email || "",
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (user) {
        setProfile(user);
        setFormData({
          username: user.username || "",
          email: user.email || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.firstName && formData.firstName.length > 50) {
      newErrors.firstName = "First name must be less than 50 characters";
    }

    if (formData.lastName && formData.lastName.length > 50) {
      newErrors.lastName = "Last name must be less than 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setUpdating(true);
      const response = await authService.updateProfile(formData);
      setAuth(response.data, localStorage.getItem("token"));
      setProfile(response.data);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          backendErrors[err.param] = err.msg;
        });
        setErrors(backendErrors);
        toast.error("Please fix the validation errors");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      username: profile.username || "",
      email: profile.email || "",
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
    });
    setErrors({});
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
        }}
      >
        <Loader text="Loading profile..." />
      </div>
    );
  }

  if (!profile) {
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
          <AlertCircle
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
            Unable to load profile
          </p>
          <button
            onClick={fetchProfile}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 1rem",
        position: "relative",
      }}
    >
      {/* Background decorations */}
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
          pointerEvents: "none",
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
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: "0 0 0.5rem 0",
              }}
            >
              Profile Settings
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "1.1rem",
                margin: 0,
              }}
            >
              Manage your account information and preferences
            </p>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "15px",
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
              <Edit style={{ width: "16px", height: "16px" }} />
              Edit Profile
            </button>
          )}
        </div>

        {/* Main Profile Card */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "0",
            marginBottom: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            overflow: "hidden",
          }}
        >
          {/* Profile Header with Cover */}
          <div
            style={{
              height: "200px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              padding: "2rem",
            }}
          >
            {/* Cover Pattern */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                opacity: 0.3,
              }}
            />

            {/* Profile Avatar */}
            <div
              style={{
                width: "120px",
                height: "120px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "2.5rem",
                fontWeight: "800",
                border: "4px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {getInitials(
                profile.firstName,
                profile.lastName,
                profile.username
              )}

              {/* Camera overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "8px",
                  width: "32px",
                  height: "32px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Camera
                  style={{ width: "16px", height: "16px", color: "white" }}
                />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div style={{ padding: "2rem" }}>
            {editing ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "rgba(243, 244, 246, 0.5)",
                      borderRadius: "16px",
                      border: "1px solid rgba(229, 231, 235, 0.5)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginBottom: "1rem",
                      }}
                    >
                      Personal Information
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "1rem",
                        }}
                      >
                        <Input
                          label="First Name"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          error={errors.firstName}
                          placeholder="Enter your first name"
                        />
                        <Input
                          label="Last Name"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          error={errors.lastName}
                          placeholder="Enter your last name"
                        />
                      </div>

                      <Input
                        label="Username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                        placeholder="Enter your username"
                      />

                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "1rem",
                    padding: "1.5rem",
                    backgroundColor: "rgba(249, 250, 251, 0.8)",
                    borderRadius: "16px",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={updating}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "#f3f4f6",
                      color: "#374151",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: updating ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <X style={{ width: "16px", height: "16px" }} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.5rem",
                      background: updating
                        ? "#9ca3af"
                        : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      cursor: updating ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {updating ? (
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save style={{ width: "16px", height: "16px" }} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                {/* User Info */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      {profile.firstName && profile.lastName
                        ? `${profile.firstName} ${profile.lastName}`
                        : profile.username}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.25rem 0.75rem",
                        background:
                          "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        color: "white",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                    >
                      <Award style={{ width: "12px", height: "12px" }} />
                      Verified
                    </div>
                  </div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "1.125rem",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    @{profile.username}
                  </p>
                  <p
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.875rem",
                      margin: 0,
                    }}
                  >
                    Member since{" "}
                    {profile.createdAt
                      ? formatDate(profile.createdAt)
                      : "Unknown"}
                  </p>
                </div>

                {/* Contact Information Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "rgba(59, 130, 246, 0.05)",
                      borderRadius: "16px",
                      border: "1px solid rgba(59, 130, 246, 0.1)",
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
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#3b82f6",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Mail
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "white",
                          }}
                        />
                      </div>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "#1f2937",
                          margin: 0,
                        }}
                      >
                        Email Address
                      </h3>
                    </div>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.875rem",
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      Primary contact method
                    </p>
                    <p
                      style={{
                        color: "#1f2937",
                        fontSize: "1rem",
                        fontWeight: "500",
                        margin: 0,
                      }}
                    >
                      {profile.email}
                    </p>
                  </div>

                  {profile.firstName && (
                    <div
                      style={{
                        padding: "1.5rem",
                        backgroundColor: "rgba(139, 92, 246, 0.05)",
                        borderRadius: "16px",
                        border: "1px solid rgba(139, 92, 246, 0.1)",
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
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#8b5cf6",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <User
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "white",
                            }}
                          />
                        </div>
                        <h3
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "#1f2937",
                            margin: 0,
                          }}
                        >
                          Full Name
                        </h3>
                      </div>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.875rem",
                          margin: "0 0 0.5rem 0",
                        }}
                      >
                        Display name
                      </p>
                      <p
                        style={{
                          color: "#1f2937",
                          fontSize: "1rem",
                          fontWeight: "500",
                          margin: 0,
                        }}
                      >
                        {profile.firstName} {profile.lastName || ""}
                      </p>
                    </div>
                  )}

                  <div
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "rgba(16, 185, 129, 0.05)",
                      borderRadius: "16px",
                      border: "1px solid rgba(16, 185, 129, 0.1)",
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
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#10b981",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Calendar
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "white",
                          }}
                        />
                      </div>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "#1f2937",
                          margin: 0,
                        }}
                      >
                        Account Status
                      </h3>
                    </div>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.875rem",
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      Account type and status
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <p
                        style={{
                          color: "#10b981",
                          fontSize: "1rem",
                          fontWeight: "600",
                          margin: 0,
                        }}
                      >
                        Active Pro Member
                      </p>
                      <Star
                        style={{
                          width: "16px",
                          height: "16px",
                          color: "#f59e0b",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Account Statistics */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
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
                  width: "48px",
                  height: "48px",
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Activity
                  style={{ width: "24px", height: "24px", color: "white" }}
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
                Account Statistics
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "2rem",
                    fontWeight: "800",
                    color: "#3b82f6",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  Projects
                </p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "2rem",
                    fontWeight: "800",
                    color: "#10b981",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  Tasks
                </p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "2rem",
                    fontWeight: "800",
                    color: "#8b5cf6",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  Teams
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "1rem",
                backgroundColor: "rgba(253, 224, 71, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(253, 224, 71, 0.2)",
              }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#92400e",
                  margin: 0,
                }}
              >
                <strong>Note:</strong> Statistics will be populated once you
                start creating projects and tasks.
              </p>
            </div>
          </div>

          {/* Security Section */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
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
                  width: "48px",
                  height: "48px",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Shield
                  style={{ width: "24px", height: "24px", color: "white" }}
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
                Security Settings
              </h3>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  backgroundColor: "rgba(243, 244, 246, 0.8)",
                  borderRadius: "12px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "#1f2937",
                      margin: "0 0 0.25rem 0",
                    }}
                  >
                    Password
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      margin: 0,
                    }}
                  >
                    Last updated: Not available
                  </p>
                </div>
                <button
                  disabled
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#e5e7eb",
                    color: "#9ca3af",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "not-allowed",
                  }}
                >
                  Change Password
                </button>
              </div>

              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderRadius: "12px",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#1e40af",
                    margin: 0,
                  }}
                >
                  <strong>Note:</strong> Password change functionality will be
                  implemented in a future update.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
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
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Settings
                style={{ width: "24px", height: "24px", color: "white" }}
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
              Account Actions
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <button
              disabled
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "1rem",
                backgroundColor: "#f3f4f6",
                color: "#9ca3af",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "not-allowed",
              }}
            >
              <Download style={{ width: "16px", height: "16px" }} />
              Export Account Data
            </button>

            <button
              disabled
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "1rem",
                backgroundColor: "#f3f4f6",
                color: "#9ca3af",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "not-allowed",
              }}
            >
              <Activity style={{ width: "16px", height: "16px" }} />
              Download Activity Report
            </button>

            <button
              disabled
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "1rem",
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "not-allowed",
              }}
            >
              <Trash2 style={{ width: "16px", height: "16px" }} />
              Delete Account
            </button>
          </div>

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                color: "#dc2626",
                margin: 0,
                textAlign: "center",
              }}
            >
              Account management features will be available in future updates
            </p>
          </div>
        </div>
      </div>

      {/* Add spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Profile;
