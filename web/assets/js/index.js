document.addEventListener('DOMContentLoaded', function() {
  const state = {};
  const carouselList = document.querySelector('.carousel__list');
  const carouselItems = document.querySelectorAll('.carousel__item');
  const elems = Array.from(carouselItems);

  carouselList.addEventListener('click', function(event) {
    var newActive = event.target.closest('.carousel__item');

    if (!newActive || newActive.classList.contains('carousel__item_active')) {
      return;
    }

    update(newActive);
  });

  const update = function(newActive) {
    const newActivePos = parseInt(newActive.dataset.pos, 10);

    // Mise à jour de la logique pour inclure -3 et 3 dans les calculs
    const positions = [-3, -2, -1, 0, 1, 2, 3]; // Assurez-vous que cette gamme correspond à votre ensemble d'éléments
    const current = elems.find((elem) => elem.dataset.pos == "0");
    const currentPosIndex = positions.indexOf(parseInt(current.dataset.pos, 10));

    if (current) current.classList.remove('carousel__item_active');
    newActive.classList.add('carousel__item_active');

    elems.forEach(item => {
      let itemPos = parseInt(item.dataset.pos, 10);
      let newPosIndex = (positions.length + positions.indexOf(itemPos) - (positions.indexOf(newActivePos) - currentPosIndex)) % positions.length;
      item.dataset.pos = positions[newPosIndex].toString();
    });
  };

  const getPos = function(current, active) {
    const diff = current - active;
    const absDiff = Math.abs(diff);

    if (absDiff > 2) {
      return -current;
    }

    return Number(current) - Number(active);
  }

  let lastKeypressTime = 0;

  document.addEventListener('keydown', function(event) {
    const currentActive = document.querySelector('.carousel__item_active');
    if (!currentActive) return;

    const currentTime = new Date().getTime();
    if (currentTime - lastKeypressTime < 300) {
      return;
    }
    lastKeypressTime = currentTime;

    let newActive;
    if (event.key === 'ArrowRight') {
      // Déplacer vers la droite
      newActive = getNextActive(currentActive, 1);
    } else if (event.key === 'ArrowLeft') {
      // Déplacer vers la gauche
      newActive = getNextActive(currentActive, -1);
    }

    if (newActive) {
      update(newActive);
    }
  });

  function getNextActive(currentActive, direction) {
    const currentPos = Number(currentActive.dataset.pos);
    const newPos = (currentPos + direction + 5) % 5;
    const newActive = elems.find((elem) => Number(elem.dataset.pos) === newPos - 2);
    return newActive;
  }
});