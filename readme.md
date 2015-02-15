# Spacetrain (JS1K Contribution)

A WebGL Starfield with wobbly camera


### How does it work?

Main demo code is in `src/demo.js` - it initializes the shaders, generates some vertex data and renders it in a loop.

Shaders are in `src/vertexshader.txt` and `src/fragmentshader.txt` - those are embedded into the final javascript as strings.

The grunt script builds the final unpacked file, then uglifies it, and finally runs it through a hacky brute force packer in `tools/` folder to squeeze out the last bytes from the final javascript file, then in the end it hopefully ends up less than 1024 bytes if you are lucky.


### Building it

```
npm install
grunt wholeshebang
```

Or use watcher

```
grunt watch
```
