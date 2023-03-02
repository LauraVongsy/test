const {
    addToQueue,
    queue,
    shiftFromQueue,
    randomCredits,
} = require("../controllers/queue.controller");

let {
    twoMinutesInterval,
    twentyFourHoursInterval,
} = require("../controllers/queue.controller");

//Using fake timers to test faster than with the 2mins and 24h timers
jest.useFakeTimers();

describe("Adding items to queue", () => {
    afterEach(() => {
        clearInterval(twoMinutesInterval);
        clearInterval(twentyFourHoursInterval);
    });
    //clearing intervals after testing so that jest can exit the test.
    it("should add an item to the queue", () => {
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        addToQueue({ body: { actionType: "A" } }, res);
        expect(queue.length).toBe(1);
        expect(queue).toEqual(["A"]);
    });
    it("should add another item to the queue", () => {
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        addToQueue({ body: { actionType: "B" } }, res);
        expect(queue.length).toBe(2);
        expect(queue).toEqual(["A", "B"]);
    });
});

describe("Removing items from queue", () => {
    it("should decrement credits of the first action in queue and remove it from queue", () => {
        const initialRandomTypeA = randomCredits.typeA;
        shiftFromQueue();

        expect(queue.length).toBe(1);
        expect(queue[0]).toBe("B");
        expect(randomCredits.typeA).toBe(initialRandomTypeA - 1);
    });

    it("should not decrement credits and remove action from queue if user has no more credits", () => {
        randomCredits.typeB = 0;
        shiftFromQueue();

        expect(randomCredits.typeB).toBe(0);
        expect(queue.length).toBe(0);
    });
});
