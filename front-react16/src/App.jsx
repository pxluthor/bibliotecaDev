import React from 'react';
import axios from 'axios';
import './App.css';
import Header from '../component/Header/Header';
import LivroItem from '../component/livros/LivroItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      livros: []
    };
  }

  componentDidMount() {                                 // Método executado após o componente ser montado
    axios.get('http://localhost:3001/livros2')           // Requisição GET para a API
      .then(res => {                                    // Callback de sucesso
        this.setState({ livros: res.data });            // Atualiza o estado com os livros retornados
      })
      .catch(err => console.error('Erro ao buscar livros:', err)); // Callback de erro
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ul>
            {this.state.livros.map(livro => (
                <LivroItem key={livro.id} livro={livro} />
            ))}
        </ul>

        {/* <ul>
          {this.state.livros.map(livro => (
            <li className='item-livro' key={livro.id}>
              <h2>{livro.titulo}</h2>
              
              <p>Área: {livro.area}</p>
              <p>{`Caminho: ${livro.caminho}`}</p>
              <a href= {`http://localhost:3001/arquivos/${livro.caminho}`} target="_blank" rel="noopener noreferrer">
                Abrir livro
              </a>
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

export default App;