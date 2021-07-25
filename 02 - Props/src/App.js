import React from "react";

const Equipe = (props) => {
  return (
    <div>
      <Sobre username={props.nome} cargo={props.cargo} idade={props.idade} />
      <Social fb={props.facebook} linkedin={props.linkedin} github={props.github} />
      <hr />
    </div>
  );
};

const Sobre = (props) => {
  return (
    <div>
      <h2>Olá sou o (a) {props.username}</h2>
      <h3>Cargo: {props.cargo}</h3>
      <h3>Idade: {props.idade} anos</h3>
    </div>
  );
};

const Social = (props) => {
  return (
    <div>
      <a href={props.fb}> Facebook </a>
      <a href={props.linkedin}> Linkedin </a>
      <a href={props.github}> Github </a>
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Conheça nossa equipe:</h1>
      <Equipe
        nome="Gustavo Molina"
        cargo="Coordenador dos Módulos de Especialidades"
        idade="30"
        facebook="https://www.facebook.com/gustavo.m.figueiredo"
        linkedin="https://www.linkedin.com/in/gustavo-molina-a2798418/"
        github="https://github.com/gustavomolina17"
      />
       <Equipe
        nome="Thiago Lima"
        cargo="Coordenador dos Módulos Introdutórios"
        idade="27"
        facebook="https://www.instagram.com/thi.code/"
        linkedin="https://www.linkedin.com/in/limasthiagos/"
        github="https://github.com/codethi"
      />
    </div>
  );
}

export default App;
