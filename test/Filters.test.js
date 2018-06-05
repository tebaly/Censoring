import Filters from '../src/Filters';

describe('Filters', () => {
  let obj;
  beforeEach(() => { obj = new Filters(); });

  it('Дефолтный обработчик', () => {
    expect('****').toBe(obj.handler.replace('word'));
  });
  it('Дефолтный filter enable', () => {
    expect(true).toBe(obj.list.url.enabled);
  });
  it('Дефолтный filter disabled', () => {
    obj.disable('url');
    expect(false).toBe(obj.list.url.enabled);
  });


  it('Add filter', () => {
    obj.add('word', {
      pattern: /word/gi,
    });
    expect(true).toBe(obj.list.word.enabled);
  });
  it('Get new filter word', () => {
    obj.add('word', {
      pattern: /word/gi,
    });
    expect(true).toBe(obj.get('word').enabled);
  });
  it('toggleFilter', () => {
    obj.toggleFilter('url', false);
    expect(false).toBe(obj.get('url').enabled);
  });

  it('toggle', () => {
    obj.toggle(['url', 'phone_number'], false);
    expect(false).toBe(obj.get('phone_number').enabled);
    expect(true).toBe(obj.get('long_number').enabled);
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
