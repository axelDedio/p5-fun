// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; 
uniform float mouseX;
uniform float mouseY;
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 
    

  // Lets use the pixels position on the x-axis as our gradient for the red color
  // Where the position is closer to 0.0 we get black (st.x = 0.0)
  // Where the position is closer to width (defined as 1.0) we get red (st.x = 1.0)

//   gl_FragColor = vec4(st.x,0.0,0.0,1.0); // R,G,B,A

  // you can only have one gl_FragColor active at a time, but try commenting the others out
  // try the green component

//   gl_FragColor = vec4(0.0,st.x,0.0,1.0); 

  // try both the x position and the y position
  
  gl_FragColor = vec4(
    st.y+mouseX,
    st.x,
    mouseY,
    1.0); 
}