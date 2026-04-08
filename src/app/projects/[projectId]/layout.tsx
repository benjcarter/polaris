import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import type { Metadata } from "next";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { ProjectLayout } from "@/features/projects/components/project-layout";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ projectId: Id<"projects"> }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { projectId } = await params;

  try {
    const { getToken } = await auth();
    const token = (await getToken()) ?? undefined;
    const project = await fetchQuery(
      api.projects.getProjectById,
      { id: projectId },
      { token },
    );

    return {
      title: project.name,
    };
  } catch {
    return {
      title: "Project",
    };
  }
}

async function Layout({ children, params }: Readonly<LayoutProps>) {
  const { projectId } = await params;

  return <ProjectLayout projectId={projectId}>{children}</ProjectLayout>;
}

export default Layout;
