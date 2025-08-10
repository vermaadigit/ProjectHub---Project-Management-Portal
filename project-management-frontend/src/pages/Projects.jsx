import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Calendar,
  User,
  Sparkles,
  TrendingUp,
  Clock,
  FolderOpen,
  ArrowUpDown,
  Star,
  Activity,
  Users,
  Target,
  Zap,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { projectService } from "../services/projectService";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectForm from "../components/projects/ProjectForm";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
import { PAGINATION_DEFAULTS } from "../utils/constants";
import { debounce, formatRelativeTime, getStatusColor } from "../utils/helpers";
import toast from "react-hot-toast";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [pagination, setPagination] = useState({
    page: PAGINATION_DEFAULTS.PAGE,
    limit: PAGINATION_DEFAULTS.LIMIT,
    totalPages: 0,
    totalItems: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    sort: "createdAt",
    order: "desc",
  });

  const debouncedSearch = debounce((searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, 300);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };

      const response = await projectService.getProjects(params);
      setProjects(response.data || []);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.pagination?.totalPages || 0,
        totalItems: response.pagination?.totalItems || 0,
      }));
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [pagination.page, pagination.limit, filters]);

  const handleCreateProject = async (formData) => {
    try {
      setCreating(true);
      await projectService.createProject(formData);
      toast.success("Project created successfully! 🎉");
      setShowCreateModal(false);
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSortChange = (field) => {
    setFilters((prev) => ({
      ...prev,
      sort: field,
      order: prev.sort === field && prev.order === "desc" ? "asc" : "desc",
    }));
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const filterOptions = [
    { value: "all", label: "All Projects", color: "#6b7280" },
    { value: "active", label: "Active", color: "#10b981" },
    { value: "on-hold", label: "On Hold", color: "#f59e0b" },
    { value: "completed", label: "Completed", color: "#3b82f6" },
  ];

  const sortOptions = [
    { value: "createdAt", label: "Date Created", icon: Calendar },
    { value: "name", label: "Project Name", icon: User },
    { value: "updatedAt", label: "Last Updated", icon: Clock },
  ];

  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter((project) => project.status === selectedFilter);

  const projectStats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    completed: projects.filter((p) => p.status === "completed").length,
    onHold: projects.filter((p) => p.status === "on-hold").length,
  };

  if (loading && projects.length === 0) {
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
            Loading your amazing projects...
          </p>
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
          {/* Animated background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.3,
              animation: "float 6s ease-in-out infinite",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 28px rgba(102, 126, 234, 0.3)",
                  position: "relative",
                }}
              >
                <FolderOpen
                  style={{ width: "36px", height: "36px", color: "white" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    width: "24px",
                    height: "24px",
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    border: "2px solid white",
                  }}
                >
                  {projectStats.total}
                </div>
              </div>

              <div>
                <h1
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: "900",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    margin: "0 0 0.5rem 0",
                    lineHeight: 1.1,
                  }}
                >
                  All Projects
                </h1>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "1.25rem",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  Manage and organize your project portfolio with style
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 1.5rem",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "0 8px 16px rgba(16, 185, 129, 0.3)",
                }}
              >
                <Activity size={20} />
                <div>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {projectStats.active}
                  </p>
                  <p style={{ fontSize: "0.875rem", margin: 0, opacity: 0.9 }}>
                    Active
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 1.5rem",
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)",
                }}
              >
                <Target size={20} />
                <div>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {projectStats.completed}
                  </p>
                  <p style={{ fontSize: "0.875rem", margin: 0, opacity: 0.9 }}>
                    Done
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Controls Panel */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto auto",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            {/* Enhanced Search Bar */}
            <div style={{ position: "relative" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                  color: "#9ca3af",
                  zIndex: 1,
                }}
              />
              <input
                type="text"
                placeholder="Search projects, descriptions, or tags..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  width: "100%",
                  paddingLeft: "3.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  backgroundColor: "rgba(248, 250, 252, 0.8)",
                  border: "2px solid rgba(226, 232, 240, 0.5)",
                  borderRadius: "20px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 4px rgba(102, 126, 234, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "rgba(248, 250, 252, 0.8)";
                  e.target.style.borderColor = "rgba(226, 232, 240, 0.5)";
                  e.target.style.boxShadow = "none";
                  e.target.style.transform = "translateY(0)";
                }}
              />
              {searchTerm && (
                <div
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "0.25rem 0.75rem",
                    backgroundColor: "#667eea",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {filteredProjects.length} found
                </div>
              )}
            </div>

            {/* Filter Pills */}
            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(243, 244, 246, 0.8)",
                borderRadius: "16px",
                padding: "0.5rem",
                gap: "0.25rem",
              }}
            >
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor:
                      selectedFilter === option.value
                        ? option.color
                        : "transparent",
                    color:
                      selectedFilter === option.value ? "white" : "#6b7280",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div style={{ position: "relative" }}>
              <select
                value={filters.sort}
                onChange={(e) => handleSortChange(e.target.value)}
                style={{
                  padding: "1rem 3.5rem 1rem 3rem",
                  backgroundColor: "rgba(248, 250, 252, 0.8)",
                  border: "2px solid rgba(226, 232, 240, 0.5)",
                  borderRadius: "16px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  minWidth: "180px",
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.25em 1.25em",
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  pointerEvents: "none",
                }}
              >
                <ArrowUpDown
                  style={{ width: "16px", height: "16px", color: "#667eea" }}
                />
                {filters.order === "desc" ? (
                  <SortDesc
                    style={{ width: "14px", height: "14px", color: "#6b7280" }}
                  />
                ) : (
                  <SortAsc
                    style={{ width: "14px", height: "14px", color: "#6b7280" }}
                  />
                )}
              </div>
            </div>

            {/* View Toggle & Create Button */}
            <div
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgba(243, 244, 246, 0.8)",
                  borderRadius: "12px",
                  padding: "0.25rem",
                }}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    padding: "0.75rem",
                    backgroundColor:
                      viewMode === "grid" ? "#667eea" : "transparent",
                    color: viewMode === "grid" ? "white" : "#6b7280",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    padding: "0.75rem",
                    backgroundColor:
                      viewMode === "list" ? "#667eea" : "transparent",
                    color: viewMode === "list" ? "white" : "#6b7280",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <List size={18} />
                </button>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 1.5rem",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-3px) scale(1.02)";
                  e.target.style.boxShadow =
                    "0 12px 24px rgba(102, 126, 234, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow =
                    "0 8px 16px rgba(102, 126, 234, 0.3)";
                }}
              >
                <Plus size={20} />
                New Project
              </button>
            </div>
          </div>
        </div>

        {/* Projects Content */}
        {loading ? (
          <ProjectsSkeleton />
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            selectedFilter={selectedFilter}
            onClearSearch={() => {
              setSearchTerm("");
              setFilters((prev) => ({ ...prev, search: "" }));
            }}
            onClearFilter={() => setSelectedFilter("all")}
            onCreateProject={() => setShowCreateModal(true)}
          />
        ) : (
          <ProjectsGrid
            projects={filteredProjects}
            viewMode={viewMode}
            searchTerm={searchTerm}
            selectedFilter={selectedFilter}
          />
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "1.5rem",
              marginTop: "2rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.limit}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Create Project Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Project"
          size="md"
        >
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => setShowCreateModal(false)}
            loading={creating}
          />
        </Modal>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .animate-slide-in-left {
            animation: slideInLeft 0.6s ease-out;
          }
          
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          
          @media (max-width: 1024px) {
            .grid-responsive {
              grid-template-columns: 1fr !important;
            }
          }
          
          @media (max-width: 768px) {
            .controls-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            .stats-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
};

// Loading Skeleton Component
const ProjectsSkeleton = () => (
  <div
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: "24px",
      padding: "2rem",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            height: "200px",
            background:
              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
            borderRadius: "16px",
          }}
        />
      ))}
    </div>

    <style>
      {`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}
    </style>
  </div>
);

// Empty State Component
const EmptyState = ({
  searchTerm,
  selectedFilter,
  onClearSearch,
  onClearFilter,
  onCreateProject,
}) => (
  <div
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: "32px",
      padding: "4rem 2rem",
      textAlign: "center",
      boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    }}
  >
    <div
      style={{
        width: "140px",
        height: "140px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 2rem auto",
        boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
        position: "relative",
      }}
    >
      <FolderOpen style={{ width: "70px", height: "70px", color: "white" }} />
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          width: "40px",
          height: "40px",
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "4px solid white",
        }}
      >
        <Search style={{ width: "20px", height: "20px", color: "white" }} />
      </div>
    </div>

    <h3
      style={{
        fontSize: "2rem",
        fontWeight: "700",
        color: "#1f2937",
        margin: "0 0 1rem 0",
      }}
    >
      {searchTerm || selectedFilter !== "all"
        ? "No matching projects"
        : "No projects yet"}
    </h3>

    <p
      style={{
        color: "#6b7280",
        fontSize: "1.2rem",
        margin: "0 0 2.5rem 0",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        lineHeight: 1.6,
      }}
    >
      {searchTerm || selectedFilter !== "all"
        ? `We couldn't find any projects matching your criteria. Try adjusting your search or filters.`
        : "Transform your ideas into reality by creating your first project and organizing your workflow efficiently."}
    </p>

    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "2rem",
      }}
    >
      {(searchTerm || selectedFilter !== "all") && (
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {searchTerm && (
            <button
              onClick={onClearSearch}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 1.5rem",
                backgroundColor: "#f3f4f6",
                color: "#374151",
                border: "none",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Clear Search
            </button>
          )}

          {selectedFilter !== "all" && (
            <button
              onClick={onClearFilter}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 1.5rem",
                backgroundColor: "#e5e7eb",
                color: "#374151",
                border: "none",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Clear Filter
            </button>
          )}
        </div>
      )}

      <button
        onClick={onCreateProject}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem 2.5rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          borderRadius: "16px",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-4px) scale(1.02)";
          e.target.style.boxShadow = "0 12px 32px rgba(102, 126, 234, 0.4)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0) scale(1)";
          e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.3)";
        }}
      >
        <Plus size={22} />
        {searchTerm || selectedFilter !== "all"
          ? "Create New Project"
          : "Create Your First Project"}
      </button>
    </div>

    <div
      style={{
        padding: "1.5rem",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderRadius: "16px",
        border: "1px solid rgba(59, 130, 246, 0.2)",
      }}
    >
      <p
        style={{
          fontSize: "0.875rem",
          color: "#1e40af",
          margin: 0,
          fontWeight: "500",
        }}
      >
        <strong>💡 Pro Tip:</strong> Start with a clear project name and
        description to organize your work effectively
      </p>
    </div>
  </div>
);

// Projects Grid Component
const ProjectsGrid = ({ projects, viewMode, searchTerm, selectedFilter }) => (
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
    {/* Results Header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "2rem",
        paddingBottom: "1rem",
        borderBottom: "2px solid rgba(229, 231, 235, 0.3)",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#1f2937",
            margin: "0 0 0.5rem 0",
          }}
        >
          {searchTerm
            ? "Search Results"
            : selectedFilter !== "all"
            ? `${
                selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)
              } Projects`
            : "All Projects"}
        </h2>
        <p
          style={{
            color: "#6b7280",
            fontSize: "1rem",
            margin: 0,
          }}
        >
          Showing {projects.length} amazing project
          {projects.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 1.25rem",
          backgroundColor: "rgba(102, 126, 234, 0.1)",
          borderRadius: "20px",
          border: "1px solid rgba(102, 126, 234, 0.2)",
        }}
      >
        <Sparkles style={{ width: "18px", height: "18px", color: "#667eea" }} />
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#667eea",
          }}
        >
          {viewMode === "grid" ? "Grid View" : "List View"}
        </span>
      </div>
    </div>

    {/* Projects Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          viewMode === "grid" ? "repeat(auto-fill, minmax(380px, 1fr))" : "1fr",
        gap: "2rem",
      }}
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="animate-fade-in-up"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <ProjectCard project={project} viewMode={viewMode} />
        </div>
      ))}
    </div>
  </div>
);

export default Projects;
