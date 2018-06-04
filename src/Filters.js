import Asterisk from './handlers/Asterisk';

export default {
  matches: [],
  handler: Asterisk,

  /**
   * The available patterns. These are as follows:
   *  [name]              [description]
   *  - long_number       ; Matches long, consecutive numbers
   *  - phone_number      ; Matches phone numbers.
   *  - email_address     ; Matches email addresses in many formats.
   *  - url               ; Matches URL patterns
   */
  /* eslint-disable no-useless-escape */
  list: {
    long_number: {
      pattern: /\d{8,}/,
      enabled: true,
      handler: this.handler,
    },
    phone_number: {
      pattern: /([+-]?[\d]{1,}[\d\s-]+|\([\d]+\))[-\d.\s]{8,}/gi,
      enabled: true,
      handler: this.handler,
    },
    email_address: {
      pattern: /[\w._%+-]+(@|\[at\]|\(at\))[\w.-]+(\.|\[dot\]|\(dot\)|\(punt\)|\[punt\])[a-zA-Z]{2,4}/gi,
      enabled: true,
      handler: this.handler,
    },
    url: {
      pattern: /((https?:\/{1,2})?([-\w]\.{0,1}){2,}(\.|\[dot\]|\(dot\)|\(punt\)|\[punt\])([a-zA-Z]{2}\.[a-zA-Z]{2,3}|[a-zA-Z]{2,4}).*?(?=$|[^\w\/-]))/gi,
      enabled: true,
      handler: this.handler,
    },
  },

  /**
   * Add a pattern to the list of filters. This will allow you to enable / disable them.
   *
   * @param {string}                              name
   * @param {{pattern: RegExp, enabled: boolean}} filter
   */
  add(name, filter) {
    this.list[name] = filter;
  },

  /**
   * Enable a filter by name.
   *
   * @param   {String}    filter
   * @param   {Boolean}   enabled
   * @returns {Censoring}
   */
  toggleFilter(filter, enabled) {
    if (typeof this.list[filter] === 'undefined') {
      throw new TypeError('Invalid filter supplied.');
    }
    this.list[filter].enabled = (enabled === true);
    return this;
  },

  /**
   * Enable multiple filters at once.
   *
   * @param   {Array}     filters
   * @returns {Censoring}
   * @see     Censoring.enableFilter
   */
  toggleFilters(filters, enabled) {
    if (filters instanceof Array) {
      for (let i = 0; i < filters.length; i++) {
        this.toggleFilter(filters[i], enabled);
      }
    } else {
      this.toggleFilter(filters, enabled);
    }

    return this;
  },

  /**
   * Disable a filter by name.
   *
   * @param   {String}    filter
   * @returns {Censoring}
   */
  enableFilter(filter) {
    this.toggleFilters(filter, true);
    return this;
  },

  disableFilter(filter) {
    this.toggleFilters(filter, false);
    return this;
  },


  /**
   * Returns matches array or FALSE
   *
   * @returns {Boolean}
   */
  test() {
    return this.matches.length ? this.matches : false;
  },

  /* eslint-disable no-restricted-syntax */
  handle(text) {
    let result = text;
    for (const {enabled, pattern, handler} in this.$filters.list) {
      if (enabled && pattern instanceof RegExp) {
        result = text.replace(pattern, handler.replace);
        this.matches.concat(handler.matches);
      }
    }
    return result;
  },
};
