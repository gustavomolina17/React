import { useEffect, useState } from "react";
import "./App.css";

export default function Home() {
  const [filmes, setFilmes] = useState([
    {
          id: 1,
          nome: "Capitão América: O primeiro vingador",
          imagemUrl:
            "https://play-lh.googleusercontent.com/9LAzip_XWe8eVWEUGCnSJ4xf706RmYtSu5bZRAfvqbs2aW6YVlLbPF7UVTfMpJKQUioKGw",
        },
        {
          id: 2,
          nome: "Capitã Marvel",
          imagemUrl:
            "https://br.web.img2.acsta.net/pictures/19/02/04/18/35/1468867.jpg",
        },
        {
          id: 3,
          nome: "O incrivel Hulk",
          imagemUrl:
            "https://br.web.img2.acsta.net/c_310_420/pictures/210/485/21048566_20131010182211313.jpg",
        },
        {
          id: 4,
          nome: "Homem de Ferro",
          imagemUrl:
            "https://images-na.ssl-images-amazon.com/images/I/81vTHovrz%2BL._AC_SY606_.jpg",
        },
        {
          id: 5,
          nome: "Homem de Ferro 2",
          imagemUrl:
            "https://media.fstatic.com/SFp4c8GT3GTGYok7_526qDSHTns=/290x478/smart/media/movies/covers/2018/09/66432b37ed80464274a58239b695007f95c79155.jpg",
        },
  ]);
  const [nomeFilme, setNomeFilme] = useState("");
  const [imagemUrlFilme, setImagemUrlFilme] = useState("");
  const [editando, setEditando] = useState(false);
  const [indexEditando, setEditandoIndex] = useState(null);

  useEffect(() => {
    if (indexEditando !== null && editando) {
      setNomeFilme(filmes[indexEditando].nome);
      setImagemUrlFilme(filmes[indexEditando].imagemUrl);
    }
  }, [indexEditando]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (editando) {
      const filmesAtualizados = filmes.map((f, index) => {
        if (indexEditando === index) {
          f.nome = nomeFilme;
          f.imagemUrl = imagemUrlFilme;
        }

        return f;
      });

      setFilmes(filmesAtualizados);
      setEditando(false);
      setEditandoIndex(null);
    } else {
      setFilmes([
        ...filmes,
        {
          nome: nomeFilme,
          imagemUrl: imagemUrlFilme,
        },
      ]);
    }

    setNomeFilme("");
    setImagemUrlFilme("");
  };

  const deletar = (index) => {
    setFilmes(filmes.filter((f, i) => i !== index));
  };

  return (
    <div className="container">
      <main className="main">
        <h1>Filmes</h1>
        <hr />
        <h2>
          {editando
            ? `Editando: ${filmes[indexEditando].nome}`
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
