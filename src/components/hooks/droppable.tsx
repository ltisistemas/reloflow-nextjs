"use client";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

export default function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id, // ID único da coluna/posição
  });

  // Visual feedback quando algo está sobre ele
  const style = {
    backgroundColor: isOver ? "#f0f9ff" : "#f8fafc",
  };

  return (
    <div
      ref={setNodeRef} // ← Faz esse DIV aceitar drops
      className="min-h-25 p-4"
    >
      {children}
    </div>
  );
}
