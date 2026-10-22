import type { Equipo } from "../types";

interface EncabezadoProps {
  equipos: Equipo[];
}

export default function Encabezado({ equipos }: EncabezadoProps) {
  const disponibles = equipos.filter((e) => e.disponible).length;

  return (
    <header className="encabezado">
      <h1>Préstamos Lab - 0902-23-4187</h1>
      <p>
        {disponibles} de {equipos.length} equipos disponibles
      </p>
    </header>
  );
}