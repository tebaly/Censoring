import Filters from './Filters';
import Plugable from './Pluggable';

import NumbersCensor from './plugins/NumbersCensor';
import PhoneCensor from './plugins/PhoneCensor';
import EmailCensor from './plugins/EmailCensor';
import UrlCensor from './plugins/UrlCensor';

function Censoring(handler, filters) {
  if (handler) {
    this.$filters.setHandlers(handler);
  } else if (filters) {
    this.$filters = filters;
  }
  this.subject = '';
  this.prepared = '';
}

// Censoring.$filters = new Filters();

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

Censoring.use(NumbersCensor);
Censoring.use(PhoneCensor);
Censoring.use(EmailCensor);
Censoring.use(UrlCensor);

export default Censoring;
