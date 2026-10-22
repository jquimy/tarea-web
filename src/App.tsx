import { useState } from "react";
import type { Equipo, Prestamo, DatosPrestamo } from "./types";
import { equiposIniciales } from "./data/equiposIniciales";
import { esVencido } from "./utils/fechas";
import Encabezado from "./components/Encabezado";
import FormularioPrestamo from "./components/FormularioPrestamo";
import TablaPrestamos from "./components/TablaPrestamos";
import Inventario from "./pages/Inventario";
import "./App.css";

const prestamosIniciales: Prestamo[] = [
  { id: 1, equipoId: 3, solicitante: "Ana López", carne: "0900-22-1234",
    fechaPrestamo: "2026-10-10T10:00:00.000Z", fechaLimite: "2026-10-15", devuelto: false },
  { id: 2, equipoId: 7, solicitante: "Carlos Pérez", carne: "0900-23-5678",
    fechaPrestamo: "2026-10-21T10:00:00.000Z", fechaLimite: "2026-10-26", devuelto: false },
];

export default function App() {
  const [equipos, setEquipos] = useState<Equipo[]>(equiposIniciales);
  const [prestamos, setPrestamos] = useState<Prestamo[]>(prestamosIniciales);
  const [vista, setVista] = useState<"inventario" | "prestamos">("inventario");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);

  const activos = prestamos.filter((p) => !p.devuelto);
  const vencidos = activos.filter((p) => esVencido(p.fechaLimite)).length;

  const handlePrestar = (id: number) => {
    setEquipoSeleccionado(equipos.find((e) => e.id === id) ?? null);
  };

  const guardarPrestamo = (datos: DatosPrestamo) => {
    if (!equipoSeleccionado) return;

    const nuevo: Prestamo = {
      id: Math.max(0, ...prestamos.map((p) => p.id)) + 1,
      equipoId: equipoSeleccionado.id,
      ...datos,
      fechaPrestamo: new Date().toISOString(),
      devuelto: false,
    };

    setPrestamos((prev) => [...prev, nuevo]);
    setEquipos((prev) =>
      prev.map((e) => (e.id === equipoSeleccionado.id ? { ...e, disponible: false } : e))
    );
    setEquipoSeleccionado(null);
  };

  const devolver = (prestamoId: number) => {
    const prestamo = prestamos.find((p) => p.id === prestamoId);
    if (!prestamo) return;

    setPrestamos((prev) => prev.map((p) => (p.id === prestamoId ? { ...p, devuelto: true } : p)));
    setEquipos((prev) =>
      prev.map((e) => (e.id === prestamo.equipoId ? { ...e, disponible: true } : e))
    );
  };

  return (
    <>
      <Encabezado equipos={equipos} vencidos={vencidos} />

      <nav className="nav">
        <button onClick={() => setVista("inventario")} disabled={vista === "inventario"}>Inventario</button>
        <button onClick={() => setVista("prestamos")} disabled={vista === "prestamos"}>Préstamos activos</button>
      </nav>

      {vista === "inventario" ? (
        <Inventario equipos={equipos} onPrestar={handlePrestar} />
      ) : (
        <TablaPrestamos prestamos={activos} equipos={equipos} onDevolver={devolver} />
      )}

      {equipoSeleccionado && (
        <FormularioPrestamo
          equipo={equipoSeleccionado}
          onGuardar={guardarPrestamo}
          onCancelar={() => setEquipoSeleccionado(null)}
        />
      )}
    </>
  );
}