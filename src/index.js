import Filters from './Filters';
import Plugable from './Pluggable';

function Censoring() {
  this.subject = '';
  this.prepared = '';
  this.$filters = new Filters();
}

Plugable(Censoring);

Censoring.prototype = {
  test() {
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
};

export default Censoring;
