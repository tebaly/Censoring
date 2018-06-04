export default {
  $filters: null,
  handler: null,
  words: [],

  install(Censor) {
    Censor.prototype.$words = this;
    this.$filters = Censor.$filters;
  },

  add(words) {
    if (words instanceof Array) {
      this.words = this.words.concat(words);
    } else {
      this.words.push(words);
    }
    this.extend();
    return this;
  },

  extend() {
    this.$filters.add('black_list', {
      pattern: new RegExp(this.words.join('|'), 'ig'),
      handler: this.handler || this.$filters.handler,
      enabled: true,
    });
  },
};
