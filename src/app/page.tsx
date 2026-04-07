import type { Metadata } from "next";

import { ProjectsView } from "@/features/projects/components/projects-view";

export const metadata: Metadata = {
  title: "Projects | Polaris",
};

function Page() {
  return <ProjectsView />;
}

export default Page;
