import os
import mysql.connector
from dotenv import load_dotenv
load_dotenv()

HOST = os.getenv('HOST')
USER = os.getenv('USER')
PASSWORD = os.getenv('PASSWORD')
DATABASE = os.getenv('DATABASE')

# Configurar conexão com MySQL
conn = mysql.connector.connect(
    host=HOST,
    user=USER,
    password=PASSWORD,
    database=DATABASE
)
cursor = conn.cursor()

# Criar tabela se não existir
cursor.execute('''
CREATE TABLE IF NOT EXISTS livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    area VARCHAR(255),
    caminho TEXT,
    autor VARCHAR(255),
    editora VARCHAR(255),
    ano INT,
    paginas INT,
    genero VARCHAR(255),
    idioma VARCHAR(255),
    sinopse TEXT,
    capa BLOB,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
               
)
''')

# Caminho da pasta principal de livros
pasta_biblioteca = r'E:\BIBLIOTECA'

# Extensões suportadas
extensoes_suportadas = ['.pdf', '.epub', '.azw']

# Função para indexar livros recursivamente e evitar duplicatas

def indexar_livros(pasta_raiz):
    livros_para_inserir = []

    for raiz, _, arquivos in os.walk(pasta_raiz):
        # Filtrar apenas arquivos com extensões suportadas
        arquivos_validos = [arq for arq in arquivos if any(arq.lower().endswith(ext) for ext in extensoes_suportadas)]
        if not arquivos_validos:
            continue
        
        # Capturar a hierarquia completa da pasta
        area = os.path.relpath(raiz, pasta_raiz).replace(os.sep, ' / ')
        
        for arquivo in arquivos_validos:
            caminho_completo = os.path.join(raiz, arquivo)
            
            # Verificar se o livro já existe no banco
            cursor.execute('SELECT id FROM livros WHERE caminho = %s', (caminho_completo,))
            if cursor.fetchone():
                print(f'Livro já indexado: {arquivo}')
                continue
            
            livros_para_inserir.append((arquivo, area, caminho_completo))
    
    # Inserir todos os livros de uma vez (mais rápido)
    if livros_para_inserir:
        cursor.executemany(
            'INSERT INTO livros (titulo, area, caminho) VALUES (%s, %s, %s)',
            livros_para_inserir
        )

# Indexar os livros
indexar_livros(pasta_biblioteca)

# Commit e fechar conexão
conn.commit()
cursor.close()
conn.close()
print('Livros e áreas indexados com sucesso!')

