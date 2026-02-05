/**
 * Teste de Validação das Regras de Movimento do Kanban
 */

const orderByColumns = [
  "Captação de lead",
  "Primeiro Pagamento",
  "Envio de documentos",
  "Validação de documentos",
  "Seleção do imóvel",
  "Pagamento do imóvel",
  "Assinatura do contrato",
  "Preparação do imóvel",
  "Serviços adicionais",
  "Entrega do imóvel",
  "Pendências",
  "Cancelados",
];

function isMovementAllowed(
  sourcePositionName: string,
  destPositionName: string,
): boolean {
  // Se estiver em "Entrega do imóvel", não pode se mexer
  if (sourcePositionName === "Entrega do imóvel") {
    return false;
  }

  // Sempre pode mover para "Pendências" ou "Cancelados"
  if (
    destPositionName === "Pendências" ||
    destPositionName === "Cancelados"
  ) {
    return true;
  }

  // Se estiver em "Preparação do imóvel", só pode mover para:
  // - "Serviços adicionais" ou "Entrega do imóvel"
  if (sourcePositionName === "Preparação do imóvel") {
    return (
      destPositionName === "Serviços adicionais" ||
      destPositionName === "Entrega do imóvel"
    );
  }

  // Para outros casos, só pode mover para colunas adjacentes (anterior ou próxima)
  const sourceIndex = orderByColumns.indexOf(sourcePositionName);
  const destIndex = orderByColumns.indexOf(destPositionName);

  // Permite mover para a próxima coluna (sourceIndex + 1) ou coluna anterior (sourceIndex - 1)
  return destIndex === sourceIndex + 1 || destIndex === sourceIndex - 1;
}

// Casos de Teste
const testCases = [
  {
    name: "✅ Movimento válido: Captação → Primeiro Pagamento",
    source: "Captação de lead",
    dest: "Primeiro Pagamento",
    expected: true,
  },
  {
    name: "✅ Movimento válido: Voltar Primeiro Pagamento → Captação",
    source: "Primeiro Pagamento",
    dest: "Captação de lead",
    expected: true,
  },
  {
    name: "✅ Movimento válido: Qualquer coluna → Pendências",
    source: "Seleção do imóvel",
    dest: "Pendências",
    expected: true,
  },
  {
    name: "✅ Movimento válido: Qualquer coluna → Cancelados",
    source: "Pagamento do imóvel",
    dest: "Cancelados",
    expected: true,
  },
  {
    name: "✅ Movimento válido: Preparação → Serviços adicionais",
    source: "Preparação do imóvel",
    dest: "Serviços adicionais",
    expected: true,
  },
  {
    name: "✅ Movimento válido: Preparação → Entrega do imóvel",
    source: "Preparação do imóvel",
    dest: "Entrega do imóvel",
    expected: true,
  },
  {
    name: "❌ Movimento inválido: Pular 2 colunas (Captação → Envio)",
    source: "Captação de lead",
    dest: "Envio de documentos",
    expected: false,
  },
  {
    name: "❌ Movimento inválido: De Entrega do imóvel",
    source: "Entrega do imóvel",
    dest: "Pendências",
    expected: false,
  },
  {
    name: "❌ Movimento inválido: Preparação → Assinatura do contrato",
    source: "Preparação do imóvel",
    dest: "Assinatura do contrato",
    expected: false,
  },
  {
    name: "❌ Movimento inválido: Pular múltiplas colunas (Primeiro → Validação)",
    source: "Primeiro Pagamento",
    dest: "Validação de documentos",
    expected: false,
  },
];

// Executar testes
console.log("\n🧪 === TESTES DE VALIDAÇÃO DE MOVIMENTO DO KANBAN ===\n");

let passed = 0;
let failed = 0;

testCases.forEach((test) => {
  const result = isMovementAllowed(test.source, test.dest);
  const isCorrect = result === test.expected;

  if (isCorrect) {
    passed++;
    console.log(`${test.name}`);
    console.log(`   ✓ Resultado: ${result} (esperado: ${test.expected})\n`);
  } else {
    failed++;
    console.log(`${test.name}`);
    console.log(
      `   ✗ FALHOU - Resultado: ${result} (esperado: ${test.expected})\n`,
    );
  }
});

console.log("====================================================");
console.log(`\n📊 Resultado Final: ${passed} passou, ${failed} falhou\n`);

if (failed === 0) {
  console.log("✅ TODOS OS TESTES PASSARAM!\n");
} else {
  console.log("❌ ATENÇÃO: Alguns testes falharam!\n");
}
