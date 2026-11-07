/**
 * REFERENCE SOLUTIONS — open only after attempting scheduler.js
 *   node scheduler.solutions.js
 */

const { runTests } = require("./scheduler.tests");

class Scheduler {
  constructor(workers) {
    this.workers = workers;
  }

  // -------------------------------------------------------------------------
  // P1 — filter, sort by (cost, email), map to emails.
  //      filter() already returns a new array, so sorting it is safe.
  // -------------------------------------------------------------------------
  getWorkersByTrade(trade) {
    return this.workers
      .filter((w) => w.trades.includes(trade))
      .sort((a, b) => a.cost - b.cost || a.email.localeCompare(b.email))
      .map((w) => w.email);
  }

  // -------------------------------------------------------------------------
  // P2 — the same "cheapest capable" helper, applied per trade.
  //      Each trade is independent, so a worker can be reused.
  // -------------------------------------------------------------------------
  assign(trades) {
    return trades.map((trade) => {
      const best = this.pickCheapest(this.workers, trade);
      return best ? best.email : null;
    });
  }

  // -------------------------------------------------------------------------
  // P3 — the round loop. This is the part that eats time:
  //      round = "one trade per worker, then everyone is free again".
  // -------------------------------------------------------------------------

  schedule(trades) {
    const rounds = [];
    let pending = [...trades];

    while (pending.length > 0) {
      const free = [...this.workers]; // everyone free at the start of a round
      const remaining = [];
      const thisRound = [];

      for (const trade of pending) {
        const chosen = this.pickCheapest(free, trade);

        if (!chosen) {
          remaining.push(trade); // no FREE worker right now -> next round
          continue;
        }

        thisRound.push(chosen.email);
        free.splice(free.indexOf(chosen), 1); // busy until the round ends
      }

      if (thisRound.length === 0) break; // unsatisfiable: stop, never spin

      rounds.push(thisRound);
      pending = remaining;
    }

    return;
  }

  // Shared helper: cheapest worker (cost, then email) able to do the trade.
  pickCheapest(pool, trade) {
    const capable = pool.filter((w) => w.trades.includes(trade));
    if (capable.length === 0) return undefined;
    return capable.sort(
      (a, b) => a.cost - b.cost || a.email.localeCompare(b.email),
    )[0];
  }
}

runTests(Scheduler);

// This is a JavaScript Quiz from BFE.dev

const obj = {
  a: 1,
  b: function () {
    console.log(this.a);
  },
  c() {
    console.log(this.a);
  },
  d: () => {
    console.log(this.a);
  },
  e: (function () {
    return () => {
      console.log(this.a);
    };
  })(),
  f: function () {
    return () => {
      console.log(this.a);
    };
  },
};

console.log(obj.a); // 1
obj.b(); // 1
obj.b(); // undefined?
const b = obj.b; // 1
b();
obj.b.apply({ a: 2 }); // 1
obj.c();
obj.d();
obj.d();
obj.d.apply({ a: 2 });
obj.e();
obj.e();
obj.e.call({ a: 2 });
obj.f()();
obj.f()();
obj.f().call({ a: 2 });

function add(...args) {
  console.log(args);
  return args.reduce((acc, item) => acc + item, 0);
}

add(1, 2, 3);
