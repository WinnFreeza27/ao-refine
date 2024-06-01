import { useRef } from 'react';
import { isEqual } from 'lodash';

export const useDeepMemoized = (value) => {
  const ref = useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
