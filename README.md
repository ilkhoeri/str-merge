# str-merge

String utilities and conflict conditionals (includes tailwind-merge).

<div align="left">
  <a href="https://www.npmjs.com/package/str-merge">
    <img src="https://badgen.net/npm/v/str-merge" alt="version" />
  </a>
</div>

## Installation

using [bun](https://bun.sh/)

```cirru
bun add str-merge
```

using [pnpm](https://pnpm.io/)

```cirru
pnpm add str-merge
```

using [npm](https://www.npmjs.com/package/str-merge)

```cirru
npm install str-merge
```

using [yarn](https://classic.yarnpkg.com/en/package/str-merge)

```cirru
yarn add str-merge
```

## Usage

### cnx

cnx is inspired by [clsx](https://www.npmjs.com/package/clsx), the arguments you give in cn or clsx you can put into cnx, so that you can think of cnx as clsx from another universe.

```tsx
function cnx(...inputs: ClassValue[]): string;
```

```tsx
// allows receiving Arrays and Objects
const className = cnx(['', baz, foo !== 'foo' && bar], { '': !props }, '');

// ""
cnx(Boolean, Object, undefined, null, '', 0, NaN);
```

```tsx
cnx(['foo', 0, false, 'bar']);
// "foo bar"

cnx('hello', true && 'foo', false && 'bar');
// "hello foo"

cnx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
// "foo bar baz hello there"

cnx('foo', [1 && 'bar', { baz: false, bat: null }, ['hello', ['world']]], 'cya');
// "foo bar hello world cya"
```

#### Merge class

Merge with tailwind-merge

```tsx
import { cnx, type ClassValue } from 'str-merge';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(cnx(...inputs));
}
```

### merge or cn

```js
import { merge } from 'str-merge';

<div className={merge('bg-black/60 dark:bg-white/60 text-white dark:text-black', { 'font-extrabold border-0': true })} />;
```

#### IntelliSense

If you are using the vscode editor, enable autocomplete for the [`tailwindcss`](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code) class using the following command:

1. Install the [`Tailwind CSS IntelliSense`](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) Visual Studio Code extension
2. Add to your [`settings.json`](https://code.visualstudio.com/docs/getstarted/settings):

```json
"tailwindCSS.experimental.classRegex": [
  ["cnx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
  ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
  ["merge\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
],
```

3. Add config to your [.eslintrc.json](https://eslint.org/docs/latest/use/configure/) to [eslint-plugin-tailwindcss](https://www.npmjs.com/package/eslint-plugin-tailwindcss) configuration

```json
{
  "extends": ["prettier", "plugin:tailwindcss/recommended"],
  "plugins": ["tailwindcss"],
  "ignorePatterns": [],
  "rules": {},
  "settings": {
    "tailwindcss": {
      "callees": ["cn", "merge", "twMerge"],
      "config": "tailwind.config.ts"
    }
  },
  "overrides": []
}
```

### cvx

If you have ever used [`class variance authority`](https://cva.style/docs) you'r also familiar with the cvx function. You can think of cvx as a simpler or lite version.

cvx was created just as a simple function to pass a string with various variants that you create.

```tsx
import { cvx, twMerge, rem, type cvxVariant } from 'str-merge';

const classes = cvx({
  // assign values that is definitely returned
  assign: 'bg-muted rounded-sm px-2 border flex items-center justify-center',
  variants: {
    variant: {
      bold: 'font-bold',
      italic: 'font-italic',
      semibold: 'font-semibold',
      light: 'font-light'
    },
    color: {
      blue: 'text-blue-600',
      green: 'text-green-700',
      red: 'text-red-500',
      purple: 'text-purple-500'
    },
    size: {
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-10',
      xl: 'h-14'
    }
  },
  // determine the variance value by default
  defaultVariants: {
    variant: 'bold',
    color: 'blue',
    size: 'lg'
  }
});

type MyVariantsType = cvxVariant<typeof classes>;
interface ClnProps extends MyVariantsType {
  unstyled?: boolean;
  className?: string;
}
export function clN(props: ClnProps) {
  const { className, unstyled, ...rest } = props;
  return { className: twMerge(!unstyled && classes({ ...rest }), className) };
}

export function CvxDemo(props: ClnProps) {
  const { className, color, size, variant, unstyled } = props;
  return (
    <div className="flex flex-col gap-4">
      <div {...clN(props)} style={{ width: rem(32), height: rem('32px') }}>
        COMPONENT
      </div>

      <div className={classes()}>COMPONENT</div>

      <div className={classes({ color: 'red', size: 'lg' })}>COMPONENT</div>

      <div className={twMerge(classes({ color: 'red', size: 'md' }), 'bg-black/60 dark:bg-white/60 text-white dark:text-black font-extrabold border-0')}>
        COMPONENT
      </div>
    </div>
  );
}
```

#### IntelliSense

If you are using the vscode editor, enable autocomplete for the [`tailwindcss`](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code) class using the following command:

1. Install the [`Tailwind CSS IntelliSense`](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) Visual Studio Code extension
2. Add to your [`settings.json`](https://code.visualstudio.com/docs/getstarted/settings):

```json
"tailwindCSS.experimental.classRegex": [
  ["cvx\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
  ["cvx\\(([^)]*)\\)", "(?:'|\"|`)([^'\"`]*)(?:'|\"|`)"],
  ["assign:\\s*['\"`]([^'\"`]*?)['\"`]", "(?:'|\"|`)([^'\"`\\]]*|\\[[^\\]]+\\])(?:'|\"|`)"],
  ["assign:\\s*['\"`]([^'\"`]*?)['\"`]", "(?:^|\\s+)([\\w-:\\[\\].()#\\/%]+)(?=\\s+|$)"],
  ["variants:\\s*\\{([^}]*?)\\}", "(?:'|\"|`)([^'\"`\\]]*|\\[[^\\]]+\\])(?:'|\"|`)"],
  ["variants:\\s*\\{[^}]*?['\"`\\w]+:\\s*['\"`]([^'\"`]*)['\"`]", "(?:^|\\s+)([\\w-:\\[\\].()#\\/%]+)(?=\\s+|$)"],
],
```

cva uses the first argument as a constant that will be distributed throughout the variance, in cvx this argument is moved to the `assign` parameter. cvx does not or has not passed the `class` and `className` parameters.

## Links

[Repository](https://github.com/ilkhoeri/str-merge)
[Documentation](https://oeri.vercel.app)

## License

MIT License

[© ilkhoeri](https://github.com/ilkhoeri/str-merge/blob/main/LICENSE)
