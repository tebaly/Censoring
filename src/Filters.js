import Asterisk from './handlers/Asterisk';

function Filters(handler) {
  this.handler = handler || new Asterisk();
  this.matches = [];
  this.list = {};
}

Filters.prototype = {
  setHandlers(handler) {
    for (const name of Object.keys(this.list)) {
      this.list[name].handler = handler;
    }
  },

  add(name, filter) {
    if (!filter.handler) {
      filter.handler = this.handler;
    }
    if (filter.enabled === undefined) {
      filter.enabled = true;
    }
    this.list[name] = filter;
  },

  get(name) {
    return this.list[name];
  },

  toggleFilter(name, enabled) {
    if (typeof this.list[name] === 'undefined') {
      throw new TypeError('Invalid filter supplied.');
    }
    this.list[name].enabled = (enabled === true);
    return this;
  },

  toggle(names, enabled) {
    if (names instanceof Array) {
      for (let i = 0; i < names.length; i++) {
        this.toggleFilter(names[i], enabled);
      }
    } else {
      this.toggleFilter(names, enabled);
    }
    return this;
  },

  enable(name) {
    this.toggle(name, true);
    return this;
  },

  disable(name) {
    this.toggle(name, false);
    return this;
  },

  test() {
    return this.matches.length > 0;
  },

  /* eslint-disable no-restricted-syntax */
  handle(text) {
    let result = text;
    const filters = Object.values(this.list);
    for (const {enabled, pattern, handler} of filters) {
      if (enabled && pattern instanceof RegExp) {
        result = result.replace(pattern, handler.replace);
        this.matches = this.matches.concat(handler.matches);
      }
    }
    return result;
  },
}

export default Filters;
