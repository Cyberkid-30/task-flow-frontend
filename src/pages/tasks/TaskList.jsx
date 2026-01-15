import { useEffect } from "react";
import { Link } from "react-router-dom";
import TaskSkeleton from "../../components/ui/TaskSkeleton";
import { useTaskStore } from "../../stores/taskStore";
import TaskListItem from "./TaskListItem";

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
        {tasks.map((task) => (
          <TaskListItem task={task} />
        ))}
      </ul>
    </main>
  );
}
