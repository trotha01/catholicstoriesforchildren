
# Running the Code

## Using Make
You can run the code on osx using the Makefile.
Simply type `make` in a terminal to start and `make stop` to stop.

## Running Manually
If you want to run manually, you can run with:
1. `fswatch -o src/* build.js | xargs -n1 -I{} ./make.sh`. This will watch and re-compile if any code changes.
2. `./tailwindcss -i input.css -o tailwind.css --watch`. This will recompile the css file.
3. And serve with: `server.py`

# How the code is transpiled
1. `make.sh` will transpile all the elm code into js code.
2. Then make.sh will call `build.js` to create the html files. 
3. The `tailwindcss` script will keep the tailwind.css file updated