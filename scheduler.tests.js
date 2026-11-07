/**
 * Test suite for the "worker assignment" pairing problem.
 * Shared by scheduler.js (your work) and scheduler.solutions.js (reference).
 *
 * HARNESS — do not edit
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

let passed = 0;
let failed = 0;

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

function group(id, name, fn) {
  console.log(`\n# ${id} ${name}`);
  try {
    fn();
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  threw: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// FIXTURES
// ---------------------------------------------------------------------------
const workers = [
  { email: "sara@build.co", cost: 40, trades: ["electrician"] },
  { email: "ali@build.co", cost: 50, trades: ["electrician", "plumber"] },
  { email: "omar@build.co", cost: 60, trades: ["plumber", "carpenter"] },
  { email: "huda@build.co", cost: 35, trades: ["carpenter"] },
  { email: "nada@build.co", cost: 45, trades: ["welder"] },
];

const tieWorkers = [
  { email: "zain@build.co", cost: 40, trades: ["electrician"] },
  { email: "sara@build.co", cost: 40, trades: ["electrician"] },
];

// ---------------------------------------------------------------------------
// RUN
// ---------------------------------------------------------------------------
function runTests(Scheduler) {
  passed = 0;
  failed = 0;

  const s = new Scheduler(workers);

  group("P1", "getWorkersByTrade — cheapest first, then email", () => {
    eq(
      s.getWorkersByTrade("electrician"),
      ["sara@build.co", "ali@build.co"],
      "two electricians",
    );
    eq(
      s.getWorkersByTrade("carpenter"),
      ["huda@build.co", "omar@build.co"],
      "two carpenters",
    );
    eq(s.getWorkersByTrade("welder"), ["nada@build.co"], "single welder");
    eq(s.getWorkersByTrade("roofer"), [], "nobody can do it");
    eq(
      new Scheduler(tieWorkers).getWorkersByTrade("electrician"),
      ["sara@build.co", "zain@build.co"],
      "tie broken by email",
    );
  });

  group(
    "P2",
    "assign — cheapest capable worker per trade, no busy checks",
    () => {
      eq(
        s.assign(["electrician", "plumber", "carpenter"]),
        ["sara@build.co", "ali@build.co", "huda@build.co"],
        "one per trade",
      );
      eq(
        s.assign(["plumber", "plumber"]),
        ["ali@build.co", "ali@build.co"],
        "same worker twice is allowed",
      );
      eq(s.assign(["roofer"]), [null], "no capable worker -> null");
      eq(s.assign([]), [], "empty input");
      eq(
        new Scheduler(tieWorkers).assign(["electrician"]),
        ["sara@build.co"],
        "tie broken by email",
      );
    },
  );

  group("P3", "schedule — rounds, one trade per worker per round", () => {
    eq(
      s.schedule([
        "electrician",
        "plumber",
        "carpenter",
        "welder",
        "electrician",
        "plumber",
        "carpenter",
      ]),
      [
        [
          "sara@build.co",
          "ali@build.co",
          "huda@build.co",
          "nada@build.co",
          "omar@build.co",
        ],
        ["sara@build.co", "huda@build.co"],
      ],
      "7 trades, 5 workers -> 2 rounds",
    );
    eq(s.schedule(["electrician"]), [["sara@build.co"]], "fits in one round");
    eq(s.schedule([]), [], "no trades");
    eq(
      new Scheduler([]).schedule(["electrician"]),
      [],
      "no workers -> cannot schedule",
    );
    eq(
      s.schedule(["electrician", "roofer"]),
      [["sara@build.co"]],
      "unsatisfiable trade does not loop forever",
    );
  });

  console.log(`\n${"=".repeat(50)}`);
  console.log(`${passed} passed, ${failed} failed`);
  if (failed > 0) process.exitCode = 1;
  return { passed, failed };
}

module.exports = { runTests, workers, tieWorkers };
