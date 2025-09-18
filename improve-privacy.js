// ==UserScript==
// @name Improve Privacy
// @version 0.1
// @downloadURL https://userscripts.codonaft.com/improve-privacy.js
// ==/UserScript==

(function() {
  'use strict';

  const cleanup = node => {
    if (node.tagName !== 'A') return;

    const href = node.href;
    if (!href.startsWith('https://www.youtube.com/watch?') && !href.startsWith('https://youtu.be/')) return;

    const url = new URL(href);
    [...url.searchParams.keys()]
      .filter(k => k !== 'v')
      .forEach(k => url.searchParams.delete(k));

    const newHref = url.toString();
    if (newHref !== href) {
      node.href = newHref;
    }
  };

  const process = node => {
    if (node.nodeType !== 1) return;

    if (node.matches?.('span.style-scope.ytd-topbar-logo-renderer')) {
      node.style.display = 'none';
      return;
    }

    if (node.tagName === 'A') {
      cleanup(node);
    }
    node.childNodes.forEach(process);
  };

  const subscribeOnChanges = (node, f) => {
    f(node);
    new MutationObserver(mutations => mutations.forEach(m => m.addedNodes.forEach(process)))
      .observe(node, { childList: true, subtree: true });
  };

  subscribeOnChanges(document.body, process);
})();
