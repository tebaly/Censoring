import Filters from './Filters';
import Plugable from './Pluggable';

import EmailCensor from './plugins/EmailCensor';
import UrlCensor from './plugins/UrlCensor';

function Censoring() {
  this.subject = '';
  this.prepared = '';
}

Plugable(Censoring);

Censoring.prototype = {
  $filters: new Filters(),

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


Censoring.use(EmailCensor);
Censoring.use(UrlCensor);

export default Censoring;
