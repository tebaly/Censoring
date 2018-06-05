export default {
  pattern: /[\w._%+-]+(@|\[at\]|\(at\))[\w.-]+(\.|\[dot\]|\(dot\)|\(punt\)|\[punt\])[a-zA-Z]{2,4}/gi,

  install({$filters}) {
    $filters.add('email_address', {pattern: this.pattern});
  },
};
