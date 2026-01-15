import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../../services/taskService";
import TaskDetailItem from "./TaskDetailItem";
import TaskDetailItemSkeleton from "./TaskDetailItemSkeleton";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskById = async (id) => {
      setLoading(true);
      taskService
        .getTask(id)
        .then(setTask)
        .catch(() => navigate("/app/tasks"));
      setLoading(false);
    };

    (async () => {
      await fetchTaskById(id);
    })();
  }, [id]);

  if (loading && !task) {
    return (
      <main className="flex-1 flex justify-center p-10">
        <TaskDetailItemSkeleton />
      </main>
    );
  }

  if (!task) return null;

  return (
    <main className="flex-1 flex justify-center p-10">
      <TaskDetailItem task={task} />
    </main>
  );
}
