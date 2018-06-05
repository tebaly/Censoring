import Asterisk from '../../src/handlers/Asterisk';

describe('Длина строки ', () => {
  let obj;
  beforeEach(() => { obj = new Asterisk(); });

  it('Дефолтное значение', () => {
    obj.count = 3;
    expect('***').toBe(obj.replace('word'));
  });
  it('Равно длине строки', () => {
    expect('****').toBe(obj.replace('word'));
  });
  it('Сохранение', () => {
    obj.replace('hello');
    obj.replace('word');
    expect(2).toBe(obj.matches.length);
    expect(obj.matches[1]).toBe('word');
  });
  it('Символ', () => {
    obj.char = '+';
    expect('++++').toBe(obj.replace('word'));
  });

  it('Конструктор', () => {
    obj = new Asterisk(3, '+');
    expect('+++').toBe(obj.replace('word'));
  });
});
