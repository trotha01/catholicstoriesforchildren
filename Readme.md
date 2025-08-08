
# Running the Code

## Using npm
Install Node dependencies and run the full build:

```
npm install
npm start
```

## Running Manually
If you want to run manually, you can run with:
1. `fswatch -o src/* build.js | xargs -n1 -I{} ./make.sh`. This will watch and re-compile if any code changes.
2. `./tailwindcss -i input.css -o public/tailwind.css --watch`. This will recompile the css file.
3. And serve with: `server.py`

# How the code is transpiled
1. `make.sh` will transpile all the elm code into js code.
2. Then make.sh will call `build.js` to create the html files. 
3. The `tailwindcss` script will keep the tailwind.css file updated

# AR
- mind ar js is used: https://github.com/hiukim/mind-ar-js
- image target compiler: https://hiukim.github.io/mind-ar-js-doc/tools/compile/
- minimizing video size: `ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 192k output.mp4 `