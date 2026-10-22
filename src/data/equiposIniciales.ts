import type { Equipo } from "../types";

export const equiposIniciales: Equipo[] = [
  { id: 1, nombre: "Monitor Dell 24\"", categoria: "Monitor", disponible: true },
  { id: 2, nombre: "Monitor LG 27\"", categoria: "Monitor", disponible: true },
  { id: 3, nombre: "Monitor Samsung Curvo", categoria: "Monitor", disponible: false },
  { id: 4, nombre: "Teclado Logitech K120", categoria: "Teclado", disponible: true },
  { id: 5, nombre: "Teclado Mecánico Redragon", categoria: "Teclado", disponible: true },
  { id: 6, nombre: "Mouse Logitech M185", categoria: "Mouse", disponible: true },
  { id: 7, nombre: "Mouse Gamer HyperX", categoria: "Mouse", disponible: false },
  { id: 8, nombre: "Mouse Inalámbrico HP", categoria: "Mouse", disponible: true },
];

/*datos temporales que luego se van a reemplazar con la API*/