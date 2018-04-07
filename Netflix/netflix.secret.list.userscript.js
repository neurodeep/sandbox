// ==UserScript==
// @name          Netflix Secret Categories
// @namespace     http://aimless.space/
// @version       0.1
// @description   Add additional categories from http://ogres-crypt.com/public/NetFlix-Streaming-Genres2.html
// @author        neurodeep@gmail.com
// @match         https://www.netflix.com/*
// @icon          https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico
// @grant         GM_getResourceText
// @resource json http://localhost/netflix.json
// @require       http://localhost/netflix.secret.list.userscript.js
// @_include      file://C:\Users\Nick\Dropbox\Workspace\netflix.js
// @_include      file://C:\Users\Nick\Dropbox\Workspace\netflix.secret.list.userscript.js
// @_updateURL    https://localhost.workspace/netflix.secret.list.userscript.js
// ==/UserScript==

/* jshint esnext: false */
/* jshint esversion: 6 */

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
  return this.className.split(' ').includes(cl) ? this.classList.remove(cl) : this.classList.add(cl);
};

HTMLElement.prototype.show = function() {
  this.style.display = '';
  this.hidden = false;
  if (this.style.length === 0) {
    this.removeAttribute('style');
  }
};

HTMLElement.prototype.hide = function() {
  this.style.display = 'none';
  this.hidden = true;
};

HTMLElement.prototype.toggle = function(show) {
  if (show === true) {
    this.style.display = '';
    this.hidden = false;
  } else if (show === false) {
    this.style.display = 'none';
    this.hidden = true;
  } else {
    if (this.style.display === 'none' && this.hidden === false) {
      this.style.display = '';
    } else {
      this.style.display = 'none';
    }
    this.hidden = !this.hidden;
  }

  if (this.style.length === 0) {
    this.removeAttribute('style');
  }

  return !this.hidden;
};

window.log = window.console.log;

let style = document.createElement('style');
style.innerHTML = `  /** CSS **/
.hidden {
  display = 'none';
}

/*#mainNav > ul > li.browse*/
.browse li > ul {
  /*ul.addClass('sub-menu-list');*/
  /*ul.addClass('multi-column');*/
}

.browse li > ul > li {
  /*li.addClass('sub-menu-item');*/
}

.browse li > a > .caret {
  border-color: '#fff transparent';
}

.browse .sub-menu-list {
  /*link.parentNode.parentNode.style.paddingBottom = '30rem';*/
}
`;
document.head.append(style);

// import categories from 'netflix.json';
let categories = GM_getResourceText('json');

(function() {
  'use strict';

  // Custom icon
  let icon = 'https://lh3.googleusercontent.com/-CIdaJpLj7ys/AAAAAAAAAAI/AAAAAAAAAAA/AFiYof2Evxk8G-uoBxABJ8aljOLRnp_tvw/s192-c-mo/photo.jpg';
  let profileIcon = document.getElementsByClassName('profile-icon').item(0);

  if (profileIcon.src) {
    profileIcon.src = icon;
  }
  if (profileIcon.style.backgroundImage) {
    profileIcon.style.backgroundImage = `url('${icon}')`;
  }

  let subcategories = [];

  let caret = document.createElement('span');
  caret.addClass('caret');

  // [a, b, ...rest] = [10, 20, 30, 40, 50];
  // Separate categories
  categories.forEach(group => {
    let ul = document.createElement('ul');
    ul.addClass('sub-menu-list');
    ul.addClass('multi-column');
    ul.style.transition = 'opacity 2s ease 0';
    ul.style.opacity = '1';

    [ul.dataset.genre, ul.dataset.name] = group.shift();

    subcategories.push(ul);

    group.forEach(category => {
      let a = document.createElement('a');
      a.href = '/browse/genre/' + category[0];
      a.innerHTML = category[1];
      a.addClass('sub-menu-link');

      let li = document.createElement('li');
      li.addClass('sub-menu-item');
      li.append(a);

      ul.append(li);
    });
  });

  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutation => {
      let popup = mutation.addedNodes.item(0);

      if (popup && popup.hasClass('sub-menu')) {
        subcategories.forEach(ul => {
          let genre = ul.dataset.genre;
          let link = popup.querySelector(`a[href*="${genre}"]`);

          if (!link) {
            let item = popup.lastChild.lastChild.cloneNode(true);
            popup.lastChild.append(item);
            link = item.lastChild;
            link.href = '/browse/genre/' + genre;
            link.innerHTML = ul.dataset.name;
          }

          link.append(caret.cloneNode());
          link.dataset.showlist = true;
          link.parentNode.append(ul);

          // ul.hide();
          ul.addClass('hidden');

          caret.addEventListener('click', e => {
            if (link.dataset.showlist) {
              link.dataset.showlist = '';
            } else {
              link.dataset.showlist = true;
            }
          });

          link.parentNode.addEventListener('pointerenter', e => {
            if (link.dataset.showlist) {
              link.parentNode.parentNode.style.paddingBottom = '30rem';
              // ul.show();
              ul.removeClass('hidden');
              ul.style.opacity = '1';
            }
          });

          link.parentNode.addEventListener('pointerleave', e => {
            // ul.hide();
            ul.addClass('hidden');
            ul.style.opacity = '0';
          });
        });
      }
    });
  });

  let target = document.querySelector('div.mainNav > ul > li.browse');
  if (target) {
    observer.observe(target, { childList: true });
  }

})();
