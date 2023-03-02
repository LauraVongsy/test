// The initial queue containing actions listed by their type
let queue = [];

// The credit pool for each action type defined by the developer
const creditMax = {
    typeA: 30,
    typeB: 20,
    typeC: 20,
};

let randomCredits;

// Allowing random credit amounts to the action types.
const allowRandomCredits = () => {
    // 3 different randoms to avoid having the same random applied for each type of credit
    const randomFactorA = Math.random() * 0.2 + 0.8;
    const randomFactorB = Math.random() * 0.2 + 0.8;
    const randomFactorC = Math.random() * 0.2 + 0.8;

    // The credits allowed to the user after applying the random factor on each type
    randomCredits = {
        typeA: Math.floor(creditMax.typeA * randomFactorA),
        typeB: Math.floor(creditMax.typeB * randomFactorB),
        typeC: Math.floor(creditMax.typeC * randomFactorC),
    };
};

allowRandomCredits();

let twoMinutesInterval = null;

// shifting actions from the queue and decrementing credits
const shiftFromQueue = () => {
    if (queue.length > 0) {
        switch (queue[0]) {
            case "A":
                if (randomCredits.typeA > 0) randomCredits.typeA--;
                break;
            case "B":
                if (randomCredits.typeB > 0) randomCredits.typeB--;
                break;
            case "C":
                if (randomCredits.typeC > 0) randomCredits.typeC--;
                break;
        }

        queue.shift();
    }

    if (queue.length === 0) {
        clearInterval(twoMinutesInterval);
        twoMinutesInterval = null;
    }
};

// sets the 2 min interval between each action shifts from the queue
const twoMinutesTimer = () => {
    twoMinutesInterval = setInterval(shiftFromQueue, 2 * 60 * 1000);
};

//Adding actions to the queue
const addToQueue = (req, res) => {
    queue.push(req.body.actionType);

    if (!twoMinutesInterval) {
        twoMinutesTimer();
    }
    res.status(200).send("action added to the queue");
};

let twentyFourHoursInterval = null;

//Allowing new random credit to each action type every 24h
const dayTimer = () => {
    twentyFourHoursInterval = setInterval(
        allowRandomCredits,
        24 * 60 * 60 * 1000
    );
};
dayTimer();

module.exports = {
    addToQueue,
    queue,
    shiftFromQueue,
    allowRandomCredits,
    randomCredits,
    creditMax,
    twoMinutesTimer,
    dayTimer,
    twoMinutesInterval,
    twentyFourHoursInterval,
};
