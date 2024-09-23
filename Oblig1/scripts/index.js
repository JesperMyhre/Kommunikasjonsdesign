document.querySelectorAll('.zoom-btn').forEach(button => {
  button.addEventListener('click', function() {
    const map = document.getElementById('map');
    const rect = button.getBoundingClientRect();
    const mapRect = map.getBoundingClientRect();
    
    const zoomLevel = 2; // Hvor mye som zoomes inn
    const offsetX = (rect.left + rect.width / 2) - (mapRect.left + mapRect.width / 2);
    const offsetY = (rect.top + rect.height / 2) - (mapRect.top + mapRect.height / 2.7);
    
    //Kan sette spesifikke koordinater på translate
    map.style.transform = `scale(${zoomLevel}) translate(${-offsetX}px, ${-offsetY}px)`;
  });
});

document.getElementById('zoom-out').addEventListener('click', function() {
  const map = document.getElementById('map');
  map.style.transform = 'scale(1) translate(0, 0)';
});