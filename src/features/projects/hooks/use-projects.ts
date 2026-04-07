"use client";

import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { RECENT_PROJECTS_LIMIT } from "@/features/projects/constants";

export function useGetUserProjects() {
  return useQuery(api.projects.getUserProjects);
}

export function useGetRecentUserProjects(limit: number) {
  return useQuery(api.projects.getRecentUserProjects, { limit });
}

export function useCreateProject() {
  return useMutation(api.projects.createProject).withOptimisticUpdate(
    (localStore, args) => {
      const existingProjects = localStore.getQuery(
        api.projects.getUserProjects,
      );
      const existingRecentProjects = localStore.getQuery(
        api.projects.getRecentUserProjects,
        { limit: RECENT_PROJECTS_LIMIT },
      );

      const now = Date.now();
      const newProject = {
        _id: crypto.randomUUID() as Id<"projects">,
        _creationTime: now,
        name: args.name,
        ownerId: "anonymous",
        updatedAt: now,
      };

      if (existingProjects !== undefined) {
        localStore.setQuery(api.projects.getUserProjects, {}, [
          newProject,
          ...existingProjects,
        ]);
      }

      if (existingRecentProjects !== undefined) {
        localStore.setQuery(
          api.projects.getRecentUserProjects,
          { limit: RECENT_PROJECTS_LIMIT },
          [newProject, ...existingRecentProjects].slice(
            0,
            RECENT_PROJECTS_LIMIT,
          ),
        );
      }
    },
  );
}
