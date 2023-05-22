// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
// Plot a line on Y using a value between 0.0-1.0

vec3 bgColorDown = vec3(0.2, 0.1, 0.1);
vec3 bgColorUp = vec3(0.1, 0.1, 0.2);

vec3 P1ColorIn = vec3(1.0, 0.5, 0.0);
vec3 P1ColorOut = vec3(1.0, 0.0, 0.0);

vec3 P2ColorIn = vec3(0.0, 0.5, 1.0);  //vec3(1.0, 1.0, 1.0);
vec3 P2ColorOut = vec3(0.0, 0.0, 1.0); //vec3(0.0, 0.5, 1.0);

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  float curve = 0.3 *cos((20.0 * uv.x));
  float edge0 = 1.0 - clamp(distance(curve + uv.y, 0.5) * 1.0, 0.0, 1.0);
  float lineAShape = smoothstep(edge0, 1.0, 0.99);
  vec3  lineACol = (1.0 - lineAShape) * vec3(mix(P1ColorIn, P1ColorOut, lineAShape));

  gl_FragColor = vec4(lineACol, 1.0);
}