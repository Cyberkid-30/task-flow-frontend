import TaskForm from "./TaskForm";

export default function TaskEdit() {
  return (
    <main className="flex-1 flex items-center justify-center p-10">
      <TaskForm isEdit />
    </main>
  );
}
