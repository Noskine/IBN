# 📚 | Biblioteca - Instituto Bíblico do Norte.

## Desenvolvimento local com Docker

Requer Docker com o plugin Compose e Node.js/npm.

1. Crie o arquivo local de configuração sem substituir um `.env` existente:

	```sh
	cp .env.docker.example .env.docker
	```

2. Inicie o PostgreSQL e aplique as migrations:

	```sh
	npm run db:up
	npm run db:migrate:docker
	npm run db:seed:docker
	```

3. Inicie o app apontando para esse banco:

	```sh
	npm run dev:docker
	```

O seed pode ser executado novamente sem duplicar os registros. Login de teste: `admin@ibn.local` / `Admin123!`. O segredo NextAuth do exemplo é apenas para desenvolvimento, nunca o reutilize em produção. Para parar o banco, use `npm run db:down`; os dados permanecem no volume `ibn-postgres-data`.