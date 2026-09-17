// The mission statement shown on the homepage.
export default function MissionStatement({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-xl md:text-2xl font-semibold text-brand leading-relaxed mb-5">
        We’re a community at UC Irvine working to make advanced AI safe and beneficial.
      </p>
      <p className="mb-5">
        AI is advancing quickly, potentially beyond human capabilities. Our ability to understand and control these systems has not kept pace. Reducing the risks could be one of the most important challenges of our time.
      </p>
      <p>
        We study how AI behaves, how to align it with human values, and how research and policy can make its development safer.
      </p>
    </div>
  )
}
