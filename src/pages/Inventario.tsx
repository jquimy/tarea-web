import { useState } from "react";
import type { Equipo } from "../types";
import { CATEGORIAS } from "../constants";
import ListaEquipos from "../components/ListaEquipos";

interface InventarioProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

export default function Inventario({ equipos, onPrestar }: InventarioProps) {
  const [categoria, setCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const filtrados = equipos.filter(
    (e) =>
      (categoria === "" || e.categoria === categoria) &&
      e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div className="filtros">
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <ListaEquipos equipos={filtrados} onPrestar={onPrestar} />
    </>
  );
}