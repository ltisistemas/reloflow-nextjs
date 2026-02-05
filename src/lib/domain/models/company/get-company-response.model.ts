import { GlobalResponse } from "../global-response.model";
import { Company } from "./company.model";

export interface GetCompanyResponse extends GlobalResponse<Company[]> {

}