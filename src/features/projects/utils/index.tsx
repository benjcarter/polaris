import { formatDistanceToNow } from "date-fns";
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import type { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export function formatTimestamp(timestamp: number) {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}

export function getProjectIcon(
  project: Doc<"projects">,
  sizeClass: string = "size-3.5",
) {
  if (project.importStatus === "completed") {
    return <FaGithub className={cn(sizeClass, "text-muted-foreground")} />;
  }

  if (project.importStatus === "failed") {
    return (
      <AlertCircleIcon className={cn(sizeClass, "text-muted-foreground")} />
    );
  }

  if (project.importStatus === "importing") {
    return (
      <Loader2Icon
        className={cn(sizeClass, "text-muted-foreground animate-spin")}
      />
    );
  }

  return <GlobeIcon className={cn(sizeClass, "text-muted-foreground")} />;
}
