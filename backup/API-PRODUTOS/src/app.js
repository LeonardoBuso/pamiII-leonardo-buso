import express from "express";
import conectaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

try {
    const conexao = await conectaDatabase();

    conexao.once("open", () => {
        console.log("Conexão realizada com sucesso!"); // exibe a mensagem se a conexão for realizada com sucesso
    });

    conexao.on("error", (erro) => { // captura algum erro relacionadso a conexão com o banco e exibe no terminal
        console.error("Falha na conexão!", erro);
    });

} catch (error) {
     console.error("Erro crítico ao tentar inicializar o banco:", error.message); // se logo no início a conexão der erro ou der algum problema crítico, o catch é acionado e evita que a api crashe
}

const app = express();
routes(app);

export default app;