varying vec3 vPosition;
void main() {
    gl_FragColor = vec4(abs(vPosition.xyz), 1.0);
}