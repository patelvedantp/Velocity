# Touchline

Touchline is a 3D soccer tracking studio for the US Soccer × Georgia State ColorStack Tech League. It visualizes SkillCorner player and ball positions, lets users scrub through a match, and creates clips up to ten seconds long for replay and sharing. The verified match is Melbourne Victory vs Auckland FC, ID `2017461`.

Repository: [PLACEHOLDER]
Live app, if deployed: [PLACEHOLDER]
Video tutorial: [PLACEHOLDER]

## Features
- Play/pause, timeline scrubbing, playback speeds, and clip preview.
- Tactical, Free Orbit, and Player Follow cameras.
- Jersey markers, motion trails, highlighted ball, estimated speed, and reported possession.
- Clips longer than zero and up to ten seconds; tags and colored badges.
- Clip persistence in localStorage, separated by match ID.
- Timestamp links, portable JSON clips, and browser WebM recording.
- I/O/C shortcuts for trim start, trim end, and save outside editing controls.

## Tech stack
| Layer | Technology |
|---|---|
| Interface | React, Vite, Tailwind CSS, Lucide React |
| 3D | Three.js, React Three Fiber, Drei |
| State | Zustand and a mutable playback clock |
| Data | Web Worker, typed arrays, timestamp interpolation |
| Sharing | localStorage, JSON, Canvas captureStream, MediaRecorder |
| Tooling | Python downloader, Node tests, optional Docker/nginx |

## Architecture
1. App.jsx handles match loading and the workspace.
2. A Web Worker runs parseSkillCorner.js away from the UI thread.
3. The parser normalizes timestamps, player identities, and coordinates.
4. Pitch3D.jsx builds the field; TrackingScene.jsx updates mesh refs.
5. Timestamp interpolation samples positions at rendering time.
6. Zustand holds UI state; a mutable clock drives playback.
7. VideoControls.jsx handles trimming, tags, persistence, and sharing.

## Run locally
Requires Node.js 20.19+, npm, Python 3.9+, and WebGL. Run inside the project folder:

```bash
npm ci
python3 scripts/download_match.py --id 2017461
npm run dev
```

Open the Local URL printed in Terminal and click **Load bundled match**.

Validation/build: `npm test`, then `npm run build`. Preview with `npm run preview`.

## Run with Docker
Requires Docker. This configuration has not been executed in the authoring environment.

```bash
docker build -t touchline-3d .
docker run --rm -p 8080:80 touchline-3d
```

Open http://localhost:8080. The image excludes datasets: import metadata followed by tracking through the app. To mount a locally downloaded match instead, run this alternative command from the project folder:

```bash
docker run --rm -p 8080:80 -v "$(pwd)/public/data:/usr/share/nginx/html/data:ro" touchline-3d
```

Then click **Load bundled match**. Run the Python download command first if `public/data` is empty.

## Swap the match
Replace `MATCH_ID` with an ID from SkillCorner's `data/matches.json`:

```bash
python3 scripts/download_match.py --id MATCH_ID
```

Click **Load bundled match** again. Alternatively, select the matching metadata JSON using **Metadata**, then import its tracking JSON/JSONL. No source changes are required for supported match files.

## How to use
1. Load a real match; the initial synthetic demo is only illustrative.
2. Press Play or drag the timeline to choose a moment.
3. Switch cameras; select a player for Player Follow.
4. Set start/end times within ten seconds, add a name/tag, and Preview.
5. Save the clip. Share/export downloads a portable JSON clip or WebM.
6. Another user can import the portable clip without the full match.

## Limitations
- localStorage is specific to this browser/origin and may be cleared or unavailable. Reload the same match to restore its clips. It does not store the full match.
- Timestamp links need an accessible app URL and the same match loaded. A localhost link is not remotely accessible.
- WebM records the 3D canvas without HUD text or audio. Timing and smoothness depend on browser/hardware; encoding is not frame-perfect. Keep the tab visible.
- Speeds are estimates. Missing tracking and large gaps are not reconstructed.
- Import limit: 250 MiB. No guaranteed 60 FPS, zero latency, or bug-free certification.
- Core tests, production build, and targeted Chromium checks passed; Docker and public deployment remain unverified.

## Credits
Tracking data: [SkillCorner Open Data](https://github.com/SkillCorner/opendata). Downloaded datasets are excluded from the source repository and Docker build context. See upstream licensing for data terms.

Built with the open-source technologies listed above. Independent student project for the US Soccer × Georgia State ColorStack Tech League.
