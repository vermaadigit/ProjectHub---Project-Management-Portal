import React, { useState } from "react";
import { Trash2, MoreVertical } from "lucide-react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { formatRelativeTime, getInitials } from "../../utils/helpers";
import useAuthStore from "../../store/authStore";

const CommentItem = ({ comment, onDelete }) => {
  const { user } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await onDelete(comment.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setDeleting(false);
    }
  };

  const canDelete = user && user.id === comment.userId;

  return (
    <>
      <div className="flex space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {getInitials(
              comment.author?.firstName,
              comment.author?.lastName,
              comment.author?.username
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-900">
                {comment.author?.firstName && comment.author?.lastName
                  ? `${comment.author.firstName} ${comment.author.lastName}`
                  : comment.author?.username || "Unknown User"}
              </p>
              <span className="text-sm text-gray-500">
                {formatRelativeTime(comment.createdAt)}
              </span>
            </div>

            {canDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      </div>

      {/* Delete Comment Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Comment"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} loading={deleting}>
              Delete Comment
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommentItem;
