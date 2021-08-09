import React from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filmes: [],
      nomeFilme: "",
      imagemUrlFilme: "",
      editando: false,
      indexEditando: null,
    };
  }

  async buscarFilmes() {
    this.setState({ loading: true });

    const res = await fetch("http://localhost:5000/filmes");

    const json = await res.json();

    this.setState({ filmes: json, loading: false });
  }

  componentDidMount() {
    this.buscarFilmes();
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const {
      filmes,
      editando,
      indexEditando,
      nomeFilme,
      imagemUrlFilme,
      idEditando,
    } = this.state;

    if (editando) {
      await fetch(`http://localhost:5000/filmes/${idEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeFilme,
          imagemUrl: imagemUrlFilme,
        }),
      });
      this.buscarFilmes();

      this.setState({
        indexEditando: null,
        editando: false,
      });
    } else {
      await fetch("http://localhost:5000/filmes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeFilme,
          imagemUrl: imagemUrlFilme,
        }),
      });
      this.buscarFilmes();

      /* this.setState({
        filmes: [
          ...filmes,
          {
            nome: nomeFilme,
            imagemUrl: imagemUrlFilme,
          },
        ],
      });*/
    }

    this.setState({
      nomeFilme: "",
      imagemUrlFilme: "",
    });
  };

  deletar = async (idDeletar) => {
    await fetch(`http://localhost:5000/filmes/${idDeletar}`, {
      method: "DELETE",
    });
    this.buscarFilmes();
  };

  render() {
    const { filmes, nomeFilme, imagemUrlFilme, editando, indexEditando } =
      this.state;

    return (
      <div className="container">
        <main className="main">
          <h1>Filmes</h1>
          <hr />
          <h2>
            {editando
              ? `Editando:${filmes[indexEditando].nome}`
              : "Cadastre um novo filme"}
          </h2>
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Nome"
              value={nomeFilme}
              onChange={(e) => {
                this.setState({
                  nomeFilme: e.target.value,
                });
              }}
            />
            <br />

            <input
              placeholder="Url da Imagem"
              value={imagemUrlFilme}
              onChange={(e) => {
                this.setState({
                  imagemUrlFilme: e.target.value,
                });
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
                <img src={f.imagemUrl} alt={f.nome} />
                <br />
                <button onClick={() => this.deletar(f._id)}>Deletar</button>
                <br />
                <button
                  onClick={() => {
                    this.setState({
                      idEditando: f._id,
                      editando: true,
                      indexEditando: index,
                      nomeFilme: f.nome,
                      imagemUrlFilme: f.imagemUrl,
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
