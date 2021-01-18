import "reflect-metadata";
import { config } from "dotenv";
config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolvers/product";

const main = async () => {
    const app = express();

    const PORT = process.env.PORT || 3000;

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ProductResolver],
            validate: false,
        }),
    });

    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Server started on localhost:${PORT}`);
    });
};

main().catch((err) => {
    console.error(err);
});
