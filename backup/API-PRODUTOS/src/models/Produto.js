import mongoose from "mongoose";

// Estrutura do Produto sem nenhuma ligação com autores
const produtoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId }, 
    nome: { type: String, required: true },       
    preco: { type: Number, required: true },      
    quantidade: { type: Number, default: 0 }      
}, { versionKey: false }); 

// Cria a coleção "produtos" automaticamente no MongoDB Atlas
const produto = mongoose.model("produtos", produtoSchema);

export default produto;
