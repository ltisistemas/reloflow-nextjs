"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes, // ARIA attributes para acessibilidade
    listeners, // Event handlers para drag (onPointerDown, etc)
    setNodeRef, // Ref do elemento arrastável
    transform, // Posição durante o drag (x, y)
    transition, // Animação suave
  } = useSortable({ id });

  // Aplica transformações CSS para movimento suave
  const style = {
    transform: CSS.Transform.toString(transform), // Converte {x:10, y:20} → "translate3d(10px, 20px, 0)"
    transition, // Transição suave entre posições
  };

  return (
    <div
      ref={setNodeRef} // ← Torna este DIV arrastável
      style={style} // ← Move suavemente durante drag
      className="cursor-grab active:cursor-grabbing touch-manipulation" // Visual feedback
      {...attributes} // ← Acessibilidade (role="img", etc)
      {...listeners} // ← Detecta mouse/touch para iniciar drag
    >
      {children}
    </div>
  );
}
