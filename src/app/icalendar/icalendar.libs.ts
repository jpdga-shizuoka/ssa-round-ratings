
export function date2string(date: Date): string {
  const iso = date.toISOString().replace(/[\-:.]/g, '');
  return iso.replace(/\d{3}Z$/, 'Z');
}

export function escape(str: string): string {
  return String(str).replace(/[\\;,"]/g,  match => '\\' + match);
}
