module.exports = function calculateCost(start, end, price, cuantity) {
    const initialDay = new Date(start)
    const finalDay = new Date(end)
    const days = Math.floor((finalDay - initialDay) / (1000 * 60 * 60 * 24));

    const result = (price * days) * cuantity
    return result
}