import { Company } from "@/lib/domain/models/company/company.model";
import { CreateLeadResponse } from "@/lib/domain/models/company/create-lead-response.modle";
import { GetCompanyResponse } from "@/lib/domain/models/company/get-company-response.model";
import { CreateLeadRequest } from "@/lib/domain/models/lead/create-lead-request";
import { Lead } from "@/lib/domain/models/lead/lead.model";
import { api } from "@/lib/http-client";

const consultarEmpresa = async (): Promise<Company[]> => {
  try {
    return await api<Company[]>({ endpoint: `/auth/company` });
  } catch (error) {
    console.log("> Error on service: ", error);

    return [];
  }
};

const criarLead = async (body: CreateLeadRequest) => {
  try {
    return await api<CreateLeadResponse>({
      endpoint: `/Lead`,
      body: body,
      method: "POST",
    });
  } catch (error) {
    return {
      data: null,
      message: "Erro ao criar o Lead",
      success: false,
      statusCode: 500,
      trace: null,
      error: "Erro ao criar o Lead.",
    };
  }
};

const updatePositionLead = async (body: Lead) => {
  try {
    return await api<CreateLeadResponse>({
      endpoint: `/Lead/${body.id}`,
      body: body,
      method: "POST",
    });
  } catch (error) {
    return {
      data: null,
      message: "Erro ao criar o Lead",
      success: false,
      statusCode: 500,
      trace: null,
      error: "Erro ao criar o Lead.",
    };
  }
};

export { consultarEmpresa, criarLead };
