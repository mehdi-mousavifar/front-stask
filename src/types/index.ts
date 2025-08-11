export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  due_date?: string;
  status: "todo" | "in_progress" | "done";
  created_at: string;
  project?: string;
  project_id?: number;
  project_title?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  task_number: number;
  completed_task_number: number;
  pending_task_number: number;
  created_at: string;
}

export interface TaskResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Task[];
}

export interface ProjectResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Project[];
}

export interface ProjectCreatePayload {
  title: string;
  description?: string;
}

export interface TaskCreatePayload {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  status?: "pending" | "in_progress" | "completed";
  completed: boolean; // Add this
  due_date?: string;
  project?: string;
  project_id?: number;
}
