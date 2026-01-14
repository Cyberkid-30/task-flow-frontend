import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTaskStore } from "../../stores/taskStore";
import TaskSkeleton from "../../components/ui/TaskSkeleton";
import { ChevronRight, CheckCircle2, Circle } from "lucide-react";

export default function TaskList() {
  const { tasks, loading, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 flex justify-center">
        <ul className="space-y-2 w-full max-w-2xl my-10">
          {[...Array(5)].map((_, i) => (
            <TaskSkeleton key={i} />
          ))}
        </ul>
      </main>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center my-10">
        No tasks yet.{" "}
        <Link
          to="/app/tasks/create"
          className="text-blue-500 underline underline-offset-2"
        >
          Create one.
        </Link>
      </p>
    );
  }

  return (
    <main className="flex-1 flex justify-center p-10">
      <ul className="space-y-3 w-full max-w-3xl my-10">
        {tasks.map((t) => (
          <li key={t.id} className="group">
            <Link
              to={`/app/tasks/${t.id}`}
              className="block bg-form border border-b-color rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-foreground/50"
            >
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div className="shrink-0">
                  {t.status == "done" ? (
                    <CheckCircle2
                      className="size-6 text-foreground"
                      strokeWidth={2}
                    />
                  ) : (
                    <Circle
                      className="size-6 text-b-color group-hover:text-foreground/70 transition-colors"
                      strokeWidth={2}
                    />
                  )}
                </div>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-semibold text-primary group-hover:text-foreground transition-colors ${
                      t.completed ? "line-through opacity-60" : ""
                    }`}
                  >
                    {t.title}
                  </h3>
                  {t.description && (
                    <p className="text-sm text-primary/60 mt-1 line-clamp-1">
                      {t.description}
                    </p>
                  )}
                </div>

                {/* Action Arrow */}
                <div className="flex-shrink-0">
                  <div className="bg-foreground/10 group-hover:bg-foreground group-hover:text-white text-foreground rounded-full p-2 transition-all duration-300">
                    <ChevronRight className="size-5" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Optional: Task metadata footer */}
              {(t.priority || t.due_date) && (
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-b-color/50">
                  {t.priority && (
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        t.priority === "high"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : t.priority === "medium"
                          ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                          : "bg-green-500/10 text-green-600 dark:text-green-400"
                      }`}
                    >
                      {t.priority}
                    </span>
                  )}
                  {t.due_date && (
                    <span className="text-xs text-primary/50">
                      Due:{" "}
                      {new Date(t.due_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
