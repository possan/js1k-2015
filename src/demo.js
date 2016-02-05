//
//
// GLOBALS
//
//

var prog;
var timeUniform;
var T = 0;

//
//
// FRAME LOOP
//
//

/*


.:..#..:.
:.:..:...
.:..:.#..
.:#....:.
:....:...
..:.#:.#.
.:.....:.
.#...:...



*/
var uvb = 0;
var vtxb = 0;

var nstars = 9300;
var vertices = [
  -1,-1,0,
  1,-1,0,
  1,1,0,
  -1,-1,0,
  1,1,0,
  -1,1,0,
];

var ntris = 6;

var RA = Math.random;

var rf = function() {

  g.clearColor(1, 1, 1, 1);
   g.enable(g.DEPTH_TEST);
   g.depthFunc(g.LEQUAL);
  g.clear( 16384 | g.DEPTH_BUFFER_BIT /*g.COLOR_BUFFER_BIT*/ );
  //  g.useProgram(prog);

  /*
  for(var k=0; k<nstars; k++) {
    var z =  ((k + T * 2) % 30) - 15;
    // var o = k * 6;
    var RR = 0.03;//) + 0.02 * Math.cos(T / 3.0 + vertices[o]);
    vertices[k*6 + 2] = z - RR;
    vertices[k*6 + 5] = z + RR;
  }
  */

  g.bindBuffer(34962/*g.ARRAY_BUFFER*/, vtxb);
  g.bufferData(34962/*g.ARRAY_BUFFER*/, new Float32Array(vertices), 35044/*g.STATIC_DRAW*/);

  // console.log(g.FLOAT);
  // console.log(g.LINES);
  g.uniform1f(timeUniform, T);
  g.drawArrays(g.TRIANGLES, 0, ntris);

  requestAnimationFrame(rf);
  T += 0.01;
}

//
//
// SET UP
//
//

function getShader(type, theSource) {
  var shader = g.createShader(type);
  g.shaderSource(shader, "precision lowp float;uniform float T;"+theSource);
  g.compileShader(shader);

   if (!g.getShaderParameter(shader, g.COMPILE_STATUS)) {
     console.error("An error occurred compiling the shaders: " + g.getShaderInfoLog(shader));
     return null;
   }

  g.attachShader(prog, shader);
}

// Create the shader program
var prog = g.createProgram();
getShader(35633/*g.VERTEX_SHADER*/, vertex_shader_code);
getShader(35632/*g.FRAGMENT_SHADER*/, fragment_shader_code);
g.linkProgram(prog);
// if (!g.getProgramParameter(prog, g.LINK_STATUS)) {
//   alert("Unable to initialize the shader program.");
// }

g.enable(g.DEPTH_TEST);

g.useProgram(prog);
vertexPositionAttribute = g.getAttribLocation(prog, "V");
timeUniform = g.getUniformLocation(prog, "T");

vtxb = g.createBuffer();

g.bindBuffer(34962/*g.ARRAY_BUFFER*/, vtxb);
g.vertexAttribPointer(vertexPositionAttribute, 3, 5126/*g.FLOAT*/, false, 0, 0);
g.enableVertexAttribArray(vertexPositionAttribute);

//
//
// START EVERYTHING
//
//

rf();
