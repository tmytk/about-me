---
title: グラフ探索のメモ
date: 2025-03-01
---
# グラフ探索のメモ

迷路を最短で解くなら BFS。
コストがあるなら Dijkstra。

- BFS: 近い順に広げる
- Dijkstra: コスト最小
- A*: 目的地があるとき強い

```ts
const q = [start];
```
