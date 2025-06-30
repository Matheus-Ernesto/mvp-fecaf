<?php
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: *"); // ou especifique a origem: https://fecaf.brightspace.com
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 86400"); // 24h

// Dados fixos de um único aluno
$aluno = [
    'aluno' => [
        'nome' => 'Matheus Ernesto dos Santos',
        'idade' => 21,
        'conclusaoPorSemestre' => 25,
        'mediaTotalSemestral' => 8,
        'curso' => 'Engenharia da Computação',
        'descCurso' => 'O curso de Engenharia da Computação forma profissionais capacitados para projetar, desenvolver e integrar sistemas computacionais e eletrônicos. Com uma base sólida em matemática, física, programação e eletrônica, o engenheiro da computação atua em áreas como desenvolvimento de software, inteligência artificial, automação, redes, internet das coisas (IoT) e sistemas embarcados.',
        'notas' => [
            'Cálculo' => 8.5,
            'Algoritmos' => 9.0,
            'Redes' => 7.5
        ],
        'matériasEad' => [
            'AmbienteDevOps',
            'User Experience'
        ],
        'dp' => [
            'Design de UX'
        ],
        'linksMentor' => [
            'faltas' => 'https://mentorweb.unifecaf.edu.br/fecafMentorWebG5/jsf/dashboard.jsf?sourcedhb=42',
            'notas' => 'https://mentorweb.unifecaf.edu.br/fecafMentorWebG5/jsf/central/cal/notasFaltas.jsf?pcaes=e7e846ffcee126e4e897f2436e4e0d9a9c8086ee96dc592e1468145f41edb891',
            'localAula' => 'https://mentorweb.unifecaf.edu.br/fecafMentorWebG5/jsf/dashboard.jsf?sourcedhb=68'
        ]
    ]
];

// Retorna os dados em JSON
echo json_encode($aluno, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
