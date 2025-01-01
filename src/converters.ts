export const rem = createConverter('rem', { shouldScale: true });
export const em = createConverter('em');

export function px(value: unknown): string | number {
  const transformedValue = getTransformedScaledValue(value);
  if (typeof transformedValue === 'number') {
    return transformedValue;
  }
  if (typeof transformedValue === 'string') {
    if (transformedValue.includes('calc') || transformedValue.includes('var')) {
      return transformedValue;
    }
    const unitMap: Record<string, number> = { px: 1, rem: 16, em: 16 };
    const matchedUnit = Object.keys(unitMap).find(unit => transformedValue.includes(unit));
    if (matchedUnit) {
      return parseFloat(transformedValue.replace(matchedUnit, '')) * unitMap[matchedUnit];
    }
    const numericValue = Number(transformedValue);
    return !isNaN(numericValue) ? numericValue : NaN;
  }
  return NaN;
}

export function createConverter(units: string, { shouldScale = false } = {}) {
  const convertSingleValue = (value: string | number): string => {
    if (typeof value === 'number') {
      const result = `${value / 16}${units}`;
      return shouldScale ? scaleRem(result) : result;
    }
    const replaced = value.replace('px', '');
    if (!isNaN(Number(replaced))) {
      const result = `${Number(replaced) / 16}${units}`;
      return shouldScale ? scaleRem(result) : result;
    }
    return value;
  };

  function converter(value: unknown): string {
    if (value === 0 || value === '0') {
      return `0${units}`;
    }
    if (typeof value === 'string') {
      if (value === '' || value.startsWith('calc(') || value.startsWith('clamp(') || value.includes('rgba(')) {
        return value;
      }
      const delimiters = [',', ' '];
      for (const delimiter of delimiters) {
        if (value.includes(delimiter)) {
          return value
            .split(delimiter)
            .map(val => convertSingleValue(val.trim()))
            .join(delimiter);
        }
      }
      return convertSingleValue(value);
    }
    if (Array.isArray(value)) {
      return value.map(val => converter(val)).join(' ');
    }
    return `${value}`;
  }
  return converter;
}

function scaleRem(value: string): string {
  if (value === '0rem') {
    return '0rem';
  }
  return value;
}
function getTransformedScaledValue(value: unknown) {
  if (typeof value !== 'string') {
    return value;
  }
  const calcMatch = value.match(/^calc\((.*?)\)$/);
  if (calcMatch) {
    return calcMatch[1].split('*')[0]?.trim() ?? value;
  }
  return value;
}
