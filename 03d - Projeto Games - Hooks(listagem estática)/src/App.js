import { useState } from "react";
import "./App.css";

export default function Home() {
  const [games, setGames] = useState([
    {
      nome: "Sonic the Hedgehog 4",
      imagemUrl:
        "https://ikurogames.com/wp-content/uploads/sonic-the-hedgehog-4-episode-2-ps3.jpg",
    },
    {
      nome: "Need for Speed Underground",
      imagemUrl:
        "http://1.bp.blogspot.com/-CGr-ffi9Z4Q/TaryRslCRkI/AAAAAAAADSA/9SHZTRz6mM0/s1600/2rgjrxi.jpg",
    },
    {
      nome: "Crash Team Racing",
      imagemUrl:
        "https://m.media-amazon.com/images/I/71bOy1d1O-L._AC_SX522_.jpg",
    },
    {
      nome: "God of War",
      imagemUrl:
        "https://m.media-amazon.com/images/I/81G+JvL8TIL.jpg",
    },
    {
      nome: "Donkey Kong Country",
      imagemUrl:
        "https://m.media-amazon.com/images/I/91+xZjhGTSL._AC_SY550_.jpg",
    },
  ]);
  const [nomeGame, setNomeGame] = useState("");
  const [imagemUrlGame, setImagemUrlGame] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setGames([
      ...games,
      {
        nome: nomeGame,
        imagemUrl: imagemUrlGame,
      },
    ]);
    setNomeGame("");
    setImagemUrlGame("");
  };

  const deletar = (index) => {
    setGames(games.filter((g, i) => i !== index));
  };

  return (
    <div className="container">
      <main className="main">
        <h1>Games</h1>
        <hr />
        <h2>Cadastre um novo Game</h2>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Nome"
            value={nomeGame}
            onChange={(e) => {
              setNomeGame(e.target.value);
            }}
          />
          <br />
          <input
            placeholder="Url da Imagem"
            value={imagemUrlGame}
            onChange={(e) => {
              setImagemUrlGame(e.target.value);
            }}
          />
          <br />
          <button type="submit">Salvar</button>
        </form>
        <hr />
        <h2>Games</h2>
        <ul>
          {games.map((g, index) => (
            <li key={index}>
              <h3>{g.nome}</h3>
              <img src={g.imagemUrl} alt={g.nome}/>
              <br />
              <button onClick={() => deletar(index)}>Deletar</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}