import { useState } from "react";
import type { Equipo, DatosPrestamo } from "../types";
import { MAX_DIAS_PRESTAMO } from "../constants";
import { hoyISO, sumarDiasISO } from "../utils/fechas";

interface FormularioPrestamoProps {
  equipo: Equipo;
  onGuardar: (datos: DatosPrestamo) => Promise<void>;
  onCancelar: () => void;
}

interface Errores {
  solicitante?: string;
  carne?: string;
  fechaLimite?: string;
}

const REGEX_CARNE = /^\d{4}-\d{2}-\d{5}$/;

function validar(datos: DatosPrestamo): Errores {
  const errores: Errores = {};

  if (datos.solicitante.trim().length < 5) {
    errores.solicitante = "El solicitante es obligatorio (mínimo 5 caracteres).";
  }

  if (!REGEX_CARNE.test(datos.carne)) {
    errores.carne = "Formato inválido. Use 0000-00-00000.";
  }

  if (!datos.fechaLimite) {
    errores.fechaLimite = "La fecha límite es obligatoria.";
  } else if (datos.fechaLimite < hoyISO()) {
    errores.fechaLimite = "La fecha no puede ser anterior a hoy.";
  } else if (datos.fechaLimite > sumarDiasISO(MAX_DIAS_PRESTAMO)) {
    errores.fechaLimite = `El préstamo no puede superar ${MAX_DIAS_PRESTAMO} días.`;
  }

  return errores;
}

export default function FormularioPrestamo({ equipo, onGuardar, onCancelar }: FormularioPrestamoProps) {
  const [datos, setDatos] = useState<DatosPrestamo>({ solicitante: "", carne: "", fechaLimite: "" });
  const [errores, setErrores] = useState<Errores>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) {
      onGuardar({ ...datos, solicitante: datos.solicitante.trim() });
    }
  };

  return (
    <div className="modal-fondo">
      <form className="modal" onSubmit={handleSubmit} noValidate>
        <h2>Prestar: {equipo.nombre}</h2>

        <label>
          Solicitante
          <input name="solicitante" value={datos.solicitante} onChange={handleChange} />
          {errores.solicitante && <span className="error">{errores.solicitante}</span>}
        </label>

        <label>
          Carné
          <input name="carne" value={datos.carne} onChange={handleChange} placeholder="0000-00-00000" />
          {errores.carne && <span className="error">{errores.carne}</span>}
        </label>

        <label>
          Fecha límite
          <input type="date" name="fechaLimite" value={datos.fechaLimite} onChange={handleChange} />
          {errores.fechaLimite && <span className="error">{errores.fechaLimite}</span>}
        </label>

        <div className="acciones">
          <button type="button" onClick={onCancelar}>Cancelar</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}