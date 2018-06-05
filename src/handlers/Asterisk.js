export default class {
  constructor(count, char) {
    this.charVariant = char || '*';
    this.charCount = count || 0;
    this.matches = [];

    this.replace = this.replace.bind(this);
  }

  char(char) {
    if (char && typeof char === 'string') {
      this.charVariant = char;
      return this;
    }
    return this.charVariant;
  }

  count(count) {
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
