import { Lead } from "../lead/lead.model";

export interface Position {
    id: string;
    companyId: string;
    name: string;
    created: string;
    updated?: string;
    deleted?: string;

    documentTemplates: any;
    leads: Lead[]
}