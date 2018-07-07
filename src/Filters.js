import Asterisk from './handlers/Asterisk';

function Filters(handler) {
  this.handler = handler || new Asterisk();
  this.list = {};
  this.matches = [];
  this.triggers = [];
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

  trigger(name, matches) {
    if (matches.length) {
      this.matches = this.matches.concat(matches);
      this.triggers.push(name);
    }
  },

  isTriggered(name) {
    return this.triggers.indexOf(name) >= 0;
  },

  resetState() {
    this.matches = [];
    this.triggers = [];
  },

  handle(text) {
    let result = text;
    this.resetState();
    for (let name in this.list) {
      let {enabled, pattern, handler} = this.list[name];
      if (enabled && pattern instanceof RegExp) {
        handler.matches = [];
        result = result.replace(pattern, handler.replace);
        this.trigger(name, handler.matches);
      }
    }
    return result;
  },
}

export default Filters;
