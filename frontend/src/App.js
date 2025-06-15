
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const questions = [
  {
    "id": 1,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione todas as colunas da tabela 'clientes'",
    "resposta": "SELECT * FROM clientes",
    "dica": "Use SELECT e o caractere *"
  },
  {
    "id": 2,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione apenas a coluna 'nome' da tabela 'clientes'",
    "resposta": "SELECT nome FROM clientes",
    "dica": "Use SELECT com o nome da coluna"
  },
  {
    "id": 3,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione os nomes dos produtos da tabela 'produtos'",
    "resposta": "SELECT nome FROM produtos",
    "dica": "Selecione apenas a coluna 'nome'"
  },
  {
    "id": 4,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione todas as colunas da tabela 'vendas'",
    "resposta": "SELECT * FROM vendas",
    "dica": "Use SELECT *"
  },
  {
    "id": 5,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione os nomes distintos da tabela 'clientes'",
    "resposta": "SELECT DISTINCT nome FROM clientes",
    "dica": "Use DISTINCT para eliminar duplicatas"
  },
  {
    "id": 6,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione os clientes com idade maior que 30 na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE idade > 30",
    "dica": "Use WHERE com operador >"
  },
  {
    "id": 7,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione os produtos com pre\u00e7o menor que 100 na tabela 'produtos'",
    "resposta": "SELECT * FROM produtos WHERE preco < 100",
    "dica": "Use WHERE com operador <"
  },
  {
    "id": 8,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione os clientes com idade igual a 25 na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE idade = 25",
    "dica": "Use WHERE com ="
  },
  {
    "id": 9,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione os nomes dos clientes em ordem alfab\u00e9tica na tabela 'clientes'",
    "resposta": "SELECT nome FROM clientes ORDER BY nome ASC",
    "dica": "Use ORDER BY"
  },
  {
    "id": 10,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione as 5 primeiras vendas da tabela 'vendas'",
    "resposta": "SELECT * FROM vendas LIMIT 5",
    "dica": "Use LIMIT"
  },
  {
    "id": 11,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione os produtos com nome 'Notebook' na tabela 'produtos'",
    "resposta": "SELECT * FROM produtos WHERE nome = 'Notebook'",
    "dica": "Use aspas simples para filtrar texto"
  },
  {
    "id": 12,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione o nome e a idade da tabela 'clientes'",
    "resposta": "SELECT nome, idade FROM clientes",
    "dica": "Separe colunas com v\u00edrgula"
  },
  {
    "id": 13,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione os clientes do estado 'SP' na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE estado = 'SP'",
    "dica": "Use WHERE com texto"
  },
  {
    "id": 14,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione a data e o valor das vendas na tabela 'vendas'",
    "resposta": "SELECT data, valor FROM vendas",
    "dica": "Selecione m\u00faltiplas colunas"
  },
  {
    "id": 15,
    "nivel": "F\u00e1cil",
    "enunciado": "Selecione os clientes com idade entre 20 e 30 na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE idade BETWEEN 20 AND 30",
    "dica": "Use BETWEEN"
  },
  {
    "id": 16,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione o n\u00famero total de clientes na tabela 'clientes'",
    "resposta": "SELECT COUNT(*) FROM clientes",
    "dica": "Use COUNT(*) para contar registros"
  },
  {
    "id": 17,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione a m\u00e9dia das idades dos clientes na tabela 'clientes'",
    "resposta": "SELECT AVG(idade) FROM clientes",
    "dica": "Use AVG(coluna)"
  },
  {
    "id": 18,
    "nivel": "M\u00e9dio",
    "enunciado": "Conte quantos clientes existem por estado na tabela 'clientes'",
    "resposta": "SELECT estado, COUNT(*) FROM clientes GROUP BY estado",
    "dica": "Use GROUP BY"
  },
  {
    "id": 19,
    "nivel": "M\u00e9dio",
    "enunciado": "Conte quantos produtos existem por categoria na tabela 'produtos'",
    "resposta": "SELECT categoria, COUNT(*) FROM produtos GROUP BY categoria",
    "dica": "Use GROUP BY"
  },
  {
    "id": 20,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione os produtos com pre\u00e7o maior que 500 e ordene pelo nome na tabela 'produtos'",
    "resposta": "SELECT * FROM produtos WHERE preco > 500 ORDER BY nome ASC",
    "dica": "Combine WHERE com ORDER BY"
  },
  {
    "id": 21,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione o total de vendas por m\u00eas na tabela 'vendas'",
    "resposta": "SELECT EXTRACT(MONTH FROM data) AS mes, SUM(valor) FROM vendas GROUP BY mes",
    "dica": "Use EXTRACT para agrupar por m\u00eas"
  },
  {
    "id": 22,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione os clientes com nome iniciando com 'A' na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE nome LIKE 'A%'",
    "dica": "Use LIKE com %"
  },
  {
    "id": 23,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione os produtos com nome contendo 'book' na tabela 'produtos'",
    "resposta": "SELECT * FROM produtos WHERE nome LIKE '%book%'",
    "dica": "Use LIKE com % antes e depois"
  },
  {
    "id": 24,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione os estados distintos da tabela 'clientes'",
    "resposta": "SELECT DISTINCT estado FROM clientes",
    "dica": "Use DISTINCT"
  },
  {
    "id": 25,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione os clientes com idade entre 25 e 35 ordenados por idade na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE idade BETWEEN 25 AND 35 ORDER BY idade",
    "dica": "Combine BETWEEN com ORDER BY"
  },
  {
    "id": 26,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione o maior valor de venda registrado na tabela 'vendas'",
    "resposta": "SELECT MAX(valor) FROM vendas",
    "dica": "Use MAX()"
  },
  {
    "id": 27,
    "nivel": "M\u00e9dio",
    "enunciado": "Conte quantos clientes existem com idade maior que 30 na tabela 'clientes'",
    "resposta": "SELECT COUNT(*) FROM clientes WHERE idade > 30",
    "dica": "Use COUNT com filtro"
  },
  {
    "id": 28,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione a categoria e pre\u00e7o m\u00e9dio dos produtos na tabela 'produtos'",
    "resposta": "SELECT categoria, AVG(preco) FROM produtos GROUP BY categoria",
    "dica": "Use GROUP BY com AVG"
  },
  {
    "id": 29,
    "nivel": "M\u00e9dio",
    "enunciado": "Selecione os clientes dos estados 'SP' ou 'RJ' na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE estado IN ('SP', 'RJ')",
    "dica": "Use IN"
  },
  {
    "id": 30,
    "nivel": "M\u00e9dio",
    "enunciado": "Conte quantos clientes por faixa et\u00e1ria (idade) na tabela 'clientes'",
    "resposta": "SELECT idade, COUNT(*) FROM clientes GROUP BY idade",
    "dica": "Use GROUP BY idade"
  },
  {
    "id": 31,
    "nivel": "Dif\u00edcil",
    "enunciado": "Selecione os nomes dos clientes e seus respectivos valores de compra na tabela 'clientes'",
    "resposta": "SELECT clientes.nome, vendas.valor FROM clientes INNER JOIN vendas ON clientes.id = vendas.cliente_id",
    "dica": "Use INNER JOIN para combinar tabelas"
  },
  {
    "id": 32,
    "nivel": "Dif\u00edcil",
    "enunciado": "Selecione os clientes que n\u00e3o s\u00e3o do estado 'SP' nem 'RJ' na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE estado NOT IN ('SP', 'RJ')",
    "dica": "Use NOT IN"
  },
  {
    "id": 33,
    "nivel": "Dif\u00edcil",
    "enunciado": "Selecione os produtos com pre\u00e7o entre 100 e 300 e que contenham 'Pro' no nome na tabela 'produtos'",
    "resposta": "SELECT * FROM produtos WHERE preco BETWEEN 100 AND 300 AND nome LIKE '%Pro%'",
    "dica": "Combine BETWEEN e LIKE com AND"
  },
  {
    "id": 34,
    "nivel": "Dif\u00edcil",
    "enunciado": "Selecione a m\u00e9dia de valor das vendas acima de R$200 na tabela 'vendas'",
    "resposta": "SELECT AVG(valor) FROM vendas WHERE valor > 200",
    "dica": "Use AVG com filtro"
  },
  {
    "id": 35,
    "nivel": "Dif\u00edcil",
    "enunciado": "Selecione os nomes dos clientes com mais de 2 registros de venda na tabela 'clientes'",
    "resposta": "SELECT clientes.nome FROM clientes JOIN vendas ON clientes.id = vendas.cliente_id GROUP BY clientes.nome HAVING COUNT(*) > 2",
    "dica": "Use HAVING ap\u00f3s GROUP BY"
  },
  {
    "id": 36,
    "nivel": "Dif\u00edcil",
    "enunciado": "Liste os nomes dos clientes que n\u00e3o realizaram vendas na tabela 'clientes'",
    "resposta": "SELECT nome FROM clientes WHERE id NOT IN (SELECT cliente_id FROM vendas)",
    "dica": "Use subquery com NOT IN"
  },
  {
    "id": 37,
    "nivel": "Dif\u00edcil",
    "enunciado": "Selecione os clientes que t\u00eam o mesmo estado que algum outro cliente na tabela 'clientes'",
    "resposta": "SELECT * FROM clientes WHERE estado IN (SELECT estado FROM clientes GROUP BY estado HAVING COUNT(*) > 1)",
    "dica": "Use subquery com GROUP BY"
  },
  {
    "id": 38,
    "nivel": "Dif\u00edcil",
    "enunciado": "Selecione o produto mais caro da tabela",
    "resposta": "SELECT * FROM produtos WHERE preco = (SELECT MAX(preco) FROM produtos)",
    "dica": "Use subquery com MAX"
  },
  {
    "id": 39,
    "nivel": "Dif\u00edcil",
    "enunciado": "Selecione a idade m\u00e9dia dos clientes do estado 'SP' na tabela 'clientes'",
    "resposta": "SELECT AVG(idade) FROM clientes WHERE estado = 'SP'",
    "dica": "Use AVG com filtro"
  },
  {
    "id": 40,
    "nivel": "Dif\u00edcil",
    "enunciado": "Liste as vendas do m\u00eas de janeiro na tabela 'vendas', , considerando que a coluna 'data' está no formato DATE padrão (YYYY-MM-DD)`.",
    "resposta": "SELECT * FROM vendas WHERE EXTRACT(MONTH FROM data) = '01'",
    "dica": "Use EXTRACT para filtrar por m\u00eas"
  }
];

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
          placeholder="Escreva sua consulta SQL aqui..."
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
