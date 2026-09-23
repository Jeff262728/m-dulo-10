# 🅿️ Parquímetro Digital — módulo 7 refatorado para o modulo 10

Projeto refatorado a partir da atividade do **Módulo 7**, mantendo a lógica de Programação Orientada a Objetos e reorganizando o JavaScript em módulos ES.

## 📁 Estrutura

```text
.
├── index.html
├── styles.css
├── README.md
└── js/
    ├── classes.js
    ├── utils.js
    └── app.js
```

### Responsabilidade dos arquivos

- **`js/classes.js`**: classes `Parquimetro` e `ParquimetroApp`.
- **`js/utils.js`**: funções puras para formatação, soma e manipulação de coleções.
- **`js/app.js`**: ponto de entrada, testes com `console.log()` e integração com o DOM.

## 🔄 O que foi refatorado

- O antigo `scripts.js` foi dividido em `classes.js`, `utils.js` e `app.js`.
- Foram usados `export` e `import` para conectar os módulos.
- A POO existente foi mantida, com responsabilidades mais bem separadas.
- Cálculos e manipulações de arrays usam funções como `map()`, `find()` e `reduce()`.
- Funções utilitárias são puras sempre que possível.
- Não existem eventos inline no HTML.
- Todos os eventos são registrados com `addEventListener()`.
- A interface é atualizada dinamicamente enquanto o valor é digitado ou quando um atalho é utilizado.
- Os métodos principais são executados com `console.log()` antes da criação da instância que integra a lógica à interface.

## 🧪 Testes no console

Abra o navegador com as ferramentas de desenvolvedor (`F12` → Console). Ao carregar a página, serão exibidos testes para:

- `Parquimetro.calcular()`
- `formatarTempo()`
- `formatarMoeda()`
- `somarValores()` com `reduce()`
- `encontrarAtalho()` com `find()`

## ▶️ Como executar

Como o projeto usa **ES Modules**, o navegador precisa carregar os arquivos por HTTP.

Uma opção simples no VS Code é usar a extensão **Live Server**:

1. Abra a pasta do projeto no VS Code.
2. Instale/abra o projeto com Live Server.
3. Abra o `index.html` pelo servidor.
4. Pressione `F12` e confira os testes no Console.

## ⚙️ Regras do parquímetro

| Regra | Valor |
|---|---:|
| Preço por fração | R$ 1,00 |
| Tempo por fração | 30 minutos |
| Valor mínimo | R$ 1,00 |

Exemplos:

| Valor inserido | Tempo | Troco |
|---|---|---|
| R$ 0,50 | Valor insuficiente | — |
| R$ 1,00 | 30 min | R$ 0,00 |
| R$ 2,50 | 1h | R$ 0,50 |
| R$ 4,00 | 2h | R$ 0,00 |

## 🧠 Observação

O `index.html` usa:

```html
<script type="module" src="js/app.js"></script>
```

Isso permite utilizar `import` e `export` nativamente no navegador.
