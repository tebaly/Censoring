export default {

  map1337: {
    o: '0',
    g: '9',
    b: ['8', '6'],
    t: '7',
    s: '5',
    a: '4',
    e: '3',
    z: '2',
    i: '1',
    l: '1',
  },


  /**
   * Add a word to filter out.
   *
   * @param   {String}    word
   * @returns {Censoring}
   */
  addWord(word) {
    let pattern = '';
    const any = '[^a-z0-9]?';
    let last = false;
    let character;

    for (let i = 0; i < word.length; i++) {
      last = i === (word.length - 1);
      character = word.charAt(i);
      if (typeof this.map1337[character] === 'undefined') {
        pattern += (character + (!last ? any : ''));
        continue;
      }

      if (typeof this.map1337[character] === 'string') {
        pattern += (`((${character}|${this.map1337[character]})${!last ? any : ''})`);
        continue;
      }
      pattern += `((${character}`;

      for (let m = 0; m < this.map1337[character].length; m++) {
        pattern += `|${this.map1337[character][m]}`;
      }
      pattern += `)${!last ? any : ''})`;
    }
    this.list.words.pattern.push(new RegExp(pattern, 'ig'));
    return this;
  },

};
