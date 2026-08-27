const isEven = require("./modules/isEven");
const logMessage = require("./modules/logger");

logMessage("Application started");

const numbers = [4, 7, 10, 13, 22];

numbers.forEach((num) => {
    if (isEven(num)) {
        logMessage(`${num} is Even`);
    } else {
        logMessage(`${num} is Odd`);
    }
});

logMessage("Application finished");