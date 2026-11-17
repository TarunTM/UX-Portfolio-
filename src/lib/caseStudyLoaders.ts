// Code-split case study pages. Shared by the router (React.lazy) and the
// project cards, which start the download on hover/focus/touch so the page is
// usually ready by the time the click lands.

export const caseStudyLoaders = {
  rizen: () => import('../pages/RizenCaseStudy'),
  sanctum: () => import('../pages/SanctumCaseStudy'),
  'quantel-ai': () => import('../pages/QuantelCaseStudy'),
  'side-quests': () => import('../pages/SideQuestsCaseStudy'),
} as const;

type CaseStudyId = keyof typeof caseStudyLoaders;

/** Starts loading the case study a /work/:id link points to (no-op for anything else). */
export function prefetchCaseStudy(to: string) {
  const id = to.replace(/^\/work\//, '') as CaseStudyId;
  caseStudyLoaders[id]?.().catch(() => {});
}
