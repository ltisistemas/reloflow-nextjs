"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Ban, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
  LEAD_POSITION,
  LEAD_POSITION_LABELS,
  leadPositionsName,
} from "@/lib/domain/models/lead/leads-enum";
import {
  listarIbgeDistritosPortugal,
  listarIbgeMunicipiosPortugal,
} from "@/lib/infrastructure/services/leads.service";
import { alert } from "@/lib/utils";

type ComboboxItem = { value: LEAD_POSITION; label: string };

export default function LeadPage() {
  const [distritos, setDistritos] = useState<string[]>([]);
  const [municipios, setMunicipios] = useState<string[]>([]);
  const [newLead, setNewLead] = useState(true);
  const anchorMunicipios = useComboboxAnchor();

  const [formData, setFormData] = useState({
    name: "",
    LEAD_POSITION_SELECTED: LEAD_POSITION.CAPTACAO,
    LEAD_POSITION_DESCRIPTION: leadPositionsName[0],
    selectedDistrito: "",
    selectedMunicipios: [] as string[],
    quantidadeMembrosNaFamilia: 1,
    quantidadeFilhos: 0,
    idadeDosFilhos: "",
  });

  useEffect(() => {
    fetchDistritos();
  }, []);

  const fetchDistritos = useCallback(() => {
    setDistritos(listarIbgeDistritosPortugal());
  }, []);

  const fetchMunicipios = useCallback((distrito: string) => {
    setMunicipios(listarIbgeMunicipiosPortugal(distrito) ?? []);
  }, []);

  const handleDistritoChange = useCallback(
    (distrito: string | null) => {
      if (distrito) {
        setFormData((prev) => ({ ...prev, selectedDistrito: distrito }));
        fetchMunicipios(distrito);
      } else {
        setMunicipios([]);
        setFormData((prev) => ({
          ...prev,
          selectedDistrito: "",
          selectedMunicipios: [],
        }));
      }
    },
    [fetchMunicipios],
  );

  const handleMunicipiosChange = useCallback((values: string[]) => {
    setFormData((prev) => ({ ...prev, selectedMunicipios: values }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      LEAD_POSITION_SELECTED: "" as LEAD_POSITION,
      LEAD_POSITION_DESCRIPTION: "",
      selectedDistrito: "",
      selectedMunicipios: [],
      quantidadeMembrosNaFamilia: 1,
      quantidadeFilhos: 0,
      idadeDosFilhos: "",
    });
  }, []);

  const handleSubmit = useCallback(() => {
    console.log("Salvando lead:", formData);
    // TODO: integrar com API criarLead(formData)
    alert("Lead salvo com sucesso!", "success");
    resetForm();
  }, [formData, resetForm]);

  const handleCancel = useCallback(() => {
    if (confirm("Deseja realmente cancelar? Os dados serão perdidos.")) {
      resetForm();
      // Volta para home automaticamente após reset
      window.location.href = "/home";
    }
  }, [resetForm]);

  const onValueChangePosition = useCallback(
    (value: string | null) => {
      if (value) {
        const entries = Object.entries(LEAD_POSITION_LABELS) as [
          LEAD_POSITION,
          string,
        ][];

        const position = entries.find(([, v]) => {
          return v === value;
        });

        const p = {
          position: position?.[0] as LEAD_POSITION,
          value: position?.[1] + "",
        };

        const f = formData;
        setFormData({
          ...f,
          LEAD_POSITION_SELECTED: p.position,
          LEAD_POSITION_DESCRIPTION: p.value,
        });
      }
    },
    [formData],
  );

  return (
    <div className="flex flex-col size-full min-h-screen bg-background">
      {/* HEADER */}
      <div className="border-b border-border p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Novo Lead</h1>
            <p className="text-muted-foreground">
              Preencha as informações do novo lead
            </p>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="dados-cadastrais" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dados-cadastrais">
                Dados cadastrais
              </TabsTrigger>
              <TabsTrigger value="membros">Membros</TabsTrigger>
              <TabsTrigger value="envio-de-documentos">Documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="dados-cadastrais" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações básicas do Lead</CardTitle>
                  <CardDescription>
                    Preencha os dados essenciais do lead
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <FieldGroup className="space-y-6">
                    {/* NOME + POSIÇÃO */}
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <Label htmlFor="name">Nome / Família</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Digite o nome do lead"
                        />
                      </Field>
                      <Field>
                        <Label>Posição</Label>
                        <Combobox
                          items={leadPositionsName}
                          value={formData.LEAD_POSITION_DESCRIPTION}
                          onValueChange={onValueChangePosition}
                          disabled={newLead}
                        >
                          <ComboboxInput
                            placeholder="Selecione uma posição"
                            disabled={newLead}
                          />
                          <ComboboxContent>
                            <ComboboxEmpty>
                              Sem posições disponíveis
                            </ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item} value={item}>
                                  {item}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </Field>
                    </div>

                    {/* REGIÃO + CIDADES */}
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <Label>Região</Label>
                        <Combobox
                          items={distritos}
                          value={formData.selectedDistrito}
                          onValueChange={handleDistritoChange}
                        >
                          <ComboboxInput
                            placeholder="Selecione uma região"
                            showClear={formData.selectedDistrito !== ""}
                            disabled={!distritos.length}
                          />
                          <ComboboxContent>
                            <ComboboxEmpty>
                              Sem regiões disponíveis
                            </ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item} value={item}>
                                  {item}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </Field>
                      <Field>
                        <Label>Cidades</Label>
                        <Combobox
                          multiple
                          items={municipios}
                          value={formData.selectedMunicipios}
                          onValueChange={handleMunicipiosChange}
                        >
                          <ComboboxChips
                            ref={anchorMunicipios}
                            className="w-full"
                          >
                            <ComboboxValue>
                              {(values: string[]) => (
                                <React.Fragment>
                                  {values.map((value: string) => (
                                    <ComboboxChip key={value}>
                                      {value}
                                    </ComboboxChip>
                                  ))}
                                  <ComboboxChipsInput />
                                </React.Fragment>
                              )}
                            </ComboboxValue>
                          </ComboboxChips>
                          <ComboboxContent>
                            <ComboboxEmpty>
                              Sem municípios disponíveis
                            </ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item} value={item}>
                                  {item}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </Field>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <Field>
                        <Label htmlFor="quantidadeMembrosNaFamilia">
                          Membros
                        </Label>
                        <Combobox
                          id="quantidadeMembrosNaFamilia"
                          items={Array.from({ length: 20 }, (_, i) =>
                            (i + 1).toString(),
                          )}
                          value={formData.quantidadeMembrosNaFamilia.toString()}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              quantidadeMembrosNaFamilia: parseInt(
                                value || "1",
                              ),
                            }))
                          }
                        >
                          <ComboboxInput placeholder="Selecione uma quantidade" />
                          <ComboboxContent>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item} value={item}>
                                  {item} membro{parseInt(item) > 1 ? "s" : ""}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </Field>

                      <Field>
                        <Label htmlFor="quantidadeFilhos">
                          Quantidade de filhos
                        </Label>
                        <Combobox
                          id="quantidadeFilhos"
                          items={Array.from({ length: 21 }, (_, i) =>
                            i.toString(),
                          )}
                          value={formData.quantidadeFilhos.toString()}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              quantidadeFilhos: parseInt(value || "0"),
                            }))
                          }
                        >
                          <ComboboxInput placeholder="0-20 filhos" />
                          <ComboboxContent>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item} value={item}>
                                  {item}{" "}
                                  {parseInt(item) === 1 ? "filho" : "filhos"}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </Field>

                      <Field>
                        <Label htmlFor="idadeDosFilhos">
                          Idades dos filhos{" "}
                          {formData.quantidadeFilhos > 0
                            ? "(separado por vírgula)"
                            : ""}
                        </Label>
                        <Input
                          id="name"
                          value={formData.idadeDosFilhos}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              idadeDosFilhos: e.target.value,
                            }))
                          }
                          placeholder={
                            formData.quantidadeFilhos > 0
                              ? "Ex: 5, 8, 12"
                              : "Selecione filhos primeiro"
                          }
                          disabled={formData.quantidadeFilhos === 0} // ✅ Desabilita se 0 filhos
                          className={
                            formData.quantidadeFilhos === 0
                              ? "opacity-50 bg-muted"
                              : ""
                          }
                        />
                        {formData.quantidadeFilhos === 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Campo ativado após selecionar filhos
                          </p>
                        )}
                      </Field>
                    </div>
                  </FieldGroup>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="membros" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Membros</CardTitle>
                  <CardDescription>Gerencie os membros do lead</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Em desenvolvimento...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="envio-de-documentos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Envio de Documentos</CardTitle>
                  <CardDescription>
                    Upload de documentos necessários
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Em desenvolvimento...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* FOOTER COM BOTÕES */}
      <div className="border-t border-border p-6 bg-background">
        <div className="max-w-4xl mx-auto flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            className="gap-2 px-8 py-6 h-auto"
            onClick={handleCancel}
          >
            <Ban className="h-5 w-5" />
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="gap-2 px-8 py-6 h-auto bg-teal-400 text-teal-700 hover:bg-teal-200 font-extrabold"
          >
            <Save className="h-5 w-5" />
            Salvar Lead
          </Button>
        </div>
      </div>
    </div>
  );
}
