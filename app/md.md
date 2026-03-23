Esta é a etapa final de design antes de codificar. Detalhar cada componente garante que nenhuma regra de negócio (como a obrigatoriedade dos 100% ou a divisão patrimônio vs. fluxo) seja esquecida na interface.



Abaixo, apresento o detalhamento cirúrgico de cada tela do **Midas**, seguido de um prompt formatado especificamente para ser copiado e colado em geradores de UI por IA (como v0.dev, Claude Artifacts, ou para guiar um UI/UX Designer no Figma).

---

### Estrutura Global: Navegação Principal (Sidebar / Bottom Nav)
* **Desktop:** Sidebar fixa à esquerda com fundo escuro. Logo "Midas" no topo. Itens listados verticalmente com ícones.
* **Mobile:** Bottom Navigation Bar (Barra inferior) branca com ícones para as 4 telas principais (Dashboard, Transações, Gastos, Investimentos) e um menu "Hambúrguer" para acessar Rendimentos e Configurações.

---

### Tela 1: Dashboard (A Visão Global)

**Detalhamento dos Componentes:**
* **Header:** Texto grande "Visão Geral". No canto superior direito, dois ícones: "Nuvem com check" (indicando que os CSVs estão íntegros) e "Prédio da Bolsa com relógio" (indicando a última sincronização B3).
* **Grid de Resumo (4 Cards):**
    * *Card 1 (Entradas):* Fundo branco, título cinza "Rendimentos (Mês)", valor em verde (ex: `R$ 10.000,00`).
    * *Card 2 (Saídas):* Título "Gastos & Aportes (Mês)", valor em vermelho (ex: `R$ 8.500,00`).
    * *Card 3 (Saldo):* Título "Saldo Livre", valor neutro ou azul (ex: `R$ 1.500,00`).
    * *Card 4 (Patrimônio):* Fundo com leve destaque (ex: azul muito claro), título "Patrimônio Total", valor em negrito (ex: `R$ 150.000,00`).
* **Termômetro de Consumo (Progresso Linear):** Uma barra horizontal espessa logo abaixo dos cards. Representa o fluxo de caixa. A base é 100% (Rendimentos). A barra preenche da esquerda para a direita com a soma dos Gastos. Exibe o texto sobreposto: `Consumido: 85% do rendimento mensal`.
* **Ações Rápidas:** Dois botões proeminentes: `[ + Nova Transação ]` (Primário) e `[ Sincronizar B3 ]` (Secundário/Outlined).

> **Prompt para Protótipo (Dashboard):**
> Crie uma interface de Dashboard financeiro limpa e moderna em modo claro (light theme). No topo, um título "Visão Geral" e ícones de status de conexão à direita. Abaixo, um grid 2x2 contendo 4 cards de resumo: Rendimentos (verde), Gastos (vermelho), Saldo Livre (azul) e Patrimônio Total (destaque sutil). Abaixo dos cards, uma barra de progresso linear grossa e arredondada indicando "85% do rendimento consumido". Finalize com dois botões largos e centralizados: "Nova Transação" (botão primário preenchido) e "Sincronizar B3" (botão secundário com borda). Use uma paleta de cores neutra (brancos, cinzas) com acentos em verde e vermelho para os valores financeiros.

---

### Tela 2: Transações (O Livro-Razão)

**Detalhamento dos Componentes:**
* **Header e Filtros (Sticky/Fixos no topo):**
    * Navegador de meses: `< Setembro 2024 >` centralizado.
    * Barra de pesquisa: Input longo ocupando a largura da tela com ícone de lupa. Placeholder: *"Buscar transação..."*.
    * Filtros Rápidos (Chips): Botões arredondados `[Todos]` `[Entradas]` `[Saídas]`.
* **Lista de Dados (Tabela/Cards):**
    * Listagem ordenada da mais recente para a mais antiga.
    * Cada linha possui: Ícone (seta para cima/baixo), Descrição em negrito, o "Caminho" da categoria em fonte menor cinza (ex: `Gastos > Variáveis > Lazer`), Data e o Valor alinhado à direita (verde com `+` ou vermelho com `-`).
* **Floating Action Button (FAB) / Modal:**
    * Botão circular com `+` fixo no canto inferior direito.
    * *Modal de Inserção:* Pede Valor (input gigante), Data, Descrição, e um botão que abre um sub-modal chamado "Selecionar Categoria". Esse sub-modal exibe a árvore de categorias clicável até a folha final.

> **Prompt para Protótipo (Transações):**
> Crie uma interface de lista de transações financeiras. No topo, um seletor de mês/ano com setas direcionais, seguido por uma barra de busca ampla e três chips de filtro: "Todos", "Entradas" e "Saídas". Abaixo, uma lista contínua de transações. Cada item da lista deve mostrar à esquerda um ícone de seta, a descrição da compra e um subtítulo em cinza claro com a hierarquia da categoria (ex: Gastos > Lazer). À direita de cada item, exiba a data e o valor da transação (verde para positivo, vermelho para negativo). Inclua um botão flutuante de ação (FAB) no canto inferior direito com um ícone de "+".

---

### Telas 3 e 4: Gastos e Rendimentos (O Motor de Orçamento)

**Detalhamento dos Componentes:**
* **Navegação Topo (Breadcrumbs):** Caminho de texto clicável: `Gastos > Custos Variáveis > Lazer`. Ícone de seta para voltar (`<`) fixo à esquerda. Ao lado do título atual, um ícone de lápis (para renomear) e um ícone de olho cortado (para ocultar).
* **Painel de Teto:** Um retângulo exibindo o orçamento disponível para aquele nível. Ex: `Teto do Nível: R$ 5.000,00`.
* **Gráfico (O Mapa - Planejado):**
    * Um Gráfico de Rosca (Doughnut) grande e centralizado.
    * As fatias representam as porcentagens ideais (*Metas*) definidas pelo usuário.
    * No centro do gráfico, o texto: `100% Alocado`. Se as metas abaixo somarem menos ou mais de 100%, o gráfico fica com uma fatia cinza (falta) ou vermelha (excesso) e o texto muda para `Erro: 110%`.
* **Lista de Subcategorias (A Jornada - Realidade):**
    * Para cada fatia do gráfico, há uma linha (card) correspondente abaixo.
    * *Linha da subcategoria:*
        * Indicador de cor (uma bolinha combinando com a fatia do gráfico).
        * Nome da Categoria e ícone de "3 pontinhos" (Opções: Editar, Excluir).
        * **Input de Meta:** Um campo de texto editável com o sufixo `%`. Ex: `[ 40 ] %`. Ao alterar isso, o gráfico de cima recálcula em tempo real.
        * **Barra de Progresso:** Mostra o consumo real contra a meta calculada em R$. Acima da barra, o texto: `Gasto: R$ 800,00 / Meta: R$ 2.000,00`.
* **Rodapé:** Botão tracejado largo `[ + Adicionar Subcategoria ]`.

> **Prompt para Protótipo (Gastos/Rendimentos):**
> Crie uma interface de aplicativo financeiro baseada em "Zero-Based Budgeting". No topo, exiba "breadcrumbs" de navegação (ex: Gastos > Custos Variáveis). Abaixo, centralize um grande gráfico de rosca (Doughnut chart) cujas fatias representam metas percentuais ideais; no "furo" do gráfico, escreva "100% Alocado". Abaixo do gráfico, crie uma lista interativa de subcategorias. Cada item da lista deve ter a cor correspondente à fatia do gráfico, o nome da categoria, um campo de input numérico pequeno exibindo a porcentagem (ex: 40%), e uma barra de progresso horizontal abaixo indicando o valor gasto versus a meta em moeda (ex: R$ 800 / R$ 2.000). Adicione um botão de "+ Adicionar Subcategoria" no final da lista.

---

### Tela 5: Investimentos (O Motor de Rebalanceamento)

**Detalhamento dos Componentes:**
* A estrutura de navegação e o gráfico são *idênticos* à tela de Gastos (Breadcrumbs, Gráfico de Rosca com as porcentagens ideais de alocação da carteira). O Painel de Teto exibe o `Patrimônio deste Nível`.
* **Lista de Ativos/Subcategorias (A Execução do Rebalanceamento):**
    * *Linha do Ativo (ex: PETR4):*
        * Nome/Ticker.
        * **Input de Meta:** A porcentagem alvo da carteira que este ativo deve ter (ex: `[ 50 ] %`).
        * **Valores Atuais:** Exibe o valor total que o usuário possui hoje (Qtd * Preço atual) e a porcentagem real (ex: `Atual: R$ 4.500,00 (45%)`).
        * **Badge de Ação (Crucial):** Um "selo" destacado à direita da linha calculado pelo sistema. Se o atual (45%) é menor que a meta (50%), exibe um badge verde escrito `Aportar R$ 500,00`. Se passou, badge vermelho `Vender R$ 200,00`. Se está cravado, badge cinza `Balanceado`.
    * *Menu de Ações do Ativo (3 pontinhos):* Permite acessar "Configurar Origem de Preço" (B3 ou Manual) e "Atualizar Quantidade".

> **Prompt para Protótipo (Investimentos/Rebalanceamento):**
> Crie uma interface focada em rebalanceamento de carteira de investimentos. O topo deve ter navegação em breadcrumbs (ex: Investimentos > Renda Variável) e um grande gráfico de rosca mostrando a alocação alvo ideal (Meta). Abaixo do gráfico, crie uma lista de ativos (ex: PETR4, BBDC3). Cada linha da lista deve mostrar: o nome do ativo, um campo editável com a porcentagem alvo (ex: 50%), o patrimônio atual naquele ativo (ex: R$ 4.500 - 45%), e um "Badge" (rótulo) de ação destacado à direita. O badge deve instruir o usuário de forma clara, por exemplo, um badge verde escrito "Aportar R$ 500,00" ou um vermelho "Vender R$ 200,00". A interface deve transmitir uma sensação analítica e orientada a dados.

---

### Tela 6: Configurações (A Sala de Máquinas)

**Detalhamento dos Componentes:**
* **Header:** Título "Configurações e Sistema".
* **Sessão 1: Motor de Dados Locais (CSV):**
    * Título da sessão: "Armazenamento Offline".
    * Input *readonly* longo mostrando o diretório: `C:\Users\User\Documents\MidasData\`.
    * Dois botões lado a lado: `Abrir Diretório` e `Forçar Recarga dos CSVs`.
* **Sessão 2: Sincronização B3:**
    * Título da sessão: "API de Cotações".
    * Status com ícone de relógio: `Última sincronização: 21/03/2026 às 09:20`.
    * Botão `Sincronizar Manualmente`.
* **Sessão 3: Console de Diagnóstico:**
    * Uma caixa de texto retangular com fundo escuro (estilo terminal).
    * Textos monoespaçados exibindo mensagens do sistema: `[OK] transacoes.csv lido com sucesso.` `[AVISO] Linha 4 de categorias.csv possui formato inválido. Ignorando.`.

> **Prompt para Protótipo (Configurações):**
> Crie uma tela de configurações de sistema com três sessões verticais claramente divididas por linhas finas. Sessão 1: "Armazenamento Offline", contendo um campo de texto não editável mostrando um caminho de diretório de computador, seguido por botões "Abrir Diretório" e "Forçar Recarga". Sessão 2: "API de Cotações", contendo um texto de "Última sincronização" e um botão primário "Sincronizar Manualmente". Sessão 3: "Console de Diagnóstico", exibindo uma área retangular com fundo quase preto (simulando um terminal de código) contendo logs de sistema com fontes monoespaçadas, com linhas indicando "[OK]" em verde e "[AVISO]" em amarelo.



Há alguns erros:

1. Não estão detalhados as telas auxiliares, ao clicar em + Nova Transação, deve-se abrir um modal ou navegar até uma página para isso, isso não está detalhado. Esse é apenas um exemplo, outras modais e telas auxiliares devem ser tão detalhadas quanto.

2. As telas 3 e 4 não devem ser tratadas como uma coisa só.

3. Detalhe que os Breadcrumbs devem ser funcionais, detalhando o planejamento de uma tela para Gastos, que possui 3 Categorias (Gastos Fixos, Gastos Variáveis e Investimentos). E cada uma dessas 3 categorias possui uma tela planejada com categorias próprias, isso é necessário para simular a navegação por meio do gráfico de doughnout e por meio dos breadcrumbs. Uma tela para Rendimentos que possui 2 Categorias (Salário, Freelance). E cada uma dessas 2 categorias possui uma tela planejada com categorias próprias. Uma tela para Investimetnos que possui 2 Categorias (Renda Fixa, Renda Variável) e cada uma dessas categorias possui uma tela planejada com categorias próprias.

Você tem toda a razão. Agrupar as telas e omitir os modais deixa o planejamento incompleto e impossibilita a criação de um protótipo navegável e realista. Para que a experiência de *drill-down* (navegação em profundidade) funcione no protótipo, precisamos mapear os estados exatos de cada nível da árvore.

Abaixo, detalho as telas auxiliares (Modais) e separo as arquiteturas de Rendimentos, Gastos e Investimentos, simulando a navegação funcional dos *breadcrumbs* e dos gráficos de rosca.

---

### 1. Telas Auxiliares (Modais de Interação)

Estes componentes flutuantes (Overlays) são chamados a partir das telas principais e garantem que o usuário não perca o contexto de onde estava.

#### Modal A: Registrar Nova Transação
Abre ao clicar no "FAB (+)" ou no botão do Dashboard.
* **Estrutura Visual:** Fundo da tela escurecido (dimmed). Um cartão branco centralizado (Desktop) ou subindo da borda inferior (Mobile - Bottom Sheet).
* **Cabeçalho:** Título "Nova Transação" e um botão "X" para fechar.
* **Corpo do Modal:**
    * **Toggle de Tipo:** Botões segmentados `[ Rendimento ]` `[ Gasto ]`. (Se o usuário estiver na tela de Gastos e clicar no +, ele já vem pré-selecionado como Gasto).
    * **Valor:** Input numérico em fonte gigante (ex: `R$ 0,00`).
    * **Data:** Input com ícone de calendário (padrão é "Hoje").
    * **Categoria (O Componente Crítico):** Um botão que parece um input, escrito `Selecionar categoria...`. Ao clicar, ele substitui o conteúdo do modal atual por uma lista navegável (ex: Clica em Gastos > desliza para a direita > Clica em Fixos > desliza para a direita > Seleciona Aluguel).
    * **Descrição:** Input de texto livre.
* **Rodapé:** Botões `Cancelar` (texto simples) e `Salvar Transação` (botão preenchido).

#### Modal B: Adicionar / Editar Categoria
Abre ao clicar em "+ Adicionar Categoria" no rodapé das listas de Gastos, Rendimentos ou Investimentos.
* **Cabeçalho:** Título dinâmico: `Nova Categoria em [Nome do Nó Pai Atual]`.
* **Corpo do Modal:**
    * **Nome da Categoria:** Input de texto (ex: "Lazer").
    * **Meta Percentual (%):** Input numérico. Logo abaixo, um texto de auxílio dinâmico: *Restam 15% disponíveis neste nível*.
* **Rodapé:** Botões `Cancelar` e `Salvar`.

---

### 2. Tela de Rendimentos (O Topo das Entradas)

Esta tela foca apenas no dinheiro que entra e em como ele é dividido percentualmente (a origem da renda).

**Visão 1: A Raiz (Rendimentos)**
* **Breadcrumb:** `Rendimentos` (Texto estático, pois é a raiz).
* **Gráfico de Rosca:** Mostra a divisão da renda total. Exemplo: Salário (70%) e Freelance (30%). Centro do gráfico: `Meta: 100%`.
* **Lista Inferior:**
    * `[Cor 1] Salário (70%) | Recebido: R$ 7.000 / Meta: R$ 7.000`
    * `[Cor 2] Freelance (30%) | Recebido: R$ 1.500 / Meta: R$ 3.000`

**Visão 2: Navegando para "Salário"**
*(O usuário clica na fatia "Salário" ou no item da lista)*
* **Breadcrumb:** `< Rendimentos > Salário` (Clicar em Rendimentos ou no `<` volta para a Visão 1).
* **Gráfico de Rosca:** Agora o teto (100%) é o Salário. Divisão: Fixo (90%), Bônus (10%).
* **Lista Inferior:**
    * `[Cor 1] Fixo (90%)`
    * `[Cor 2] Bônus (10%)`

**Visão 3: Navegando para "Freelance"**
*(O usuário volta para a raiz e clica em Freelance)*
* **Breadcrumb:** `< Rendimentos > Freelance`.
* **Gráfico de Rosca:** Teto (100%) é o Freelance. Divisão: Cliente A (60%), Cliente B (40%).
* **Lista Inferior:** Cadastros dos clientes como subcategorias.

> **Prompt Consolidado (Rendimentos e Modais):**
> Crie duas telas para um protótipo financeiro. Tela 1: Modal flutuante de "Nova Transação" com fundo escurecido. Deve conter um toggle [Rendimento/Gasto], um input de valor em fonte bem grande, inputs para Data e Descrição, e um botão "Selecionar Categoria" que simule a abertura de um menu expansível, além do botão "Salvar". Tela 2: A tela de "Rendimentos". No topo, exiba um breadcrumb funcional "< Rendimentos > Salário". Abaixo, um gráfico de rosca dividindo a categoria Salário em "Fixo (90%)" e "Bônus (10%)". Abaixo do gráfico, uma lista com as duas subcategorias, exibindo inputs de edição de porcentagem e barras de progresso comparando o valor recebido no mês com a meta estipulada.

---

### 3. Tela de Gastos (O Topo das Saídas)

Esta tela gerencia o consumo do rendimento. O nó "Investimentos" aqui refere-se ao **Aporte** (o ato de tirar dinheiro da conta corrente).

**Visão 1: A Raiz (Gastos)**
* **Breadcrumb:** `Gastos`.
* **Gráfico de Rosca:** Divisão macro do orçamento. Exemplo: Gastos Fixos (50%), Gastos Variáveis (30%), Investimentos (20%).
* **Lista Inferior:** Mostra as 3 categorias com suas barras de progresso indicando o quanto já foi consumido do teto geral do mês.

**Visão 2: Navegando para "Gastos Fixos"**
* **Breadcrumb:** `< Gastos > Gastos Fixos`.
* **Gráfico de Rosca:** Teto (100%) é o valor destinado aos Fixos. Divisão: Aluguel (60%), Escola (40%).
* **Lista Inferior:** Edição e barras de progresso do Aluguel e Escola.

**Visão 3: Navegando para "Gastos Variáveis"**
* **Breadcrumb:** `< Gastos > Gastos Variáveis`.
* **Gráfico de Rosca:** Teto (100%) é o valor destinado aos Variáveis. Divisão: Mercado (50%), Lazer (50%).
* **Lista Inferior:** Edição e barras de progresso do Mercado e Lazer.

**Visão 4: Navegando para "Investimentos" (Aportes)**
* **Breadcrumb:** `< Gastos > Investimentos`.
* **Gráfico de Rosca:** Teto (100%) é a meta de aporte do mês (ex: 20% da renda). Divisão: Envio para Corretora (100%).
* **Lista Inferior:** Exibe o quanto o usuário já transferiu para a corretora neste mês.

> **Prompt Consolidado (Gastos):**
> Crie a tela de "Gastos" de um aplicativo de orçamento. Simule o estado raiz. No topo, o breadcrumb exibe "Gastos". Abaixo, um grande gráfico de rosca (Doughnut) dividido em três fatias: "Gastos Fixos (50%)", "Gastos Variáveis (30%)" e "Investimentos (20%)". O texto central do gráfico deve dizer "Teto: R$ 10.000". Abaixo, uma lista contendo estas três categorias. Cada linha da lista deve ter o ícone da cor da fatia, um input editável com a porcentagem, e uma barra de progresso horizontal mostrando o consumo real no mês (ex: Gasto: R$ 4.500 / Meta: R$ 5.000). Inclua um botão de "+ Adicionar Categoria" ao final.

---

### 4. Tela de Investimentos (O Patrimônio Acumulado)

Esta tela é isolada do fluxo mensal. Ela lê o valor atualizado dos ativos e calcula as diferenças patrimoniais para o rebalanceamento.

**Visão 1: A Raiz (Carteira Total)**
* **Breadcrumb:** `Investimentos`.
* **Gráfico de Rosca:** Alocação ideal do portfólio. Exemplo: Renda Fixa (40%), Renda Variável (60%).
* **Lista Inferior:** Mostra as duas classes. Os "Badges de Ação" na direita alertam: `Renda Fixa: Aportar R$ X` ou `Renda Variável: Balanceado`.

**Visão 2: Navegando para "Renda Fixa"**
* **Breadcrumb:** `< Investimentos > Renda Fixa`.
* **Gráfico de Rosca:** Meta de diversificação da renda fixa. Exemplo: Tesouro Direto (50%), CDBs (50%).
* **Lista Inferior:** Lista os ativos desta classe com seus preços atualizados e os alertas de rebalanceamento específicos entre Tesouro e CDBs.

**Visão 3: Navegando para "Renda Variável"**
* **Breadcrumb:** `< Investimentos > Renda Variável`.
* **Gráfico de Rosca:** Meta de risco. Exemplo: Ações B3 (70%), FIIs (30%).
* **Lista Inferior:** Lista os grupos de ações e fundos imobiliários com alertas de compra/venda para manter a proporção de risco configurada. (O usuário poderia clicar em "Ações B3" e descer mais um nível para ver a divisão entre PETR4 e BBDC3).

> **Prompt Consolidado (Investimentos):**
> Crie a tela de "Investimentos" focada no rebalanceamento de portfólio. O breadcrumb no topo exibe "< Investimentos > Renda Variável". O gráfico de rosca central mostra a alocação ideal: "Ações B3 (70%)" e "FIIs (30%)". Abaixo, a lista de subcategorias possui uma estrutura analítica. Cada linha apresenta: o nome da classe (ex: Ações B3), um input com a meta (70%), o valor patrimonial atual (ex: R$ 75.000 - 75%), e um Badge (rótulo) de alerta na extrema direita. O badge de "Ações B3" deve ser vermelho e dizer "Sobre-alocado". O badge de "FIIs" deve ser verde e dizer "Aportar R$ 5.000".

---
