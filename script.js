// Sélection du conteneur
const container = document.getElementById("heroCanvas");

// Création de la scène
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajout d'un effet de particules
const particlesCount = 200;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // Répartition aléatoire
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Matériau des particules
const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.05,
    transparent: true
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Animation
const animate = () => {
    requestAnimationFrame(animate);
    
    // Effet de mouvement des particules
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;

    renderer.render(scene, camera);
};

// Ajustement de la taille de l'écran
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Lancement de l'animation
animate();
