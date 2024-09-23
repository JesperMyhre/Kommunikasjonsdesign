document.querySelectorAll('.land').forEach(path => {
  path.addEventListener('click', function() {
    const map = document.getElementById('map');
    const rect = path.getBoundingClientRect();
    const mapRect = map.getBoundingClientRect();
    
    const zoomLevel = 5; // Hvor mye som zoomes inn
    const offsetX = (rect.left + rect.width / 1) - (mapRect.left + mapRect.width / 2.4);
    const offsetY = (rect.top + rect.height / 5) - (mapRect.top + mapRect.height / 2.35);
    
    //Kan sette spesifikke koordinater på translate
    map.style.transform = `scale(${zoomLevel}) translate(${-offsetX}px, ${-offsetY}px)`;
  });
});

document.getElementById('zoom-out').addEventListener('click', function() {
  const map = document.getElementById('map');
  map.style.transform = 'scale(1) translate(0, 0)';
});