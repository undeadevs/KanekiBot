/**
 * @param {Number} number
 */
module.exports = (number) => {
    if(isNaN(number)) return 0;
    return Number.parseFloat(number).toLocaleString(undefined, {maximumFractionDigits: 2})
}