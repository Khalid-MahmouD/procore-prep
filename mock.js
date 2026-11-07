const { checkPropTypes } = require("prop-types");

/**
 * PROCORE — MOCK PAIRING EXAM (timed)
 *
 * SET A TIMER FOR 45 MINUTES. No reference solutions open.
 *   node mock.js
 *
 * Then grade yourself:  node mock.solutions.js
 *
 * SCORING (be strict)
 *   P1 done in < 10 min        -> on track
 *   P2 done in < 30 min total  -> on track
 *   P3 done in < 45 min total  -> strong
 *   Any mutation of input      -> -1
 *   Silent for > 3 min         -> -1
 */
class NewArray {
  constructor(status, count = 0, totalCost = 0) {
    this.status = status;
    this.count = count;
    this.totalCost = totalCost;
  }
}
const student = {
  // P1 — array of { status, count, totalCost }, sorted by count desc then status asc.
  //      null/undefined cost counts as 0. Do not mutate input.
  // SAMPLE { id: 1, name: "Harbour Tower", status: "active", cost: 1200000 },
  // [
  //   {
  //     "id": 195,
  //     "programKey": "8b841719-3acc-4827-9735-abb1956eb741",
  //     "typeId": 10,
  //     "typeName": "GiftCards",
  //     "programName": "SuperCell Consumer Gift Cards",
  //     "isNewVersion": false,
  //     "campaignAnalyticsUrl": ""
  //   },
  //   {
  //     "id": 218,
  //     "programKey": "5a5d9088-a3b2-4776-9cca-6e779a220a02",
  //     "typeId": 13,
  //     "typeName": "Discounts",
  //     "programName": "SuperCell Discount Service",
  //     "isNewVersion": false,
  //     "campaignAnalyticsUrl": ""
  //   },
  //   {
  //     "id": 320,
  //     "programKey": "5455b717-b11c-42db-a985-daf894db62ae",
  //     "typeId": 1,
  //     "typeName": "Loyalty",
  //     "programName": "CIB Demo loyalty",
  //     "isNewVersion": true,
  //     "campaignAnalyticsUrl": ""
  //   },
  //   {
  //     "id": 321,
  //     "programKey": "f73b8184-02ed-401d-be09-90516c1f6354",
  //     "typeId": 11,
  //     "typeName": "Tiering",
  //     "programName": "CIB Tiering",
  //     "isNewVersion": false,
  //     "campaignAnalyticsUrl": ""
  //   },
  //   {
  //     "id": 322,
  //     "programKey": "b85f7c60-4cc9-4038-bc9f-75dc665dd5a1",
  //     "typeId": 6,
  //     "typeName": "Segmentation",
  //     "programName": "CIB Segmentation",
  //     "isNewVersion": false,
  //     "campaignAnalyticsUrl": ""
  //   },
  //   {
  //     "id": 323,
  //     "programKey": "0c3f5af2-a777-4d15-a679-266b9101e91d",
  //     "typeId": 9,
  //     "typeName": "Challenges",
  //     "programName": "CIB Gamification",
  //     "isNewVersion": false,
  //     "campaignAnalyticsUrl": ""
  //   },
  //   {
  //     "id": 324,
  //     "programKey": "132e5d1e-d9dd-4ba5-b523-f02d27d210ad",
  //     "typeId": 2,
  //     "typeName": "Couponz",
  //     "programName": "Loyalize Redemptions",
  //     "isNewVersion": true,
  //     "campaignAnalyticsUrl": ""
  //   },
  //   {
  //     "id": 325,
  //     "programKey": "41958fae-88db-4386-bf39-ba1f7079fd84",
  //     "typeId": 7,
  //     "typeName": "Campaigns",
  //     "programName": "Loyalize Campaigns",
  //     "isNewVersion": false,
  //     "campaignAnalyticsUrl": "https://datastudio.google.com/embed/reporting/6775f832-1405-4d42-bec6-43af7d2f7bd1"
  //   },
  //   {
  //     "id": 332,
  //     "programKey": "0dc3cfba-f1b8-4582-93ce-4c399c5fceb0",
  //     "typeId": 8,
  //     "typeName": "Automated",
  //     "programName": "Loyalize Automation",
  //     "isNewVersion": false,
  //     "campaignAnalyticsUrl": ""
  //   },
  //   {
  //     "id": 338,
  //     "programKey": "d419e851-fc65-4e9d-94c0-f25b8b0d8c8f",
  //     "typeId": 12,
  //     "typeName": "RewardCatalog",
  //     "programName": "Loyalize",
  //     "isNewVersion": false,
  //     "campaignAnalyticsUrl": ""
  //   }
  // ]

  p1_summarizeByStatus(projects) {
    let statusMap = new Map();
    for (const project of projects) {
      const status = project.status;
      if (!statusMap.has(project.status)) {
        statusMap.set(status, new NewArray(status));
      }
      const row = statusMap.get(status);
      row.count += 1;
      row.totalCost += project.cost ?? 0;
    }
    console.log(statusMap.values());
    return [...statusMap.values()].sort(
      (a, b) => b.count - a.count || a.status.localeCompare(b.status),
    );
  },

  // P2 — return a NEW tree where every node has totalCost =
  //      its own cost + the totalCost of all descendants. Do not mutate input.
  p2_rollUpCosts(node) {
    // const totalCost = node?.cost ?? 0;
    // if (!Array.isArray(node.children)) {
    //   return { ...node, totalCost };
    // }
    // const children = node.children.map((child) => this.p2_rollUpCosts(child));
    // const childrenTotal = children.reduce(
    //   (sum, childrenItem) => sum + childrenItem.totalCost,
    //   0,
    // );
    // return { ...node, children, totalCost: totalCost + childrenTotal };
  },

  // P3 — compare two snapshots by id.
  //      { added: [ids], removed: [ids], changed: [ids] }
  //      "changed" = same id, any other field differs.
  p3_diffById(previous, next) {
    const isEqual = (a, b) => {
      console.log(
        [...new Set([...Object.keys(a), ...Object.keys(b)])].filter(
          (k) => !Object.is(a[k], b[k]),
        ),
      );
      return (
        Object.keys(a).length === Object.keys(b).length &&
        Object.keys(a).every((k) => Object.is(a[k], b[k]))
      );
    };
    // function to return the changed property exactly;

    const changedKeys = (a, b) => {};
    const prev = new Map(previous.map((o) => [o.id, o]));
    const nextMap = new Map(next.map((o) => [o.id, o]));
    const ids = [...new Set([...prev.keys(), ...nextMap.keys()])];

    const inPrev = (id) => prev.has(id);
    const inNext = (id) => nextMap.has(id);
    const inBoth = (id) => inPrev(id) && inNext(id);

    const rules = {
      added: (id) => !inPrev(id),
      removed: (id) => !inNext(id),
      changed: (id) => inBoth(id) && !isEqual(prev.get(id), nextMap.get(id)),
    };
    console.log(
      Object.entries(rules).map(([kind, callback]) => [
        kind,
        ids.filter(callback),
      ]),
    );
    const result = Object.fromEntries(
      Object.entries(rules).map(([kind, callback]) => [
        kind,
        ids.filter(callback),
      ]),
    );
    return result;
  },
};

// ---------------------------------------------------------------------------
// HARNESS — do not edit
// ---------------------------------------------------------------------------
let passed = 0;
let failed = 0;

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

const projects = [
  { id: 1, name: "Harbour Tower", status: "active", cost: 1200000 },
  { id: 2, name: "Metro Line 4", status: "closed", cost: 800000 },
  { id: 3, name: "Al Reem Villas", status: "active", cost: 450000 },
  { id: 4, name: "Bridge Retrofit", status: "on_hold", cost: null },
];

const wbs = {
  id: "root",
  name: "Harbour Tower",
  cost: 0,
  children: [
    {
      id: "wp1",
      name: "Foundation",
      cost: 10000,
      children: [
        { id: "t1", name: "Excavation", cost: 40000 },
        { id: "t2", name: "Piling", cost: 60000 },
      ],
    },
    {
      id: "wp2",
      name: "Structure",
      cost: 5000,
      children: [{ id: "t3", name: "Columns", cost: 25000 }],
    },
  ],
};

const prev = [
  { id: 1, name: "Harbour Tower", status: "active", cost: 1200000 },
  { id: 2, name: "Metro Line 4", status: "active", cost: 800000 },
  { id: 3, name: "Al Reem Villas", status: "active", cost: 450000 },
];
const next = [
  { id: 1, name: "Harbour Tower", status: "active", cost: 1200000 },
  { id: 2, name: "Metro Line 4", status: "closed", cost: 800000 },
  { id: 4, name: "Bridge Retrofit", status: "active", cost: 300000 },
];

run("P1", "summarizeByStatus", () => {
  const snapshot = JSON.stringify(projects);
  eq(
    student.p1_summarizeByStatus(projects),
    [
      { status: "active", count: 2, totalCost: 1650000 },
      { status: "closed", count: 1, totalCost: 800000 },
      { status: "on_hold", count: 1, totalCost: 0 },
    ],
    "summed, null cost as 0, sorted",
  );
  eq(student.p1_summarizeByStatus([]), [], "empty array");
  eq(JSON.stringify(projects) === snapshot, true, "input not mutated");
});

run("P2", "rollUpCosts", () => {
  const snapshot = JSON.stringify(wbs);
  const out = student.p2_rollUpCosts(wbs);
  eq(out.totalCost, 140000, "root rolls up all descendants");
  eq(out.children[0].totalCost, 110000, "wp1");
  eq(out.children[1].totalCost, 30000, "wp2");
  eq(out.children[0].children[1].totalCost, 60000, "leaf keeps own cost");
  eq(JSON.stringify(wbs) === snapshot, true, "input not mutated");
  eq(wbs.totalCost, undefined, "original has no totalCost");
});

run("P3", "diffById", () => {
  eq(
    student.p3_diffById(prev, next),
    { added: [4], removed: [3], changed: [2] },
    "add/remove/change",
  );
  eq(
    student.p3_diffById(prev, prev),
    { added: [], removed: [], changed: [] },
    "identical snapshots",
  );
  eq(
    student.p3_diffById([], next),
    { added: [1, 2, 4], removed: [], changed: [] },
    "empty previous",
  );
});

console.log(`\n${"=".repeat(50)}`);
console.log(`${passed} passed, ${failed} failed`);
if (failed > 0) process.exitCode = 1;
