// precision mediump float;
// uniform float T;

attribute vec3 V;
attribute vec3 U;
varying float Z;
varying vec3 UV;

float C,S;

mat4 view_frustum(float tan_angle_of_view, float aspect_ratio, float z_near, float z_far) {
    return mat4(
        vec4(1.0/tan_angle_of_view,            0.0, 0.0, 0.0),
        vec4(0.0, aspect_ratio/tan_angle_of_view,   0.0, 0.0),
        vec4(0.0, 0.0,    (z_far+z_near)/(z_far-z_near), 1.0),
        vec4(0.0, 0.0, -2.0*z_far*z_near/(z_far-z_near), 0.0)
    );
}

/*
mat4 scale(float x, float y, float z)
{
    return mat4(
        vec4(x,   0.0, 0.0, 0.0),
        vec4(0.0, y,   0.0, 0.0),
        vec4(0.0, 0.0, z,   0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}
*/

mat4 translate(float x, float y, float z)
{
    return mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0, 1.0, 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(x,   y,   z,   1.0)
    );
}

/*
mat4 rotate_x(float theta)
{
	C = cos(theta);
	S = sin(theta);
    return mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0,   C,   S, 0.0),
        vec4(0.0,  -S,   C, 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}

mat4 rotate_y(float theta)
{
	C = cos(theta);
	S = sin(theta);
    return mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(  C, 1.0,   S, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4( -S, 0.0,   C, 1.0)
    );
}
*/
mat4 rotationMatrix(vec3 axis, float angle)
{
    axis = normalize(axis);
    S = sin(angle);
    C = cos(angle);
    float oc = 1.0 - C;

    return mat4(oc * axis.x * axis.x + C,           oc * axis.x * axis.y - axis.z * S,  oc * axis.z * axis.x + axis.y * S,  0.0,
                oc * axis.x * axis.y + axis.z * S,  oc * axis.y * axis.y + C,           oc * axis.y * axis.z - axis.x * S,  0.0,
                oc * axis.z * axis.x - axis.y * S,  oc * axis.y * axis.z + axis.x * S,  oc * axis.z * axis.z + C,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

void main(void) {

//  mat4 P2=mat4( 0.463,  0.0,    0.0,   0.0,
//                0.0,   0.617, 0.0,  0.0,
//                0.0,   0.0,   -1.0, -1.0,
//                sin(T/2.0), sin(T/3.0), 0.0, 1.0);
//  mat4 P = mat4(1.0);
//  P[0][0] = 0.46;
//  P[1][1] = 0.61;
//  P[2][3] = -1.0;
//  P[3][3] = 1.0;

  float N=0.0;
  float O=1.0;

 // mat4 P=;

  vec4 v=vec4(V, O);
/*
  v.z -= 24.0;
  v.z += 1.0*(sin(T*2.0+v.x)+cos(T*2.0+v.y*1.5));

  mat4 P2=mat4( 6.463,  0.0,    0.0,   0.0,
                0.0,   6.617, 0.0,  0.0,
                0.0,   0.0,   -5.0, -1.0,
                sin(T/2.0), cos(T/3.0), 0.0, 1.0);

  P2 = mat4(7, N, N, N, N, 7, N, N, N, N,-O, -O, 3.0*sin(T/3.0), 3.0*sin(T/5.0), N, O);
*/
  gl_Position = view_frustum(tan(0.6), 4.0/3.0, 0.1, 135.0)
  			  * translate(6.0 * cos(T * 0.3), 6.0 * cos(T * 0.4), 6.0 * sin(T * 0.3))
  			  * rotationMatrix(vec3(cos(T * 0.5), sin(T * 0.4), cos(T * 0.2)), 1.0 * T)
  			  // * rotate_x(T)
  			  * v;//* rotate_x(T) * v;

  Z = gl_Position.z / 50.0;
  UV = U;
}
