/**
 * PROCORE — WORKER ASSIGNMENT (the problem you were actually given)
 *
 * Run:  node scheduler.js
 *
 * A worker looks like: { email, cost, trades: [string] }
 * "cost" is what they charge per job. Cheaper is better.
 *
 * TIES: always break by email, ascending (a < b). Say this out loud in the
 * interview — it is the sort of detail interviewers deliberately leave vague.
 *
 * Implement only inside the class below. Everything else is tests.
 */

const { runTests } = require("./scheduler.tests");

class Scheduler {
  constructor(workers) {
    this.workers = workers;
  }

  // P1 — given ONE trade, return the emails of every worker who can do it,
  //      cheapest first. Nobody can do it -> [].
  getWorkersByTrade(trade) {
    // throw new Error("P1 not implemented");
    const result = [];
    for (const worker of this.workers) {
      if (worker.trades.includes(trade)) {
        result.push(worker);
      }
    }
    result.sort(sortFn);
    return result.map((r) => r.email);

    // helper
    function sortFn(a, b) {
      return a.cost != b.cost
        ? a.cost - b.cost
        : a.email.localeCompare(b.email);
    }
  }

  // P2 — given a LIST of trades, return one email per trade, in the same order,
  //      always the CHEAPEST capable worker. No "busy" logic — the same worker
  //      may be picked repeatedly. No capable worker -> null for that slot.
  assign(trades) {
    // throw new Error("P2 not implemented");
    const compare = (a, b) => a.cost - b.cost || a.email.localeCompare(b.email);
    const pool = [...this.workers].sort(compare);

    return trades.map(
      (trade) =>
        pool.find((item) => item.trades.includes(trade))?.email ?? null,
    );

    // const better = (a, b) => a.cost - b.cost || a.email.localeCompare(b.email);

    // const table = new Map();

    // for (const worker of this.workers) {
    //   for (const trade of worker.trades) {
    //     const current = table.get(trade);
    //     if (!current || better(worker, current) < 0) table.set(trade, worker);
    //   }
    // }
    // return trades.map((trade) => table.get(trade)?.email ?? null);

    // console.log(table);
    // return trades.map((trade) => {
    //   const theBest = this.pickCheapest(this.workers, trade);
    //   return theBest ? theBest.email : null;
    // });
  }
  pickCheapest(pool, trade) {
    const capable = pool.filter((w) => w.trades.includes(trade));
    if (capable.length === 0) return undefined;
    return capable.sort(
      (a, b) => a.cost - b.cost || a.email.localeCompare(b.email),
    )[0];
  }

  // P3 — given a LIST of trades that is LONGER than the number of workers,
  //      return an array of rounds. Each round is an array of emails in the
  //      order the trades were assigned. Within a round a worker can only take
  //      ONE trade ("busy"); at the end of the round everyone is free again.
  //      Trades that cannot be filled in the current round carry to the next one.
  //      Stop if a whole round assigns nothing (otherwise you loop forever).
  schedule(trades) {
    // throw new Error("P3 not implemented");
    // const compare = (a, b) => a.cost - b.cost || a.email.localeCompare(b.email);
    return trades.map((trade) => {
      const theBest = this.pickCheapest(this.workers, trade);
      // need to mark this is busy and this
      return theBest ? theBest.email : null;
    });
  }
}

runTests(Scheduler);
