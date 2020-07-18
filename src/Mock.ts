// https://github.com/eduter/screeps-jest/blob/master/src/mocking.ts
import util from 'util';
import jestMock from 'jest-mock';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends object | undefined
    ? DeepPartial<T[P]>
    : T[P];
} & { [key: string]: any };

export function mockInstanceOf<T extends object>(
  mockedProps: DeepPartial<T> = {},
  allowUndefinedAccess: boolean = false
): T {
  return createMock(mockedProps, allowUndefinedAccess, '');
}

function createMock<T extends object>(
  mockedProps: DeepPartial<T>,
  allowUndefinedAccess: boolean,
  path: string
): T {
  const target: DeepPartial<T> = {};

  Object.entries(mockedProps).forEach(([propName, mockedValue]) => {
    target[propName as keyof T] =
      typeof mockedValue === 'function'
        ? jestMock.fn(mockedValue)
        : Array.isArray(mockedValue)
        ? mockedValue.map((element, index) =>
            createMock(
              element,
              allowUndefinedAccess,
              concatenatePath(path, `${propName}[${index}]`)
            )
          )
        : typeof mockedValue === 'object' && shouldMockObject(mockedValue)
        ? createMock(
            mockedValue,
            allowUndefinedAccess,
            concatenatePath(path, propName)
          )
        : mockedValue;
  });
  return new Proxy<T>(target as T, {
    get(t: T, p: PropertyKey): any {
      if (p in target) {
        return target[p.toString()];
      } else if (!allowUndefinedAccess && !jestInternalStuff.includes(p)) {
        throw new Error(
          `Unexpected access to unmocked property "${concatenatePath(
            path,
            p.toString()
          )}".\n` +
            'Did you forget to mock it?\n' +
            'If you intended for it to be undefined, you can explicitly set it to undefined (recommended) or set "allowUndefinedAccess" argument to true.'
        );
      } else {
        return undefined;
      }
    },
  });
}

function shouldMockObject(value: object) {
  return (
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype &&
    !util.types.isProxy(value)
  );
}

function concatenatePath(parentPath: string, propName: string) {
  return parentPath ? `${parentPath}.${propName}` : propName;
}

const jestInternalStuff: Array<symbol | string | number> = [
  Symbol.iterator,
  Symbol.toStringTag,
  'asymmetricMatch',
  '$$typeof',
  'nodeType',
  '@@__IMMUTABLE_ITERABLE__@@',
  '@@__IMMUTABLE_RECORD__@@',
  '_isMockFunction',
  'mockClear',
];
