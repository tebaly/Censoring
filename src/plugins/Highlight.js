export default {

  /**
   * The color used for highlighting
   *
   * @type {string}
   */
  highlightColor: 'F2B8B8',

  /**
   * Set the color of the highlighted occurrences in HEX.
   *
   * @param {string} color
   */
  setHighlightColor(color) {
    this.highlightColor = color.replace(/^#/, '');
  },


  install(Censor, options) {
    highlight = highlight || false;
    const self = this;

    const highlightColor = this.highlightColor;

    if (!highlight) {
      return str.replace(pattern, (match) => {
        this.currentMatch.matches.push(match);
        return this.replacementString;
      });
    }
  },

  replace() {
    return str.replace(pattern, (match) => {
      this.currentMatch.matches.push(match);
      return `<span style="background: #${highlightColor};">${match}</span>`;
    });
  },
};
