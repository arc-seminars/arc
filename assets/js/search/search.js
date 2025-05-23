// base from https://github.com/frjo/hugo-theme-zen/blob/main/assets/js/search.js
import * as params from '@params';

(function () {
  const index = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['title', 'speaker', 'tags', 'shortdate', 'longdate'],
      store: ['title', 'speaker', 'tags', 'shortdate', 'permalink', 'cancelled'],
    },
    tokenize: 'forward',
  });

  function showResults(items) {
    const template = document.querySelector('template').content;
    const fragment = document.createDocumentFragment();

    const results = document.querySelector('.search-results');
    results.textContent = '';

    for (const id in items) {
      const item = items[id];
      const result = template.cloneNode(true);
      const a = result.querySelector('a');
      const content = result.querySelector('.content');
      a.innerHTML = item.title;
      a.href = item.permalink;

      if (item.cancelled) {
        content.innerHTML = `<strong>Speaker:</strong> ${item.speaker} | <strong>Date:</strong> <s>${item.shortdate}</s> (<strong>cancelled</strong>)<br><strong>Tags:</strong> <i>${item.tags}</i>`
      }
      else
      {
        content.innerHTML = `<strong>Speaker:</strong> ${item.speaker} | <strong>Date:</strong> ${item.shortdate}<br><strong>Tags:</strong> <i>${item.tags}</i>`
      }

      console.log(item)
      fragment.appendChild(result);
    }
    results.appendChild(fragment);
  }

  function doSearch(q) {
    const query = q || document.querySelector('.search-text').value.trim();
    const results = index.search({
      query: query,
      enrich: true,
      limit: params.searchLimit,
    });
    const items = {};
    results.forEach(function (result) {
      result.result.forEach(function (r) {
        items[r.doc.permalink] = r.doc;
      });
    });
    showResults(items);
  }

  function enableUI(searchform) {
    searchform.addEventListener('submit', function (e) {
      e.preventDefault();
      doSearch();
    });
    searchform.addEventListener('input', function () {
      doSearch();
    });
    document.querySelector('.search-loading').classList.add('hidden');
    document.querySelector('.search-bar').classList.remove('hidden');
    document.querySelector('.search-text').focus();
  }

  function buildIndex(cb) {
    const searchindex = params.basePath + 'searchindex.json';
    document.querySelector('.search-loading').classList.remove('hidden');
    fetch(searchindex)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.forEach(function (item) {
          index.add(item);
        });
      })
      .then(cb);
  }

  const searchform = document.querySelector('.search-form');
  if (searchform) {
    buildIndex(function () {
      const q = new URLSearchParams(window.location.search).get("q");
      document.querySelector('.search-text').value = q || '';
      doSearch(q);
    });
    enableUI(searchform)
  }
})();
