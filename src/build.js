const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 15);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunTexture = new THREE.TextureLoader().load('./textures/8k_sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const galaxy = createGalaxy();

const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
const planetParams = [
  { planet: 'Mercury', color: 0xffffff, size: 0.2, speed: 0.01, distance: 2, index: 0, texture: './textures/mercury.jpg' },
  { planet: 'Venus', color: 0xffffff, size: 0.3, speed: 0.008, distance: 3, index: 1, texture: './textures/venus.jpg' },
  { planet: 'Earth', color: 0xffffff, size: 0.4, speed: 0.006, distance: 4, index: 2, texture: './textures/earth.jpg' },
  { planet: 'Mars', color: 0xffffff, size: 0.25, speed: 0.005, distance: 5, index: 3, texture: './textures/mars.jpg' },
  { planet: 'Jupiter', color: 0xffffff, size: 0.6, speed: 0.003, distance: 7, index: 4, texture: './textures/jupiter.jpg' },
  { planet: 'Saturn', color: 0xffffff, size: 0.5, speed: 0.002, distance: 9, index: 5, texture: './textures/saturn.jpg' },
  { planet: 'Uranus', color: 0xffffff, size: 0.35, speed: 0.001, distance: 11, index: 6, texture: './textures/uranus.jpg' },
  { planet: 'Neptune', color: 0xffffff, size: 0.3, speed: 0.0005, distance: 13, index: 7, texture: './textures/neptune.jpg' }
];

const planets = planetParams.map(createPlanet);

const gui = new dat.GUI();
planetParams.forEach(planetData => {
  const folder = gui.addFolder(planetData.planet);
  folder.addColor(planetData, 'color').onChange(() => updatePlanet(planets[planetData.index], planetData));
  folder.add(planetData, 'size', 0, 10).onChange(() => updatePlanet(planets[planetData.index], planetData));
  folder.add(planetData, 'speed', 0, 10).onChange(() => updatePlanet(planets[planetData.index], planetData));
  folder.add(planetData, 'distance', 1, 20).onChange(() => updatePlanetDistance(planetData));
});

const light = new THREE.PointLight(0xffffff, 1);
scene.add(light);
scene.add(galaxy);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate() {
  requestAnimationFrame(animate);
  planets.forEach((planet, index) => {
    const planetData = planetParams[index];
    planet.rotation.y += planetData.speed;
    planet.position.x = planetData.distance * Math.cos(planet.rotation.y);
    planet.position.z = planetData.distance * Math.sin(planet.rotation.y);
  });

  sun.rotation.y += 0.0005;
  galaxy.rotation.y += 0.0005;
  controls.update();
  renderer.render(scene, camera);
}

animate();
