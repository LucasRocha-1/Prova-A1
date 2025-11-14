import React from "react";
import NaoConcluidas from "./components/pages/tarefa/NaoConcluidas";
import CadastrarTarefa from "./components/pages/tarefa/CadastrarTarefa";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

//Instalar biblioteca na aplicação
//npm i nome_biblioteca @types/nome_biblioteca

//Componentes
// - HTML, CSS e JS ou TS
function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Listar Tarefas Não Concluidas</Link>
            </li>
            <li>
              <Link to="/tarefa/CadastrarTarefa"> Cadastrar Tarefas </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<NaoConcluidas/>} />
          <Route path="/tarefa/CadastrarTarefa" element={<CadastrarTarefa/>} />
        </Routes>
        <footer>
          Rodapé da aplicação
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
