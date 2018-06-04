import Filters from './Filters';

export default {
  $filters: Filters,

  _plugins: [],

  subject: '',
  prepared: '',

  matched() {
    return this.prepared && this.prepared !== this.subject;
  },

  /**
   * Get the filtered text.
   *
   * @returns {String}
   */
  result() {
    return this.prepared;
  },

  /**
   * Filter the string.
   *
   * @param   {String} text
   * @returns {String}
   */
  filter(text) {
    if (typeof text !== 'string') {
      throw new TypeError('Invalid "text" type supplied in filter. Expected string.');
    }
    this.subject = text;
    this.prepared = this.$filters.handle(text);
    return this.prepared;
  },

  use(plugin, ...args) {
    if (this.plugins.indexOf(plugin) > -1) {
      return this;
    }
    // additional parameters
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install(...args);
    } else if (typeof plugin === 'function') {
      plugin(...args);
    }
    this.plugins.push(plugin);
    return this;
  },
};
