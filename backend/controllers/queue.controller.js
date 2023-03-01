// The initial queue containing actions listed by their type
let queue = [];

// The credit pool for each type defined by the developer
const creditMax = {
    typeA: 30,
    typeB: 20,
    typeC: 20,
};

let randomCredits;

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

const twoMinutesTimer = () => {
    twoMinutesInterval = setInterval(shiftFromQueue, 2000);
};

const addToQueue = (req, res) => {
    queue.push(req.body.actionType);

    if (!twoMinutesInterval) {
        twoMinutesTimer();
    }
    res.status(200).send("action ajoutée à la queue");
};

let twentyFourHoursInterval = null;

const dayTimer = () => {
    twentyFourHoursInterval = setInterval(allowRandomCredits, 20000);
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

// // The interval function that pops an element from the queue every 2 minutes,
// // also checks if the user has some credits left.
// // If he has credits left, one credit is removed from the randomCredits pool for the corresponding action type
// const twoMinutesInterval = () => {
//     if (queue.length > 0) {
//         switch (queue[0]) {
//             case "A":
//                 if (randomCredits.typeA > 0) randomCredits.typeA--;
//                 break;
//             case "B":
//                 if (randomCredits.typeB > 0) randomCredits.typeB--;
//                 break;
//             case "C":
//                 if (randomCredits.typeC > 0) randomCredits.typeC--;
//                 break;
//         }

//         queue.shift();
//     } else {
//         clearInterval(twoMinutesTimer);
//         twoMinutesTimer = null;
//         console.log("Il n'y a plus d'action en attente");
//     }
// };

// // Launches the timer function when server is starting to check if there are elements still in queue
// let twoMinutesTimer = setInterval(twoMinutesInterval, 2000);

// // Adds an element to the queue from an input in frontend part (a button is clicked)
// exports.addToQueue = (req, res) => {
//     // Adds the element to the queue
//     queue.push(req.body.actionType);

//     // Launches the timer function if the queue is empty and the timer is not running
//     if (twoMinutesTimer === null) {
//         twoMinutesTimer = setInterval(twoMinutesInterval, 2000);
//     }

//     res.send("Action ajoutée à la file d'attente");
// };

// const dayInterval = () => {
//     allowRandomCredits();
// };
// setInterval(dayInterval, 10000);
