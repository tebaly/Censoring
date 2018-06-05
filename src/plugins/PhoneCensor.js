export default {
  pattern: /([+-]?[\d]{1,}[\d\s-]+|\([\d]+\))[-\d.\s]{8,}/gi,

  install({$filters}) {
    $filters.add('phone_number', {pattern: this.pattern});
  },
};
