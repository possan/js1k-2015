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

var D = [
  [0,0,0],
  [1,0,0],
  [1,1,0],
  [0,0,0],
  [1,1,0],
  [0,1,0],

  [1,0,1],
  [0,0,1],
  [0,1,1],
  [1,0,1],
  [0,1,1],
  [1,1,1],

  [0,0,0],
  [1,0,0],
  [1,0,1],
  [0,0,0],
  [1,0,1],
  [0,0,1],

  [1,1,0],
  [0,1,0],
  [0,1,1],
  [1,1,0],
  [0,1,1],
  [1,1,1],

  [0,0,0],
  [0,1,0],
  [0,1,1],
  [0,0,0],
  [0,1,1],
  [0,0,1],

  [1,1,0],
  [1,0,0],
  [1,0,1],
  [1,1,0],
  [1,0,1],
  [1,1,1],
];

var nstars = 9300;
var vertices = [];
var ntris = 0;
var uvs = [];

var RA = Math.random;

function BLOCK(x,y,z) {
  D.forEach(function(d) {
    vertices.push(x + d[0]);
    vertices.push(y + d[1]);
    vertices.push(z + d[2]);
  //  vertices = vertices.concat([x+D[0], y+D[1], z+D[2],
  //                              x+D[3], y+D[4], z+D[5],
  //                              x+D[6], y+D[7], z+D[8]]);
    uvs.push(d[0]);
    uvs.push(d[1]);
    uvs.push(d[2]);

    ntris ++;
  });
}

for(var z=-15; z<=15; z+=1) {
  for(var y=-15; y<=15; y+=1) {
    for(var x=-15; x<=15; x+=1) {
      var R = Math.sqrt(x*x + y*y + z*z);
      if (R > (16.0 - 5.0 * Math.random())) {
        BLOCK(x,y,z);
      }
    }
  }
}

/*
for(var k=0; k<nstars; k++) {
  var x = RA() * 40 - 20; // 1.0 * Math.sin(k / 15.0);
  var y = RA() * 40 - 20; // 1.0 * Math.cos(k / 17.0);
  var z = RA() * 40 - 20; // 1.0 * Math.cos(k / 17.0);
  x = Math.round(x);
  y = Math.round(y);
  z = Math.round(z);
  // var xx = RA() * 0.2 - 0.1; // 1.0 * Math.cos(k / 17.0);
  // var yy = RA() * 0.2 - 0.1; // 1.0 * Math.cos(k / 17.0);
  // var zz = RA() * 0.2 - 0.1; // 1.0 * Math.cos(k / 17.0);
  BLOCK(x,y,z);
}
*/

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

  g.bindBuffer(34962/*g.ARRAY_BUFFER*/, uvb);
  g.bufferData(34962/*g.ARRAY_BUFFER*/, new Float32Array(uvs), 35044/*g.STATIC_DRAW*/);

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
  // if (!g.getShaderParameter(shader, g.COMPILE_STATUS)) {
  //   alert("An error occurred compiling the shaders: " + g.getShaderInfoLog(shader));
  //   return null;
  // }
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
uvPositionAttribute = g.getAttribLocation(prog, "U");
timeUniform = g.getUniformLocation(prog, "T");

vtxb = g.createBuffer();
uvb = g.createBuffer();

g.bindBuffer(34962/*g.ARRAY_BUFFER*/, vtxb);
g.vertexAttribPointer(vertexPositionAttribute, 3, 5126/*g.FLOAT*/, false, 0, 0);
g.enableVertexAttribArray(vertexPositionAttribute);

g.bindBuffer(34962/*g.ARRAY_BUFFER*/, uvb);
g.vertexAttribPointer(uvPositionAttribute, 3, 5126/*g.FLOAT*/, false, 0, 0);
g.enableVertexAttribArray(uvPositionAttribute);

//
//
// START EVERYTHING
//
//

rf();
