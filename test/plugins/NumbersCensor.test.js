import NumbersCensor from '../../src/plugins/NumbersCensor';

describe('Filters', () => {
  it('Count', () => {
    expect(NumbersCensor.count).toBe(5);
  });
  it('match', () => {
    const text = 'Hello 55555 world';
    expect(NumbersCensor.pattern().test(text)).toBe(true);
  });

  it('force count', () => {
    const text = 'Hello 0000000000 world';
    expect(NumbersCensor.pattern(10).test(text)).toBe(true);
  });
});

describe('Filters', () => {
  it('variable count', () => {
    const text = 'Hello 88888888 world';
    NumbersCensor.count = 8;
    expect(NumbersCensor.pattern().test(text)).toBe(true);
  });
});
