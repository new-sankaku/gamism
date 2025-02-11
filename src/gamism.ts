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
    type: 'slide',
    attributes: ['duration', 'timing']
   },
   {
    type: 'flip',
    attributes: ['duration', 'timing']
   }
  ];
 
  private getAnimationType(className: string): AnimationConfig | undefined {
   const type = className.replace(this.PREFIX, '');
   return this.ANIMATION_CONFIGS.find(config => 
    type.toLowerCase().includes(config.type.toLowerCase())
   );
  }
 
  private createUniqueClassName(baseClass: string): string {
   return `${baseClass}_${Math.random().toString(36).substr(2, 9)}`;
  }
 
  private createAnimationStyle(element: AnimationElement, animation: string, config: AnimationConfig): { css: string; className: string; } {
   const uniqueClass = this.createUniqueClassName(animation);
   let css = `.${uniqueClass} { 
    animation-name: ${animation};
    animation-fill-mode: forwards`;
 
   config.attributes.forEach(attr => {
    const value = element.getAttribute(`${this.PREFIX}${config.type}-${attr}`);
    if (value) {
     css += `;\n   animation-${attr}: ${value}`;
    }
   });
 
   css += `\n}`
   return { css, className: uniqueClass };
  }
 
  async animate(element: AnimationElement): Promise<void> {
   const animations = Array.from(element.classList)
    .filter(className => className.startsWith(this.PREFIX));
 
   for (const animation of animations) {
    const config = this.getAnimationType(animation);
    if (!config) continue;
 
    const style = document.createElement('style');
    const { css, className } = this.createAnimationStyle(element, animation, config);
    style.textContent = css;
    document.head.appendChild(style);
    element.classList.add(className);
 
    const duration = parseFloat(getComputedStyle(element).animationDuration) * 1000;
    await new Promise(resolve => setTimeout(resolve, duration));
    
    style.remove();
    element.classList.remove(className);
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