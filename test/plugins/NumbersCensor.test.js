import NumbersCensor from '../../src/plugins/NumbersCensor';

describe('Filters', () => {
  let obj;
  beforeEach(() => {
    obj = Object.assign({}, NumbersCensor);
  });

  it('Count', () => {
    expect(obj.count).toBe(5);
  });
  it('match', () => {
    const text = 'Hello 55555 world';
    expect(obj.pattern().test(text)).toBe(true);
  });

  it('force count', () => {
    const text = 'Hello 0000000000 world';
    expect(obj.pattern(10).test(text)).toBe(true);
  });

  it('variable count', () => {
    const text = 'Hello 88888888 world';
    obj.count = 8;
    expect(obj.pattern().test(text)).toBe(true);
  });

  it('regular', () => {
    const text = 'Hello 12345 world';
    expect(obj.pattern().test(text)).toBe(true);
  });
  it('regularRight', () => {
    const text = 'Hello 12345world';
    expect(obj.pattern().test(text)).toBe(true);
  });
  it('regularLeft', () => {
    const text = 'Hello12345 world';
    expect(obj.pattern().test(text)).toBe(true);
  });
  it('regularBooth', () => {
    const text = 'Hello12345world';
    expect(obj.pattern().test(text)).toBe(true);
  });
});
