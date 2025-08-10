import React, { useState, useEffect } from "react";
import { MessageSquare, Plus } from "lucide-react";
import { commentService } from "../../services/commentService";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import Button from "../common/Button";
import Loader from "../common/Loader";
import toast from "react-hot-toast";

const CommentList = ({ taskId, canComment = true }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (taskId) {
      fetchComments();
    }
  }, [taskId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentService.getComments(taskId);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (content) => {
    try {
      setCreating(true);
      await commentService.createComment(taskId, content);
      toast.success("Comment added successfully!");
      setShowForm(false);
      fetchComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      toast.success("Comment deleted successfully!");
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (loading) {
    return <Loader text="Loading comments..." />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Comments ({comments.length})
        </h3>
        {canComment && !showForm && (
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Comment
          </Button>
        )}
      </div>

      {showForm && (
        <CommentForm
          onSubmit={handleCreateComment}
          onCancel={() => setShowForm(false)}
          loading={creating}
        />
      )}

      {comments.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No comments yet</p>
          {canComment && !showForm && (
            <Button className="mt-4" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Comment
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
