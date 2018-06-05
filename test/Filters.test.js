import Filters from '../src/Filters';

describe('Filters', () => {
  let obj;
  beforeEach(() => { obj = new Filters(); });

  it('Дефолтный обработчик', () => {
    expect('****').toBe(obj.handler.replace('word'));
  });
  // xit('Дефолтный filter enable', () => {
  //   expect(true).toBe(obj.list.url.enabled);
  // });
  // xit('Дефолтный filter disabled', () => {
  //   obj.disable('url');
  //   expect(false).toBe(obj.list.url.enabled);
  // });


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
    expect(true).toBe(obj.test());
    expect(1).toBe(obj.matches.length);
  });
});
