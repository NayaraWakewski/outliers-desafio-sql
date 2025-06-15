
# Backend SQL Validator (String-based)

Valida consultas SQL comparando com a resposta esperada após normalização.

## Como rodar

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

## Exemplo de JSON

```json
{
  "id": 1,
  "query": "SELECT  * FROM  usuarios  ;"
}
```

Resposta:

```json
{
  "correta": true,
  "query_normalizada": "select * from usuarios"
}
```
