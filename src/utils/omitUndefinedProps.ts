export function omitUndefinedProps<T extends object | unknown[]>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.reduce((acc: unknown[], value: unknown) => {
      if (value !== undefined) {
        const isObjOrArr = (typeof value === 'object' && value !== null) || Array.isArray(value);
        acc.push(isObjOrArr ? omitUndefinedProps(value) : value);
      }
      return acc;
    }, []) as T;
  }
  return Object.entries(obj).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (value !== undefined) {
      const isObjOrArr = (typeof value === 'object' && value !== null) || Array.isArray(value);
      acc[key] = isObjOrArr ? omitUndefinedProps(value) : value;
    }
    return acc;
  }, {}) as T;
}
