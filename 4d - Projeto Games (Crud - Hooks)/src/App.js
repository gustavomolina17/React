import { useEffect, useState } from "react";
import "./App.css";

export default function Home() {
  const [jogos, setJogos] = useState([
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
          imagemUrl: "https://m.media-amazon.com/images/I/81G+JvL8TIL.jpg",
        },
        {
          nome: "Donkey Kong Country",
          imagemUrl:
            "https://m.media-amazon.com/images/I/91+xZjhGTSL._AC_SY550_.jpg",
        },
  ]);
  const [nomeJogo, setNomeJogo] = useState("");
  const [imagemUrlJogo, setImagemUrlJogo] = useState("");
  const [editando, setEditando] = useState(false);
  const [indexEditando, setEditandoIndex] = useState(null);

  useEffect(() => {
    if (indexEditando !== null && editando) {
      setNomeJogo(jogos[indexEditando].nome);
      setImagemUrlJogo(jogos[indexEditando].imagemUrl);
    }
  }, [indexEditando]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (editando) {
      const jogosAtualizados = jogos.map((f, index) => {
        if (indexEditando === index) {
          f.nome = nomeJogo;
          f.imagemUrl = imagemUrlJogo;
        }

        return f;
      });

      setJogos(jogosAtualizados);
      setEditando(false);
      setEditandoIndex(null);
    } else {
      setJogos([
        ...jogos,
        {
          nome: nomeJogo,
          imagemUrl: imagemUrlJogo,
        },
      ]);
    }

    setNomeJogo("");
    setImagemUrlJogo("");
  };

  const deletar = (index) => {
    setJogos(jogos.filter((f, i) => i !== index));
  };

  return (
    <div className="container">
      <main className="main">
        <h1>Jogos</h1>
        <hr />
        <h2>
          {editando
            ? `Editando: ${jogos[indexEditando].nome}`
            : "Cadastre um novo Jogo"}
        </h2>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Nome"
            value={nomeJogo}
            onChange={(e) => {
              setNomeJogo(e.target.value);
            }}
          />
          <br />
          <input
            placeholder="Url da Imagem"
            value={imagemUrlJogo}
            onChange={(e) => {
              setImagemUrlJogo(e.target.value);
            }}
          />
          <br />
          <button type="submit">Salvar</button>
        </form>
        <hr />
        <ul>
          {jogos.map((f, index) => (
            <li key={index}>
              <h3>{f.nome}</h3>
              <img src={f.imagemUrl} />
              <br />
              <button onClick={() => deletar(index)}>Deletar</button>
              <br />
              <button
                onClick={() => {
                  setEditando(true);
                  setEditandoIndex(index);
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
