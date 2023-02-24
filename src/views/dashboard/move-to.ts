import type { DirectiveOptions } from 'vue';

export const MoveTo: DirectiveOptions = {
  inserted(el, bindings) {
    el.addEventListener('click', () => {
      moveAnimate(el, bindings.value);
    });
  },
};

function moveAnimate(el: HTMLElement, target: number[]) {
  const rect = el.getBoundingClientRect();
  const clone = el.cloneNode(true) as HTMLElement;
  document.body.append(clone);

  clone.style.width = rect.width + 'px';
  clone.style.height = rect.height + 'px';
  clone.style.top = rect.top + 'px';
  clone.style.left = rect.left + 'px';
  clone.style.position = 'absolute';
  clone.style.zIndex = '1000';
  clone.style.boxShadow = '0 0 10px 3px white';

  setTimeout(() => {
    const moveX = target[0] - rect.top - rect.height / 2;
    const moveY = target[1] - rect.left - rect.width / 2;
    clone.style.transition = 'all 1s';
    clone.style.transform = `translate(${moveY}px,${moveX}px)`;
    clone.style.opacity = '0.8';

    clone.addEventListener('transitionend', () => {
      clone.style.transition = 'all 0.4s';
      clone.style.opacity = '0';
      clone.style.transform += ' scale(1.3)';

      setTimeout(() => {
        clone.addEventListener('transitionend', () => {
          clone.remove();
        });
      });
    });
  });
}
