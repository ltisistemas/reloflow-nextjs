import { CreateLeadResponse } from "@/lib/domain/models/company/create-lead-response.modle";
import { GetCompanyResponse } from "@/lib/domain/models/company/get-company-response.model";
import { CreateLeadRequest } from "@/lib/domain/models/lead/create-lead-request";
import { api } from "@/lib/http-client";


const consultarEmpresa = async (): Promise<GetCompanyResponse> => {
    try {
        return await api<GetCompanyResponse>({ endpoint: `/Company`});
    } catch (error) {
        return {
            data: null,
            message: "Erro ao consultar empresa",
            success: false,
            statusCode: 500,
            trace: null,
            error: "Erro ao consultar empresa."
        }
    }
}

const criarLead = async (body: CreateLeadRequest) => {
    try {
        return await api<CreateLeadResponse>({ endpoint: `/Lead`, body: body, method: "POST"});
    } catch (error) {
        return {
            data: null,
            message: "Erro ao criar o Lead",
            success: false,
            statusCode: 500,
            trace: null,
            error: "Erro ao criar o Lead."
        }
    }
}

export { consultarEmpresa, criarLead}