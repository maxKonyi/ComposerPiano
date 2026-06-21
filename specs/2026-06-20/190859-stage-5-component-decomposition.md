# Stage 5 Component Decomposition

## Summary

Continue Chord Boss modernization by decomposing the large trainer component into smaller focused React components while preserving current gameplay, UI, CSS classes, state ownership, Vite build, and GitHub Pages deployment.

The authoritative decision-map spec is:

- `specs/2026-06-19/160159-modernization-refactor-decision-map.md`

Completed prior stages:

- `specs/2026-06-19/171834-stage-1-correctness-baseline.md`
- `specs/2026-06-20/115232-stage-2-static-module-boundaries.md`
- `specs/2026-06-20/132502-stage-3-vite-migration.md`
- `specs/2026-06-20/165249-github-pages-deployment.md`
- `specs/2026-06-20/182012-stage-4-state-model-consolidation.md`

## Approved Scope

In scope:

- Split focused presentational/UI pieces out of `src/ChordTrainer.jsx`.
- Preserve the Stage 4 reducer/state ownership model.
- Preserve current gameplay behavior.
- Preserve current visual appearance, markup semantics, and CSS class names as much as practical.
- Add lightweight tests or source-level checks where practical to guard the decomposition.
- Keep Vite build and GitHub Pages deployment support working.

Candidate components:

- `GameSummary`
- `LivesDisplay`
- `ProgressionDisplay`
- `QuestionDisplay`
- `SessionControls`
- `TimerBar`
- Small trainer display/layout wrappers only if they materially clarify the file without broadening scope.

Out of scope:

- UI redesign.
- New gameplay features.
- Settings/sidebar architecture changes.
- Broad `Sidebar` decomposition.
- Real MIDI/browser automation.
- State-model redesign beyond preserving Stage 4 ownership.

## Relevant Current Files

- `src/ChordTrainer.jsx`: primary target for decomposition.
- `src/hooks/useGameState.js`: reducer/state ownership should remain intact.
- `src/game-logic.js`: pure helper logic.
- `src/Sidebar.jsx`: mostly out of scope except for tiny interface/import adjustments if needed.
- `src/styles/*.css`: styles should remain materially unchanged.
- `tests/run-tests.js`: Node test suite and source-level checks.
- `package.json`: test/build scripts.
- `server.js`: serves built `dist/` locally.

## Desired Component Boundaries

Prefer small components with clear props and no new state ownership:

- Display components should receive values and callbacks by props.
- Components extracted from `ChordTrainer` should not reach into unrelated global/module state.
- Avoid moving timer or game reducer logic into presentational components.
- Keep user-visible text and class names stable unless there is a clear bug.

Useful new directory shape:

- `src/components/trainer/`

The exact file split should follow the local code shape. Avoid creating many tiny files if it makes the code harder to scan.

## Behavior To Preserve

- App opens directly into the chord trainer.
- Start/end/reset flows remain unchanged.
- Game summary remains unchanged.
- Lives display remains unchanged.
- Score display and practice-mode hiding remain unchanged.
- Progression display remains unchanged, including completed/current indicators.
- Timer display remains unchanged.
- Feedback message display remains unchanged.
- Piano keyboard remains displayed below the trainer content.
- Settings/sidebar behavior remains unchanged.

## Implementation Guidance

- Start with behavior-preserving extraction.
- Prefer extracting pure/presentational components before changing control flow.
- Keep props explicit and narrow.
- Do not introduce context/global state for this stage.
- Do not move state out of the reducer or back into component-local state.
- Keep tests deterministic and browser-free.
- Add source-level checks if mounted component tests are not practical in the current harness.
- Do not add plan/spec references or future-work notes in production comments, test names, or identifiers.
- Do not revert unrelated worktree changes.

## Acceptance Criteria

- `src/ChordTrainer.jsx` is meaningfully smaller and delegates focused UI sections to component files.
- Extracted components preserve current class names and visible behavior.
- State ownership from Stage 4 remains intact.
- No gameplay/UI redesign is introduced.
- `npm.cmd test` passes.
- `npm.cmd run build` passes.
- Production smoke through `server.js` against `dist/` passes for `/`, built JS/CSS, SVG, and WAV assets.
- GitHub Pages workflow remains present and compatible.

## Expected Local Checks

- `npm.cmd test`
- `npm.cmd run build`
- Production smoke through `server.js` against built `dist/`:
  - `/`
  - built JS asset
  - built CSS asset
  - `/gem-icon.svg`
  - `/sounds/correct.wav`
  - `/sounds/wrong.wav`
  - `/sounds/life-Loss.wav`
  - `/sounds/game-Over.wav`

## Orchestrator Report

Completed: 2026-06-20

Plan file:

- `specs/2026-06-20/190859-stage-5-component-decomposition.md`

Subagents:

- Implementer: `019ee7f0-b2bf-7263-9616-f31d1153d0a4` (`Dirac`)
- Acceptance checker: `019ee7f3-adcc-7e31-a924-d184d7956e88` (`Rawls`)
- Code reviewer: `019ee7f3-e2d1-7673-8067-1d53d8e1bce1` (`Pasteur`)

Loop count:

- Two implementation passes.
- Initial verifier pass found one low-severity test-strength concern.
- Second verifier pass accepted the result.

Implementation outcome:

- Extracted focused trainer UI sections from `src/ChordTrainer.jsx` into `src/components/trainer/`.
- Added:
  - `GameSummary`
  - `LivesDisplay`
  - `ProgressionDisplay`
  - `QuestionDisplay`
  - `SessionControls`
  - `TimerBar`
- Preserved Stage 4 reducer/state ownership.
- Kept `Sidebar` and settings architecture unchanged.
- Expanded source-level tests for component decomposition, key markup/classes, callbacks, practice-only skip behavior, summary gates, progression conventions, and Timer passthrough.

Verifier outcomes:

- Initial acceptance check found no spec conformance issues.
- Initial code review found the first decomposition test too weak to guard markup/class/callback preservation.
- Second implementation pass strengthened deterministic source-level checks.
- Final acceptance check: no meaningful in-scope findings remain.
- Final code review: no meaningful in-scope findings remain.

Final local verification:

- `npm.cmd test` passed with 37 tests.
- `npm.cmd run build` passed.
- Production smoke through `server.js` passed on port `18734` for `/`, built JS, built CSS, `gem-icon.svg`, and all WAV assets.

Documentation updates:

- No feature documentation under `docs/<name>/README.md` was needed.
- This orchestrator report was appended to the plan file.

Remaining caveats:

- Component checks are source-level rather than mounted React tests.
- Automated tests still do not interact with real MIDI hardware.
- `npm.cmd test` still prints Node's typeless ESM warning, and `npm.cmd run build` still prints Vite's CJS Node API deprecation warning; both commands pass.
- Stage 5 changes are local and uncommitted at the time of this report.
