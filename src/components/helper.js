import _get from "lodash/get";

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