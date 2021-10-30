import pgPromise from "pg-promise";

const pgp = pgPromise({});

const db = pgp({
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "Postgres2019!",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    database: "parking",
    idleTimeoutMillis: 100
})

export default db;