import express from "express";
import conectaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaDatabase(); // faz a conexão real com o banco

conexao.on("error", (erro) => { // mostra se a conexão der errada com o banco
    console.error("Falha na conexão!", erro);
});

conexao.once("open", () => {
    console.log("Conexão realizada com sucesso!");
});

const app = express();
routes(app);

export default app;