import React, { useState, useCallback, useMemo } from "react";
import { Save, X, Loader2 } from "lucide-react";

const ProjectForm = ({
  onSubmit,
  onCancel,
  loading = false,
  project = null,
}) => {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    status: project?.status || "active",
  });
  const [errors, setErrors] = useState({});

  // Memoize form validation to prevent re-computation
  const isFormValid = useMemo(() => {
    return (
      formData.name.trim().length >= 3 &&
      formData.description.trim().length >= 10
    );
  }, [formData.name, formData.description]);

  // Use useCallback to prevent re-renders
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear errors when user types
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Project name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm() || loading) return;

      try {
        await onSubmit(formData);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    },
    [formData, loading, validateForm, onSubmit]
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {/* Project Name */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151",
            marginBottom: "0.5rem",
          }}
        >
          Project Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter project name"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: errors.name ? "2px solid #ef4444" : "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "0.875rem",
            outline: "none",
            transition: "border-color 0.2s ease",
            backgroundColor: loading ? "#f9fafb" : "white",
          }}
          onFocus={(e) => {
            if (!errors.name) {
              e.target.style.borderColor = "#3b82f6";
            }
          }}
          onBlur={(e) => {
            if (!errors.name) {
              e.target.style.borderColor = "#e5e7eb";
            }
          }}
        />
        {errors.name && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "0.75rem",
              marginTop: "0.25rem",
            }}
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Project Description */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151",
            marginBottom: "0.5rem",
          }}
        >
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your project..."
          rows={4}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: errors.description
              ? "2px solid #ef4444"
              : "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "0.875rem",
            outline: "none",
            resize: "vertical",
            minHeight: "100px",
            transition: "border-color 0.2s ease",
            backgroundColor: loading ? "#f9fafb" : "white",
          }}
          onFocus={(e) => {
            if (!errors.description) {
              e.target.style.borderColor = "#3b82f6";
            }
          }}
          onBlur={(e) => {
            if (!errors.description) {
              e.target.style.borderColor = "#e5e7eb";
            }
          }}
        />
        {errors.description && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "0.75rem",
              marginTop: "0.25rem",
            }}
          >
            {errors.description}
          </p>
        )}
      </div>

      {/* Project Status */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151",
            marginBottom: "0.5rem",
          }}
        >
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "0.875rem",
            outline: "none",
            backgroundColor: loading ? "#f9fafb" : "white",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <option value="active">Active</option>
          <option value="on-hold">On Hold</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Form Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "0.75rem",
          marginTop: "1rem",
          paddingTop: "1rem",
          borderTop: "1px solid #e5e7eb",
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
            padding: "0.75rem 1rem",
            backgroundColor: "#f3f4f6",
            color: "#374151",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: "500",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <X size={16} />
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !isFormValid}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            background:
              loading || !isFormValid
                ? "#9ca3af"
                : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: loading || !isFormValid ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Save size={16} />
              Create Project
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
