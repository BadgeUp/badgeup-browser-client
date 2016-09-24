'use strict';

// Event class to provide a common interface for events rather than using plain 'objects'
// the goal here is not to provide validation or any type checking, just to add getters to things like the modifier
module.exports = class Event {
    constructor(source) {
        this.id = source.id;
        this.subject = source.subject;
        this.key = source.key;
        this.tags = source.tags;
        this.options = source.options;
        this.data = source.data;
        this.modifier = source.modifier;
        this.timestamp = source.timestamp;
    }

    get modifierKey() {
        return Object.keys(this.modifier)[0];
    }

    get modifierValue() {
        return this.modifier[this.modifierKey];
    }

    get discard() {
        if (this.options && this.options.discard === true) {
            return true;
        } else {
            return false;
        }
    }
};
