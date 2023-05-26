function createPlanet(planetData) {
    const planet = new THREE.Object3D();
  
    const planetMaterial = new THREE.MeshPhongMaterial({ color: planetData.color });
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    planetMesh.scale.set(planetData.size, planetData.size, planetData.size);
    planet.add(planetMesh);
  
    // Load texture for each planet
    if (planetData.texture) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(planetData.texture);
      planetMaterial.map = texture;
    }
  
    // Add ring only to Saturn
    if (planetData.planet === 'Saturn') {
      const textureLoader = new THREE.TextureLoader();
      const ringTexture = textureLoader.load('./textures/8k_saturn_ring_alpha.png');
      const ringGeometry = new THREE.RingGeometry(planetData.size + 0.1, planetData.size + 0.2, 64);
      const ringMaterial = new THREE.MeshPhongMaterial({ color: planetData.ringColor, map: ringTexture, side: THREE.DoubleSide, transparent: true });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      planet.add(ringMesh);
    }
  
    planet.position.x = planetData.distance;
    scene.add(planet);
    return planet;
  }
  