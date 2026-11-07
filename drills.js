/**
 * PROCORE — JS Code Pairing Drill Pack
 *
 * HOW TO USE
 *   1. Implement each stub inside `student` below. Leave the tests alone.
 *   2. Run:            node drills.js
 *   3. Check tests:    node drills.js --ref     (runs reference solutions)
 *
 * RULES FOR YOURSELF (mirror the real interview)
 *   - Restate the problem before coding.
 *   - Run the tests after every 2-3 lines of progress.
 *   - Do not mutate the input.
 *   - Say the complexity out loud when you finish a problem.
 */

const { totalmem } = require("node:os");

// ---------------------------------------------------------------------------
// YOUR WORK GOES HERE
// ---------------------------------------------------------------------------
const student = {
  // P1 — sort by a key, asc/desc, nulls always last, do NOT mutate input

  p1_sortProjects(projects, key, dir = "asc") {
    const sign = dir == "desc" ? -1 : 1;
    return [...projects].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (aValue == null) return -1;

      const compareResult =
        typeof aValue === "number" && typeof bValue === "number"
          ? a[key] - b[key]
          : String(aValue).localeCompare(bValue);
      return compareResult * sign;
    });
  },

  // P2 — group into { key: [items] }
  p2_groupBy(items, keyFn) {
    // throw new Error("P2 not implemented");
    return items.reduce((group, item) => {
      const key = keyFn(item); // status
      (group[key] ||= []).push(item);
      return group;
    }, {});
  },

  // P3 — keep first occurrence of each key
  p3_uniqueBy(items, keyFn) {
    const seen = new Set();
    const result = items.filter((item) => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return result;
  },

  // P4 — the n items with the highest score, do NOT mutate input
  p4_topN(items, n, scoreFn) {
    // throw new Error("P4 not implemented");
    return [...items]
      .sort((a, b) => {
        return scoreFn(b) - scoreFn(a);
      })
      .slice(0, n);
  },

  // P5 — left join projects with budgets on id; missing budget => 0
  p5_joinById(projects, budgets) {
    // throw new Error("P5 not implemented");
    // let's see if the id of the budgets in the projects ? append this property with it's value
    // the id does not exist will be 0;
    const byId = new Map(budgets.map((b) => [b.projectId, b.amount]));
    return projects.map((p) => ({ ...p, budget: byId.get(p.id) ?? 0 }));
  },

  // P6 — { category: { count, total } }
  p6_summarizeByCategory(items) {
    const summary = new Map();
    for (const item of items) {
      const key = item.category;
      const count = (summary.get(key)?.count ?? 0) + 1;
      const total = (summary.get(key)?.total ?? 0) + item.amount;
      summary.set(key, { count, total });
    }
    // console.log(summary);
    return Object.fromEntries(summary);
    // throw new Error("P6 not implemented");
    // const result = [...items].reduce((acc, item) => {
    //   const key = item.category;
    //   if (!acc.has(key)) {
    //     acc.set(key, { count: 1, total: item.amount });
    //   } else {
    //     const k = acc.get(key);
    //     acc.set(key, {
    //       count: k.count + 1,
    //       total: k.total + item.amount,
    //     });
    //   }
    //   return acc;
    // }, new Map());
    // console.log(result);
    // return result;

    // return [...items].reduce((acc, item) => {
    //   const key = item.category;
    //   acc[key] ||= { count: 0, total: 0 };
    //   acc[key].count += 1;
    //   acc[key].total += item.amount;
    //   return acc;
    // }, {});
  },

  // P7 — key values that appear more than once
  p7_findDuplicates(items, keyFn) {
    // throw new Error("P7 not implemented");
    // const seen = new Map();
    // [...items].forEach((item) => {
    //   const key = keyFn(item);
    //   seen.set(key, (seen.get(key) || 0) + 1);
    // });

    // return Array.from(seen)
    //   .filter(([_, value]) => value > 1)
    //   .map(([key]) => key);

    const counts = new Map();
    const duplicates = [];

    for (const item of items) {
      const key = keyFn(item);
      const count = (counts.get(key) ?? 0) + 1;
      counts.set(key, count);
      count == 2 && duplicates.push(key);
    }
    return duplicates;
  },

  // P8 — inclusive timestamp range filter
  p8_filterByDateRange(items, from, to) {
    // throw new Error("P8 not implemented");
    const lo = new Date(from).getTime();
    const hi = new Date(to).getTime();
    // filter out within the range.
    return items.filter((item) => {
      const t = new Date(item.createdAt).getTime();
      return t >= lo && t <= hi;
    });
  },

  // P9 — depth-first flatten of { ...node, children: [] }
  p9_flattenTree(root) {
    const out = [];

    function walk(node) {
      const { children, ...rest } = node;
      out.push(rest);
      (node.children || []).map(walk);
    }

    walk(root);
    return out;
  },
  // P10 — sort by multiple keys, e.g. [{ key: "status" }, { key: "cost", dir: "desc" }]
  p10_sortByMultipleKeys(items, keys) {
    // throw new Error("P10 not implemented");
    const d = (x) => (x == "desc" ? -1 : 1);
    return [...items].sort((a, b) => {
      for (const { key, dir = "asc" } of keys) {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal == null && bVal) continue;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        const compare =
          typeof aVal === "number" && typeof bVal === "number"
            ? aVal - bVal
            : aVal.localeCompare(bVal);

        return compare != 0 && compare * d(dir);
      }
    });
  },

  // P11 — { key: count }
  p11_countBy(items, keyFn) {
    // throw new Error("P11 not implemented");
    return [...items].reduce((acc, item) => {
      const k = keyFn(item);
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {});
    // const result = new Map();
    // for (const item of items) {
    //   const key = keyFn(item);
    //   const count = (result.get(key) ?? 0) + 1;
    //   result.set(key, count);
    // }
    // return Object.fromEntries(result);
  },

  // P12 — [passing, failing]
  p12_partition(items, predicate) {
    // throw new Error("P12 not implemented");
    return items.reduce(
      ([pass, fail], item) => {
        const arr = predicate(item) ? pass : fail;
        arr.push(item);
        return [pass, fail];
      },
      [[], []],
    );
    // const pass = [];
    // const fail = [];
    // for (const item of items) {
    //   const arr = predicate(item) ? pass : fail;
    //   arr.push(item);
    // }
    // return [pass, fail];
  },

  // P13 — "a.b.c" safe read with fallback
  p13_get(obj, path, fallback) {
    // throw new Error("P13 not implemented");
    let curr = obj;
    for (const part of path.split(".")) {
      if (curr == null) return fallback;
      curr = curr[part];
    }
    return curr == undefined ? fallback : curr;
  },

  // P14 — apply { field: value | [values] | fn } filters, all must match
  p14_applyFilters(items, filters) {
    throw new Error("P14 not implemented");
  },

  // P15 — { "2026-03": [items] } from a date field
  p15_groupByMonth(items, dateKey = "createdAt") {
    throw new Error("P15 not implemented");
  },

  // ---------- stretch (asked less often, worth knowing) ----------
  p16_memoize(fn) {
    throw new Error("P16 not implemented");
  },

  p17_pipe(...fns) {
    throw new Error("P17 not implemented");
  },

  p18_flattenObject(obj, prefix = "", out = {}) {
    throw new Error("P18 not implemented");
  },

  // P19 — unique emails of every worker who can do at least one requested trade
  p19_workersForTrades(workers, trades) {
    const wanted = new Set(trades);
    const emails = workers
      .filter((w) => w.trades.some((t) => wanted.has(t)))
      .map((w) => w.email);
    return [...new Set(emails)];
  },

  // P20 — cheapest capable worker per trade
  p20_cheapestPerTrade(workers, trades) {
    const cheapest = new Map();
    for (const w of workers) {
      for (const t of w.trades) {
        const cur = cheapest.get(t);
        if (!cur || w.cost < cur.cost) cheapest.set(t, w);
      }
    }
    return trades.flatMap((t) => {
      const w = cheapest.get(t);
      return w ? [{ trade: t, email: w.email, cost: w.cost }] : [];
    });
  },

  // P21 — one job per worker per day; the cheapest worker is reused across days
  p21_schedule(workers, jobs) {
    const byDay = new Map();
    for (const job of jobs) {
      if (!byDay.has(job.day)) byDay.set(job.day, []);
      byDay.get(job.day).push(job);
    }

    const assignments = [];
    for (const [day, dayJobs] of byDay) {
      const usedToday = new Set();
      for (const job of dayJobs) {
        const w = workers
          .filter((w) => w.trades.includes(job.trade) && !usedToday.has(w.email))
          .sort((a, b) => a.cost - b.cost)[0];
        if (!w) return null;
        usedToday.add(w.email);
        assignments.push({
          day,
          trade: job.trade,
          email: w.email,
          cost: w.cost,
        });
      }
    }
    return assignments;
  },
};

// ---------------------------------------------------------------------------
// REFERENCE SOLUTIONS — read only after you have tried
// ---------------------------------------------------------------------------
const ref = {
  p1_sortProjects(projects, key, dir = "asc") {
    const sign = dir === "desc" ? -1 : 1;
    return [...projects].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return cmp * sign;
    });
  },

  p2_groupBy(items, keyFn) {
    return items.reduce((acc, item) => {
      const k = keyFn(item);
      (acc[k] ||= []).push(item);
      return acc;
    }, {});
  },

  p3_uniqueBy(items, keyFn) {
    const seen = new Set();
    return items.filter((item) => {
      const k = keyFn(item);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  },

  p4_topN(items, n, scoreFn) {
    return [...items].sort((a, b) => scoreFn(b) - scoreFn(a)).slice(0, n);
  },

  p5_joinById(projects, budgets) {
    const byId = new Map(budgets.map((b) => [b.projectId, b]));
    return projects.map((p) => ({ ...p, budget: byId.get(p.id)?.amount ?? 0 }));
  },

  p6_summarizeByCategory(items) {
    return items.reduce((acc, item) => {
      const c = item.category;
      acc[c] ||= { count: 0, total: 0 };
      acc[c].count += 1;
      acc[c].total += item.amount;
      return acc;
    }, {});
  },

  p7_findDuplicates(items, keyFn) {
    const counts = new Map();
    for (const item of items) {
      const k = keyFn(item);
      counts.set(k, (counts.get(k) || 0) + 1);
    }
    return [...counts.entries()].filter(([, c]) => c > 1).map(([k]) => k);
  },

  p8_filterByDateRange(items, from, to) {
    const lo = new Date(from).getTime();
    const hi = new Date(to).getTime();
    return items.filter((item) => {
      const t = new Date(item.createdAt).getTime();
      return t >= lo && t <= hi;
    });
  },

  p9_flattenTree(root) {
    const out = [];
    const walk = (node) => {
      out.push(node);
      (node.children || []).forEach(walk);
    };
    walk(root);
    return out;
  },

  p10_sortByMultipleKeys(items, keys) {
    return [...items].sort((a, b) => {
      for (const { key, dir = "asc" } of keys) {
        const av = a[key];
        const bv = b[key];
        if (av == null && bv == null) continue;
        if (av == null) return 1;
        if (bv == null) return -1;
        const cmp =
          typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv));
        if (cmp !== 0) return cmp * (dir === "desc" ? -1 : 1);
      }
      return 0;
    });
  },

  p11_countBy(items, keyFn) {
    return items.reduce((acc, item) => {
      const k = keyFn(item);
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
  },

  p12_partition(items, predicate) {
    const pass = [];
    const fail = [];
    for (const item of items) (predicate(item) ? pass : fail).push(item);
    return [pass, fail];
  },

  p13_get(obj, path, fallback) {
    let cur = obj;
    for (const part of path.split(".")) {
      if (cur == null) return fallback;
      cur = cur[part];
    }
    return cur === undefined ? fallback : cur;
  },

  p14_applyFilters(items, filters) {
    return items.filter((item) =>
      Object.entries(filters).every(([field, want]) => {
        if (want == null) return true;
        if (typeof want === "function") return want(item[field]);
        if (Array.isArray(want)) return want.includes(item[field]);
        return item[field] === want;
      }),
    );
  },

  p15_groupByMonth(items, dateKey = "createdAt") {
    return items.reduce((acc, item) => {
      const k = String(item[dateKey]).slice(0, 7);
      (acc[k] ||= []).push(item);
      return acc;
    }, {});
  },

  p16_memoize(fn) {
    const cache = new Map();
    return function (...args) {
      const k = JSON.stringify(args);
      if (!cache.has(k)) cache.set(k, fn.apply(this, args));
      return cache.get(k);
    };
  },

  p17_pipe(...fns) {
    return (value) => fns.reduce((acc, fn) => fn(acc), value);
  },

  p18_flattenObject(obj, prefix = "", out = {}) {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object" && !Array.isArray(v)) {
        ref.p18_flattenObject(v, key, out);
      } else {
        out[key] = v;
      }
    }
    return out;
  },

  p19_workersForTrades(workers, trades) {
    const wanted = new Set(trades);
    const emails = workers
      .filter((w) => w.trades.some((t) => wanted.has(t)))
      .map((w) => w.email);
    return [...new Set(emails)];
  },

  p20_cheapestPerTrade(workers, trades) {
    const cheapest = new Map();
    for (const w of workers) {
      for (const t of w.trades) {
        const cur = cheapest.get(t);
        if (!cur || w.cost < cur.cost) cheapest.set(t, w);
      }
    }
    return trades.flatMap((t) => {
      const w = cheapest.get(t);
      return w ? [{ trade: t, email: w.email, cost: w.cost }] : [];
    });
  },

  p21_schedule(workers, jobs) {
    const byDay = new Map();
    for (const job of jobs) {
      if (!byDay.has(job.day)) byDay.set(job.day, []);
      byDay.get(job.day).push(job);
    }

    const assignments = [];
    for (const [day, dayJobs] of byDay) {
      const usedToday = new Set();
      for (const job of dayJobs) {
        const w = workers
          .filter((w) => w.trades.includes(job.trade) && !usedToday.has(w.email))
          .sort((a, b) => a.cost - b.cost)[0];
        if (!w) return null;
        usedToday.add(w.email);
        assignments.push({
          day,
          trade: job.trade,
          email: w.email,
          cost: w.cost,
        });
      }
    }
    return assignments;
  },
};

// ---------------------------------------------------------------------------
// TEST HARNESS — do not edit
// ---------------------------------------------------------------------------
const impl = process.argv.includes("--ref") ? ref : student;
let passed = 0;
let failed = 0;

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a !== "object") return Number.isNaN(a) && Number.isNaN(b);
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    return a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
  }
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}

function eq(actual, expected, label) {
  if (deepEqual(actual, expected)) {
    passed += 1;
    console.log(`  PASS  ${label}`);
  } else {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        expected: ${JSON.stringify(expected)}`);
    console.log(`        actual  : ${JSON.stringify(actual)}`);
  }
}

function run(id, name, fn) {
  console.log(`\n# ${id} ${name}`);
  try {
    fn();
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  threw: ${err.message}`);
  }
}

// ------------------------------- fixtures ----------------------------------
const projects = [
  {
    id: 1,
    name: "Harbour Tower",
    status: "active",
    cost: 1200000,
    start: "2026-01-10",
  },
  {
    id: 2,
    name: "Metro Line 4",
    status: "closed",
    cost: 800000,
    start: "2025-11-02",
  },
  {
    id: 3,
    name: "Al Reem Villas",
    status: "active",
    cost: 450000,
    start: "2026-03-15",
  },
  {
    id: 4,
    name: "Bridge Retrofit",
    status: "on_hold",
    cost: null,
    start: "2026-02-01",
  },
];

const budgets = [
  { projectId: 1, amount: 1250000 },
  { projectId: 3, amount: 400000 },
  { projectId: 99, amount: 5000 },
];

const lineItems = [
  {
    id: "a",
    category: "concrete",
    amount: 1000,
    createdAt: "2026-01-05T10:00:00Z",
  },
  {
    id: "b",
    category: "steel",
    amount: 2000,
    createdAt: "2026-01-20T10:00:00Z",
  },
  {
    id: "c",
    category: "concrete",
    amount: 500,
    createdAt: "2026-02-02T10:00:00Z",
  },
  {
    id: "d",
    category: "steel",
    amount: 700,
    createdAt: "2026-03-11T10:00:00Z",
  },
  {
    id: "e",
    category: "labour",
    amount: 300,
    createdAt: "2026-03-12T10:00:00Z",
  },
];

const tree = {
  id: "root",
  name: "Harbour Tower",
  children: [
    {
      id: "wp1",
      name: "Foundation",
      children: [
        { id: "t1", name: "Excavation" },
        { id: "t2", name: "Piling" },
      ],
    },
    { id: "wp2", name: "Structure", children: [{ id: "t3", name: "Columns" }] },
  ],
};

const workers = [
  {
    id: 1,
    name: "Ali",
    email: "ali@harbour.dev",
    trades: ["plumber", "electrician"],
    cost: 120,
  },
  { id: 2, name: "Sara", email: "sara@harbour.dev", trades: ["plumber"], cost: 90 },
  {
    id: 3,
    name: "Omar",
    email: "omar@harbour.dev",
    trades: ["electrician"],
    cost: 100,
  },
  { id: 4, name: "Lina", email: "lina@harbour.dev", trades: ["carpenter"], cost: 80 },
];

const workerJobs = [
  { trade: "plumber", day: "2026-11-02" },
  { trade: "electrician", day: "2026-11-02" },
  { trade: "plumber", day: "2026-11-03" },
  { trade: "electrician", day: "2026-11-04" },
];

// ------------------------------- tests -------------------------------------
run("P1", "sortProjects — asc, desc, nulls last, no mutation", () => {
  const snapshot = JSON.stringify(projects);
  eq(
    impl.p1_sortProjects(projects, "cost", "asc").map((p) => p.id),
    [3, 2, 1, 4],
    "asc by cost, null last",
  );
  eq(
    impl.p1_sortProjects(projects, "cost", "desc").map((p) => p.id),
    [1, 2, 3, 4],
    "desc by cost, null still last",
  );
  eq(
    impl.p1_sortProjects(projects, "status").map((p) => p.id),
    [1, 3, 2, 4],
    "asc by string",
  );
  eq(JSON.stringify(projects) === snapshot, true, "input not mutated");
});

run("P2", "groupBy — status", () => {
  const g = impl.p2_groupBy(projects, (p) => p.status);
  eq(Object.keys(g).sort(), ["active", "closed", "on_hold"], "keys");
  eq(
    g.active.map((p) => p.id),
    [1, 3],
    "active ids",
  );
});

run("P3", "uniqueBy — first occurrence wins", () => {
  eq(
    impl.p3_uniqueBy(lineItems, (i) => i.category).map((i) => i.id),
    ["a", "b", "e"],
    "first per category",
  );
});

run("P4", "topN — highest cost, no mutation", () => {
  const snapshot = JSON.stringify(projects);
  eq(
    impl.p4_topN(projects, 2, (p) => p.cost ?? 0).map((p) => p.id),
    [1, 2],
    "top 2 by cost",
  );
  eq(JSON.stringify(projects) === snapshot, true, "input not mutated");
});

run("P5", "joinById — left join, missing budget is 0", () => {
  const joined = impl.p5_joinById(projects, budgets);
  eq(
    joined.map((p) => p.budget),
    [1250000, 0, 400000, 0],
    "budget per project",
  );
  eq(joined.length, 4, "left join keeps all projects");
});

run("P6", "summarizeByCategory", () => {
  eq(
    impl.p6_summarizeByCategory(lineItems),
    {
      concrete: { count: 2, total: 1500 },
      steel: { count: 2, total: 2700 },
      labour: { count: 1, total: 300 },
    },
    "count and total",
  );
});

run("P7", "findDuplicates", () => {
  eq(
    impl.p7_findDuplicates(lineItems, (i) => i.category),
    ["concrete", "steel"],
    "duplicated categories",
  );
  eq(
    impl.p7_findDuplicates(lineItems, (i) => i.id),
    [],
    "all ids unique",
  );
});

run("P8", "filterByDateRange — inclusive", () => {
  const got = impl.p8_filterByDateRange(
    lineItems,
    "2026-01-05T10:00:00Z",
    "2026-02-02T10:00:00Z",
  );
  eq(
    got.map((i) => i.id),
    ["a", "b", "c"],
    "inclusive both ends",
  );
});

run("P9", "flattenTree — depth first", () => {
  eq(
    impl.p9_flattenTree(tree).map((n) => n.id),
    ["root", "wp1", "t1", "t2", "wp2", "t3"],
    "pre-order flatten",
  );
});

run("P10", "sortByMultipleKeys", () => {
  const got = impl.p10_sortByMultipleKeys(projects, [
    { key: "status" },
    { key: "cost", dir: "desc" },
  ]);
  eq(
    got.map((p) => p.id),
    [1, 3, 2, 4],
    "status asc, then cost desc, nulls last",
  );
});

run("P11", "countBy", () => {
  eq(
    impl.p11_countBy(lineItems, (i) => i.category),
    { concrete: 2, steel: 2, labour: 1 },
    "counts",
  );
});

run("P12", "partition", () => {
  const [active, rest] = impl.p12_partition(
    projects,
    (p) => p.status === "active",
  );
  eq(
    active.map((p) => p.id),
    [1, 3],
    "pass",
  );
  eq(
    rest.map((p) => p.id),
    [2, 4],
    "fail",
  );
});

run("P13", "get — safe deep read", () => {
  const obj = { a: { b: { c: 42 } }, list: [{ x: 1 }] };
  eq(impl.p13_get(obj, "a.b.c"), 42, "deep value");
  eq(impl.p13_get(obj, "a.b.z", "default"), "default", "missing leaf");
  eq(impl.p13_get(obj, "a.x.y.z", null), null, "missing mid path");
  eq(impl.p13_get(null, "a.b", "n/a"), "n/a", "null root");
});

run("P14", "applyFilters — equality, array, function", () => {
  eq(
    impl.p14_applyFilters(projects, { status: "active" }).map((p) => p.id),
    [1, 3],
    "equality",
  );
  eq(
    impl
      .p14_applyFilters(projects, { status: ["active", "on_hold"] })
      .map((p) => p.id),
    [1, 3, 4],
    "array membership",
  );
  eq(
    impl
      .p14_applyFilters(projects, { cost: (c) => c != null && c > 500000 })
      .map((p) => p.id),
    [1, 2],
    "predicate",
  );
});

run("P15", "groupByMonth", () => {
  const g = impl.p15_groupByMonth(lineItems);
  eq(
    Object.keys(g),
    ["2026-01", "2026-02", "2026-03"],
    "month buckets in insertion order",
  );
  eq(
    g["2026-01"].map((i) => i.id),
    ["a", "b"],
    "january items",
  );
});

run("P16", "memoize", () => {
  let calls = 0;
  const slow = impl.p16_memoize((n) => {
    calls += 1;
    return n * 2;
  });
  eq(slow(2), 4, "first call");
  eq(slow(2), 4, "second call");
  eq(slow(3), 6, "different arg");
  eq(calls, 2, "called twice, not three times");
});

run("P17", "pipe", () => {
  const fn = impl.p17_pipe(
    (n) => n + 1,
    (n) => n * 2,
    (n) => `v${n}`,
  );
  eq(fn(3), "v8", "left to right");
});

run("P18", "flattenObject", () => {
  eq(
    impl.p18_flattenObject({ a: { b: 1, c: { d: 2 } }, e: 3 }),
    { "a.b": 1, "a.c.d": 2, e: 3 },
    "dot paths",
  );
});

run("P19", "workersForTrades — unique emails of capable workers", () => {
  eq(
    impl.p19_workersForTrades(workers, ["plumber", "electrician"]),
    ["ali@harbour.dev", "sara@harbour.dev", "omar@harbour.dev"],
    "emails of every capable worker",
  );
  eq(
    impl.p19_workersForTrades(workers, ["carpenter"]),
    ["lina@harbour.dev"],
    "single trade",
  );
  eq(impl.p19_workersForTrades(workers, ["scaffolder"]), [], "nobody can do it");
});

run("P20", "cheapestPerTrade — one winner per trade", () => {
  eq(
    impl.p20_cheapestPerTrade(workers, ["plumber", "electrician"]),
    [
      { trade: "plumber", email: "sara@harbour.dev", cost: 90 },
      { trade: "electrician", email: "omar@harbour.dev", cost: 100 },
    ],
    "cheapest capable worker per trade",
  );
});

run("P21", "schedule — reuse across days, once per day, cheapest fallback", () => {
  eq(
    impl.p21_schedule(workers, workerJobs),
    [
      { day: "2026-11-02", trade: "plumber", email: "sara@harbour.dev", cost: 90 },
      {
        day: "2026-11-02",
        trade: "electrician",
        email: "omar@harbour.dev",
        cost: 100,
      },
      { day: "2026-11-03", trade: "plumber", email: "sara@harbour.dev", cost: 90 },
      {
        day: "2026-11-04",
        trade: "electrician",
        email: "omar@harbour.dev",
        cost: 100,
      },
    ],
    "same worker reused on different days",
  );
  eq(
    impl.p21_schedule(workers, [
      { trade: "plumber", day: "2026-11-02" },
      { trade: "plumber", day: "2026-11-02" },
    ]),
    [
      { day: "2026-11-02", trade: "plumber", email: "sara@harbour.dev", cost: 90 },
      { day: "2026-11-02", trade: "plumber", email: "ali@harbour.dev", cost: 120 },
    ],
    "overflow falls back to next cheapest that day",
  );
  eq(
    impl.p21_schedule(workers, [
      { trade: "plumber", day: "2026-11-02" },
      { trade: "plumber", day: "2026-11-02" },
      { trade: "plumber", day: "2026-11-02" },
    ]),
    null,
    "infeasible day returns null",
  );
});

// ------------------------------- summary -----------------------------------
console.log(`\n${"=".repeat(50)}`);
console.log(`${passed} passed, ${failed} failed`);
if (failed > 0) process.exitCode = 1;
