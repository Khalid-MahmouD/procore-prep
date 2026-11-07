/**
 * REFERENCE SOLUTIONS for mock.js — open only after you have attempted it.
 *   node mock.solutions.js
 */

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a !== "object") return Number.isNaN(a) && Number.isNaN(b);
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a))
    return a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}

// ---------------------------------------------------------------------------
// P1 — summarize + sort. Map first, then sort. Null cost -> 0. Input untouched.
// ---------------------------------------------------------------------------
function p1_summarizeByStatus(projects) {
  const byStatus = new Map();

  for (const project of projects) {
    const status = project.status;
    if (!byStatus.has(status)) {
      byStatus.set(status, { status, count: 0, totalCost: 0 });
    }
    const row = byStatus.get(status);
    row.count += 1;
    row.totalCost += project.cost ?? 0;
  }

  return [...byStatus.values()].sort(
    (a, b) => b.count - a.count || a.status.localeCompare(b.status),
  );
}

// ---------------------------------------------------------------------------
// P2 — post-order recursion: children first, then own cost, then combine.
//      Rebuilds the tree instead of mutating it.
// ---------------------------------------------------------------------------
function p2_rollUpCosts(node) {
  const result = { ...node, totalCost: node.cost ?? 0 };

  if (Array.isArray(node.children)) {
    result.children = node.children.map(p2_rollUpCosts);
    result.totalCost += result.children.reduce(
      (sum, child) => sum + child.totalCost,
      0,
    );
  }

  return result;
}

// ---------------------------------------------------------------------------
// P3 — two Maps, one pass each. O(n) instead of O(n^2) with find().
// ---------------------------------------------------------------------------
function p3_diffById(previous, next) {
  const before = new Map(previous.map((item) => [item.id, item]));
  const after = new Map(next.map((item) => [item.id, item]));

  const added = [];
  const removed = [];
  const changed = [];

  for (const [id, item] of after) {
    if (!before.has(id)) {
      added.push(id);
      continue;
    }
    const old = before.get(id);
    const fields = new Set([...Object.keys(old), ...Object.keys(item)]);
    const differs = [...fields].some(
      (f) => f !== "id" && !deepEqual(old[f], item[f]),
    );
    if (differs) changed.push(id);
  }

  for (const id of before.keys()) {
    if (!after.has(id)) removed.push(id);
  }

  return { added, removed, changed };
}

// ---------------------------------------------------------------------------
// Reuse the mock's test harness by loading it with these implementations.
// ---------------------------------------------------------------------------
const fs = require("fs");
const path = require("path");
const source = fs
  .readFileSync(path.join(__dirname, "mock.js"), "utf8")
  .replace(
    /^const student = \{[\s\S]*?\n\};/m,
    "const student = globalThis.__SOLUTIONS__;",
  );

globalThis.__SOLUTIONS__ = {
  p1_summarizeByStatus,
  p2_rollUpCosts,
  p3_diffById,
};

// eslint-disable-next-line no-eval
eval(source);
