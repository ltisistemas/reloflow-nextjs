import { LEAD_POSITION } from "./leads-enum";

export interface Lead {
  id: string;
  companyId: string;
  name: string;
  rendaFamiliar?: number;
  zipCode?: string;
  streetAddress?: string;
  streetAddressNumber?: string;
  streetAddressComplement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  distritoSelecionado?: string;
  cidadesPretendidas?: string;
  valorInicialRenda?: number;
  valorFinalRenda?: number;
  quantidadeMembrosNaFamilia?: number;
  quantidadeFilhos?: number;
  idadeDosFilhos?: string;
  status: "ACTIVE" | "INACTIVE";
  position: LEAD_POSITION;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
