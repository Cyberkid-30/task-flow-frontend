import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2Icon,
  Pencil,
  Trash2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTaskStore } from "../../stores/taskStore";
import { useUIStore } from "../../stores/uiStore";
import { toTitleCase } from "../../utils/utils";
import { useState } from "react";
import DeleteModal from "../../components/ui/DeleteModal";

export default function TaskDetailItem({ task }) {
  const navigate = useNavigate();
  const addToast = useUIStore((s) => s.addToast);
  const deleteTaskOptimistic = useTaskStore((s) => s.deleteTaskOptimistic);
  const isLoading = useTaskStore((s) => s.isLoading);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 500));
    deleteTaskOptimistic(task.id)
      .then(() => {
        setShowDeleteModal(false);
        addToast({ message: "Task deleted" });
        navigate("/app/tasks");
      })
      .catch(() => {
        addToast({ message: "An error occurred while deleting task" });
        setShowDeleteModal(false);
      });
  };

  return (
    <div className="w-full max-w-3xl">
      {/* Header Section */}
      <div className="bg-form border border-b-color rounded-2xl p-8 shadow-lg">
        {/* Title and Status Badge */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary mb-3">
              {task.title}
            </h1>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  task.status === "completed"
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : task.status === "in_progress"
                    ? "bg-foreground/10 text-foreground"
                    : "bg-b-color/20 text-primary/70"
                }`}
              >
                {task.status === "completed" ? (
                  <CheckCircle2 className="size-4" />
                ) : task.status === "in_progress" ? (
                  <Clock className="size-4" />
                ) : (
                  <AlertCircle className="size-4" />
                )}
                {toTitleCase(task.status)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/app/tasks/${task.id}/edit`)}
              className="bg-foreground/10 hover:bg-foreground text-foreground hover:text-white p-3 rounded-xl transition-all duration-300 group cursor-pointer"
              title="Edit task"
            >
              <Pencil className="size-5" strokeWidth={2} />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={isLoading}
              className="bg-red-500/10 hover:bg-red-500 text-red-600 dark:text-red-400 hover:text-white p-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete task"
            >
              <Trash2 className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <div className="mb-6 p-4 bg-background/50 rounded-xl border border-b-color/50">
            <p className="text-primary/80 leading-relaxed">
              {task.description}
            </p>
          </div>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Due Date Card */}
          <div className="bg-background/30 border border-b-color/50 rounded-xl p-4 hover:border-foreground/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-foreground/10 p-2.5 rounded-lg">
                <Calendar className="size-5 text-foreground" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-primary/60 font-medium uppercase tracking-wide">
                  Due Date
                </p>
                <p className="text-primary font-semibold mt-0.5">
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No due date"}
                </p>
              </div>
            </div>
          </div>

          {/* Owner Card */}
          <div className="bg-background/30 border border-b-color/50 rounded-xl p-4 hover:border-foreground/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-foreground/10 p-2.5 rounded-lg">
                <User className="size-5 text-foreground" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-primary/60 font-medium uppercase tracking-wide">
                  Assigned To
                </p>
                <p className="text-primary font-semibold mt-0.5">
                  {toTitleCase(task.owner.username)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        isLoading={isLoading}
      />
    </div>
  );
}
