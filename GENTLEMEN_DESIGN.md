# VEIL / GENTLEMEN VISUAL SYSTEM
Version: 2026-11-02 / Portrait 02

## Shared rules (A)
- Index card photo frame: 2:3 portrait, consistent throughout the member directory.
- Responsive grid: two columns on desktop and medium screens, one column on narrow phones.
- Each card: photo / archive label / name / short description / service tags / profile link, in the same order.
- Personal palette is allowed; spacing, type hierarchy, card structure and interaction behavior stay consistent.
- Position and appointment restrictions are factual and must not be invented.
- Public-facing hosts appear first. Behind-the-scenes director 十六夜航 remains at the end and retains the symbolic ARCHIVE string, not a numbered archive.
- A placeholder is never the canonical photo specification. Its proportions follow the shared card frame, not the other way around.
- Full source images remain untouched. Adjust web presentation using object-fit/object-position; choose cover for tall photos and contain with subtle same-image background for landscape shots.
- Always confirm the subject's face/head and important outfit details are not cut off at desktop and mobile breakpoints.

## Implementation (B)
- assets/roster-portrait.css provides the final directory layout overrides and breakpoints.
- members.html loads that stylesheet last; individual colour files are preserved.
- Current director card photograph is landscape, so it is fitted fully within the 2:3 poster frame against a soft blurred background derived from the same photo.
- Individual biographies retain independent visual motifs and accent colours. Shared navigation, structural hierarchy and profile facts remain coherent.
- Changing this visual system must never touch the separate La Crystalline repository or Supabase project.
