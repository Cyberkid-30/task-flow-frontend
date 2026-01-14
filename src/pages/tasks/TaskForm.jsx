import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  FileEdit,
  FileText,
  ListChecks,
  PlusCircle,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Button from "../../components/ui/Button";
import Input, { SelectStatus } from "../../components/ui/Input";
import Textbox from "../../components/ui/Textbox";
import taskService from "../../services/taskService";
import { getDefaultDate } from "../../utils/utils";

// Validation schema
const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  status: z.enum(["todo", "in-progress", "completed"], {
    errorMap: () => ({ message: "Invalid status" }),
  }),
  due_date: z
    .string()
    .min(1, "Due date is required")
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Due date must be today or in the future" }
    ),
});

export default function TaskForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      due_date: getDefaultDate(),
    },
  });

  useEffect(() => {
    if (isEdit) {
      taskService.getTask(id).then((task) => {
        setValue("title", task.title);
        setValue("description", task.description || "");
        setValue("status", task.status);
        setValue("due_date", task.due_date);
      });
    }
  }, [id, isEdit, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    if (isEdit) await taskService.updateTask(id, data);
    else await taskService.createTask(data);

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
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
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
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
                  {...register("status")}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
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
                <Input id="due_date" type="date" {...register("due_date")} />
                {errors.due_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.due_date.message}
                  </p>
                )}
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
