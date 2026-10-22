import { equiposIniciales } from "../data/equiposIniciales";
import Encabezado from "../components/Encabezado";
import ListaEquipos from "../components/ListaEquipos";

export default function Inventario() {
  const handlePrestar = (id: number) => {
    console.log("Prestar equipo", id); // se implementa en la Parte 2
  };

  return (
    <>
      <Encabezado equipos={equiposIniciales} />
      <ListaEquipos equipos={equiposIniciales} onPrestar={handlePrestar} />
    </>
  );
}