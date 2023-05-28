# base-backend-node-typescript
Base de um APP backend usando node e typescript

# Quick start typeorm
npx typeorm init --name MyProject --database postgres

```
MyProject
├── src                   // place of your TypeScript code
│   ├── entity            // place where your entities (database models) are stored
│   │   └── User.ts       // sample entity
│   ├── migration         // place where your migrations are stored
│   ├── data-source.ts    // data source and all connection configuration
│   └── index.ts          // start point of your application
├── .gitignore            // standard gitignore file
├── package.json          // node module dependencies
├── README.md             // simple readme file
└── tsconfig.json         // TypeScript compiler options
```

The next step is to install new project dependencies:
```
cd MyProject
npm install
```

After you have all dependencies installed, edit the data-source.ts file and put your own database connection configuration options in there:
```
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Post, Category],
    subscribers: [],
    migrations: [],
})
```

That's it, your application should successfully run and insert a new user into the database. You can continue to work with this project and integrate other modules you need and start creating more entities.

You can generate an ESM project by running npx typeorm init --name MyProject --database postgres --module esm command.

You can generate an even more advanced project with express installed by running npx typeorm init --name MyProject --database mysql --express command.

You can generate a docker-compose file by running npx typeorm init --name MyProject --database postgres --docker command.

https://typeorm.io/
