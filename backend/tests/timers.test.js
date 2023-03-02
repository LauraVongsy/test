const { addToQueue, queue } = require("../controllers/queue.controller");
let {
    randomCredits,
    twoMinutesInterval,
    twentyFourHoursInterval,
} = require("../controllers/queue.controller");

jest.useFakeTimers();
jest.spyOn(global, "setInterval");

describe("Two minutes timer function", () => {
    afterEach(() => {
        clearInterval(twoMinutesInterval);
        clearInterval(twentyFourHoursInterval);
    });
    it("Two minutes timer runs before deleting item from queue", () => {
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        addToQueue({ body: { actionType: "A" } }, res);

        jest.advanceTimersByTime(1.5 * 60 * 1000);
        expect(queue.length).toBe(1);
        //Action A is pushed to the queue and queue.length=1
        jest.advanceTimersByTime(0.5 * 60 * 1000);
        expect(queue.length).toBe(0);
        // after 2 mins A has been shifted and queue.length=0
    });
});

describe("Twenty four hours timer function", () => {
    afterEach(() => {
        clearInterval(twoMinutesInterval);
        clearInterval(twentyFourHoursInterval);
    });
    it("should generate new random credits every twenty four hours", () => {
        // Stores the initially generated randomCredits
        const previousRandomCredits = randomCredits;
        // Checks if twentyFourHoursInterval is running & has been called
        expect(twentyFourHoursInterval).not.toBe(null);
        expect(setInterval).toHaveBeenCalledTimes(1);
        // Advance time
        jest.advanceTimersByTime(24 * 60 * 60 * 1000);
        // Require newly generated randomCredits for comparison
        randomCredits = require("../controllers/queue.controller");
        const nextRandomCredits = randomCredits;
        expect(previousRandomCredits).not.toBe(nextRandomCredits);
    });
});
