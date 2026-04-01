import { notFound } from "next/navigation";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyPage } from "@/components/shared/CaseStudyPage";

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return { title: "Project Not Found" };

  return {
    title: `${study.title} — Case Study`,
    description: study.subtitle,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    notFound();
  }

  return <CaseStudyPage study={study} />;
}
