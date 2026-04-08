import type { Id } from "@/convex/_generated/dataModel";
import { ProjectView } from "@/features/projects/components/project-view";

interface PageProps {
  params: Promise<{ projectId: Id<"projects"> }>;
}

async function Page({ params }: PageProps) {
  const { projectId } = await params;

  return <ProjectView projectId={projectId} />;
}

export default Page;
