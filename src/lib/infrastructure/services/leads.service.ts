import { GlobalResponse } from "@/lib/domain/models/global-response.model";
import { Lead } from "@/lib/domain/models/lead/lead.model";
import { api } from "@/lib/http-client";

const listarLeads = async (companyId: string) => {
  try {
    return api<Lead[]>({
      endpoint: `/auth/lead/find-by-company/${companyId}`,
    });
  } catch (error) {
    console.log("> Error on service: ", error);

    return [];
  }
};

export { listarLeads };
