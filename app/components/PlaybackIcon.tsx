export default function PlaybackIcon({ paused }: { paused: boolean }) {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {paused ? (
        <path d="M7 4.5a1 1 0 0 1 1.5-.86l13 7.5a1 1 0 0 1 0 1.72l-13 7.5A1 1 0 0 1 7 19.5z" />
      ) : (
        <>
          <rect x="5" y="4" width="5" height="16" rx="1" />
          <rect x="14" y="4" width="5" height="16" rx="1" />
        </>
      )}
    </svg>
  )
}
