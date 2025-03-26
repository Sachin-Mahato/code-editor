export const pipe = <T>(...fns: Array<(arg: T) => T>) => (initialValues: T): T =>
  fns.reduce((acc, fn) => fn(acc), initialValues);

export const compose = <T>(...fns: Array<(args: T) => T>) => (initialValues: T): T =>
  fns.reduceRight((acc, fn) => fn(acc), initialValues);
