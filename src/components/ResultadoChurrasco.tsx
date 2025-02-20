import { useLocation, useNavigate } from "react-router-dom";
import { Alimento, nomesAlimentos, quantidadesPorPessoa } from "../types";

type ResultadoChurrasco = {
  pessoas: number;
  alimentosSelecionados: Alimento[];
};

import styles from "./ResultadoChurrasco.module.css";

const PaginaResultado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultadoChurrasco;

  const totalPorALimento = state.alimentosSelecionados.reduce(
    (acc, alimento) => {
    acc[alimento] = (quantidadesPorPessoa[alimento] * state.pessoas) / 1000;
    return acc;
  },
  {} as Record<Alimento, number>
  );

  const reiniciar = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.type}>Resultado para {state.pessoas} pessoas:</h2>
      {state.alimentosSelecionados.map((alimento) => (
        <p key={alimento}>
          {nomesAlimentos[alimento]}: {totalPorALimento[alimento]} kg
        </p>
      ))}
      <button onClick={reiniciar} className={styles.resetButton}>Reiniciar</button>
    </div>
  );

};

export default PaginaResultado;
