
# Running the Code

## Using npm
Install Node dependencies and run the full build:

```
npm install
npm start
```

## Building
```
npm run build
npm run preview
```

# How the code is transpiled
1. `npm` will use `vite` (which is configured in vite.config.mjs and uses the Elm plugin)
2. `vite` looks at `/index.html`, which runs `/src/main.js`
3. `/src/main.js` pulls in `./Main.elm`

In addition:
1. `vite` also runs tailwind, looking at `postcss.config.cjs` and `tailwind.config.cjs`

# AR
- mind ar js is used: https://github.com/hiukim/mind-ar-js
- image target compiler: https://hiukim.github.io/mind-ar-js-doc/tools/compile/
- minimizing video size: `ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 192k output.mp4 `