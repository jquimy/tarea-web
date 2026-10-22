import { useCallback, useEffect, useState } from "react";
import type { Equipo } from "../types";
import { obtenerEquipos } from "../services/api";

export function useEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setEquipos(await obtenerEquipos());
    } catch {
      setError("No se pudo cargar el inventario. Verifique que la API esté encendida.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { equipos, setEquipos, cargando, error, recargar: cargar };
}