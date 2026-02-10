"use client";

import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Lead } from "@/lib/domain/models/lead/lead.model";
import { consultarEmpresa } from "@/lib/infrastructure/services/kanban.service";
import { Company } from "@/lib/domain/models/company/company.model";
import { alert } from "@/lib/utils";
import { listarLeads } from "@/lib/infrastructure/services/leads.service";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [companies, setCompany] = useState<Company[]>([]);
  const currentCompany = useRef<Company>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await consultarEmpresa();
      setCompany(response);
      if (response[0]) {
        currentCompany.current = response[0];
        const leadsResponse = await listarLeads(currentCompany.current.id!);
        setLeads(leadsResponse);
      }
    } catch (err) {
      console.error("> Error:", err);
      alert("Erro ao carregar dados.", "error");
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="flex flex-col size-full min-h-screen">
      <Sidebar />
      <main className="p-2 size-full flex bg-transparent">
        <div className="size-full bg-muted rounded-md">
          {/* HEADER */}
          <header className="border-b-2 p-2 py-4 border-b-teal-200 w-full min-h-12 max-h-15 flex items-center justify-between">
            <div className="flex gap-2">
              <Input
                className="w-90 bg-muted-foreground"
                placeholder="Digite sua pesquisa aqui"
              />
              <Button
                size="icon"
                className="bg-teal-400 text-teal-700 hover:bg-teal-200 cursor-pointer font-extrabold"
              >
                <Search />
              </Button>
            </div>

            {/* ✅ BOTÃO VAI PARA /lead */}
            <Link href="/home/lead">
              <Button className="bg-teal-400 text-teal-700 hover:bg-teal-200 cursor-pointer font-extrabold inline-flex items-center justify-between gap-2 px-4 py-2 rounded-md border transition-colors">
                <PlusCircle />
                <span>Adicionar Lead</span>
              </Button>
            </Link>
          </header>

          {/* TABELA */}
          <Table>
            <TableHeader className="font-sans">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Região</TableHead>
                <TableHead>Cidades</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-sans">
              {leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="odd:bg-background even:bg-muted/50"
                >
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>Braga</TableCell>
                  <TableCell>Braga, Barcelos, Famalicao, Vila-Verde</TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      className="cursor-pointer bg-teal-400 hover:bg-teal-200 text-teal-900"
                    >
                      <Edit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* PAGINAÇÃO */}
          <Pagination className="mt-8 font-sans text-2xl">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
}
