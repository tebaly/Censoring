// Matches phone numbers.
export default {
  pattern: /([+-]?[\d]{1,}?[\d\s-]+?|\([\d]+?\))[()-\d.\s]{4,}\d/gi,

  install({prototype: {$filters}}) {
    $filters.add('phone_number', {pattern: this.pattern});
  },
};
