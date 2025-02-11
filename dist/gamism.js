"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Gamism {
    constructor() {
        this.PREFIX = 'gamism_';
        this.INIT_CLASS = 'gamism_init';
        this.ANIMATION_CONFIGS = [
            {
                type: 'animation',
                attributes: ['animation-duration', 'animation-timing-function']
            }
        ];
    }
    getAnimationType(className) {
        const baseClassName = className.replace(/_\d+ms$/, '');
        if (baseClassName.includes('slideIn'))
            return 'slideIn';
        if (baseClassName.includes('flip'))
            return 'flip';
        return undefined;
    }
    createUniqueClassName(baseClass) {
        return `${baseClass}_${Math.random().toString(36).substr(2, 9)}`;
    }
    createAnimationStyle(element, animation) {
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
        css += `\n}`;
        return { css, className: uniqueClass };
    }
    animate(element) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield new Promise(resolve => {
                    const handleAnimationEnd = () => {
                        element.removeEventListener('animationend', handleAnimationEnd);
                        style.remove();
                        element.classList.remove(className);
                        resolve();
                    };
                    element.addEventListener('animationend', handleAnimationEnd);
                });
            }
        });
    }
}
const gamism = new Gamism();
window.onload = function () {
    const elements = document.getElementsByClassName('gamism_init');
    Array.from(elements).forEach((element) => {
        gamism.animate(element);
    });
};
