import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Doc } from "@/convex/_generated/dataModel";
import { formatTimestamp, getProjectIcon } from "@/features/projects/utils";

interface ProjectItemProps {
  project: Doc<"projects">;
}

export function ContinueCard({ project }: ProjectItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Last updated</span>
      <Button
        asChild
        variant="outline"
        className="h-auto flex flex-col items-start justify-start p-4 gap-2 bg-background border rounded-none"
      >
        <Link href={`/projects/${project._id}`} className="group">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {getProjectIcon(project, "size-3.5")}
              <span className="font-medium truncate">{project.name}</span>
            </div>
            <ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(project.updatedAt)}
          </span>
        </Link>
      </Button>
    </div>
  );
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Link
      href={`/projects/${project._id}`}
      className="text-sm text-foreground/60 font-medium hover:text-foreground py-1 flex items-center justify-between w-full group"
    >
      <div className="flex items-center gap-2">
        {getProjectIcon(project)}
        <span className="truncate">{project.name}</span>
      </div>
      <span className="text-xs text-muted-foreground group-hover:text-foreground/60 transition-colors">
        {formatTimestamp(project.updatedAt)}
      </span>
    </Link>
  );
}
