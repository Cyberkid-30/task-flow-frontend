import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../../services/taskService";
import TaskDetailItem from "./TaskDetailItem";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    taskService
      .getTask(id)
      .then(setTask)
      .catch(() => navigate("/app/tasks"));
  }, [id]);

  if (!task) return null;

  return (
    <main className="flex-1 flex justify-center p-10">
      <TaskDetailItem task={task} />
    </main>
  );
}
