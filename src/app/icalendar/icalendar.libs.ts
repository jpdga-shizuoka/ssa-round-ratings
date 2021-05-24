function padding(n: number, digits = 2): string {
  const str = '0000000000000000' + n.toString();
  return str.slice(-digits);
}

export function dayOfStart(day: Date): string {
  const result: string[] = [];
  result.push(padding(day.getFullYear(), 4));
  result.push(padding(day.getMonth() + 1));
  result.push(padding(day.getDate()));
  return result.join('');
}

export function dayOfEnd(day: Date): string {
  const result: string[] = [];
  result.push(padding(day.getFullYear(), 4));
  result.push(padding(day.getMonth() + 1));
  result.push(padding(day.getDate() + 1));
  return result.join('');
}

export function escape(str: string): string {
  return String(str).replace(/[\\;,"]/g, match => '\\' + match);
}
