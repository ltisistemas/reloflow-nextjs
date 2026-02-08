"use client";

import {
  consultarEmpresa,
  criarLead,
} from "@/lib/infrastructure/services/kanban.service";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
import { alert } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Company } from "@/lib/domain/models/company/company.model";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { CreateLeadRequest } from "@/lib/domain/models/lead/create-lead-request";
import { Lead } from "@/lib/domain/models/lead/lead.model";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Position } from "@/lib/domain/models/company/position.model";
import Droppable from "@/components/hooks/droppable";
import { SortableItem } from "@/components/hooks/sortable-item";

type ID = string | number;

export default function Kanban() {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);

  const [positions, setPositions] = useState<Position[]>([]);
  const positionsRef = useRef(positions);
  useEffect(() => {
    positionsRef.current = positions;
  }, [positions]);

  const [nameLead, setNameLead] = useState<string>("");
  const [lead, setLead] = useState<Lead | null>(null);

  const orderByColumns = [
    "Captação de lead",
    "Primeiro Pagamento",
    "Envio de documentos",
    "Validação de documentos",
    "Seleção do imóvel",
    "Pagamento do imóvel",
    "Assinatura do contrato",
    "Preparação do imóvel",
    "Serviços adicionais",
    "Entrega do imóvel",
    "Pendências",
    "Cancelados",
  ];

  useEffect(() => fetchData(), []);

  // Get kanban data from API
  const fetchData = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setCompany(null);
    setPositions([]);

    consultarEmpresa()
      .then((response) => {
        const company = response.data ? response.data[0] : null;
        setCompany(company);

        const positions = company ? company.positions : [];
        setPositions(positions);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setCompany(null);
        setPositions([]);
        console.error("Erro ao consultar empresa:", error);
        alert("Erro ao consultar empresa.", "error");
      });
  }, []);

  const handleLeadCreate = useCallback(
    (position: Position) => {
      if (loading || !nameLead.trim()) return;
      setLoading(true);

      const payload = {
        companyPositionId: position.id,
        companyId: position.companyId,
        name: nameLead.trim(),
        description: "",
      } as CreateLeadRequest;

      criarLead(payload)
        .then((response) => {
          alert("Lead criado com sucesso.");
          setNameLead("");
          setLoading(false);
          fetchData();
        })
        .catch((error) => {
          setLoading(false);
          console.error("> Erro ao criar o Lead:", error);
          alert("Erro ao criar o Lead.", "error");
        });
    },
    [nameLead, loading, fetchData],
  );

  const classOfElements = {
    main: "no-scrollbar flex-1 flex items-center gap-2 size-full min-h-0 p-2 bg-background overflow-hidden overflow-x-auto",
    mainCard:
      "p-2 h-full w-52 min-w-52 bg-muted border rounded-md shadow-md flex flex-col",
    item: "cursor-pointer hover:bg-teal-400 hover:text-teal-800 mt-2",
  };

  const dataDrag = useRef({
    itemId: "",
    columnStart: "",
    columnEnd: "",
  });

  const dragState = useRef<{
    activeDropzone: HTMLElement | null;
    timeoutId: NodeJS.Timeout | null;
  }>({ activeDropzone: null, timeoutId: null });

  const ondragstart = useCallback((e: any, item: Lead) => {
    dataDrag.current.itemId = item.id;
    dataDrag.current.columnStart = item.companyPositionId;
  }, []);

  const ondragover = useCallback((e: any) => {
    // Remove essa verificação problemática!
    // if (!e.dataTransfer.types.length) return; ❌

    e.preventDefault(); // SEMPRE chama preventDefault()

    const target = e.currentTarget as HTMLElement;

    // Resto igual...
    if (dragState.current.timeoutId) {
      clearTimeout(dragState.current.timeoutId);
    }

    document.querySelectorAll(".dropzone-active").forEach((el) => {
      if (el !== target) {
        el.classList.remove("dropzone-active");
      }
    });

    target.classList.add("dropzone-active");
    dragState.current.activeDropzone = target;
  }, []);

  const ondrop = useCallback((e: any, position: Position) => {
    e.preventDefault();

    // Cancela timeout e limpa TODAS as dropzones
    if (dragState.current.timeoutId) {
      clearTimeout(dragState.current.timeoutId);
    }

    document
      .querySelectorAll(".dropzone-active")
      .forEach((el) => el.classList.remove("dropzone-active"));

    dataDrag.current.columnEnd = position.id;
    moverLead();
  }, []);

  const ondragleave = useCallback((e: any) => {
    const target = e.currentTarget as HTMLElement;

    // Timeout pra confirmar que saiu da dropzone (evita falsos positivos)
    dragState.current.timeoutId = setTimeout(() => {
      if (dragState.current.activeDropzone === target) {
        target.classList.remove("dropzone-active");
        dragState.current.activeDropzone = null;
      }
    }, 50);
  }, []);

  const moverLead = () => {
    if (
      !dataDrag.current.itemId ||
      !dataDrag.current.columnStart ||
      !dataDrag.current.columnEnd
    )
      return;
    if (dataDrag.current.columnStart === dataDrag.current.columnEnd) return;

    const ref = [...positionsRef.current];

    const fromColumn = ref.find((f) => f.id === dataDrag.current.columnStart);
    const toColumn = ref.find((f) => f.id === dataDrag.current.columnEnd);
    if (!fromColumn || !toColumn) return;

    const leadIdx = fromColumn.leads.findIndex(
      (l) => l.id === dataDrag.current.itemId,
    );
    if (leadIdx === -1) return;

    const [lead] = fromColumn.leads.splice(leadIdx, 1);

    lead.companyPositionId = toColumn.id;

    toColumn.leads.push(lead);

    setPositions(ref);

    dataDrag.current = { itemId: "", columnStart: "", columnEnd: "" };
  };

  return (
    <main className={classOfElements.main}>
      {!loading && positions.length > 0 && (
        <>
          {[...positions]
            .sort((a, b) => {
              const indexA = orderByColumns.indexOf(a.name);
              const indexB = orderByColumns.indexOf(b.name);
              return indexA - indexB;
            })
            .map((position: Position) => (
              <Card key={position.id} className={classOfElements.mainCard}>
                <CardHeader className="w-full pt-2">
                  <CardTitle className="w-full text-center font-sans font-bold text-sm">
                    {position.name}
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className="flex-1 min-h-25 dropzone border-2 border-dashed border-transparent bg-transparent transition-all duration-200 [&.dropzone-active]:bg-teal-800/80 [&.dropzone-active]:border-teal-900"
                  onDragOver={ondragover}
                  onDrop={(e) => ondrop(e, position)}
                  onDragLeave={ondragleave}
                >
                  {position.leads.map((item: Lead) => (
                    <Item
                      variant="outline"
                      className={classOfElements.item}
                      asChild
                      key={item.id}
                      draggable={!updating}
                      onDragStart={(e) => ondragstart(e, item)}
                    >
                      <ItemContent>
                        <ItemTitle>{item.name}</ItemTitle>
                      </ItemContent>
                    </Item>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto flex items-center justify-center">
                  {position.name === "Captação de lead" && (
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="default"
                          className="cursor-pointer bg-transparent text-white hover:bg-teal-400 hover:text-teal-900 font-extrabold"
                        >
                          <PlusCircle className="mr-2" />
                          Adicionar tarefa
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-96" align="start">
                        <PopoverHeader>
                          <PopoverTitle>Novo Lead</PopoverTitle>
                          <PopoverDescription>
                            Adicione um novo lead ao kanban.
                          </PopoverDescription>
                        </PopoverHeader>

                        <FieldGroup className="gap-4 mt-4">
                          <Field orientation="horizontal">
                            <FieldLabel htmlFor="width" className="w-1/2">
                              Nome
                            </FieldLabel>
                            <Input
                              id="width"
                              placeholder="Digite o nome do lead"
                              value={nameLead}
                              onChange={(e) => setNameLead(e.target.value)}
                            />
                          </Field>
                        </FieldGroup>

                        <div className="flex items-center justify-end">
                          <Button
                            type="button"
                            className="mt-4 cursor-pointer"
                            disabled={loading}
                            onClick={() => handleLeadCreate(position)}
                          >
                            {loading && <Spinner className="mr-2" />}
                            {loading && "Preparando..."}
                            {!loading && "Salvar"}
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </CardFooter>
              </Card>
            ))}
        </>
      )}
      {loading && (
        <>
          <Card className={classOfElements.mainCard}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-5 w-24" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </CardContent>
          </Card>
        </>
      )}
    </main>
  );
}
