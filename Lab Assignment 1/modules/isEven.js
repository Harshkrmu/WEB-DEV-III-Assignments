function isEven(number) {
    if (typeof number !== "number") {
        throw new Error("Please provide a valid number");
    }
    return number % 2 === 0;
}

module.exports = isEven;