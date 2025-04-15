varying vec3 vPosition;
out vec3 ourColor;

void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    ourColor = vec3(0.0, 1.0, 0.42);
}