export default class {
  constructor(count, char) {
    this.charVariant = char || '*';
    this.charCount = count || 0;
    this.matches = [];

    this.replace = this.replace.bind(this);
  }

  set char(char) {
    this.charVariant = char;
    return this;
  }

  get char() {
    return this.charVariant;
  }

  set count(count) {
    if (count && count > 0) {
      this.charCount = count;
      return this;
    }
    return this.charCount;
  }

  replace(match) {
    this.matches.push(match);
    const count = this.charCount || match.length;
    return new Array(count + 1).join(this.charVariant);
  }
}
