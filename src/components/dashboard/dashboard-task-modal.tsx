"use client";

import { FormEvent, useState, useEffect } from "react";
import { useCreateTaskMutation, useGetProjectsQuery } from "@/store/apis";
import type { Task } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardTaskModal() {
  const [addTask, { isLoading, isSuccess, isError, error }] =
    useCreateTaskMutation();

  // Properly typed form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [status, setStatus] = useState<"pending" | "in_progress" | "completed">(
    "pending"
  );
  const [project, setProject] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Reset form on success
  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setPriority("low");
      setStatus("pending");
      setProject("");
      setDueDate(undefined);
    }
  }, [isSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newTask = await addTask({
        title,
        description,
        priority,
        status,
        completed: status === "completed",
        project: project ,
        due_date: dueDate?.toISOString().split("T")[0],
      }).unwrap();
      console.log(project);

      console.log("Task created:", newTask);
    } catch (err) {
      console.error("Failed to save the task:", err);
    }
  };

  const { data } = useGetProjectsQuery();

  const projectItems = data?.map((project) => (
    <SelectItem key={project.id} value={project.id.toString()}>
      {project.title}
    </SelectItem>
  ));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create new task</Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-8 sm:max-w-[425px]">
        {/* Moved the form inside DialogContent */}
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a task</DialogTitle>
            <DialogDescription>
              You can add as many tasks as you want.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Title */}
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Priority */}
            <div className="grid gap-3">
              <Label>Priority</Label>
              <Select
                value={priority}
                onValueChange={(val: "low" | "medium" | "high") =>
                  setPriority(val)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Due Date */}
            <div className="grid gap-3">
              <Label>Due date</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!dueDate}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2" />
                    {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-white w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date || undefined);
                      setIsCalendarOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Status */}
            <div className="grid gap-3">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(val: "pending" | "in_progress" | "completed") =>
                  setStatus(val)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project */}
            <div className="grid gap-3">
              <Label>Project</Label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {projectItems}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="hover:cursor-pointer"
              type="submit"
              disabled={isLoading}
              variant="secondary"
            >
              {isLoading ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>

          {isError && (
            <p className="mt-2 text-sm text-red-600">
              Error saving task: {(error as any)?.message || "Unknown error"}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
