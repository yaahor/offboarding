import { StatusPipe } from './status.pipe';

describe(StatusPipe.name, () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });
});
