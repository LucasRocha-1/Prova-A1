import { useEffect, useState } from "react";
import axios from "axios";
import Tarefa from "../../../models/Tarefa";

//Componente
// - Composto por HTML, CSS e JS ou TS

//Regras para ser um componente
// - Precisa ser uma função
// - Precisa retornar apenas um elemento HTML pai
// - Exportar o componente

function naoconcluidas() {
  //Estados - Variáveis
  const [produtos, setProdutos] = useState<Tarefa[]>([]);

  //Realizar operações ao carregar o componente
  useEffect(() => {
    console.log("O componente foi carregado!");
    buscarTarefasAPI();
  }, []);

  async function buscarTarefasAPI() {
    try {
      const resposta = await axios.get(
        "http://localhost:5011/api/tarefas/listar"
      );
      setProdutos(resposta.data);
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  //O return é a parte visual do componente
  return (
    <div id="listar_tarefas">
      <h1>Listar Tarefas Não Convluídas</h1>
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
          {produtos.map((tarefa) => (
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

export default naoconcluidas;
