export default {
  count: 5,

  pattern(count) {
    const num = count || this.count;
    return new RegExp(`\\d{${num},}`);
  },

  install({$filters}) {
    $filters.add('long_number', {pattern: this.pattern()});
  },
};
