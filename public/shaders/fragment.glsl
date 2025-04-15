uniform float u_time;
in vec3 ourColor;

void main() {
    float pulse = sin(u_time * 2.0) * 0.5 + 0.5;
    gl_FragColor = vec4(pulse, ourColor); 
}
