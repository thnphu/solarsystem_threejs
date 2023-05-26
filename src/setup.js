function createGalaxy() {
    const galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
  
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./textures/8k_stars_milky_way.jpg');
    const galaxyMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  
    return new THREE.Mesh(galaxyGeometry, galaxyMaterial);
  }
  