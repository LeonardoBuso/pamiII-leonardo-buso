// ponto de entrada das rotas
import express from "express";
import produtos from "./produtosRoutes.js";

const routes = (app) => { // centralizar as rotas
    app.route("/").get((req, res) => res.status(200).send("API-PRODUTOS"));

    app.use(express.json(), produtos); // middlewere: transforma os dados de string para json
};

export default routes;