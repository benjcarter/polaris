"use client";

import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
import {
  ContinueCard,
  ProjectItem,
} from "@/features/projects/components/project-item";
import { RECENT_PROJECTS_LIMIT } from "@/features/projects/constants";
import { useGetRecentUserProjects } from "@/features/projects/hooks/use-projects";

interface ProjectsListProps {
  onViewAll: () => void;
}

export function ProjectsList({ onViewAll }: ProjectsListProps) {
  const projects = useGetRecentUserProjects(RECENT_PROJECTS_LIMIT);

  if (projects === undefined) {
    return <Spinner className="size-4 text-ring" />;
  }

  const [mostRecent, ...rest] = projects;

  return (
    <div className="flex flex-col gap-4">
      {mostRecent && <ContinueCard project={mostRecent} />}

      {rest.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              Recent projects
            </span>
            <button
              type="button"
              onClick={onViewAll}
              className="flex items-center gap-2 text-muted-foreground text-xs hover:text-foreground transition-colors"
            >
              <span>View all</span>
              <Kbd className="bg-accent border">&#8984;K</Kbd>
            </button>
          </div>

          <ul className="flex flex-col">
            {rest.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
