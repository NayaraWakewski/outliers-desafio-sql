
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
QUESTIONS = {
  1: {
    "resposta": "SELECT * FROM clientes"
  },
  2: {
    "resposta": "SELECT nome FROM clientes"
  },
  3: {
    "resposta": "SELECT nome FROM produtos"
  },
  4: {
    "resposta": "SELECT * FROM vendas"
  },
  5: {
    "resposta": "SELECT DISTINCT nome FROM clientes"
  },
  6: {
    "resposta": "SELECT * FROM clientes WHERE idade > 30"
  },
  7: {
    "resposta": "SELECT * FROM produtos WHERE preco < 100"
  },
  8: {
    "resposta": "SELECT * FROM clientes WHERE idade = 25"
  },
  9: {
    "resposta": "SELECT nome FROM clientes ORDER BY nome ASC"
  },
  10: {
    "resposta": "SELECT * FROM vendas LIMIT 5"
  },
  11: {
    "resposta": "SELECT * FROM produtos WHERE nome = 'Notebook'"
  },
  12: {
    "resposta": "SELECT nome, idade FROM clientes"
  },
  13: {
    "resposta": "SELECT * FROM clientes WHERE estado = 'SP'"
  },
  14: {
    "resposta": "SELECT data, valor FROM vendas"
  },
  15: {
    "resposta": "SELECT * FROM clientes WHERE idade BETWEEN 20 AND 30"
  },
  16: {
    "resposta": "SELECT COUNT(*) FROM clientes"
  },
  17: {
    "resposta": "SELECT AVG(idade) FROM clientes"
  },
  18: {
    "resposta": "SELECT estado, COUNT(*) FROM clientes GROUP BY estado"
  },
  19: {
    "resposta": "SELECT categoria, COUNT(*) FROM produtos GROUP BY categoria"
  },
  20: {
    "resposta": "SELECT * FROM produtos WHERE preco > 500 ORDER BY nome ASC"
  },
  21: {
    "resposta": "SELECT EXTRACT(MONTH FROM data) AS mes, SUM(valor) FROM vendas GROUP BY mes"
  },
  22: {
    "resposta": "SELECT * FROM clientes WHERE nome LIKE 'A%'"
  },
  23: {
    "resposta": "SELECT * FROM produtos WHERE nome LIKE '%book%'"
  },
  24: {
    "resposta": "SELECT DISTINCT estado FROM clientes"
  },
  25: {
    "resposta": "SELECT * FROM clientes WHERE idade BETWEEN 25 AND 35 ORDER BY idade"
  },
  26: {
    "resposta": "SELECT MAX(valor) FROM vendas"
  },
  27: {
    "resposta": "SELECT COUNT(*) FROM clientes WHERE idade > 30"
  },
  28: {
    "resposta": "SELECT categoria, AVG(preco) FROM produtos GROUP BY categoria"
  },
  29: {
    "resposta": "SELECT * FROM clientes WHERE estado IN ('SP', 'RJ')"
  },
  30: {
    "resposta": "SELECT idade, COUNT(*) FROM clientes GROUP BY idade"
  },
  31: {
    "resposta": "SELECT clientes.nome, vendas.valor FROM clientes INNER JOIN vendas ON clientes.id = vendas.cliente_id"
  },
  32: {
    "resposta": "SELECT * FROM clientes WHERE estado NOT IN ('SP', 'RJ')"
  },
  33: {
    "resposta": "SELECT * FROM produtos WHERE preco BETWEEN 100 AND 300 AND nome LIKE '%Pro%'"
  },
  34: {
    "resposta": "SELECT AVG(valor) FROM vendas WHERE valor > 200"
  },
  35: {
    "resposta": "SELECT clientes.nome FROM clientes JOIN vendas ON clientes.id = vendas.cliente_id GROUP BY clientes.nome HAVING COUNT(*) > 2"
  },
  36: {
    "resposta": "SELECT nome FROM clientes WHERE id NOT IN (SELECT cliente_id FROM vendas)"
  },
  37: {
    "resposta": "SELECT * FROM clientes WHERE estado IN (SELECT estado FROM clientes GROUP BY estado HAVING COUNT(*) > 1)"
  },
  38: {
    "resposta": "SELECT * FROM produtos WHERE preco = (SELECT MAX(preco) FROM produtos)"
  },
  39: {
    "resposta": "SELECT AVG(idade) FROM clientes WHERE estado = 'SP'"
  },
  40: {
    "resposta": "SELECT * FROM vendas WHERE EXTRACT(MONTH FROM data) = '01'"
  }
}

class QueryRequest(BaseModel):
    id: int
    query: str

def normalizar(sql):
    sql = sql.lower()
    sql = re.sub(r"[\n\t\r;]", " ", sql)
    sql = re.sub(r"\s+", " ", sql)
    return sql.strip()

@app.post("/validar")
def validar(data: QueryRequest):
    qid = data.id
    query_user = normalizar(data.query)
    query_ref = normalizar(QUESTIONS.get(qid, {}).get("resposta", ""))

    correta = query_user == query_ref
    return {"correta": correta, "query_normalizada": query_user}
