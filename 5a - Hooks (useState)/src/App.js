import React, { useState } from "react";

function App() {
  // Tarefas -> Nome da state
  // setTarefas -> função que iremos chamar p/ atualizar o valor dessa state

  const [tarefas, setTarefas] = useState([
    "Pagar a conta de luz",
    "Estudar React Hooks",
    "Arrumar o quarto",
    "Jogar video-game",
  ]);

  const [nome, setNome] = useState("Tarefas do dia 03/08/2021"); //valor padrão

  const [input, setInput] = useState("");

  function handleAdd() {
    //setTarefas([...tarefas, "Aprender JS"]); //para pegar todas as tarefas (Spread Operator)

    setTarefas([...tarefas, input]);
    setInput(""); // Limpa a tela Após adicionar o valor.
  }

  return (
    <div>
      <ul>
        <h1>{nome}</h1>
        {tarefas.map((tarefa) => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
