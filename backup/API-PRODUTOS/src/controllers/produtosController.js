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
    static async listarProdutos (req, res) { // o async avisa que o processo será no tempo do banco de dados
        try { // a ação de buscar a lista de produtos no banco é iniciada
            const { nome } = req.query; 
            const filtro = nome ? { nome } : {};
            const listaProdutos = await produto.find(filtro); // ao encontrar, o js recebe o await, ou seja, deve esperar a resposta do pgadmin do postgres
            res.status(200).json(listaProdutos); // assim que o await é finalizado, um json recebe a lista e armazena ela. Além de enviar um status code 200 de OK!
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` }); // caso o processo de busca da lista dê errado, o catch é acionado e o processo acaba sendo interrompido. Além disso, um status code 500 de "erro real de servido!" é enviado
        }
    };

    // GET /produtos/:id -> 200 (encontrado) | 400 (id inválido) | 404 (não encontrado)
    static async listarProdutoPorId (req, res) {
        const { id } = req.params; // o id é o parâmetro que está sendo passado na busca
        if (!idValido(id)) { // se o id for inválido, uma mensagem com o status code 400 de "id inválido" é enviada
            return res.status(400).json({ message: "id inválido" });
        }
        try { // se o id for válido, o try começa a funcionar e a lista começa a ser lida o produto deve ser encontrado
            const produtoEncontrado = await produto.findById(id); // o await para o processo enquanto aguarda a resposta do pgadmin
            if (!produtoEncontrado) { // se o produto for encontrado, um json armazena o resultado e envia um status code 200, senão, um status code 404 de "não encontrado" + uma mensagem são enviadas
                return res.status(404).json({ message: "produto não encontrado" });
            }
            res.status(200).json(produtoEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do produto` }); // caso qualquer erro seja capturado, o catch entra em ação e exibe a mensagem com o status code 500
        }
    };

    // POST /produtos -> 201 (criado) | 400 (dados inválidos)
    static async cadastrarProduto (req, res) {
        try {
            const produtoCriado = await produto.create(req.body); // o js começa a criar o produto e o await envia o comando de espera
            res.status(201).json({ message: "criado com sucesso", produto: produtoCriado }); // se tudo der certo, o produto é criado e uma mensagem com um status code de 201 "criado" é enviado
        } catch (erro) { // se houver algum erro, o catch é acionado, mas tem alguns pontos primeiro:
            if (erro instanceof mongoose.Error.ValidationError) { // o ValidationError é padrão do mongoose, ou seja, é para saber se tem algum erro na entrada, e não na conexão com o servidor
                return res.status(400).json({ message: `${erro.message} - dados inválidos` }); // se algum erro for identificado a partir da análise do ValidationError, a mensagem de entrada de dados inválidos é enviada com o status code 400
            }
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar produto` }); // caso seja algum outro erro de cadastro, a mensagem de 
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
