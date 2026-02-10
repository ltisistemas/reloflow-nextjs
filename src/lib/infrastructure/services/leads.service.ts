import { IbgePt } from "@/lib/domain/models/lead/ibge-pt";
import { Lead } from "@/lib/domain/models/lead/lead.model";
import { api } from "@/lib/http-client";
import { distritoMunicipiosPortugal } from "@/lib/infrastructure/data/ibge-pt";

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

const postLead = async (body: Lead) => {
  try {
    return api<Lead>({
      endpoint: `/auth/lead`,
      method: "POST",
      body,
    });
  } catch (error) {
    console.log("> Error on service: ", error);

    return null;
  }
};

const listarIbgeDistritosPortugal = () => {
  return distritoMunicipiosPortugal.map((m) => m.distrito);
};

const listarIbgeMunicipiosPortugal = (distrito: string) => {
  const uf = distritoMunicipiosPortugal.find((f) => f.distrito === distrito);

  return uf?.municipios;
};

const listarIbgePortugal = () => {
  return distritoMunicipiosPortugal as IbgePt[];
};

export {
  listarLeads,
  listarIbgePortugal,
  listarIbgeDistritosPortugal,
  listarIbgeMunicipiosPortugal,
  postLead,
};
