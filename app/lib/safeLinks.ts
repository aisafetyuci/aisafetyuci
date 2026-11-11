// Link targets allowed in Markdown content (research one-pagers and blog posts): web and mailto
// links, site-relative paths and #anchors. Anything else (e.g. `javascript:`) loses its href or
// src, since the rendered HTML is inserted unsanitized.
export function isSafeHref(href: unknown) {
  if (typeof href !== 'string') return true
  const value = href.trim()
  if (value.startsWith('#') || (value.startsWith('/') && !value.startsWith('//'))) return true
  if (/^(https?:|mailto:)/i.test(value)) return true
  // Relative paths without a scheme (e.g. `events`); a scheme is letters followed by ':'.
  return !/^[a-z][a-z0-9+.-]*:/i.test(value) && !value.startsWith('//')
}

type HastNode = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: HastNode[] }

// A rehype plugin; use it after remark-rehype.
export function dropUnsafeHrefs() {
  const walk = (node: HastNode) => {
    if (node.type === 'element' && node.properties) {
      for (const attribute of ['href', 'src']) {
        if (attribute in node.properties && !isSafeHref(node.properties[attribute])) delete node.properties[attribute]
      }
    }
    node.children?.forEach(walk)
  }
  return (tree: HastNode) => walk(tree)
}
