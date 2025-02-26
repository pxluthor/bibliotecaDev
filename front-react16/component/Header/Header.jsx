import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Minha Biblioteca</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="/livros" className="hover:text-gray-300">Livros</a>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;