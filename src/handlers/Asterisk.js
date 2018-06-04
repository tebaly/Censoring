export default {
  /**
   * The string to replaces found matches with. Defaults to ***
   *
   * @type {String}
   */
  char: '*',
  count: 0,

  matches: [],

  /**
   * Set the string to replace matches in the filterString() method.
   *
   * @param   {String}    str
   * @returns {Censoring}
   */
  setChar(char) {
    if (typeof str !== 'string') {
      throw new TypeError('Invalid replacementString type supplied. Expected string.');
    }
    this.char = char;
    return this;
  },

  /**
   * @returns {String}
   */
  getChar() {
    return this.char;
  },

  replace(match) {
    this.matches.push(match);
    return ''.padEnd(this.char, this.count || match.lenght);
  },
};
