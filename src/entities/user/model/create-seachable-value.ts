export function createSearchableValue(...values: string[]): string {
  return values.map(value => value.toLocaleLowerCase()).join(' ');
}
