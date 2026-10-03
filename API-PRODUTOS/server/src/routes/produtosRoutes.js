import express from "express";
import ProdutoController from "../controllers/produtosController.js";

const routes = express.Router(); // O Express será responsável pelo manuseio das rotas

routes.get("/produtos", ProdutoController.listarProdutos); // aceita ?nome= opcional
routes.get("/produtos/:id", ProdutoController.listarProdutoPorId);
routes.post("/produtos", ProdutoController.cadastrarProduto);
routes.put("/produtos/:id", ProdutoController.atualizarProduto);
routes.delete("/produtos/:id", ProdutoController.deletarProduto);

export default routes;
