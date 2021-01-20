import "reflect-metadata";
import { config } from "dotenv";
config();

import express from "express";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolvers/product";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import { CartResolver } from "./resolvers/cart";
import cors from "cors";
import { CheckoutResolver } from "./resolvers/checkout";

const main = async () => {
    const MongoStore = connectMongo(session);

    mongoose.connect(process.env.MONGODB_URI || "", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });

    const app = express();

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:5000",
        })
    );

    app.use(express.static("build"));

    const sessionStore = new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: "sessions",
    });

    app.use(
        session({
            secret: process.env.SESSION_SECRET || "",
            resave: true,
            saveUninitialized: false,
            store: sessionStore,
            cookie: {
                sameSite: "lax",
                // httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24,
            },
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ProductResolver, CartResolver, CheckoutResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`Server started on localhost:${PORT}`);
    });
};

main().catch((err) => {
    console.error(err);
});
