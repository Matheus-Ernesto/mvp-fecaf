<?php
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: *"); // ou especifique a origem: https://fecaf.brightspace.com
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 86400"); // 24h

$conteudo = [
    'nome' => 'Ambiente DevOps',
    'descricao' => 'Os processos de desenvolvimento de softwarevêm sendo modificados e aprimorados ao longo do tempo. Desde a proposta do modelo em cascata até o surgimento dos métodos ágeis, a forma como o ciclo de vida de um sistema computacional é conduzido foi transformada radicalmente. No entanto, com o avanço da tecnologia e da necessidade por profissionais cada vez mais especializados, essas metodologias se mostraram ainda insuficientes para subsidiar um processo de desenvolvimento eficaz e eficiente.Nesse cenário, o conceito DevOps emerge a partir dos preceitos ágeis como uma nova proposta para a forma como sistemas computacionais são desenvolvidos e entregues ao usuário final.Nesta Unidade de Aprendizagem, você será apresentado aos fundamentos dessa metodologia e vai conhecer todas as etapas que compõem uma linha de produção baseada em DevOps. Além disso, várias ferramentas projetadas para dar apoio à metodologia serão detalhadas.O modelo de desenvolvimento DevOps é composto de várias etapas que criam um ciclo com foco na garantia da qualidade e na agilidade das entregas. Um conjuto de ferramentas está associado a cada etapa, dando suporte à automação de todo o processo.Diversas metodologias já foram desenvolvidas de forma a organizar o processo de desenvolvimento de software. Modelos como cascata, processo unificado e metodologias ágeis são bem difundidos nesse contexto. Contudo, todas elas apresentam deficiências que embasaram a busca por novos processos de construção de sistemas de forma eficiente sem haver comprometimento da qualidade do produto final.No capítulo Introdução a DevOps, da obra Processos de desenvolvimento de software, você vai conhecer os conceitos por detrás dessa nova abordagem para o ciclo de desenvolvimento de software. As etapas e fases dessa metodologia serão apresentadas e as ferramentas que dão suporte a toda a automatização proposta por ela também serão detalhadas.Embora a filosofia DevOps ofereça grandes benefícios para as organizações que a adotam, a transição de um modelo tradicional de desenvolvimento de software para uma forma de trabalho fundamentada nos preceitos do DevOps nem sempre é uma tarefa simples.',
    'nota' => '5'
];
// Retorna os dados da matéria
echo json_encode(['conteudo' => $conteudo], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
