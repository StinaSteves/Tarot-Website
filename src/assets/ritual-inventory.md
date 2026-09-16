# Ritual inventory images

Built-in image_gen tool, background replacement, 2026-09-15.
Generated variants may differ in small details. The unused source files geld.png and karriere.png were removed during the user-requested asset cleanup; the final inventory variants remain.

- Source: img/karriere.png → final: img/karriere-inventory.png
- Source: img/geld.png → final: img/geld-inventory.png

Both used the following final prompt with their respective source image:

> Edit target: attached icon. Change ONLY the grey checkerboard background to a perfectly uniform solid near-black #11100f background, INCLUDING every gap between foliage and gold rings. Absolutely NO checkerboard, no grey, no transparency grid, no glow. Preserve subject layout, gold purple marble materials, fine details, objects, lettering and colors exactly. This is background replacement for a dark website inventory icon. Output one PNG.

The initial transparency attempts retained a checkerboard and were discarded. Final variants have an opaque dark background, blended into the UI with a CSS edge mask. Herz and Familie use the original user assets.
