interface MensajeErrorProps {
  mensaje: string;
  onReintentar: () => void;
}

export default function MensajeError({ mensaje, onReintentar }: MensajeErrorProps) {
  return (
    <div className="mensaje-error">
      <p>{mensaje}</p>
      <button onClick={onReintentar}>Reintentar</button>
    </div>
  );
}