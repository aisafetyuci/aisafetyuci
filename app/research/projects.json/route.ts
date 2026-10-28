import { getOpenProjects } from '../../lib/research'

export const dynamic = 'force-static'

// The projects currently taking applications. The application Worker (workers/research-apply)
// reads this to reject submissions for closed or unknown projects.
export function GET() {
  const open = getOpenProjects().map(({ slug, title }) => ({ slug, title }))
  return Response.json({ open })
}
