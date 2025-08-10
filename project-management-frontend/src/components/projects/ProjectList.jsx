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
} from "lucide-react";
import { projectService } from "../../services/projectService";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import Button from "../common/Button";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Loader from "../common/Loader";
import Pagination from "../common/Pagination";
import { PAGINATION_DEFAULTS } from "../../utils/constants";
import { debounce } from "../../utils/helpers";
import toast from "react-hot-toast";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
      setProjects(response.data);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
      }));
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
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

  const sortOptions = [
    { value: "createdAt", label: "Date Created", icon: Calendar },
    { value: "name", label: "Project Name", icon: User },
    { value: "updatedAt", label: "Last Updated", icon: Clock },
  ];

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
        <Loader text="Loading projects..." />
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
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header Section */}
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
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "300px",
              height: "300px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              opacity: 0.05,
              borderRadius: "50%",
              transform: "translate(100px, -100px)",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
                  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                }}
              >
                <FolderOpen
                  style={{ width: "28px", height: "28px", color: "white" }}
                />
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
                    backgroundClip: "text",
                    margin: "0 0 0.25rem 0",
                    lineHeight: 1.2,
                  }}
                >
                  Projects
                </h1>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "1.1rem",
                    margin: 0,
                  }}
                >
                  Manage and organize your project portfolio
                </p>
              </div>
            </div>

            {/* Stats Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  borderRadius: "15px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                }}
              >
                <TrendingUp size={16} />
                {pagination.totalItems} Total Projects
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                <Plus size={18} />
                New Project
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "1.5rem",
            marginBottom: "2rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {/* Search Bar */}
            <div style={{ position: "relative" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "16px",
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
                placeholder="Search projects by name or description..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  width: "100%",
                  paddingLeft: "3rem",
                  paddingRight: "1rem",
                  paddingTop: "0.875rem",
                  paddingBottom: "0.875rem",
                  backgroundColor: "rgba(243, 244, 246, 0.8)",
                  border: "2px solid rgba(229, 231, 235, 0.5)",
                  borderRadius: "16px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  outline: "none",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "rgba(243, 244, 246, 0.8)";
                  e.target.style.borderColor = "rgba(229, 231, 235, 0.5)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <div style={{ position: "relative" }}>
              <select
                value={filters.sort}
                onChange={(e) => handleSortChange(e.target.value)}
                style={{
                  padding: "0.875rem 3rem 0.875rem 1rem",
                  backgroundColor: "rgba(243, 244, 246, 0.8)",
                  border: "2px solid rgba(229, 231, 235, 0.5)",
                  borderRadius: "16px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  minWidth: "180px",
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.75rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
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
                  left: "12px",
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

            {/* View Mode Toggle */}
            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(243, 244, 246, 0.8)",
                borderRadius: "12px",
                padding: "0.25rem",
                border: "1px solid rgba(229, 231, 235, 0.5)",
              }}
            >
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  padding: "0.5rem",
                  backgroundColor:
                    viewMode === "grid" ? "#667eea" : "transparent",
                  color: viewMode === "grid" ? "white" : "#6b7280",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                style={{
                  padding: "0.5rem",
                  backgroundColor:
                    viewMode === "list" ? "#667eea" : "transparent",
                  color: viewMode === "list" ? "white" : "#6b7280",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || filters.sort !== "createdAt") && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#1e40af",
                  }}
                >
                  Active filters:
                </span>
                {searchTerm && (
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                      color: "#1e40af",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    Search: "{searchTerm}"
                  </span>
                )}
                {filters.sort !== "createdAt" && (
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                      color: "#1e40af",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    Sort:{" "}
                    {
                      sortOptions.find((opt) => opt.value === filters.sort)
                        ?.label
                    }{" "}
                    ({filters.order === "desc" ? "Desc" : "Asc"})
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Projects Content */}
        {loading ? (
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "4rem",
              textAlign: "center",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Loader text="Loading projects..." />
          </div>
        ) : projects.length === 0 ? (
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "24px",
              padding: "4rem 2rem",
              textAlign: "center",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem auto",
                boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
              }}
            >
              <FolderOpen
                style={{ width: "60px", height: "60px", color: "white" }}
              />
            </div>

            <h3
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#1f2937",
                margin: "0 0 1rem 0",
              }}
            >
              {searchTerm ? "No projects match your search" : "No projects yet"}
            </h3>

            <p
              style={{
                color: "#6b7280",
                fontSize: "1.125rem",
                margin: "0 0 2rem 0",
                maxWidth: "500px",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.6,
              }}
            >
              {searchTerm
                ? `We couldn't find any projects matching "${searchTerm}". Try adjusting your search terms.`
                : "Get started by creating your first project and begin organizing your work efficiently."}
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilters((prev) => ({ ...prev, search: "" }));
                  }}
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

              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 2rem",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
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
                <Plus size={20} />
                {searchTerm
                  ? "Create New Project"
                  : "Create Your First Project"}
              </button>
            </div>
          </div>
        ) : (
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
                borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#1f2937",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  {searchTerm ? "Search Results" : "All Projects"}
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    margin: 0,
                  }}
                >
                  Showing {projects.length} of {pagination.totalItems} projects
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(102, 126, 234, 0.1)",
                  borderRadius: "25px",
                }}
              >
                <Sparkles
                  style={{ width: "16px", height: "16px", color: "#667eea" }}
                />
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

            {/* Projects Grid/List */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  viewMode === "grid"
                    ? "repeat(auto-fill, minmax(350px, 1fr))"
                    : "1fr",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <ProjectCard project={project} viewMode={viewMode} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.limit}
                onPageChange={handlePageChange}
              />
            )}
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

        {/* CSS Animations */}
        <style>
          {`
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
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @media (max-width: 768px) {
              .projects-grid {
                grid-template-columns: 1fr !important;
              }
              
              .search-filters {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
              }
            }
            
            @media (max-width: 640px) {
              .header-content {
                flex-direction: column !important;
                text-align: center !important;
              }
              
              .stats-badge {
                flex-direction: column !important;
                width: 100% !important;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ProjectList;
