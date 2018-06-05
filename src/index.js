import Instance from './Instance';
import Filters from './Filters';
import Plugable from './Pluggable';

import NumbersCensor from './plugins/NumbersCensor';
import PhoneCensor from './plugins/PhoneCensor';
import EmailCensor from './plugins/EmailCensor';
import UrlCensor from './plugins/UrlCensor';

function Censoring() {
  this.subject = '';
  this.prepared = '';
}

Censoring.$filters = new Filters();

Plugable(Censoring);

Censoring.prototype = Instance;

Censoring.use(NumbersCensor);
Censoring.use(PhoneCensor);
Censoring.use(EmailCensor);
Censoring.use(UrlCensor);

export default Censoring;
