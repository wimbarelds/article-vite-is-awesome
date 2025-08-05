# Vite is Awesome Article

The article is written in MDX and the project is set up to be a simple, readable, and easily deployable static site.

## Working in this Repository

This project uses a few utilities to ensure code quality and consistency. Please be aware of them when contributing.

- **ESLint**: For identifying and reporting on patterns in JavaScript.
- **Prettier**: For code formatting.
- **TypeScript**: For static typing.

### Shared Utilities

The `src/shared` directory contains several components and utilities to help with content authoring:

- **`CodePen`**: A component that embeds a CodePen pen.
- **`Example`**: A component that shows code & result.
- **`IFrame`**: A component that embeds html/css/js in an iframe.
- **`Tabs`**: A component that lets you create tabs.

The `wb-slides` package contains several other common utilities to help with content authoring:

- **`Code`**: A component shows code with syntax highlighting

### Authoring Content

Content can be written in MDX (`.mdx`) files. This allows you to author your article in Markdown, but also use React components directly in the same file. You can import the content from an MDX file and render it as a React component. For more, see the [MDX Documentation](https://mdxjs.com/docs/what-is-mdx/).

### Pull Requests and GitHub Actions

When a pull request is created to the `main` branch, a GitHub Action is triggered to run the following checks:

- Linting (`pnpm run lint`)
- Prettier check (`pnpm prettier`)
- TypeScript check (`pnpm tsc`)

All checks must pass before a pull request can be merged.

### Hosting

The article is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static typing.
- **Vite**: As the build tool and development server.
- **Tailwind CSS**: For styling the application.
- **MDX**: For writing the article content with JSX components.
- **pnpm**: As the package manager.

## Available Scripts

In the project directory, you can run the following commands:

### `pnpm dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

### `pnpm build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `pnpm preview`

Serves the production build locally to preview it before deployment.

### `pnpm lint`

Lints the project files using ESLint.
