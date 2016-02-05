// precision mediump float;
// uniform float T;
varying float Z;

void main(void) {
  gl_FragColor = vec4(1.3,0.5 + sin(Z * 6.0)*3.0,cos(Z * 4.0) * 4.0 + 0.7*Z,1);
//t.x * Z, Z * sin(t.y + T), Z * sin(T + Z), 1.0);
}