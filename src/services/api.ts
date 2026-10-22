import type { Equipo, Prestamo, DatosPrestamo } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

async function request<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  const respuesta = await fetch(`${BASE_URL}${ruta}`, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al comunicarse con el servidor.`);
  }
  return respuesta.json() as Promise<T>;
}

export const obtenerEquipos = (): Promise<Equipo[]> => request<Equipo[]>("/equipos");

export const obtenerPrestamosActivos = (): Promise<Prestamo[]> =>
  request<Prestamo[]>("/prestamos?devuelto=false");

export const crearPrestamo = (
  datos: DatosPrestamo & { equipoId: number }
): Promise<Prestamo> =>
  request<Prestamo>("/prestamos", {
    method: "POST",
    body: JSON.stringify({
      ...datos,
      fechaPrestamo: new Date().toISOString(),
      devuelto: false,
    }),
  });

export const actualizarDisponibilidad = (id: number, disponible: boolean): Promise<Equipo> =>
  request<Equipo>(`/equipos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ disponible }),
  });

export const marcarDevuelto = (id: number): Promise<Prestamo> =>
  request<Prestamo>(`/prestamos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ devuelto: true }),
  });