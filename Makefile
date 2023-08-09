commands:
	pnpm add @prisma/client && pnpm add -D prisma
	pnpm prisma init --datasource-provider
	pnpm prisma migrate dev --name init
	pnpm add -D ts-node
	pnpm prisma db seed