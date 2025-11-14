import { useEffect, useState } from "react";
import axios from "axios";
import Tarefa from "../../../models/Tarefa";

//Componente
// - Composto por HTML, CSS e JS ou TS

//Regras para ser um componente
// - Precisa ser uma função
// - Precisa retornar apenas um elemento HTML pai
// - Exportar o componente

function NaoConcluidas() {
  //Estados - Variáveis
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  //Realizar operações ao carregar o componente
  useEffect(() => {
    console.log("O componente foi carregado!");
    buscarTarefasAPI();
  }, []);

  async function buscarTarefasAPI() {
    try {
      const resposta = await axios.get(
        "http://localhost:5011/pages/tarefas/listar"
      );
      setTarefas(resposta.data);
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  //O return é a parte visual do componente
  return (
    <div id="listar_tarefas">
      <h1>Listar Tarefas Não Concluídas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Status</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.TarefaId}>
              <td>{tarefa.Titulo}</td>
              <td>{tarefa.Status}</td>
              <td>{tarefa.criadoEm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NaoConcluidas;
