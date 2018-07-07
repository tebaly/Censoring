import NumbersSayCensor from '../../src/plugins/NumbersSayCensor';

describe('NumbersSayCensor', () => {
  let obj;
  beforeEach(() => {
    obj = Object.assign({}, NumbersSayCensor);
  });

  it('Count', () => {
    expect(obj.count).toBe(5);
  });
  it('match', () => {
    const text = 'Hello семь девять-шесть-шесть ноль world';
    expect(obj.pattern().test(text)).toBe(true);
  });

  it('force count', () => {
    const text = 'Hello семь девять-шесть-шесть ноль00000 world';
    expect(obj.pattern(10).test(text)).toBe(true);
  });

  it('variable count', () => {
    const text = 'Hello девять-шесть-шесть ноль ноль-ноль-ноль ноль world';
    obj.count = 8;
    expect(obj.pattern().test(text)).toBe(true);
  });

  it('regular', () => {
    const text = 'Hello ноль ноль-ноль-ноль ноль world';
    expect(obj.pattern().test(text)).toBe(true);
  });
  it('regularRight', () => {
    const text = 'Hello ноль ноль-ноль-ноль нольworld';
    expect(obj.pattern().test(text)).toBe(true);
  });
  it('regularLeft', () => {
    const text = 'Helloноль ноль-ноль-ноль ноль world';
    expect(obj.pattern().test(text)).toBe(true);
  });
  it('regularBooth', () => {
    const text = 'Helloноль ноль-ноль-ноль нольworld';
    expect(obj.pattern().test(text)).toBe(true);
  });
});
