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
                type: 'slide',
                attributes: ['duration', 'timing']
            },
            {
                type: 'flip',
                attributes: ['duration', 'timing']
            }
        ];
    }
    getAnimationType(className) {
        const type = className.replace(this.PREFIX, '');
        return this.ANIMATION_CONFIGS.find(config => type.toLowerCase().includes(config.type.toLowerCase()));
    }
    createUniqueClassName(baseClass) {
        return `${baseClass}_${Math.random().toString(36).substr(2, 9)}`;
    }
    createAnimationStyle(element, animation, config) {
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
        css += `\n}`;
        return { css, className: uniqueClass };
    }
    animate(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const animations = Array.from(element.classList)
                .filter(className => className.startsWith(this.PREFIX));
            for (const animation of animations) {
                const config = this.getAnimationType(animation);
                if (!config)
                    continue;
                const style = document.createElement('style');
                const { css, className } = this.createAnimationStyle(element, animation, config);
                style.textContent = css;
                document.head.appendChild(style);
                element.classList.add(className);
                const duration = parseFloat(getComputedStyle(element).animationDuration) * 1000;
                yield new Promise(resolve => setTimeout(resolve, duration));
                style.remove();
                element.classList.remove(className);
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
