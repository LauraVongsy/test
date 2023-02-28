const {
    creditMax,
    allowRandomCredits,
    randomCredits,
} = require("../controllers/queue.controller");

//randomCredits

describe("allowRandomCredits", () => {
    it("should generate random credits between 80% and 100% of the initial credits", () => {
        allowRandomCredits();

        const { typeA, typeB, typeC } = randomCredits;
        expect(typeA).toBeGreaterThanOrEqual(creditMax.typeA * 0.8);
        expect(typeA).toBeLessThanOrEqual(creditMax.typeA);
        expect(typeB).toBeGreaterThanOrEqual(creditMax.typeB * 0.8);
        expect(typeB).toBeLessThanOrEqual(creditMax.typeB);
        expect(typeC).toBeGreaterThanOrEqual(creditMax.typeC * 0.8);
        expect(typeC).toBeLessThanOrEqual(creditMax.typeC);
    });
});
