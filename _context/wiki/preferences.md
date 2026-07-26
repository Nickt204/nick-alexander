# Working Preferences

## Code style and conventions

- **File naming:** lowercase with dashes between words — e.g. `artwork-card.jsx`, `gallery-section.css`
- **Component naming:** PascalCase for React components — e.g. `ArtworkCard`, `GallerySection`
- **CSS:** Plain CSS only — no utility frameworks (Tailwind, etc.). Follow the patterns already in `App.css` and `index.css`
- **No TypeScript:** The project uses plain JSX. Do not introduce TypeScript
- **No new dependencies** unless clearly necessary and discussed first
- **CSS variables** for colours, spacing, and typography — follow the existing custom property convention in `src/index.css`

## How we like to work with AI

- **Thorough refactors preferred** — when something needs changing, do it properly rather than a quick patch
- **Always explain what you're doing and why** — we are not coders, so clear explanations matter a lot
- **Don't assume knowledge** — explain technical concepts in plain language where needed
- **Be proactive** — if you spot something that could be improved or might cause a problem, mention it
- **Show the full picture** — when making changes to a file, make sure the result is complete and coherent, not just the changed fragment
- **Ask before going off-piste** — stick to what was asked unless you flag a suggestion separately

## Communication preferences

- Plain, friendly language — no jargon without explanation
- Step-by-step walkthroughs are welcome when making bigger changes
- If there are multiple ways to do something, briefly say why you chose the approach you did
- Flag anything that might break something else when making changes

## What "done" looks like

A task is complete when:
1. The code works as described
2. It fits the existing visual style and code patterns
3. A clear explanation has been given of what changed and why
4. No loose ends — placeholder content, broken links, or TODO comments left behind without flagging them

## Things to avoid

- Introducing complexity that isn't needed yet (keep it simple and maintainable)
- Changing things that weren't asked about without flagging it first
- Leaving placeholder or dummy text in the codebase without clearly marking it as intentional
- Breaking the dark theme or visual style of the site
