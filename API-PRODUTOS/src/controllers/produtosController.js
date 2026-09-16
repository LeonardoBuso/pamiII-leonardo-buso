import mongoose from "mongoose";
import produto from "../models/Produto.js";

// Valida formato de ObjectId antes de bater no banco, para diferenciar
// "entrada inválida do cliente" (400) de "erro real de servidor" (500).
function idValido(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

class ProdutoController {

    // GET /produtos            -> lista tudo, 200
    // GET /produtos?nome=Caneta -> filtra por nome (substitui a antiga rota /busca), 200
    static async listarProdutos (req, res) {
        try {
            const { nome } = req.query;
            const filtro = nome ? { nome } : {};
            const listaProdutos = await produto.find(filtro);
            res.status(200).json(listaProdutos);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    };

    // GET /produtos/:id -> 200 (encontrado) | 400 (id inválido) | 404 (não encontrado)
    static async listarProdutoPorId (req, res) {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ message: "id inválido" });
        }
        try {
            const produtoEncontrado = await produto.findById(id);
            if (!produtoEncontrado) {
                return res.status(404).json({ message: "produto não encontrado" });
            }
            res.status(200).json(produtoEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do produto` });
        }
    };

    // POST /produtos -> 201 (criado) | 400 (dados inválidos)
    static async cadastrarProduto (req, res) {
        try {
            const produtoCriado = await produto.create(req.body);
            res.status(201).json({ message: "criado com sucesso", produto: produtoCriado });
        } catch (erro) {
            // ValidationError do mongoose = entrada inválida do cliente, não erro de servidor
            if (erro instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: `${erro.message} - dados inválidos` });
            }
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar produto` });
        }
    }

    // PUT /produtos/:id -> 200 (atualizado) | 400 (id/dados inválidos) | 404 (não encontrado)
    static async atualizarProduto (req, res) {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ message: "id inválido" });
        }
        try {
            const produtoAtualizado = await produto.findByIdAndUpdate(
                id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!produtoAtualizado) {
                return res.status(404).json({ message: "produto não encontrado" });
            }
            res.status(200).json({ message: "produto atualizado", produto: produtoAtualizado });
        } catch (erro) {
            if (erro instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: `${erro.message} - dados inválidos` });
            }
            res.status(500).json({ message: `${erro.message} - falha na atualização do produto` });
        }
    };

    // DELETE /produtos/:id -> 200 (apagado) | 400 (id inválido) | 404 (não encontrado)
    static async deletarProduto (req, res) {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ message: "id inválido" });
        }
        try {
            const produtoApagado = await produto.findByIdAndDelete(id);
            if (!produtoApagado) {
                return res.status(404).json({ message: "produto não encontrado" });
            }
            res.status(200).json({ message: "produto apagado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao apagar o produto` });
        }
    };
};

export default ProdutoController;
