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
    };
  }

  render() {
    const { jogos } = this.state;

    return (
      <div className="container">
        <main className="main">
          <h1>Jogos Listagem Estática</h1>
          <ul>
            {jogos.map((j) => (
              <li key={j.id}>
                <h3>{j.nome}</h3>
                <img src={j.imagemUrl} alt={j.nome} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}
