import { useCallback, useEffect, useState } from "react";
import type { Prestamo } from "../types";
import { obtenerPrestamosActivos } from "../services/api";

export function usePrestamos() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setPrestamos(await obtenerPrestamosActivos());
    } catch {
      setError("No se pudieron cargar los préstamos activos.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { prestamos, setPrestamos, cargando, error, recargar: cargar };
}