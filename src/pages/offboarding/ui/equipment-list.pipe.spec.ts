import { EquipmentListPipe } from './equipment-list.pipe';

describe(EquipmentListPipe.name, () => {
  it('create an instance', () => {
    const pipe = new EquipmentListPipe();
    expect(pipe).toBeTruthy();
  });
});
