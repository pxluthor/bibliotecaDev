# 📚 Indexador de Livros para Biblioteca Digital

Este script Python automatiza a indexação de livros de uma biblioteca digital armazenada localmente em um banco de dados MySQL. Ele percorre recursivamente uma pasta raiz, identifica arquivos de livros com extensões suportadas (PDF, EPUB, AZW) e armazena informações relevantes no banco de dados.

## ✨ Funcionalidades

- **Indexação Automática:** Escaneia uma pasta especificada e suas subpastas em busca de arquivos de livros.
- **Suporte a Múltiplos Formatos:** Reconhece arquivos nos formatos PDF, EPUB e AZW.
- **Registro em Banco de Dados:** Armazena informações como título (nome do arquivo), área (caminho relativo da pasta) e caminho completo do arquivo.
- **Evita Duplicatas:** Verifica se um livro já foi indexado antes de adicioná-lo ao banco de dados.
- **Organização por Área:** Preserva a estrutura de diretórios da biblioteca, registrando a hierarquia das pastas como a "área" do livro.

## 🛠️ Pré-requisitos

- **Python 3.6+**
- **MySQL Server** configurado e acessível
- **Pasta da Biblioteca** contendo os arquivos de livros (PDF, EPUB, AZW)

## 🚀 Instalação

1. **Clone o Repositório:**

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

2. **Criar um Ambiente Virtual (Opcional, mas recomendado):**

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
.\venv\Scripts\activate  # Windows
```

3. **Instalar as Dependências:**

```bash
pip install mysql-connector-python python-dotenv
```

## ⚙️ Configuração

1. **Definir Variáveis de Ambiente:**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
HOST=seu_host_mysql
USER=seu_usuario_mysql
PASSWORD=sua_senha_mysql
DATABASE=seu_banco_de_dados_mysql
```

2. **Definir o Caminho da Biblioteca:**

Edite a variável `pasta_biblioteca` no script `indexador.py`:

```python
pasta_biblioteca = r'E:\BIBLIOTECA'
```

Use caminhos absolutos para evitar problemas.

## ▶️ Execução

```bash
python indexador.py
```

O script percorrerá a pasta da biblioteca, indexará os livros e armazenará as informações no banco de dados.

## 📂 Estrutura do Banco de Dados

O script cria uma tabela chamada `livros` com a seguinte estrutura:

| Coluna        | Tipo          | Descrição                                                                 |
| ------------- | ------------- | -------------------------------------------------------------------------- |
| `id`          | INT           | Identificador único do livro (chave primária, auto incremento)              |
| `titulo`      | VARCHAR(255)  | Título do livro (nome do arquivo)                                           |
| `area`        | VARCHAR(255)  | Caminho relativo da pasta do livro dentro da biblioteca                    |
| `caminho`     | TEXT          | Caminho completo do arquivo no sistema de arquivos                         |
| `autor`       | VARCHAR(255)  | (Atualmente não implementado)                                              |
| `editora`     | VARCHAR(255)  | (Atualmente não implementado)                                              |
| `ano`         | INT           | (Atualmente não implementado)                                              |
| `paginas`     | INT           | (Atualmente não implementado)                                              |
| `genero`      | VARCHAR(255)  | (Atualmente não implementado)                                              |
| `idioma`      | VARCHAR(255)  | (Atualmente não implementado)                                              |
| `sinopse`     | TEXT          | (Atualmente não implementado)                                              |
| `capa`        | BLOB          | (Atualmente não implementado)                                              |
| `data_adicao` | TIMESTAMP     | Data e hora de adição ao banco (preenchido automaticamente)                |

> ⚠️ **Nota:** As colunas não implementadas podem ser preenchidas em versões futuras com a extração de metadados dos arquivos.

## 🛡️ Licença

[Escolha uma licença, por exemplo: MIT License](https://opensource.org/licenses/MIT)

---

Feito com ❤️ para facilitar a organização de bibliotecas digitais! 🚀



