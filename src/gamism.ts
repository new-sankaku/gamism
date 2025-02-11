interface AnimationElement extends HTMLElement {
  getAttribute(name: string): string | null;
}

interface AnimationConfig {
  type: string;
  attributes: string[];
}

class Gamism {
  private readonly PREFIX = 'gamism_';
  private readonly INIT_CLASS = 'gamism_init';

  private readonly ANIMATION_CONFIGS: AnimationConfig[] = [
    {
      type: 'animation',
      attributes: ['animation-duration', 'animation-timing-function']
    }
  ];

  private getAnimationType(className: string): string | undefined {
    const baseClassName = className.replace(/_\d+ms$/, '');
    
    if (baseClassName.includes('slideIn')) return 'slideIn';
    if (baseClassName.includes('flip')) return 'flip';
    return undefined;
  }

  private createUniqueClassName(baseClass: string): string {
    return `${baseClass}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private createAnimationStyle(element: AnimationElement, animation: string): { css: string; className: string; } {
    const uniqueClass = this.createUniqueClassName(animation);
    const baseAnimation = animation.replace(/_\d+ms$/, '');
  
    let css = `.${uniqueClass} { 
     animation-name: ${baseAnimation};
     animation-fill-mode: forwards`;
  
    const config = this.ANIMATION_CONFIGS[0];
    config.attributes.forEach(attr => {
      const value = element.getAttribute(`${animation}-${attr}`);
      if (value) {
        css += `;\n   ${attr}: ${value}`;
      }
    });
  
    css += `\n}`
    return { css, className: uniqueClass };
  }

  async animate(element: AnimationElement): Promise<void> {
    const animations = Array.from(element.classList)
      .filter(className => className.startsWith(this.PREFIX));

    for (const animation of animations) {
      if (!this.getAnimationType(animation)) {
        continue;
      }

      const style = document.createElement('style');
      const { css, className } = this.createAnimationStyle(element, animation);
      style.textContent = css;
      document.head.appendChild(style);
      element.classList.add(className);

      await new Promise<void>(resolve => {
        const handleAnimationEnd = () => {
          element.removeEventListener('animationend', handleAnimationEnd);
          style.remove();
          element.classList.remove(className);
          resolve();
        };
        element.addEventListener('animationend', handleAnimationEnd);
      });
    }
  }
}

const gamism: Gamism = new Gamism();

window.onload = function(): void {
  const elements: HTMLCollectionOf<Element> = document.getElementsByClassName('gamism_init');
  Array.from(elements).forEach((element: Element): void => {
    gamism.animate(element as AnimationElement);
  });
};