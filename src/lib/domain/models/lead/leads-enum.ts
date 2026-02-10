export enum LEAD_POSITION {
  CAPTACAO = "CAPTACAO",
  PRIMEIRO_PAGAMENTO = "PRIMEIRO_PAGAMENTO",
  ENVIO_DOCUMENTOS = "ENVIO_DOCUMENTOS",
  VALIDACAO_DOCUMENTOS = "VALIDACAO_DOCUMENTOS",
  SELECAO_IMOVEL = "SELECAO_IMOVEL",
  PAGAMENTO_IMOVEL = "PAGAMENTO_IMOVEL",
  ASSINATURA_CONTRATO = "ASSINATURA_CONTRATO",
  PREPARACAO_IMOVEL = "PREPARACAO_IMOVEL",
  SERVICOS_ADICIONAIS = "SERVICOS_ADICIONAIS",
  ENTREGA_IMOVEL = "ENTREGA_IMOVEL",
  PENDENCIA = "PENDENCIA",
  CANCELADO = "CANCELADO",
}

export const leadPositionsName = [
  "Captação de leads",
  "Primeiro Pagamento",
  "Envio de Documentos",
  "Validação de Documentos",
  "Seleção de Imóvel",
  "Pagamento do Imóvel",
  "Assinatura de Contrato",
  "Preparação do Imóvel",
  "Serviços Adicionais",
  "Entrega do Imóvel",
  "Pendência",
  "Cancelado",
];

export const LEAD_POSITION_LABELS: Record<LEAD_POSITION, string> = {
  [LEAD_POSITION.CAPTACAO]: "Captação de leads",
  [LEAD_POSITION.PRIMEIRO_PAGAMENTO]: "Primeiro Pagamento",
  [LEAD_POSITION.ENVIO_DOCUMENTOS]: "Envio de Documentos",
  [LEAD_POSITION.VALIDACAO_DOCUMENTOS]: "Validação de Documentos",
  [LEAD_POSITION.SELECAO_IMOVEL]: "Seleção de Imóvel",
  [LEAD_POSITION.PAGAMENTO_IMOVEL]: "Pagamento do Imóvel",
  [LEAD_POSITION.ASSINATURA_CONTRATO]: "Assinatura de Contrato",
  [LEAD_POSITION.PREPARACAO_IMOVEL]: "Preparação do Imóvel",
  [LEAD_POSITION.SERVICOS_ADICIONAIS]: "Serviços Adicionais",
  [LEAD_POSITION.ENTREGA_IMOVEL]: "Entrega do Imóvel",
  [LEAD_POSITION.PENDENCIA]: "Pendência",
  [LEAD_POSITION.CANCELADO]: "Cancelado",
} as const;
