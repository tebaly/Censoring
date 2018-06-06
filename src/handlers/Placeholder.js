export default class {
  constructor(text) {
    this.matches = [];
    this.placeholder = text || '[CENSORED-TEXT]';

    this.replace = this.replace.bind(this);
  }

  set text(text) {
    this.placeholder = text;
    return this;
  }

  get text() {
    return this.placeholder;
  }

  replace(match) {
    this.matches.push(match);
    return this.text;
  }
}
