import type { Equipo, Prestamo } from "../types";
import { esVencido } from "../utils/fechas";

interface TablaPrestamosProps {
  prestamos: Prestamo[];
  equipos: Equipo[];
  onDevolver: (prestamoId: number) => void;
}

export default function TablaPrestamos({ prestamos, equipos, onDevolver }: TablaPrestamosProps) {
  if (prestamos.length === 0) return <p className="vacio">No hay préstamos activos.</p>;

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Equipo</th>
          <th>Solicitante</th>
          <th>Fecha límite</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {prestamos.map((p) => (
          <tr key={p.id} className={esVencido(p.fechaLimite) ? "vencido" : ""}>
            <td>{equipos.find((e) => e.id === p.equipoId)?.nombre ?? "Desconocido"}</td>
            <td>{p.solicitante}</td>
            <td>
              {p.fechaLimite}
              {esVencido(p.fechaLimite) && " (vencido)"}
            </td>
            <td>
              <button onClick={() => onDevolver(p.id)}>Devolver</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}