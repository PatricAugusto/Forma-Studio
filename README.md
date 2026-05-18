# forma. — Product Design Studio

UI de portfólio neo-minimalista para um estúdio de product design, construída com **Next.js 14**, **styled-components** e **Framer Motion**.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Pilha Tecnológica](#pilha-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Começar](#como-começar)
- [Arquitetura](#arquitetura)
- [Componentes](#componentes)
- [Sistema de Design](#sistema-de-design)
- [Testes](#testes)
- [Fluxo de Trabalho no Git](#fluxo-de-trabalho-no-git)
- [Scripts](#scripts)
- [Como Contribuir](#como-contribuir)

---

## Visão Geral

**forma.** é uma interface de portfólio neo-minimalista para um estúdio de product design.  
A aplicação prioriza forte hierarquia tipográfica, micro-animações precisas e uma paleta quase monocromática com um único acento elétrico — **#C8FF00**.

### Princípios de Design

- **Neo-minimalismo** — generoso espaço em branco, tipografia assertiva e paleta de cores restrita
- **Motion-first** — toda interação possui uma animação correspondente com easing intencional
- **Modularidade de componentes** — cada componente é decomposto em unidades focadas e testáveis de forma independente
- **Acessibilidade** — HTML semântico, atributos ARIA, navegação por teclado e total compatibilidade com dispositivos touch

---

## Pilha Tecnológica

| Camada                  | Tecnologia                   |
| ------------------------ | ---------------------------- |
| Framework                | Next.js 14 (App Router)      |
| Linguagem                | TypeScript 5.x               |
| Estilização              | styled-components 6.x        |
| Animação                 | Framer Motion 11.x           |
| Ícones                   | Lucide React                 |
| Testes                   | Jest + React Testing Library |
| Linting                  | ESLint + TypeScript ESLint   |
| Node                     | ≥ 18.17.0                    |
| Gerenciador de Pacotes   | npm                          |

---

## Estrutura do Projeto

```bash
forma-studio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout raiz — registro SSR + providers
│   │   └── page.tsx                # Página inicial — compõe todas as seções
│   │
│   ├── components/
│   │   ├── Cursor/                 # Cursor personalizado com efeitos magnéticos
│   │   ├── LoadingScreen/          # Tela de carregamento inicial
│   │   ├── PageTransition/         # Animação de transição entre páginas
│   │   ├── Navbar/                 # Navegação fixa com menu mobile
│   │   ├── Hero/                   # Seção hero em tela cheia
│   │   ├── Work/                   # Portfólio com grid e filtros
│   │   ├── About/                  # Sobre o estúdio
│   │   └── Footer/                 # Rodapé com marquee e CTA
│   │
│   ├── lib/
│   ├── styles/
│   └── types/
│
├── jest.config.ts
├── tsconfig.json
└── package.json
```

## Como Começar

**Pré-requisitos**
- Node.js ≥ 18.17.0
- npm ≥ 9.x
  
### Instalação
```bash
git clone https://github.com/your-username/forma-studio.git

cd forma-studio

npm install
```

### Desenvolvimento

```bash
npm run dev
```
Acesse ```http://localhost:3000``` no navegador.

### Build de Produção

```bash
npm run build
npm start
```

### Executar Testes

```bash
npm test              # Executa todos os testes
npm run test:coverage # Executa com relatório de cobertura
npm run test:watch    # Modo watch
```

---

## Arquitetura

A aplicação utiliza o **App Router do Next.js 14**.

Todos os componentes interativos são marcados com ```'use client'``` devido à necessidade de React Context do styled-components.

**SSR + styled-components**
Utiliza um registro personalizado para evitar o Flash of Unstyled Content (FOUC).

---

## Componentes

| Componente | Descrição |
|------------|------------|
| `Cursor` | Cursor personalizado com dois elementos (ponto + anel) e efeitos magnéticos |
| `LoadingScreen` | Sequência de entrada com barra de progresso e animação em cascata |
| `Navbar` | Cabeçalho fixo com menu mobile em tela cheia |
| `Hero` | Seção em tela cheia com cascata tipográfica e orb geométrico |
| `Work` | Grid assimétrico de projetos com filtros em carrossel infinito |
| `About` | Layout editorial com contadores animados e lista de serviços |
| `Footer` | Marquee infinito, headline gigante e botão CTA magnético |

---

## Sistema de Design

### Paleta de Cores

| Token | Valor | Uso |
|-------|--------|-----|
| `bg` | `#0A0A0A` | Fundo da página |
| `surface` | `#111111` | Cards e painéis |
| `border` | `#1E1E1E` | Divisores e contornos |
| `text` | `#F0EDE8` | Texto principal |
| `muted` | `#555555` | Texto secundário e rótulos |
| `accent` | `#C8FF00` | Acento elétrico da marca |

### Tipografia

- **Display:** Bebas Neue *(headlines, contadores e logo)*
- **Body:** DM Sans *(textos corridos)*
- **Mono:** JetBrains Mono *(rótulos, tags e metadados)*

### Outros Tokens

- **Breakpoints:** `768px` *(mobile)* e `1024px` *(tablet)*
- **Curvas de easing:** `fast`, `smooth` e `spring`

---

## Testes

Os testes foram escritos com **Jest + React Testing Library**, priorizando comportamento do usuário em vez de implementação interna.

### Cobertura Atual

- ~95% das instruções

---

## Fluxo de Trabalho no Git

Os commits seguem o padrão **Conventional Commits**.

### Tipos principais

```bash
feat: nova funcionalidade ou componente
fix: correção de bug
refactor: reestruturação de código
test: adição ou atualização de testes
chore: configurações, build ou dependências
```

--- 

## Scripts

```bash
npm run dev           # Inicia o servidor de desenvolvimento
npm run build         # Gera build de produção
npm start             # Inicia o servidor de produção
npm run lint          # Executa o ESLint
npm test              # Executa os testes
npm run test:coverage # Testes com cobertura
npm run test:watch    # Testes em modo watch
```

---

## Como Contribuir

1. Faça um fork do repositório
2. Crie sua branch:
```bash
git checkout -b feat/sua-funcionalidade
```
3. Escreva testes para novos componentes
4. Verifique se todos os testes passam:
```bash
npm test
```
5. Verifique o lint:
```bash
npm run lint
```
6. Faça o commit seguindo o padrão Conventional Commits
7. Abra um Pull Request com descrição clara

## Padrões de Código

- Todo novo componente deve ter seu arquivo de teste
- Use apenas tokens do tema (nunca valores fixos)
- Componentes interativos devem ter ```'use client'```
