import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../../services/taskService";
import Input, { SelectStatus } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Textbox from "../../components/ui/Textbox";
import { getDefaultDate } from "../../utils/utils";
import {
  FileEdit,
  PlusCircle,
  Calendar,
  ListChecks,
  FileText,
  X,
} from "lucide-react";

export default function TaskForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    due_date: getDefaultDate(),
  });

  useEffect(() => {
    if (isEdit) taskService.getTask(id).then(setForm);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;

    console.log(form);
    if (isEdit) await taskService.updateTask(id, form);
    else await taskService.createTask(form);

    navigate("/app/tasks");
  };

  return (
    <main className="flex-1 flex justify-center items-start p-10">
      <div className="w-full max-w-2xl">
        {/* Header Card */}
        <div className="bg-linear-to-br from-foreground via-accent-purple to-accent-blue p-6 rounded-t-3xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                {isEdit ? (
                  <FileEdit className="size-7" strokeWidth={2} />
                ) : (
                  <PlusCircle className="size-7" strokeWidth={2} />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {isEdit ? "Edit Task" : "Create New Task"}
                </h2>
                <p className="text-white/90 text-sm mt-0.5">
                  {isEdit
                    ? "Update your task details"
                    : "Fill in the details to create a task"}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/app/tasks")}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors cursor-pointer"
              title="Cancel"
            >
              <X className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-form border border-b-color rounded-b-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="size-4 text-foreground" strokeWidth={2} />
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  Task Title
                </span>
              </div>
              <Input
                id="title"
                placeholder="Enter task title..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="size-4 text-foreground" strokeWidth={2} />
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  Description
                </span>
              </div>
              <Textbox
                id="description"
                placeholder="Describe your task in detail..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Status and Due Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks
                    className="size-4 text-foreground"
                    strokeWidth={2}
                  />
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Status
                  </span>
                </div>
                <SelectStatus
                  name="status"
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                />
              </div>

              {/* Due Date Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar
                    className="size-4 text-foreground"
                    strokeWidth={2}
                  />
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Due Date
                  </span>
                </div>
                <Input
                  id="due_date"
                  type="date"
                  value={form.due_date}
                  onChange={(e) =>
                    setForm({ ...form, due_date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                {isEdit ? (
                  <>
                    <FileEdit className="size-5 mr-2" strokeWidth={2} />
                    Update Task
                  </>
                ) : (
                  <>
                    <PlusCircle className="size-5 mr-2" strokeWidth={2} />
                    Create Task
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/app/tasks")}
                className="flex-1 px-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
