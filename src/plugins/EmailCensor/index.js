// Matches email addresses in many formats.
export default {
  pattern: /[\w._%+-]+(@|\[at\]|\(at\))[\w.-]+(\.|\[dot\]|\(dot\)|\(punt\)|\[punt\])[a-zA-Z]{2,4}/gi,

  install({prototype: {$filters}}) {
    $filters.add('email_address', {pattern: this.pattern});
  },
};
