
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const questions = [
  {
    "id": 1,
    "nivel": "Fácil",
    "enunciado": "Selecione todas as colunas da tabela 'clientes'",
    "resposta": "SELECT * FROM clientes",
    "dica": "Use SELECT e o caractere *"
  },
  {
    "id": 2,
    "nivel": "Fácil",
    "enunciado": "Selecione apenas a coluna 'nome' da tabela 'clientes'",
    "resposta": "SELECT nome FROM clientes",
    "dica": "Use SELECT com o nome da coluna"
  },
  {
    "id": 3,
    "nivel": "Fácil",
    "enunciado": "Selecione os nomes dos produtos da tabela 'produtos'",
    "resposta": "SELECT nome FROM produtos",
    "dica": "Selecione apenas a coluna 'nome'"
  },
  {
    "id": 4,
    "nivel": "Fácil",
    "enunciado": "Selecione todas as colunas da tabela 'vendas'",
    "resposta": "SELECT * FROM vendas",
    "dica": "Use SELECT *"
  },
  {
    "id": 5,
    "nivel": "Fácil",
    "enunciado": "Selecione os nomes distintos da tabela 'clientes', sem repetições",
    "resposta": "SELECT DISTINCT nome FROM clientes",
    "dica": "Use DISTINCT para eliminar duplicatas"
  },
  {
    "id": 6,
    "nivel": "Fácil",
    "enunciado": "Selecione os clientes com idade maior que 30 na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE idade > 30",
    "dica": "Use WHERE com o operador >"
  },
  {
    "id": 7,
    "nivel": "Fácil",
    "enunciado": "Selecione os produtos com preço menor que R$100,00 na tabela 'produtos'",
    "resposta": "SELECT * FROM produtos WHERE preco < 100",
    "dica": "Use WHERE com o operador <"
  },
  {
    "id": 8,
    "nivel": "Fácil",
    "enunciado": "Selecione os clientes com idade igual a 25 anos na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE idade = 25",
    "dica": "Use WHERE com o operador ="
  },
  {
    "id": 9,
    "nivel": "Fácil",
    "enunciado": "Selecione os nomes dos clientes da tabela 'clientes', ordenando-os em ordem alfabética pela coluna 'nome'",
    "resposta": "SELECT nome FROM clientes ORDER BY nome",
    "dica": "Use ORDER BY. A ordem ascendente (ASC) é o padrão e pode ser omitida."
  },
  {
    "id": 10,
    "nivel": "Fácil",
    "enunciado": "Selecione as 5 primeiras vendas da tabela 'vendas'",
    "resposta": "SELECT * FROM vendas LIMIT 5",
    "dica": "Use a cláusula LIMIT para restringir o número de resultados"
  },
  {
    "id": 11,
    "nivel": "Fácil",
    "enunciado": "Selecione os produtos com o nome 'Notebook' na tabela 'produtos'",
    "resposta": "SELECT * FROM produtos WHERE nome = 'Notebook'",
    "dica": "Use aspas simples para filtrar por um valor de texto exato"
  },
  {
    "id": 12,
    "nivel": "Fácil",
    "enunciado": "Selecione as colunas 'nome' e 'idade' da tabela 'clientes'",
    "resposta": "SELECT nome, idade FROM clientes",
    "dica": "Separe os nomes das colunas com vírgula"
  },
  {
    "id": 13,
    "nivel": "Fácil",
    "enunciado": "Selecione os clientes que são do estado 'SP' na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE estado = 'SP'",
    "dica": "Filtre a coluna 'estado' usando a cláusula WHERE"
  },
  {
    "id": 14,
    "nivel": "Fácil",
    "enunciado": "Selecione as colunas 'data' e 'valor' da tabela 'vendas'",
    "resposta": "SELECT data, valor FROM vendas",
    "dica": "Selecione múltiplas colunas separando-as por vírgula"
  },
  {
    "id": 15,
    "nivel": "Fácil",
    "enunciado": "Selecione os clientes com idade entre 20 e 30 anos (inclusive) na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE idade BETWEEN 20 AND 30",
    "dica": "Use o operador BETWEEN para filtrar um intervalo"
  },
  {
    "id": 16,
    "nivel": "Médio",
    "enunciado": "Conte o número total de registros na tabela 'clientes'",
    "resposta": "SELECT COUNT(*) FROM clientes",
    "dica": "Use COUNT(*) para contar todas as linhas de uma tabela"
  },
  {
    "id": 17,
    "nivel": "Médio",
    "enunciado": "Calcule a média de idade dos clientes utilizando a coluna 'idade' da tabela 'clientes'",
    "resposta": "SELECT AVG(idade) FROM clientes",
    "dica": "Use a função de agregação AVG(nome_da_coluna)"
  },
  {
    "id": 18,
    "nivel": "Médio",
    "enunciado": "Conte quantos clientes existem por estado, agrupando o resultado pela coluna 'estado' da tabela 'clientes'",
    "resposta": "SELECT estado, COUNT(*) FROM clientes GROUP BY estado",
    "dica": "Use GROUP BY para agrupar linhas com o mesmo valor na coluna 'estado'"
  },
  {
    "id": 19,
    "nivel": "Médio",
    "enunciado": "Conte quantos produtos existem por categoria, agrupando o resultado pela coluna 'categoria' da tabela 'produtos'",
    "resposta": "SELECT categoria, COUNT(*) FROM produtos GROUP BY categoria",
    "dica": "Use GROUP BY para agrupar as linhas pela coluna 'categoria'"
  },
  {
    "id": 20,
    "nivel": "Médio",
    "enunciado": "Selecione os produtos com preço maior que 500 e ordene o resultado pelo nome do produto",
    "resposta": "SELECT * FROM produtos WHERE preco > 500 ORDER BY nome",
    "dica": "Combine a cláusula WHERE com ORDER BY"
  },
  {
    "id": 21,
    "nivel": "Médio",
    "enunciado": "Calcule o valor total de vendas por mês, agrupando pela coluna 'data' da tabela 'vendas'",
    "resposta": "SELECT EXTRACT(MONTH FROM data) AS mes, SUM(valor) FROM vendas GROUP BY EXTRACT(MONTH FROM data)",
    "dica": "Use a função EXTRACT(MONTH FROM coluna_data) para obter o mês e agrupe por ele"
  },
  {
    "id": 22,
    "nivel": "Médio",
    "enunciado": "Selecione os clientes cujo nome começa com a letra 'A', na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE nome LIKE 'A%'",
    "dica": "Use o operador LIKE com o caractere curinga % para buscar padrões de texto"
  },
  {
    "id": 23,
    "nivel": "Médio",
    "enunciado": "Selecione os produtos que contenham 'book' em seu nome, na tabela 'produtos'",
    "resposta": "SELECT * FROM produtos WHERE nome LIKE '%book%'",
    "dica": "Use LIKE com % no início e no fim para encontrar um texto em qualquer parte do nome"
  },
  {
    "id": 24,
    "nivel": "Médio",
    "enunciado": "Selecione os estados distintos da tabela 'clientes', sem repetições",
    "resposta": "SELECT DISTINCT estado FROM clientes",
    "dica": "Use DISTINCT na coluna 'estado' para obter valores únicos"
  },
  {
    "id": 25,
    "nivel": "Médio",
    "enunciado": "Selecione os clientes com idade entre 25 e 35 anos, ordenando-os pela coluna 'idade'",
    "resposta": "SELECT * FROM clientes WHERE idade BETWEEN 25 AND 35 ORDER BY idade",
    "dica": "Combine o operador BETWEEN com a cláusula ORDER BY"
  },
  {
    "id": 26,
    "nivel": "Médio",
    "enunciado": "Selecione o maior valor de venda registrado na tabela 'vendas' usando a coluna 'valor'",
    "resposta": "SELECT MAX(valor) FROM vendas",
    "dica": "Use a função de agregação MAX() para encontrar o maior valor"
  },
  {
    "id": 27,
    "nivel": "Médio",
    "enunciado": "Conte quantos clientes têm idade superior a 30 anos na tabela 'clientes'",
    "resposta": "SELECT COUNT(*) FROM clientes WHERE idade > 30",
    "dica": "Combine a função COUNT(*) com uma cláusula WHERE para contar linhas que atendem a um critério"
  },
  {
    "id": 28,
    "nivel": "Médio",
    "enunciado": "Calcule o preço médio dos produtos para cada categoria, usando as colunas 'categoria' e 'preco'",
    "resposta": "SELECT categoria, AVG(preco) FROM produtos GROUP BY categoria",
    "dica": "Use GROUP BY na coluna 'categoria' e a função AVG() na coluna 'preco'"
  },
  {
    "id": 29,
    "nivel": "Médio",
    "enunciado": "Selecione os clientes que são dos estados 'SP' ou 'RJ' na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE estado IN ('SP', 'RJ')",
    "dica": "Use o operador IN para verificar se um valor corresponde a qualquer valor em uma lista"
  },
  {
    "id": 30,
    "nivel": "Médio",
    "enunciado": "Conte quantos clientes existem para cada idade, agrupando pela coluna 'idade' na tabela 'clientes'",
    "resposta": "SELECT idade, COUNT(*) FROM clientes GROUP BY idade",
    "dica": "Use GROUP BY na coluna 'idade' para contar clientes por faixa etária"
  },
  {
    "id": 31,
    "nivel": "Difícil",
    "enunciado": "Selecione os nomes dos clientes e o valor de cada uma de suas compras, juntando as tabelas 'clientes' e 'vendas'",
    "resposta": "SELECT clientes.nome, vendas.valor FROM clientes INNER JOIN vendas ON clientes.id = vendas.cliente_id",
    "dica": "Use INNER JOIN para combinar linhas de duas tabelas com base em uma condição de junção (clientes.id = vendas.cliente_id)"
  },
  {
    "id": 32,
    "nivel": "Difícil",
    "enunciado": "Selecione os clientes que não são do estado 'SP' nem 'RJ' na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE estado NOT IN ('SP', 'RJ')",
    "dica": "Use o operador NOT IN para excluir valores de uma lista"
  },
  {
    "id": 33,
    "nivel": "Difícil",
    "enunciado": "Selecione os produtos com preço entre 100 e 300 e que contenham 'Pro' no nome",
    "resposta": "SELECT * FROM produtos WHERE preco BETWEEN 100 AND 300 AND nome LIKE '%Pro%'",
    "dica": "Combine os operadores BETWEEN e LIKE com o operador lógico AND"
  },
  {
    "id": 34,
    "nivel": "Difícil",
    "enunciado": "Calcule a média de valor das vendas que foram acima de R$200",
    "resposta": "SELECT AVG(valor) FROM vendas WHERE valor > 200",
    "dica": "Use a função AVG com uma cláusula WHERE para calcular a média de um subconjunto de dados"
  },
  {
    "id": 35,
    "nivel": "Difícil",
    "enunciado": "Selecione o nome dos clientes que realizaram mais de 2 compras, agrupando pela coluna 'clientes.nome'",
    "resposta": "SELECT clientes.nome FROM clientes JOIN vendas ON clientes.id = vendas.cliente_id GROUP BY clientes.nome HAVING COUNT(vendas.id) > 2",
    "dica": "Use a cláusula HAVING para filtrar resultados de um grupo após a agregação"
  },
  {
    "id": 36,
    "nivel": "Difícil",
    "enunciado": "Liste os nomes dos clientes que ainda não realizaram nenhuma compra",
    "resposta": "SELECT nome FROM clientes WHERE id NOT IN (SELECT DISTINCT cliente_id FROM vendas)",
    "dica": "Use uma subconsulta (subquery) com NOT IN para encontrar clientes sem correspondência na tabela de vendas"
  },
  {
    "id": 37,
    "nivel": "Difícil",
    "enunciado": "Selecione os clientes que moram em um estado onde há mais de um cliente cadastrado",
    "resposta": "SELECT * FROM clientes WHERE estado IN (SELECT estado FROM clientes GROUP BY estado HAVING COUNT(*) > 1)",
    "dica": "Use uma subconsulta que agrupa por estado e filtra aqueles com contagem maior que 1"
  },
  {
    "id": 38,
    "nivel": "Difícil",
    "enunciado": "Selecione o produto mais caro da tabela 'produtos'",
    "resposta": "SELECT * FROM produtos ORDER BY preco DESC LIMIT 1",
    "dica": "Uma forma eficiente é ordenar por preço em ordem decrescente (DESC) e limitar o resultado a 1."
  },
  {
    "id": 39,
    "nivel": "Difícil",
    "enunciado": "Calcule a idade média dos clientes que são do estado 'SP'",
    "resposta": "SELECT AVG(idade) FROM clientes WHERE estado = 'SP'",
    "dica": "Combine a função AVG com a cláusula WHERE para calcular a média de um grupo específico"
  },
  {
    "id": 40,
    "nivel": "Difícil",
    "enunciado": "Liste todas as vendas que ocorreram no mês de janeiro (mês 1), filtrando pela coluna 'data'",
    "resposta": "SELECT * FROM vendas WHERE EXTRACT(MONTH FROM data) = 1",
    "dica": "Use a função EXTRACT(MONTH FROM coluna_data) e compare o resultado com o número do mês desejado"
  }
]

function App() {
  const [index, setIndex] = useState(0);
  const [tentativasRestantes, setTentativasRestantes] = useState(3);
  const [userQuery, setUserQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showDica, setShowDica] = useState(false);
  const [respostas, setRespostas] = useState([]);
  const [podeAvancar, setPodeAvancar] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  const questao = questions[index];

  const handleVerificar = async () => {
    if (bloqueado || podeAvancar) return;

    try {
      const res = await axios.post("https://outliers-desafio-sql.onrender.com/validar", {
        id: questao.id,
        query: userQuery
      });

      if (res.data.correta) {
        setFeedback("✅ Resposta correta!");
        setPodeAvancar(true);
      } else {
        const novaTentativa = tentativasRestantes - 1;
        setTentativasRestantes(novaTentativa);
        setFeedback("❌ Resposta incorreta.");
        if (novaTentativa === 0) {
          setBloqueado(true);
        }
      }
    } catch (err) {
      setFeedback("Erro ao verificar resposta.");
    }
  };

  const handlePular = () => {
    setRespostas([...respostas, {
      id: questao.id,
      nivel: questao.nivel,
      acertou: false
    }]);
    avancar();
  };

  const handleAvancar = () => {
    setRespostas([...respostas, {
      id: questao.id,
      nivel: questao.nivel,
      acertou: true
    }]);
    avancar();
  };

  const handleReiniciarTentativas = () => {
    setTentativasRestantes(3);
    setFeedback("");
    setBloqueado(false);
    setUserQuery("");
  };

  const avancar = () => {
    setIndex(index + 1);
    setUserQuery("");
    setTentativasRestantes(3);
    setFeedback("");
    setShowDica(false);
    setPodeAvancar(false);
    setBloqueado(false);
  };

if (index >= questions.length) {
  const total = respostas.length;
  const acertos = respostas.filter(r => r.acertou).length;

  // Definir badge de acordo com performance
  let titulo = "", mensagem = "", badge = "";
  if (acertos <= 10) {
    titulo = "Iniciante SQL";
    mensagem = "Você está começando sua jornada! Foque em comandos básicos como SELECT, WHERE, ORDER BY e LIMIT.";
    badge = "/badges/iniciante.jpg";
  } else if (acertos <= 25) {
    titulo = "Explorador SQL";
    mensagem = "Boa base! Revise GROUP BY, funções de agregação e LIKE.";
    badge = "/badges/explorador.jpg";
  } else if (acertos <= 35) {
    titulo = "Analista SQL";
    mensagem = "Ótimo desempenho! Você domina JOINs, subqueries e análises.";
    badge = "/badges/analista.jpg";
  } else {
    titulo = "Mestre SQL";
    mensagem = "Você é um verdadeiro outlier dos dados. Parabéns!";
    badge = "/badges/mestre.jpg";
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = badge;
    link.download = `outliers_badge_${titulo.replace(/\s/g, "_").toLowerCase()}.jpg`;
    link.click();
  };

  return (
    <div className="container">
      <div className="card">
        <img src="/logo.svg" alt="Outliers.lab" className="logo" style={{ width: "180px", marginBottom: "1rem" }} />
        <h1>🏁 Resultado Final</h1>
        <p>Você acertou {acertos} de {total} questões.</p>
        <h2>{titulo}</h2>
        <p>{mensagem}</p>

        <div style={{ marginTop: "2rem" }}>
          <img src={badge} alt="Badge de conquista" style={{ width: "200px" }} />
          <br />
          <button onClick={handleDownload} style={{ marginTop: "1rem" }}>
            ⬇️ Baixar minha badge
          </button>
        </div>
        <div style={{ marginTop: "3rem", fontSize: "0.9rem", textAlign: "center", color: "#555" }}>
        Desenvolvido por <strong>Nayara Valevskii</strong> ·
        <a
          href="https://www.linkedin.com/in/nayaraba/"
          target="_blank"
          rel="noreferrer"
          style={{ marginLeft: "5px", color: "#0073b1", textDecoration: "none" }}
        >
          LinkedIn
        </a> ·
        <a
          href="https://www.instagram.com/outliers_lab/"
          target="_blank"
          rel="noreferrer"
          style={{ marginLeft: "5px", color: "#C13584", textDecoration: "none" }}
        >
          @outliers.lab
        </a>
      </div>
      </div>
    </div>
  );
}
  return (
    <div className="container">
      <div className="card">
        <img src="/logo.svg" alt="Logo Outliers.lab" className="logo" />
        <p className="subtitle">
          Desafio {index + 1}/{questions.length} — Nível: <span className="nivel">{questao.nivel}</span>
          <span className="dica-link" onClick={() => setShowDica(!showDica)}>
            {showDica ? "Esconder dica" : "Mostrar dica"}
          </span>
        </p>
        <h2>{questao.enunciado}</h2>
        <textarea
          rows={5}
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Escreva sua consulta SQL aqui - SGBD para testar é o POSTGRES..."
        />
        <p style={{ marginBottom: "0.5rem" }}>Tentativas: {Math.min(3, 3 - tentativasRestantes + 1)}/3</p>
        {!podeAvancar && !bloqueado && (
  <>
    <button onClick={handleVerificar}>Verifique a resposta</button>
    {tentativasRestantes < 3 && (
      <button onClick={handlePular}>Pular questão</button>
    )}
  </>
)}
        {podeAvancar && (
          <button onClick={handleAvancar}>Continuar</button>
        )}
        {bloqueado && (
          <>
            <button onClick={handlePular}>Pular questão</button>
            <button onClick={handleReiniciarTentativas}>Tentar novamente</button>
          </>
        )}
        {showDica && <div className="dica">{questao.dica}</div>}
        {feedback && <p className="feedback">{feedback}</p>}
        <div className="progress">
          <div className="bar" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
        <div style={{ marginTop: "2rem", fontSize: "0.9rem", textAlign: "center", color: "#555" }}>
          Desenvolvido por <strong>Nayara Valevskii</strong> ·
          <a
            href="https://www.linkedin.com/in/nayaraba/"
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: "5px", color: "#0073b1", textDecoration: "none" }}
          >
            LinkedIn
          </a> ·
          <a
            href="https://www.instagram.com/outliers_lab/"
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: "5px", color: "#C13584", textDecoration: "none" }}
          >
            @outliers.lab
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
