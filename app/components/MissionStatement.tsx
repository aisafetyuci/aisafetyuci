// The mission paragraph shown on both the homepage and /mission — kept in one
// place so the two copies can't drift apart.
export default function MissionStatement({ className }: { className?: string }) {
  return (
    <p className={className}>
      Experts broadly expect rapid progress in AI to continue, potentially surpassing human intelligence. Already, AI advancement has outpaced our ability to explain its behavior, control its goals, and build robust safeguards. <strong>Reducing risks from advanced AI may be one of the most important challenges of our time.</strong> AISCI is a community of students at UC Irvine dedicated to AI alignment and AI safety: understanding AI behavior, ensuring it reflects human values, and building the technical and political foundations for safe AI development.
    </p>
  )
}
