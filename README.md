# 🗼 hayapo::blog Repository

This is the repository for the [hayapo::blog](https://blog.hayapo.dev) website.

## 🏯 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```terminal
├── public/
│   └── favicon/
├── tests/
│   └── placing test files here
├── src/
│   ├── components/
│   ├── contents/
│   │   ├── blog/
│   │   └── config.ts
│   ├── layouts/
│   ├── pages/
│   ├── layouts/
│   ├── styles/
│   │   └── index.css
│   ├── tokens/
│   └── utils/
├── .astro.config.mjs
├── panda.config.ts
├── playwrite.config.ts
└── package.json
```

The blog posts are managed in `.mdx` files located in the `contents/blog` folder.

## 🔧 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run format`          | Format code with Prettier                        |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
