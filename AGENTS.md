# Teacher App - Agent Guide

## Tech Stack
- **Framework:** React Native (Expo SDK)
- **Language:** TypeScript
- **Navigation:** Expo Router (or React Navigation)
- **Styling:** React Native Paper / StyleSheet

## Common Commands
- **Start Dev Server:** `npm run start`
- **Install Dependency:** `npx expo install <package>`
- **Android/iOS Build:** `npx expo run:android` or `npx expo run:ios`
- **Linting:** `npm run lint`

## Project Rules
- Use Functional Components with Hooks.
- Always use `npx expo install` instead of `npm install` to ensure version compatibility.
- Prefer Lucide-React-Native for icons.
- When creating new screens, place them in the `app/` directory (Expo Router).

## Local LLM Optimization
- You are running locally on Qwen 3.5 9B.
- Keep responses concise to save local compute.
- If a task is too large, break it into smaller sub-tasks.
