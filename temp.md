<!-- <ul>
    {% assign pageNumber = 1 %}
  {% for page in site.pages %}
    {% if page.url contains '/colledges/' and page.url contains '.html' %}
      <li>{{ pageNumber }}、<a href="{{ page.url }}">{{ page.name }}</a></li>
    {% assign pageNumber = pageNumber | plus: 1 %}
    {% endif %}
     {% if page.url contains '/tech/' and page.url contains '.html' %}
      <li>{{pageNumber  }}、<a href="{{ page.url }}">{{ page.name }}</a></li>
      {% assign pageNumber = pageNumber | plus: 1 %}
    {% endif %}

  {% endfor %}
</ul> -->
