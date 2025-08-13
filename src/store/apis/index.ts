import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Task,
  Project,
  ProjectResponse,
  TaskCreatePayload,
  ProjectCreatePayload,
} from "@/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Task", "Project"],
  endpoints: (builder) => ({
    // Task Endpoints
    getTasks: builder.query<Task[], void>({
      query: () => "task/",

      providesTags: ["Task"],
    }),

    getTasksByProjectId: builder.query<Task[], string>({
      query: (projectId) => `task/?project_id=${projectId}`,

      providesTags: ["Task"],
    }),
    getTasksByStatus: builder.query<Task[], string>({
      query: (status) => `task/?status-tasks=${status}`,

      providesTags: ["Task"],
    }),
    createTask: builder.mutation<Task, TaskCreatePayload>({
      query: (body) => ({
        url: "task/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `tasks/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    // Project Endpoints
    getProjects: builder.query<Project[], void>({
      query: () => "project/",

      providesTags: ["Project"],
    }),
    createProject: builder.mutation<Project, ProjectCreatePayload>({
      query: (body) => ({
        url: "project/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation<Project, Partial<Project>>({
      query: ({ id, ...patch }) => ({
        url: `project/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation<void, number>({
      query: (id) => ({
        url: `project/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTasksByProjectIdQuery,
  useGetTasksByStatusQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = api;
