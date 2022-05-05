import _get from "lodash/get";
import { useState, useEffect } from "react";

export function lookup(lookup, currentValue) {
  let value = 0;
  for (let i = 0; i < lookup.length - 2; i = i + 2) {
    if ((currentValue >= lookup[i]) && (currentValue <= lookup[i + 2])) {
      value = lookup[i + 1] - ((lookup[i + 1] - lookup[i + 3]) * ((currentValue - lookup[i]) / (lookup[i + 2] - lookup[i])));
      break;
    }
  }
  return value;
}

export function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function ID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export function joinPropsString(user, props = [], separator = ",") {
  return props.reduce((pv, cv) => {
    const c = _get(user, cv);
    if (!c) return pv;
    return [...pv, c];
  }, []).join(separator);
}

export function abbreviedName(value) {
  let result = value.split(" ");
  return result.reduce(function (p, c, i) {
    let v = c;
    if (i > 0 && i < result.length - 1) {
      v = `${c[0]}.`;
    }
    return `${p} ${v}`;
  }, "");
}

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export const checkUserRole = (user) => {
  let role = "admin";
  if (user["lecturer_id"] !== null) {
    role = "lecturer";
  }
  if (user["student_id"] !== null) {
    role = "student";
  }
  if (user["registration_id"] !== null) {
    role = "registration";
  }
  return role;
}

// https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render/53837442#53837442
export function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}