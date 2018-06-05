import Asterisk from './handlers/Asterisk';

/* eslint-disable no-useless-escape */

/**
 * The available patterns. These are as follows:
 *  [name]              [description]
 *  - long_number       ; Matches long, consecutive numbers
 *  - phone_number      ; Matches phone numbers.
 *  - email_address     ; Matches email addresses in many formats.
 *  - url               ; Matches URL patterns
 */

export default class {
  constructor() {
    this.handler = new Asterisk();
    this.matches = [];

    this.list = {};
  }


  /**
   * Add a pattern to the list of filters. This will allow you to enable / disable them.
   *
   * @param {string}                              name
   * @param {{pattern: RegExp, enabled: boolean}} filter
   */
  add(name, filter) {
    if (!filter.handler) {
      filter.handler = this.handler;
    }
    if (filter.enabled === undefined) {
      filter.enabled = true;
    }
    this.list[name] = filter;
  }

  get(name) {
    return this.list[name];
  }

  /**
   * Enable a filter by name.
   *
   * @param   {String}    name
   * @param   {Boolean}   enabled
   * @returns {Censoring}
   */
  toggleFilter(name, enabled) {
    if (typeof this.list[name] === 'undefined') {
      throw new TypeError('Invalid filter supplied.');
    }
    this.list[name].enabled = (enabled === true);
    return this;
  }

  /**
   * Enable multiple filters at once.
   *
   * @param   {Array}     filters
   * @returns {Censoring}
   * @see     Censoring.enableFilter
   */
  toggle(names, enabled) {
    if (names instanceof Array) {
      for (let i = 0; i < names.length; i++) {
        this.toggleFilter(names[i], enabled);
      }
    } else {
      this.toggleFilter(names, enabled);
    }
    return this;
  }

  /**
   * Enable a filters by name.
   *
   * @param   {String}    name
   * @returns {Censoring}
   */
  enable(name) {
    this.toggle(name, true);
    return this;
  }

  disable(name) {
    this.toggle(name, false);
    return this;
  }


  /**
   * Returns matches array or FALSE
   *
   * @returns {Boolean}
   */
  test() {
    return this.matches.length > 0;
  }

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
  }
}
