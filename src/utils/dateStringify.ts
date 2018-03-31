/**
 * Formats a date in ISO 8601 format with the correct time zone offset
 * @param {undefined|Date} date
 * @returns {string}
 */
function formatDate(date?: Date) {
    const dateClone = date ? new Date(date.getTime()) : new Date();

    // subtract the timezone offset
    dateClone.setMinutes(dateClone.getMinutes() - dateClone.getTimezoneOffset());

    const dateStr = dateClone.toISOString();
    return dateStr.replace('Z', formatTZ(dateClone));
}

/**
 * Returns the time zone offset as a string
 * adapted from https://github.com/sindresorhus/time-zone
 * @param {undefined|Date} date
 * @returns {string}
 */
function formatTZ(date?: Date) {
    const offset = (date || new Date()).getTimezoneOffset();
    const absOffset = Math.abs(offset);

    if (absOffset === 0) {
        return 'Z';
    }

    const hours = Math.floor(absOffset / 60);
    const hoursOut = absOffset > 0 ? ('0' + hours).slice(-2) : '';
    const minutes = absOffset % 60;
    const minutesOut = ':' + ('0' + minutes).slice(-2);

    return (offset < 0 ? '+' : '-') + hoursOut + minutesOut;
}

/**
 * Date replacer function
 * @param {*} key object key name
 * @param {*} val value
 */
export function replacer(_key, val): any {
    if (val instanceof Date) {
        return formatDate(val);
    }
    return val;
}
