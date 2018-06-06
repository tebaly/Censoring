import Censoring from '../dist/Censoring';

describe('buildCensoring', () => {
  let obj;
  beforeEach(() => {
    obj = new Censoring();
  });

  it('subject', () => {
    expect(obj.subject).toBeDefined();
  });

  it('filter', () => {
    const text = 'Hello 12345 world';
    expect(obj.filter(text)).toBe('Hello ***** world');
  });

});
