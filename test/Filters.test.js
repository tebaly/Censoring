import Filters from '../src/Filters';
import Placeholder from '../src/handlers/Placeholder';

describe('Filters', () => {
  let obj;
  beforeEach(() => { obj = new Filters(); });

  it('Дефолтный обработчик', () => {
    expect('****').toBe(obj.handler.replace('word'));
  });

  it('Add filter', () => {
    obj.add('word', { pattern: /word/gi });
    expect(true).toBe(obj.list.word.enabled);
  });
  it('Get new filter word', () => {
    obj.add('word', { pattern: /word/gi });
    expect(true).toBe(obj.get('word').enabled);
  });
  it('toggleFilter', () => {
    obj.add('word', { pattern: /word/gi });
    obj.toggleFilter('word', false);
    expect(obj.get('word').enabled).toBe(false);
  });

  it('toggle', () => {
    obj.add('hello', { pattern: /hello/gi });
    obj.add('word', { pattern: /word/gi });
    obj.toggle(['hello', 'word'], false);
    expect(obj.get('hello').enabled).toBe(false);
    expect(obj.get('word').enabled).toBe(false);
  });

  it('handle matches test', () => {
    obj.add('word', {
      pattern: /word/gi,
    });
    const result = obj.handle('Hello word or world');
    expect('Hello **** or world').toBe(result);
    expect(obj.test()).toBe(true);
    expect(obj.matches.length).toBe(1);
  });


  it('change handler', () => {
    obj = new Filters(new Placeholder());
    obj.add('word', {
      pattern: /word/gi,
    });
    const result = obj.handle('Hello word or world');
    expect('Hello [CENSORED-TEXT] or world').toBe(result);
    expect(obj.test()).toBe(true);
    expect(obj.matches.length).toBe(1);
  });
});
