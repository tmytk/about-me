---
title: Markdown Showcase
date: 2025-04-01
---
# Markdown Showcase

これはMarkdown機能のテスト用サンプル。

## 1. 見出し

### 1-1. 小見出し

テキストの**太字**、*斜体*、`inline code`、そしてリンク。

- https://example.com
- [Example](https://example.com)

## 2. リスト

- 箇条書きA
- 箇条書きB
  - ネスト1
  - ネスト2

1. 番号付きA
2. 番号付きB

## 3. 引用

> これは引用です。
> 2行目の引用です。

## 4. コード

```ts
type User = {
  id: number;
  name: string;
};

const user: User = { id: 1, name: "Tomoya" };
console.log(user);
```

```bash
pnpm install
pnpm dev
```

## 5. テーブル

| 項目 | 値 |
| --- | --- |
| 名前 | Tomoya |
| 言語 | TypeScript |

## 6. 水平線

---

## 7. 数式(そのまま表示)

インライン: $E=mc^2$

ブロック:

$$
f(x) = \int_{-\infty}^{\infty} e^{-x^2} dx
$$
