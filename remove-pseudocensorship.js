// ==UserScript==
// @name Remove Pseudocensorship
// ==/UserScript==

(function() {
  'use strict';

  const process = node => {
    if (node.nodeType !== 1) return;

    if (node.tagName === 'P' && node.innerText.includes('НАСТОЯЩИЙ МАТЕРИАЛ (ИНФОРМАЦИЯ)')) {
      node.style.display = 'none';
      return;
    }

    node.childNodes.forEach(process);
  };

  const onChange = (node, f) => {
    f(node);
    new MutationObserver(mutations => mutations.forEach(m => m.addedNodes.forEach(process)))
      .observe(node, { childList: true, subtree: true });
  };

  onChange(document.body, process);
})();
