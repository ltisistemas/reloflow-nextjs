import { Position } from "./position.model"

created
: 
"2026-02-01T17:46:53.229192Z"
deleted
: 
null
description
: 
"Empresa de Relocation Focado em Brasileiros"
financialCode
: 
""
id
: 
"fba1006d-45a0-4d40-bc21-da8f87cb2278"
name
: 
"LTI Relocation PT"
export interface Company {
    id: string;
    name: string;
    description: string;
    financialCode: string;
    created: string;
    updated?: string;
    userId: string;
    
    positions: Position[];
}