/**
 * Renders a topic note's Markdown to HTML without a parser dependency —
 * the site stays comrak-free in the browser by design. The notes are short
 * prose, so paragraphs plus the inline basics (bold, italic, code, links)
 * cover them; anything unrecognized passes through as escaped text.
 */
const escapeHtml = (text: string): string =>
	text
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");

function renderInline(text: string): string {
	return escapeHtml(text)
		.replace(/`([^`]+)`/g, "<code>$1</code>")
		.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
		.replace(/(^|\W)\*([^*]+)\*(?=\W|$)/g, "$1<em>$2</em>")
		.replace(/(^|\W)_([^_]+)_(?=\W|$)/g, "$1<em>$2</em>")
		.replace(
			/\[([^\]]+)\]\((https?:[^)\s]+)\)/g,
			'<a href="$2" target="_blank" rel="noreferrer noopener">$1</a>',
		);
}

export function renderNoteMarkdown(markdown: string): string {
	return markdown
		.split(/\n{2,}/)
		.map((block) => block.trim())
		.filter((block) => block.length > 0)
		.map((block) => `<p>${renderInline(block.replaceAll("\n", " "))}</p>`)
		.join("");
}
