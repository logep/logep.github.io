document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  simpleJekyllSearch({
    searchInput: searchInput,
    resultsContainer: searchResults,
    json: '{{ site.baseurl }}/search.json',
    searchResultTemplate: '<li><a href="{url}">{title}..</a></li>',
    noResultsText: 'No results found',
  });
});

// document.addEventListener('DOMContentLoaded', function() {
//   const searchInput = document.getElementById('search-input');
//   const searchResults = document.getElementById('search-results');

//   searchInput.addEventListener('input', function() {
//     const query = searchInput.value.toLowerCase();
//     searchResults.innerHTML = '';

//     {% for page in site.pages %}
//       {% if  page.url contains '.html' %}
//         const title = "{{ page.name | escape }}".toLowerCase();
//         const content = "{{ page.content | strip_html | escape }}".toLowerCase();

//         if (title.includes(query) || content.includes(query)) {
//           const li = document.createElement('li');
//           const a = document.createElement('a');

//           a.href = "{{ page.url }}";
//           a.textContent = "{{ page.name | escape }}";
//           li.appendChild(a);
//           searchResults.appendChild(li);
//         }
//       {% endif %}
//     {% endfor %}
//   });
// });
