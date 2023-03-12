import type { Fn } from '@greatmap/common-modules';
import type { DirectiveOptions } from 'vue';

export const MoveTo: DirectiveOptions = {
  inserted(el, bindings) {
    const onClick = () => {
      moveAnimate(el, bindings.value);
    };

    el.addEventListener('click', onClick);

    el['_move_to_destroy'] = () => {
      el.removeEventListener('click', onClick);
    };
  },
  unbind(el) {
    el['_move_to_destroy']?.();
    el['_move_to_destroy'] = null;
  },
};

export async function moveAnimate(el: HTMLElement, target: number[]) {
  const clone = cloneElemWithPositionAbsolute(el);

  document.body.append(clone);

  await animateFrame(clone, () => {
    const { x, y } = distance(clone, target);

    animate(clone, {
      transform: `translate(${y}px,${x}px)`,
      opacity: 0.8,
      duration: 1,
    });
  });

  await animateFrame(clone, () => {
    animate(clone, {
      transform: `scale(0)`,
      opacity: 0,
      duration: 0.45,
    });
  });

  clone.remove();
}

function cloneElemWithPositionAbsolute(el: HTMLElement) {
  const clone = el.cloneNode(true) as HTMLElement;
  const rect = rectAbsolute(el);

  clone.style.width = rect.width + 'px';
  clone.style.height = rect.height + 'px';
  clone.style.top = rect.top + 'px';
  clone.style.left = rect.left + 'px';
  clone.style.position = 'absolute';
  clone.style.zIndex = '1000';
  clone.style.boxShadow = '0 0 10px 3px white';

  return clone;
}

function rectAbsolute(
  el: HTMLElement,
): Pick<DOMRect, 'width' | 'height' | 'top' | 'left'> {
  const rect = el.getBoundingClientRect();
  const { scrollLeft, scrollTop } = document.scrollingElement;

  return {
    width: rect.width,
    height: rect.height,
    top: scrollTop + rect.top,
    left: scrollLeft + rect.left,
  };
}

function distance(el: HTMLElement, target: number[]) {
  const { width, height, top, left } = rectAbsolute(el);
  const [originX, originY] = [top + height / 2, left + width / 2];
  const [targetX, targetY] = target;
  return {
    x: targetX - originX,
    y: targetY - originY,
  };
}

function animate(
  elem: HTMLElement,
  options: { transform: string; opacity: number; duration: number },
) {
  elem.style.transition = `all ${options.duration}s`;
  elem.style.opacity = String(options.opacity);
  elem.style.transform = elem.style.transform
    .split(' ')
    .concat(options.transform)
    .join(' ');
}

function animateFrame(el: HTMLElement, animate: Fn) {
  return new Promise<void>((resolve) => {
    animate();
    setTimeout(() => {
      transitionPromise(el).finally(resolve);
    });
  });
}

function transitionPromise(el: HTMLElement) {
  return new Promise<void>((resolve) => {
    const callback = () => {
      resolve();
      el.removeEventListener('transitionend', callback);
    };
    el.addEventListener('transitionend', callback);
  });
}
