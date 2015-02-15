// DEMO: Spacetrain

// document.write('see console');
// if (typeof(a) !== 'undefined') console.log('demo canvas', a);
// if (typeof(b) !== 'undefined') console.log('demo body', b);
// if (typeof(c) !== 'undefined') console.log('demo 2d context', c);
// if (typeof(g) !== 'undefined') console.log('demo gl', g);
// console.log('RAF', requestAnimationFrame);

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

var nstars = 10000;
var vertices = [];

var RA = Math.random;
for(var k=0; k<nstars; k++) {
  var x = RA() * 2 - 1; // 1.0 * Math.sin(k / 15.0);
  var y = RA() * 2 - 1; // 1.0 * Math.cos(k / 17.0);
  vertices = vertices.concat([x,y,0,x,y,0]);
}

var rf = function() {

  g.clearColor(0, 0, 0, 1);
  // g.enable(g.DEPTH_TEST);
  // g.depthFunc(g.LEQUAL);
  g.clear( 16384/*g.COLOR_BUFFER_BIT*/ );
  //  g.useProgram(prog);

  for(var k=0; k<nstars; k++) {
    var z =  ((k + T * 2) % 30) - 15;
    // var o = k * 6;
    var RR = 0.03;//) + 0.02 * Math.cos(T / 3.0 + vertices[o]);
    vertices[k*6 + 2] = z - RR;
    vertices[k*6 + 5] = z + RR;
  }

  g.bufferData(34962/*g.ARRAY_BUFFER*/, new Float32Array(vertices), 35044/*g.STATIC_DRAW*/);
  // console.log(g.FLOAT);
  // console.log(g.LINES);
  g.uniform1f(timeUniform, T);
  g.drawArrays(1/*g.LINES*/, 0, nstars);

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

g.useProgram(prog);
vertexPositionAttribute = g.getAttribLocation(prog, "V");
timeUniform = g.getUniformLocation(prog, "T");

g.bindBuffer(34962/*g.ARRAY_BUFFER*/, g.createBuffer());
g.vertexAttribPointer(vertexPositionAttribute, 3, 5126/*g.FLOAT*/, false, 0, 0);
g.enableVertexAttribArray(vertexPositionAttribute);

//
//
// START EVERYTHING
//
//

rf();
