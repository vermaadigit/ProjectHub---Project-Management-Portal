import React, { useState } from "react";
import Button from "../common/Button";

const CommentForm = ({ onSubmit, onCancel, loading = false }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Comment content is required");
      return;
    }

    if (content.length > 1000) {
      setError("Comment must be less than 1000 characters");
      return;
    }

    onSubmit(content.trim());
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
    >
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Add Comment
        </label>
        <textarea
          value={content}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          placeholder="Write your comment here..."
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-xs text-gray-500">
          {content.length}/1000 characters
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel} size="sm">
          Cancel
        </Button>
        <Button type="submit" loading={loading} size="sm">
          Add Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
