// Matches phone numbers.
export default {
  wrap: text => `[\\wа-яё]{0,7}${text}[\\wа-яё]{0,7}`,
  words: [
    '[хx]([хx\s\W]{0,6})[уy]([уy\s\W]{0,6})[ёiлeеюийя]',
    '[пp]([пp\s\W]{0,6})[iие]([iие\s\W]{0,6})[3зс]([3зс\s\W]{0,6})[дd]',
    '[сcs][уy]([уy\s\W]{0,6})[4чkк]',
    '[bб]([bб\s\W]{0,6})[lл]([lл\s\W]{0,6})[yя]',
    '[её][bб][лске@eыиаa][наи@йвл]',
    '[еe]([еe\s\W]{0,6})[бb]([бb\s\W]{0,6})[uу]([uу\s\W]{0,6})[н4ч]',
    '[еeё]([еeё\s\W]{0,6})[бb]([бb\s\W]{0,6})[нn]([нn\s\W]{0,6})[уy]',
    '[еe]([еe\s\W]{0,6})[бb]([бb\s\W]{0,6})[оoаa@]([оoаa\s\W]{0,6})[тnнt]',
    '[ё]([ё\s\W]{0,6})[б]',
    'ш[ш\s\W]{0,6}л{1,}ю{1,}[хш]',
  ],

  pattern() {
    let result = '';
    for (var i = 0; i < this.words.length; i++) {
      result += i ? '|' : '';
      result += this.wrap(this.words[i]);
    }
    return new RegExp(`${result}`, 'gi');
  },

  install({prototype: {$filters}}) {
    $filters.add('purify_words', {pattern: this.pattern()});
  },
};
