import pgPromise from "pg-promise";

const pgp = pgPromise({});

const db = pgp({
    user: "postgres",
    password: "Postgres2019!",
    host: "localhost",
    port: 5432,
    database: "parking",
    idleTimeoutMillis: 100
})

export default db;