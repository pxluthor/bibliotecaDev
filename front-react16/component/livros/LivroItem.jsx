import React from 'react';
import PropTypes from 'prop-types';
import './LivroItem.css';

const LivroItem = ({ livro }) => {
  return (
    <li className="item-livro">
      <h2>{livro.titulo}</h2>
      <p>Área: {livro.area}</p>
      {/* <p>{`Caminho: ${livro.caminho}`}</p> */}
      <a
        href={`http://localhost:3001/arquivos/${livro.caminho}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Abrir livro
      </a>
    </li>
  );
};

LivroItem.propTypes = {
  livro: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    caminho: PropTypes.string.isRequired,
  }).isRequired,
};

export default LivroItem;
