import Censoring from '../src';
import Placeholder from '../src/handlers/Placeholder';

describe('Censoring', () => {
  let obj;
  beforeEach(() => {
    obj = new Censoring();
  });

  it('first', () => {
    expect(obj.subject).toBeDefined();
  });

  it('pluggable', () => {
    obj = Censoring;
    expect(obj.use).toBeDefined();
    // expect(obj.use).toBe(1);
  });

  it('default filter count', () => {
    // Object.keys(obj.$filters.list).length;
    expect(Object.keys(obj.$filters.list).length).toBe(4);
  });

  it('first', () => {
    const result = obj.filter('Hello support@gmail.com world');
          expect(result).toBe('Hello ***************** world');
  });

  it('reset filter', () => {
    obj = new Censoring();
    obj.$filters.setHandlers(new Placeholder);
    const result = obj.filter('Hello support@gmail.com world');
    expect(result).toBe('Hello [CENSORED-TEXT] world');
  });
});
