      // Legger til røykeffekt ved musebevegelse
      document.addEventListener('mousemove', function (e) {
        createSmoke(e.pageX, e.pageY);
    });

    function createSmoke(x, y) {
        const smoke = document.createElement('div');
        smoke.classList.add('smoke-particle');
        document.body.appendChild(smoke);

        // Plasserer partikkelen der musepekeren er
        smoke.style.left = x + 'px';
        smoke.style.top = y + 'px';

        // Fjerner partikkelen etter 2 sekunder
        setTimeout(() => {
            smoke.remove();
        }, 2000);
    }