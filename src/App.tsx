import { BrowserRouter, Routes, Route } from "react-router-dom"
import Calculadora from "./pages/Calculadora";
import PaginaResultado from "./pages/Resultado";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calculadora />} />
        <Route path="/resultado" element={<PaginaResultado />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
