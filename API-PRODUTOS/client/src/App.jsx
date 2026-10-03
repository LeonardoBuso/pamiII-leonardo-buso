import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [dados, setDados] = useState([])
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [quantidade, setQuantidade] = useState('')

  useEffect(() => {
    buscarProduto();
  }, []);
  
  const buscarProduto = () => {
    fetch('http://localhost:8000/produtos')
    .then((resposta) => resposta.json())
    .then((dados) => setDados(dados))
    .catch((erro) => console.error("Erro no GET:",erro))
  };
  
  const manipularCadastro = (e) => {
    e.preventDefault()

    const dadosParaEnviar = {
      nome: nome,
      preco: Number(preco),
      quantidade: Number(quantidade)
    };

    fetch('http://localhost:8000/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosParaEnviar)
    })
    .then((resposta) => resposta.json())
    .then((dadosDoBanco) => {
      console.log("Produto cadastrado:", dadosDoBanco)
      buscarProduto()
    })
    .catch((erro) => console.error("Erro ao cadastrar:", erro))
  };

  const deletarProduto = (id) => {
    fetch(`http://localhost:8000/produtos/${id}`, {
      method: 'DELETE'
    })
    .then(() => buscarProduto()) 
    .catch((erro) => console.error("Erro no Delete:", erro));
  };


  return (
    <div>


      <h2>Meus Dados do MongoDB</h2>
      <ul>
        {dados.map((produto) => ( // mapeia no banco pelo id e exibe na tela as informações correspondentes
          <li key={produto._id}>
            <strong>{produto.nome}</strong>
            {produto.preco && ` - R$ ${(produto.preco).toFixed(2)}`}
            {produto.quantidade && ` (${produto.quantidade} unidades)`}
            <button className='botao-deletar' onClick={() => deletarProduto(produto._id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <form onSubmit={manipularCadastro}>
        <input className='envio-dados'
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          placeholder="Nome do produto"
        />
        <input className='envio-dados'
          type="number" 
          value={preco} 
          onChange={(e) => setPreco(e.target.value)} 
        />
        <input className='envio-dados'
          type="number" 
          value={quantidade} 
          onChange={(e) => setQuantidade(e.target.value)} 
        />
        <button className='botao-cadastrar' type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default App
