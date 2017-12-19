'use strict';

const mapObj = require('map-obj');

/**
 * Formats a date in ISO 8601 format with the correct time zone offset
 * @param {undefined|Date} date
 * @returns {string}
 */
function formatDate(date) {
    const dateStr = (date || new Date()).toISOString();
    return dateStr.replace('Z', formatTZ(date));
}

/**
 * Returns the time zone offset as a string
 * adapted from https://github.com/sindresorhus/time-zone
 * @param {undefined|Date} date
 * @returns {string}
 */
function formatTZ(date) {
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
 * @param {*} name object key name
 * @param {*} val value
 */
function replacer(name, val) {
    let v = val;
    if (val instanceof Date) {
        v = formatDate(val);
    }
    return [name, v];
}

/**
 * Date stringify function
 * @param {*} value
 */
function dateStringify(value) {
    return mapObj(value, replacer, { deep: true });
}

module.exports = dateStringify;
