export const deepEqual = <T>(obj1: T, obj2: T): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const difference = <T extends Record<string, any>>(
  obj1: T,
  obj2: T,
): Partial<T> | -1 => {
  let keyFound: Partial<T> = {};

  Object.keys(obj1).forEach((key) => {
    if (obj1[key] !== obj2[key]) {
      keyFound[key as keyof T] = obj2[key];
    }
  });

  return Object.keys(keyFound).length ? keyFound : -1;
};

export const valuesWithData = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  let keyFound: Partial<T> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof T];

    if (value) {
      if (Array.isArray(value)) {
        keyFound[key as keyof T] = value.map((item: any) =>
          valuesWithData(item),
        ) as any;
      } else {
        keyFound[key as keyof T] = value;
      }
    }
  });

  return keyFound;
};

export const removeKeysFromObject = <T extends Record<string, any>>(
  obj: T,
  keysToRemove: (keyof T)[],
): Partial<T> => {
  let newObj: Partial<T> = { ...obj };

  keysToRemove.forEach((key) => {
    delete newObj[key];
  });

  return newObj;
};
