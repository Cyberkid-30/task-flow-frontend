import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle2, Circle } from "lucide-react";

export default function TaskListItem({ task }) {
  return (
    <li key={task.id} className="group">
      <Link
        to={`/app/tasks/${task.id}`}
        className="block bg-form border border-b-color rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-foreground/50"
      >
        <div className="flex items-center gap-4">
          {/* Status Icon */}
          <div className="shrink-0">
            {task.status == "done" ? (
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
                task.completed ? "line-through opacity-60" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-primary/60 mt-1 line-clamp-1">
                {task.description.substring(0, 50)}...
              </p>
            )}
          </div>

          {/* Action Arrow */}
          <div className="shrink-0">
            <div className="bg-foreground/10 group-hover:bg-foreground group-hover:text-white text-foreground rounded-full p-2 transition-all duration-300">
              <ChevronRight className="size-5" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Optional: Task metadata footer */}
        {task.due_date && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-b-color/50">
            {task.due_date && (
              <span className="text-xs text-primary/50">
                Due:{" "}
                {new Date(task.due_date).toLocaleDateString("en-US", {
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
  );
}
