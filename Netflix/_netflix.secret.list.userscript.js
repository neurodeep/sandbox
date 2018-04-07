// ==UserScript==
// @name         Netflix Secret Categories
// @namespace    http://aimless.space/
// @version      0.1
// @description  Add additional categories from http://ogres-crypt.com/public/NetFlix-Streaming-Genres2.html
// @author       neurodeep@gmail.com
// @match        https://www.netflix.com/browse*
// @grant        none
// @require      file://C:\Users\Nick\Dropbox\Workspace\netflix.json
// @require      file://C:\Users\Nick\Dropbox\Workspace\netflix.secret.list.userscript.js
// ==/UserScript==

/* jshint esnext: false */
/* jshint esversion: 6 */

(function() {
    'use strict';

    let groups = json;


    let container = createElement('li', 'sub-menu-item-special');
    let link = createElement('a', '', '', 'More');
    // let link = createElement('a', '', { 'href': '#' }, 'More');
    let arrow = createElement('div', 'callout-arrow');
    let caret = createElement('span', 'caret');
    let menu = createElement('div');
    let topbar = createElement('span', 'topbar');
    let menuSpecial = createElement('ul', 'sub-menu-list-special multi-column');
    let menuList = createElement('ul', 'sub-menu-list-special multi-column');

    caret.style.borderColor = '#fff transparent';

    link.appendChild(caret);
    menu.appendChild(topbar);
    menu.appendChild(menuSpecial);

    container.appendChild(link);
    // container.appendChild(menuList);

    container.addEventListener('pointerenter', (e) => {
        menuList.childNodes.forEach(li => li.removeClass('hidden'));
    });

    container.addEventListener('pointerleave', (e) => {
        menuList.childNodes.forEach(li => li.addClass('hidden'));
    });

    groups.forEach((list, i) => {
        let keys = Object.keys(list);
        let ul = createElement('ul', 'sub-menu-list multi-column');

        keys.forEach((id, index) => {
            let li = createElement('li', 'sub-menu-item');
            let a = createElement('a', 'sub-menu-link', { 'href': '/browse/genre/' + id }, list[id]);

            li.appendChild(a);

            if (index === 0) {
                li.className += '-special';
                menuList.appendChild(li);

                li.addEventListener('pointerenter', e => {
                    groups.forEach(group => {
                        group.addClass('hidden');
                    });
                    ul.removeClass('hidden');
                });
            } else {
                ul.appendChild(li);
            }
        });

        groups[i] = menu.appendChild(ul);
    });

    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                let browse = mutation.addedNodes[0];
                if (browse.hasClass('sub-menu')) {
                    groups.forEach((group, index) => {
                        if (index === 0) {
                            group.removeClass('hidden');
                        } else {
                            group.addClass('hidden');
                        }
                    });
                    let listColumn = browse.childNodes.item(1);
                    // Add more link below all
                    listColumn.append(container);
                    // Add main categories after More
                    log(menuList);
                    menuList.childNodes.forEach(li => listColumn.append(li));
                    // Add subcategories to popup
                    // browse.append(menu);
                }
            }
        });
    });

    let target = document.querySelector('div.mainNav > ul > li.browse');
    if (target) {
        observer.observe(target, {childList: true});
    }

    function createElement(tag, className, attributes, innerHTML) {
        let element = document.createElement(tag);

        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;

        if (typeof attributes === 'object') {
            Object.keys(attributes).forEach(name => {
                element.setAttribute(name, attributes[name]);
            });
        }

        return element;
    }

    HTMLElement.prototype.hasClass = function(cl) {
        return this.className.split(' ').includes(cl);
    };

    HTMLElement.prototype.addClass = function(cl) {
        return this.classList.add(cl);
    };

    HTMLElement.prototype.removeClass = function(cl) {
        return this.classList.remove(cl);
    };

    HTMLElement.prototype.toggleClass = function(cl) {
        if (this.className.split(' ').includes(cl)) {
            return this.classList.remove(cl);
        } else {
            return this.classList.add(cl);
        }
    };

})();
