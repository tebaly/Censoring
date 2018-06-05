export default {
  install(Censoring) {
    Censoring.prototype.$filters.add('url_link', {
      pattern: /((https?:\/{1,2})?([-\w]\.{0,1}){2,}(\.|\[dot\]|\(dot\)|\(punt\)|\[punt\])([a-zA-Z]{2}\.[a-zA-Z]{2,3}|[a-zA-Z]{2,4}).*?(?=$|[^\w\/-]))/gi,
    });
  },
};
