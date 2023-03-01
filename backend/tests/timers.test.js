const {
    addToQueue,
    queue,
    allowRandomCredits,
} = require("../controllers/queue.controller");
let {
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

        jest.advanceTimersByTime(1500);
        expect(queue.length).toBe(1);
        jest.advanceTimersByTime(500);
        expect(queue.length).toBe(0);
    });
});

describe("Twenty four hours timer function", () => {
    afterEach(() => {
        clearInterval(twoMinutesInterval);
        clearInterval(twentyFourHoursInterval);
    });
    it("should generate new random credits every twenty four hours", () => {
        expect(setInterval).toHaveBeenCalledTimes(1);
    });
});
