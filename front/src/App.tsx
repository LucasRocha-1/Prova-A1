import React from "react";
import NaoConcluidas from "./components/pages/tarefa/NaoConcluidas";
import Concluidas from "./components/pages/tarefa/Concluidas";
import CadastrarTarefa from "./components/pages/tarefa/CadastrarTarefa";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

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
              <Link to="/tarefa/AlterarTarefa"> Listar Tarefas Concluidas </Link>
            </li>
            <li>
              <Link to="/tarefa/CadastrarTarefa"> Cadastrar Tarefas </Link>
            </li>
            
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<NaoConcluidas/>} />
          <Route path="/tarefa/AlterarTarefa" element={<Concluidas/>} />
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
