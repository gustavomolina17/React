import { useState, useEffect } from "react";
import "./App.css";

const BASE_URL = "http://localhost:5000";

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [nomeFilme, setNomeFilme] = useState("");
  const [imagemUrlFilme, setImagemUrlFilme] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const loadFilmes = async () => {
    const response = await fetch(`${BASE_URL}/filmes`);
    const data = await response.json();
    setFilmes(data);
  };

  useEffect(() => {
    loadFilmes();
  }, []);

  useEffect(() => {
    if (idEditando !== null && editando) {
      const filme = filmes.find((f) => f._id === idEditando);
      setNomeFilme(filme.nome);
      setImagemUrlFilme(filme.imagemUrl);
    }
  }, [idEditando]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (editando) {
      await fetch(`${BASE_URL}/filmes/${idEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeFilme,
          imagemUrl: imagemUrlFilme,
        }),
      });

      setEditando(false);
      setIdEditando(null);
    } else {
      await fetch(`${BASE_URL}/filmes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeFilme,
          imagemUrl: imagemUrlFilme,
        }),
      });
    }

    loadFilmes();
    setNomeFilme("");
    setImagemUrlFilme("");
  };

  const deletar = async (id) => {
    await fetch(`${BASE_URL}/filmes/${id}`, {
      method: "DELETE",
    });
    loadFilmes();
  };

  return (
    <div className="container">
      <main className="main">
        <h1>Filmes</h1>
        <hr />
        <h2>
          {editando
            ? `Editando: ${filmes.find((f) => f._id === idEditando)?.nome}`
            : "Cadastre um novo Filme"}
        </h2>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Nome"
            value={nomeFilme}
            onChange={(e) => {
              setNomeFilme(e.target.value);
            }}
          />
          <br />
          <input
            placeholder="Url da Imagem"
            value={imagemUrlFilme}
            onChange={(e) => {
              setImagemUrlFilme(e.target.value);
            }}
          />
          <br />
          <button type="submit">Salvar</button>
        </form>
        <hr />
        <h2>Filmes</h2>
        <ul>
          {filmes.map((f, index) => (
            <li key={index}>
              <h3>{f.nome}</h3>
              <img src={f.imagemUrl} />
              <br />
              <button onClick={() => deletar(f._id)}>Deletar</button>
              <br />
              <button
                onClick={() => {
                  setEditando(true);
                  setIdEditando(f._id);
                }}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
