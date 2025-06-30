<?php
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: *"); // ou especifique a origem: https://fecaf.brightspace.com
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 86400"); // 24h

$materia = [
    'descricao' => 'Visão geral de ferramentas e práticas DevOps aplicadas ao ciclo de vida do software.',
    'nota' => null,
    'PrimeiroModuloNãoFeito' => 'Os processos de desenvolvimento de software vêm sendo modificados e aprimorados ao longo do tempo. Desde a proposta do modelo em cascata até o surgimento dos métodos ágeis, a forma como o ciclo de vida de um sistema computacional é conduzido foi transformada radicalmente. No entanto, com o avanço da tecnologia e da necessidade por profissionais cada vez mais especializados, essas metodologias se mostraram ainda insuficientes para subsidiar um processo de desenvolvimento eficaz e eficiente.',
    'link' => 'https://fecaf.brightspace.com/d2l/le/enhancedSequenceViewer/27163?url=https%3A%2F%2Fcabd6a42-976a-4fa2-80a8-36b0ec721d14.sequences.api.brightspace.com%2F27163%2Factivity%2F445618%3FfilterOnDatesAndDepth%3D1'
];
// Retorna os dados da matéria
echo json_encode(['materia' => $materia], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
