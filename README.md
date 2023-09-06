# NextJS Application Using App Router

## ⚠️ In Progress

- If you want to follow up on the updates and contribute, please check the [project board.](https://github.com/users/damla/projects/7/views/4)

## Installation Settings

✔ What is your project named? … nextjs-w-app-router-starter

✔ Would you like to use TypeScript with this project? … No / **Yes**

✔ Would you like to use ESLint with this project? … No / **Yes**

✔ Would you like to use Tailwind CSS with this project? … No / **Yes**

✔ Would you like to use `src/` directory with this project? … No / **Yes**

✔ Use App Router (recommended)? … No / **Yes**

✔ Would you like to customize the default import alias? … No / **Yes**

✔ What import alias would you like configured? … @/\*

## Getting Started

⚠️ For this project, the default package manager utilized is `pnpm`. If you would like to use a different one, you can modify the `.lintstagedrc.js` and `husky` files accordingly.

First, run the development server:

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Run the PostgreSQL database locally on the docker container:

```bash
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

⚠️ SwaggerUI does not support cookie authentication out of the box therefore, authentication need to be done on the UI manually. See:

- <https://swagger.io/docs/specification/authentication/cookie-authentication/>

- <https://github.com/swagger-api/swagger-js/issues/1163>
