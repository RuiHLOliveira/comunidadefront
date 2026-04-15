# MdHtmlConverter - Documentação de Sintaxes Markdown Suportadas

Este documento descreve todas as sintaxes Markdown atualmente suportadas pelo `MdHtmlConverter` em `src/core/MdHtmlConverter.js`.

## 1) Títulos (Headers)

### Markdown
```md
# Título H1
## Título H2
### Título H3
#### Título H4
##### Título H5
```

### HTML gerado
`<h1>` até `<h5>`

## 2) Negrito

### Markdown
```md
**texto em negrito**
__texto em negrito__
```

### HTML gerado
`<strong>texto em negrito</strong>`

## 3) Itálico

### Markdown
```md
*texto em itálico*
_texto em itálico_
```

### HTML gerado
`<em>texto em itálico</em>`

## 4) Imagens

### 4.1 Sintaxe padrão

#### Markdown
```md
![Descrição da imagem](https://exemplo.com/imagem.png)
```

#### HTML gerado
`<img class="imgPost" src="..." alt="...">`

### 4.2 Imagens com limite de tamanho (opcional)

Você pode definir `max-width` e/ou `max-height` na própria sintaxe da imagem:

#### Markdown
```md
![Descrição](https://exemplo.com/imagem.png | max-width=500px, max-height=280px)
```

Também é possível usar atalhos:
- `mw` para `max-width`
- `mh` para `max-height`

#### Markdown (atalhos)
```md
![Descrição](https://exemplo.com/imagem.png | mw=420px, mh=240px)
```

#### HTML gerado
`<img class="imgPost" src="..." alt="..." style="max-width:...;max-height:...;">`

## 5) Links

### Markdown
```md
[Texto do link](https://exemplo.com)
```

### HTML gerado
`<a href="https://exemplo.com">Texto do link</a>`

## 6) Código inline

### Markdown
```md
Use `const x = 10` no exemplo.
```

### HTML gerado
`<code>const x = 10</code>`

## 7) Bloco de código

### Markdown
````md
```js
const soma = (a, b) => a + b;
```
````

### HTML gerado
`<pre><code>...</code></pre>`

## 8) Tachado (Strikethrough)

### Markdown
```md
~~texto tachado~~
```

### HTML gerado
`<del>texto tachado</del>`

## 9) Linha horizontal

### Markdown
```md
---
```

### HTML gerado
`<hr>`

## 10) Quebras de linha e parágrafos

- Uma quebra de linha simples (`\n`) vira `<br>`.
- Linha em branco (dupla quebra `\n\n`) separa parágrafos.
- O conteúdo final é encapsulado em `<p>...</p>`, com limpeza de parágrafos vazios e ajustes para não envolver indevidamente `h1-h5`, `hr` e `pre`.

## Observações importantes

1. O conversor atual suporta `h1` até `h5` (não há regra explícita para `h6`).
2. A ordem de conversão é baseada em expressões regulares; em casos de markdown complexo, o resultado pode diferir de parsers Markdown completos.
3. Nos limites de imagem (`max-width`/`max-height`), informe unidade CSS válida (`px`, `%`, `rem`, etc.).
