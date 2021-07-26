import React from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jogos: [
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
      ],
      nomeJogo: "",
      imagemUrlJogo: "",
      editando: false,
      indexEditando: null,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { jogos, editando, indexEditando, nomeJogo, imagemUrlJogo } =
      this.state;

    if (editando) {
      const jogosAtualizados = jogos.map((f, index) => {
        if (indexEditando === index) {
          f.nome = nomeJogo;
          f.imagemUrl = imagemUrlJogo;
        }

        return f;
      });

      this.setState({
        jogos: jogosAtualizados,
        indexEditando: null,
        editando: false,
      });
    } else {
      this.setState({
        jogos: [
          ...jogos,
          {
            nome: nomeJogo,
            imagemUrl: imagemUrlJogo,
          },
        ],
      });
    }

    this.setState({
      nomeJogo: "",
      imagemUrlJogo: "",
    });
  };

  deletar = (index) => {
    const { jogos } = this.state;
    this.setState({
      jogos: jogos.filter((f, i) => i !== index),
    });
  };

  render() {
    const { jogos, nomeJogo, imagemUrlJogo, editando, indexEditando } =
      this.state;

    return (
      <div className="container">
        <main className="main">
          <h1>Jogos</h1>
          <hr />
          <h2>
            {editando
              ? `Editando: ${jogos[indexEditando]?.nome}`
              : "Cadastre um novo Jogo"}
          </h2>
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Nome"
              value={nomeJogo}
              onChange={(e) => {
                this.setState({
                  nomeJogo: e.target.value,
                });
              }}
            />
            <br />
            <input
              placeholder="Url da Imagem"
              value={imagemUrlJogo}
              onChange={(e) => {
                this.setState({
                  imagemUrlJogo: e.target.value,
                });
              }}
            />
            <br />
            <button type="submit">Salvar</button>
          </form>
          <hr />
          <h2>Jogos</h2>
          <ul>
            {jogos.map((f, index) => (
              <li key={index}>
                <h3>{f.nome}</h3>
                <img src={f.imagemUrl} />
                <br />
                <button onClick={() => this.deletar(index)}>Deletar</button>
                <br />
                <button
                  onClick={() => {
                    this.setState({
                      editando: true,
                      indexEditando: index,
                      nomeJogo: f.nome,
                      imagemUrlJogo: f.imagemUrl,
                    });
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
}
