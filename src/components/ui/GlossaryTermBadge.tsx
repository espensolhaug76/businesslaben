interface Props {
  term: string
}

export default function GlossaryTermBadge({ term }: Props) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent('openGlossary', { detail: { term } }))
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500/25 transition-colors"
    >
      <span>ℹ️</span>
      <span>{term}</span>
    </button>
  )
}
