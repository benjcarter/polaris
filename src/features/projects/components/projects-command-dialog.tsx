"use client";

import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetUserProjects } from "@/features/projects/hooks/use-projects";
import { getProjectIcon } from "@/features/projects/utils";

interface ProjectsCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectsCommandDialog = ({
  open,
  onOpenChange,
}: ProjectsCommandDialogProps) => {
  const router = useRouter();
  const projects = useGetUserProjects();

  const handleSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`);
    onOpenChange(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Projects"
      description="Search and navigate to your projects"
    >
      <CommandInput placeholder="Search projects..." />
      <CommandList>
        <CommandEmpty>No projects found</CommandEmpty>
        <CommandGroup heading="Projects">
          {projects?.map((project) => (
            <CommandItem
              key={project._id}
              value={`${project.name}-${project._id}`}
              onSelect={() => handleSelect(project._id)}
            >
              {getProjectIcon(project, "size-4")}
              <span>{project.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
