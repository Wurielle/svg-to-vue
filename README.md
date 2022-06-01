# SVG to Vue
Generate Vue components for your SVG icons.

## Install
```bash
npm config set @wurielle:registry https://npm.pkg.github.com && npm install @wurielle/svg-to-vue
```
## Usage

> STV will try to handle the case type of your SVG files so if you have a SVG file named `arrow_right.svg`, `arrowRight.svg` or `arrow-right.svg` it will create a component named `ArrowRight.vue` accordingly.

Use the `stv` command to generate components from a folder containing SVG icons:

```bash
stv ./path/to/svg/folder --output=./src/components/icons --prepend=my --append=icon --ts
```

Which will output:

`./src/components/icons/MyHeartIcon.vue`
```vue
<template>
<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z" stroke="currentColor" stroke-linejoin="round"/>
</svg>
</template>
<script lang="ts">export default { name: 'my-heart-icon' }</script>
```

## Arguments
| Argument  | Default                           | Description                                            |
|-----------|:----------------------------------|--------------------------------------------------------|
| 0         | ""                                | Target folder containing SVG files                     |
| --output  | "./path/to/svg/folder/components" | Output folder that will contain Vue components         |
| --prepend | ""                                | String to prepend the component's name with            |
| --append  | ""                                | String to append the component's name with             |
| --ts      | false                             | Add property `lang="ts"` to the component's script tag |
