import Censoring from '../../src';
import PurifyRuCensor from '../../src/plugins/PurifyRuCensor';
import NumbersSayCensor from '../../src/plugins/NumbersSayCensor';

describe('PurifyRuCensor', () => {
  let obj;
  beforeEach(() => {
    obj = Object.assign({}, PurifyRuCensor);
  });

  it('match', () => {
    const text = 'Hello хуй world';
    expect(obj.pattern().test(text)).toBe(true);
  });

  it('mix', () => {
    Censoring.use(PurifyRuCensor);
  Censoring.use(NumbersSayCensor);
  obj = new Censoring();
    const text = 'Hello Мой номер плюс ноль ноль ноль ноль ноль ноль ноль ноль ноль ноль ноль ноль пиши world';
    // const text = 'Hello Мой хуй пиши world';
    expect(obj.$filters.isTriggered('say_number')).toBe(false);
    const result = obj.filter(text);
    expect(obj.$filters.isTriggered('say_number')).toBe(true);
    expect(obj.$filters.isTriggered('purify_words')).toBe(false);

    // expect(true).toBe(obj.$filters.triggers);

  });

});
