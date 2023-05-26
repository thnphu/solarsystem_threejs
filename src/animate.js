function updatePlanet(planet, planetData) {
    const planetMesh = planet.children[0];
    planetMesh.material.color.setHex(planetData.color);
    planetMesh.scale.set(planetData.size, planetData.size, planetData.size);
    planetParams[planetData.index] = planetData;
  }
  
  function updatePlanetDistance(planetData) {
    const planet = planets[planetData.index];
    planet.position.x = planetData.distance;
    planetParams[planetData.index].distance = planetData.distance;
  }
  