export default {
  install(Censoring) {
    Censoring.prototype.$filters.add('email_address', {
      pattern: /[\w._%+-]+(@|\[at\]|\(at\))[\w.-]+(\.|\[dot\]|\(dot\)|\(punt\)|\[punt\])[a-zA-Z]{2,4}/gi,
    });
  },
};
