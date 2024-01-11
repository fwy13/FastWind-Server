//ExpressJS
import express from "express";
import http from "http";
import cors from "cors";


//Apollo Server<GraphQL>
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from './resolver/index';
import { typeDefs } from './schemas/index';


const PORT = 4000;

const app = express();
const httpServer = http.createServer(app);


const ServerApollo = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const ApolloRun = async () => {
  await ServerApollo.start();
  app.use(cors(), bodyParser.json(), expressMiddleware(ServerApollo));
};
ApolloRun();

const FastWind = async () => {
  await new Promise((resolve) => {
    httpServer.listen({ port: PORT });
    console.log(`Running in port: https://localhost:${PORT}`);
  });
};
FastWind();
