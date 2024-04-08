addEventListener('DOMContentLoaded', function () {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const elems = Array.from(carouselItems);

    activateRedirection(elems)

    addEventListener('keydown', function (event) {

        if (event.key === 'ArrowRight') {
            update(elems, 'l');
        }else if (event.key === 'ArrowLeft') {
            update(elems, 'r');
        }
    });

    document.addEventListener('click', function(event) {
        const clickX = event.clientX;

        const screenWidthHalf = window.innerWidth / 2;

        if(clickX < screenWidthHalf) {
            update(elems, 'r')
        } else {
            update(elems, 'l')
        }
    });
});

function update(elems, move){
        elems.forEach(item => {
            let position = parseInt(item.dataset.pos);
            if (move === 'r'){
                if (position === 5){
                    position = 0;
                    item.dataset.pos = position.toString();
                }else{
                    position = position + 1;
                    item.dataset.pos = position.toString();
                }
            }else{
                if (position === 0){
                    position = 5;
                    item.dataset.pos = position.toString();
                }else{
                    position = position - 1;
                    item.dataset.pos = position.toString();
                }
            }
        });
        activateRedirection(elems);
}

function activateRedirection(elems) {
    elems.forEach(item => {
        const link = item.querySelector('a');
        link.classList.remove('active', 'inactive');
        link.classList.add('inactive');
    });

    const activeItem = Array.from(elems).find(item => item.getAttribute('data-pos') === "2");
    if (activeItem) {
        const link = activeItem.querySelector('a');
        link.classList.remove('inactive');
        link.classList.add('active');
    }
}