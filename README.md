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
npm i str-merge
```

## Usage

### cnx

```js
import { cnx } from "str-merge";

// allows receiving Arrays and Objects
const className = cnx(["", baz, foo !== "foo" && bar], { "": !props }, "");

// ""
cnx(Boolean, Object, undefined, null, "", 0, NaN);


cnx(["foo", 0, false, "bar"])
// "foo bar"

cnx("hello", true && "foo", false && "bar")
// "hello foo"

cnx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]])
// "foo bar baz hello there"

cnx("foo", [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]], "cya")
// "foo bar hello world cya"

```

### cn
```js
import { cn } from "str-merge";

<div
  className={
    cn(
      "bg-black/60 dark:bg-white/60 text-white dark:text-black",
      { "font-extrabold border-0": true }
      )
  }
/>
```

### cvx

```js
import { cvx, twMerge, rem, type VariantsType } from "str-merge";

const classes = cvx({
  assign: "bg-muted rounded-sm px-2 border flex items-center justify-center", // assign values that is definitely returned
  variants: {
    variant: {
      bold: "font-bold",
      italic: "font-italic",
      semibold: "font-semibold",
      light: "font-light",
    },
    color: {
      blue: "text-blue-600",
      green: "text-green-700",
      red: "text-red-500",
      purple: "text-purple-500",
    },
    size: {
      sm: "h-4",
      md: "h-6",
      lg: "h-10",
      xl: "h-14",
    },
  },
  // determine the variance value by default
  defaultVariants: {
    variant: "bold",
    color: "blue",
    size: "lg",
  },
});

type MyVariantsType = VariantsType<typeof classes>;
interface ClnProps extends MyVariantsType {
  unstyled?: boolean;
  className?: string;
}
export function clN(props: ClnProps) {
  const { className, unstyled, ...rest } = props;
  return { className: twMerge(!unstyled && classes({ ...rest }), className) };
}
```
then:
```js
export function CvxDemo(props: ClnProps) {
  const { className, color, size, variant, unstyled } = props;
  return (
    <div className="flex flex-col gap-4">
      <div {...clN(props)} style={{ width: rem(32), height: rem("32px")}}>MY COMPONENT</div>

      <div className={classes()}>MY COMPONENT</div>

      <div className={classes({ color: "red", size: "lg" })}>MY COMPONENT</div>

      <div
        className={twMerge(
          classes({ color: "red", size: "md" }),
          "bg-black/60 dark:bg-white/60 text-white dark:text-black font-extrabold border-0",
        )}
      >
        MY COMPONENT
      </div>
    </div>
  );
}
```

## Link

[Repository](https://github.com/ilkhoeri/str-merge)
[Documentation](https://oeri.vercel.app)

## License

MIT License

[© ilkhoeri](https://github.com/ilkhoeri/str-merge/blob/main/LICENSE)
