"use client";

import { UserButton } from "@clerk/nextjs";
import { CloudCheckIcon, LoaderIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Id } from "@/convex/_generated/dataModel";
import {
  useGetProjectById,
  useRenameProject,
} from "@/features/projects/hooks/use-projects";
import { formatTimestamp } from "@/features/projects/utils";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface NavbarProps {
  projectId: Id<"projects">;
}

export function Navbar({ projectId }: NavbarProps) {
  const project = useGetProjectById(projectId);
  const renameProject = useRenameProject();

  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = `${project?.name} | Polaris`;
  }, [project?.name]);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const handleStartRename = () => {
    if (!project) return;
    setName(project.name);
    setIsRenaming(true);
  };

  const handleSubmit = () => {
    if (!project) return;

    setIsRenaming(false);

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === project.name) return;

    renameProject({ id: projectId, name: trimmedName });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsRenaming(false);
    }
  };

  return (
    <header className="flex items-center justify-between gap-x-2 p-2 bg-sidebar border-b">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
          <BreadcrumbList className="gap-0!">
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="flex items-center gap-1.5">
                <Button asChild variant="ghost" className="w-fit! p-1.5! h-7!">
                  <Link href="/" className="flex items-center gap-1.5">
                    <Image src="/logo.svg" alt="" width={20} height={20} />
                    <span
                      className={cn("text-sm font-medium", poppins.className)}
                    >
                      Polaris
                    </span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ml-0! mr-1" />
            <BreadcrumbItem>
              {isRenaming ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => e.currentTarget.select()}
                  onBlur={handleSubmit}
                  onKeyDown={handleKeyDown}
                  className="text-sm bg-transparent text-foreground outline-none focus:ring-1 focus:ring-inset focus:ring-ring font-medium max-w-40 truncate"
                />
              ) : (
                <BreadcrumbPage
                  onClick={handleStartRename}
                  className="text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate"
                >
                  {project?.name ?? "Loading..."}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {project?.importStatus === "importing" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <LoaderIcon className="size-4 text-muted-foreground animate-spin" />
            </TooltipTrigger>
            <TooltipContent>Importing...</TooltipContent>
          </Tooltip>
        ) : (
          project?.updatedAt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <CloudCheckIcon className="size-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Saved {formatTimestamp(project.updatedAt)}
              </TooltipContent>
            </Tooltip>
          )
        )}
      </div>

      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </header>
  );
}
