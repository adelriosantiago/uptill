const assert = require("chai").assert
const uptill = require("./index.js")

const makeProm = (time, msg) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      return res(msg)
    }, time)
  })
}

describe("For objects,", () => {
  it("should await for all", async () => {
    proms = { fast: makeProm(10, "fast"), med: makeProm(20, "med"), slow: makeProm(30, "slow") }
    r = await uptill(proms)
    assert.propertyVal(r, "fast", "fast")
    assert.propertyVal(r, "med", "med")
    assert.propertyVal(r, "slow", "slow")
  })
  it("should await for allSettled", async () => {
    proms = { fast: makeProm(10, "fast"), med: makeProm(20, "med"), slow: makeProm(30, "slow") }
    r = await uptill(proms, true)

    assert.equal(r.fast.status, "fulfilled")
    assert.equal(r.med.status, "fulfilled")
    assert.equal(r.slow.status, "fulfilled")
  })
})

describe("For arrays (equivalent to Promise.all),", () => {
  it("should await for all", async () => {
    proms = [makeProm(10, "fast"), makeProm(20, "med"), makeProm(30, "slow")]
    r = await uptill(proms)
    assert.include(r, "fast")
    assert.include(r, "med")
    assert.include(r, "slow")
  })
  it("should await for allSettled", async () => {
    proms = [makeProm(10, "fast"), makeProm(20, "med"), makeProm(30, "slow")]
    r = await uptill(proms, true)

    assert.include(
      r.map((s) => s.status),
      "fulfilled"
    )
  })
})
