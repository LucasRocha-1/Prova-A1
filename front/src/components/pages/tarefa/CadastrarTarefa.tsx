import { useState } from "react";
import Tarefa from "../../../models/Tarefa";
import axios from "axios";

function CadastrarTarefa() {
  //Estados
  const [titulo, setTitulo] = useState("");
  const [status, setStatus] = useState("Não iniciada");

  function enviarTarefa(event: any) {
    event.preventDefault();
    submeterTarefaAPI();
  }

  async function submeterTarefaAPI() {
    //Biblioteca AXIOS
    try {
      const tarefa: Tarefa = {
        titulo, status,
      };
      const resposta = await axios.post("http://localhost:5011/api/tarefa/cadastrar", tarefa);            
      console.log(await resposta.data);
    } catch (error : any) {
      if(error.status === 40){
        console.log("Essa Tarefa já foi cadastrada!");
      }
    }
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={enviarTarefa}>
        <div>
          <label>Titulo:</label>
          <input onChange={(e : any) => setTitulo(e.target.value)} type="text" />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarTarefa;
