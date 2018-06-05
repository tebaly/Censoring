import Pluggable from '../src/Pluggable';

describe('Pluggable', () => {
  let obj;
  beforeEach(() => {
    obj = {
      name: 'some',
    };
    Pluggable(obj);
  });

  it('empty', () => {
    expect('some').toBe(obj.name);
    expect(undefined).toBe(obj.plugins);
  });

  it('add plugins', () => {
    obj.use({
      prop: 'other',
    });
    expect(1).toBe(obj.plugins.length);
  });
});
