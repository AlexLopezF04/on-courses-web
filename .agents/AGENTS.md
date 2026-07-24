# Git Commit & Merge Naming Policy

When committing and merging changes:
1. Every commit on `dev` must have a clear, conventional commit message detailing the exact feature or fix (e.g., `feat(preview): ...`, `fix(theme): ...`, `style(layout): ...`).
2. When merging `dev` into `main`, NEVER use default `git merge dev` (which creates generic `Merge branch 'dev'`).
3. Always supply an explicit descriptive commit message for the merge to `main`:
   `git merge dev -m "<descriptive message matching the changes made>"`
4. This ensures GitHub Actions workflow runs on `main` display clean, informative run titles corresponding to the deployed feature or fix.
