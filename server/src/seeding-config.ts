import config from "./config"

module.exports = {
    database: {
        connectionString: config.mongoUri,
    },
    collections: [
        {
            name: "roles",
            path: "./seeds/roles.json",
        },
    ],
}
