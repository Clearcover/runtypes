import { Reflect } from './index';

const show = (needsParens: boolean) => (refl: Reflect): string => {
  const parenthesize = (s: string) => (needsParens ? `(${s})` : s);

  switch (refl.tag) {
    // Primitive types
    case 'unknown':
    case 'never':
    case 'void':
    case 'boolean':
    case 'number':
    case 'string':
    case 'symbol':
    case 'function':
      return refl.tag;

    // Complex types
    case 'literal': {
      const { value } = refl;
      return typeof value === 'string' ? `"${value}"` : String(value);
    }
    case 'array':
      return `${readonlyTag(refl)}${show(true)(refl.element)}[]`;
    case 'dictionary':
      return `{ [_: ${refl.key}]: ${show(false)(refl.value)} }`;
    case 'record': {
      const keys = Object.keys(refl.fields);
      return keys.length
        ? `{ ${keys
            .map(k => `${readonlyTag(refl)}${k}: ${show(false)(refl.fields[k])};`)
            .join(' ')} }`
        : '{}';
    }
    case 'partial': {
      const keys = Object.keys(refl.fields);
      return keys.length
        ? `{ ${keys.map(k => `${k}?: ${show(false)(refl.fields[k])};`).join(' ')} }`
        : '{}';
    }
    case 'tuple':
      return `[${refl.components.map(show(false)).join(', ')}]`;
    case 'union':
      return parenthesize(`${refl.alternatives.map(show(true)).join(' | ')}`);
    case 'intersect':
      return parenthesize(`${refl.intersectees.map(show(true)).join(' & ')}`);
    case 'constraint':
      return refl.name || show(needsParens)(refl.underlying);
    case 'instanceof':
      const name = (refl.ctor as any).name;
      return `InstanceOf<${name}>`;
    case 'brand':
      return show(needsParens)(refl.entity);
  }
};

export default show(false);

function readonlyTag({ isReadonly }: { isReadonly: boolean }): string {
  return isReadonly ? 'readonly ' : '';
}
