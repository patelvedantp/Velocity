# Submission form answers

## Project name
Touchline

## Tagline
See the movement. Clip the moment.

## Description — 100 words
Touchline transforms SkillCorner soccer tracking data into an interactive 3D workspace for exploring player movement. Users can play, pause, scrub through a match, and inspect sequences from tactical overhead, free orbit, or player follow cameras. The app supports clips up to ten seconds, with timestamp links, portable JSON downloads, and browser WebM export. Motion trails, jersey markers, a highlighted ball, and estimated player speeds help explain each sequence. Timestamp interpolation and direct mesh updates support responsive playback. Processing happens locally. Performance and recording quality depend on hardware and browser support, and clips persist locally in the same browser per match.

## Tech stack
React, Vite, Tailwind CSS, Lucide React, Three.js, React Three Fiber, Drei, Zustand, Web Workers, typed arrays, localStorage, Canvas captureStream, MediaRecorder, and Python. An optional multi-stage Docker/nginx configuration is included but has not been executed in the authoring environment.

## Architecture summary
A Web Worker normalizes tracking into typed arrays. A mutable playback clock and timestamp interpolation drive direct Three.js mesh updates. Zustand manages UI state; React controls handle scrubbing, trimming, tags, and sharing. Clips persist locally by match ID.

## Key technical decisions
- Read timestamps instead of assuming a fixed source FPS.
- Mutate mesh refs during rendering rather than updating React every frame.
- Parse in a worker and transfer typed buffers back to the app.
- Preserve player identities across substitutions and avoid interpolating across large gaps or period changes.
- Keep datasets outside the source repository; provide a downloader and file import.

## Innovation highlights
Three camera perspectives, prominent ball highlighting, movement trails, tagged clips, local clip persistence, and I/O/C trimming shortcuts. Portable JSON clips let another user replay a sequence without downloading the full match.

## How it handles other matches
Run `python3 scripts/download_match.py --id MATCH_ID`, then click Load bundled match. Alternatively, import matching metadata and tracking files. Supported files use the same parser; team identities and pitch dimensions come from metadata where available.

## Limitations
Performance and WebM timing depend on hardware and browser support. WebM excludes audio and HUD text. Player speeds are estimates. localStorage does not sync across devices and may be unavailable or cleared. Timestamp links require the same match and an accessible app URL; localhost is not a public deployment. Docker and public deployment have not been verified.

## URLs
Repository: [PLACEHOLDER]
Live app, if deployed: [PLACEHOLDER]
Video tutorial: [PLACEHOLDER]

## Future work
Auto-suggested moments, tactical overlays, and hosted clip links that open without a separate match import.
