import { useState } from "react";
import type { Equipo, DatosPrestamo } from "./types";
import { esVencido } from "./utils/fechas";
import { useEquipos } from "./hooks/useEquipos";
import { usePrestamos } from "./hooks/usePrestamos";
import { crearPrestamo, actualizarDisponibilidad, marcarDevuelto } from "./services/api";
import Encabezado from "./components/Encabezado";
import FormularioPrestamo from "./components/FormularioPrestamo";
import TablaPrestamos from "./components/TablaPrestamos";
import MensajeError from "./components/MensajeError";
import Inventario from "./pages/Inventario";
import "./App.css";

export default function App() {
  const eq = useEquipos();
  const pr = usePrestamos();
  const [vista, setVista] = useState<"inventario" | "prestamos">("inventario");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);
  const [errorAccion, setErrorAccion] = useState("");

  const vencidos = pr.prestamos.filter((p) => esVencido(p.fechaLimite)).length;

  const handlePrestar = (id: number) => {
    setEquipoSeleccionado(eq.equipos.find((e) => e.id === id) ?? null);
  };

  const guardarPrestamo = async (datos: DatosPrestamo) => {
    if (!equipoSeleccionado) return;

    const nuevo = await crearPrestamo({ ...datos, equipoId: equipoSeleccionado.id });
    await actualizarDisponibilidad(equipoSeleccionado.id, false);

    pr.setPrestamos((prev) => [...prev, nuevo]);
    eq.setEquipos((prev) =>
      prev.map((e) => (e.id === equipoSeleccionado.id ? { ...e, disponible: false } : e))
    );
    setEquipoSeleccionado(null);
  };

  const devolver = async (prestamoId: number) => {
    const prestamo = pr.prestamos.find((p) => p.id === prestamoId);
    if (!prestamo) return;

    setErrorAccion("");
    try {
      await marcarDevuelto(prestamoId);
      await actualizarDisponibilidad(prestamo.equipoId, true);

      pr.setPrestamos((prev) => prev.filter((p) => p.id !== prestamoId));
      eq.setEquipos((prev) =>
        prev.map((e) => (e.id === prestamo.equipoId ? { ...e, disponible: true } : e))
      );
    } catch {
      setErrorAccion("No se pudo registrar la devolución. Intente de nuevo.");
    }
  };

  const reintentar = () => {
    eq.recargar();
    pr.recargar();
  };

  const cargando = eq.cargando || pr.cargando;
  const error = eq.error ?? pr.error;

  return (
    <>
      <Encabezado equipos={eq.equipos} vencidos={vencidos} />

      <nav className="nav">
        <button onClick={() => setVista("inventario")} disabled={vista === "inventario"}>Inventario</button>
        <button onClick={() => setVista("prestamos")} disabled={vista === "prestamos"}>Préstamos activos</button>
      </nav>

      {cargando && <p className="cargando">Cargando...</p>}
      {!cargando && error && <MensajeError mensaje={error} onReintentar={reintentar} />}
      {errorAccion && <p className="mensaje-error">{errorAccion}</p>}

      {!cargando && !error && (
        vista === "inventario" ? (
          <Inventario equipos={eq.equipos} onPrestar={handlePrestar} />
        ) : (
          <TablaPrestamos prestamos={pr.prestamos} equipos={eq.equipos} onDevolver={devolver} />
        )
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