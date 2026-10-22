const aISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const hoyISO = () => aISO(new Date());

export const sumarDiasISO = (dias: number) => {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return aISO(d);
};

// Vencido = la fecha límite ya pasó (ISO se puede comparar como texto)
export const esVencido = (fechaLimite: string) => fechaLimite < hoyISO();