# NextJS

<img src="../.docs/imgs/next.svg" height="150px" />

```bash
  cd react
  cp .env.share .env
  yarn install
  yarn start
```

Open browser: [localhost:8000](http://localhost:8000)

```json
{
  "dependencies": {
    // Core library
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "14.1.0",

    // Form management & data validation
    "react-hook-form": "^7.50.1", // ~ formik
    "@hookform/resolvers": "^3.3.4",
    "yup": "^1.3.3", // ~ joi, zod

    // Client data fetching
    "swr": "^2.2.5",

    // State management
    "zustand": "^4.5.1", // ~ redux, recoil, jotai

    // Utility for className
    "clsx": "^2.1.0", // ~ classes

    // Date utility
    "dayjs": "^1.11.10", // ~ moment.js

    // Display notifications
    "react-toastify": "^10.0.4", // ~ notistack

    // Other utility libraries
    "uuid": "^9.0.1"
  },

  "devDependencies": {
    // UI library
    "daisyui": "^4.7.2", // Component library for tailwind
    "tailwindcss": "^3.4.1", // ~ UnoCSS

    // Icon set library
    "@iconify-json/ph": "^1.1.11",
    "@iconify/tailwind": "^0.1.4",

    // Typing
    "@types/lodash-es": "^4.17.12",
    "@types/node": "^20.11.19",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@types/uuid": "^9.0.8",

    // Eslint
    "eslint": "^8.56.0",
    "prettier": "^3.2.5",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",

    // Bundler & Compiler
    "typescript": "^5.2.2",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35"
  }
}
```
