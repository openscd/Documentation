---
layout: default
title: Plugins
hide_landing: true
---
<section class="hero hero--landing">
    <div class="row">
        <div class="column column--1">
            <h1 class="title">
                Plugins
            </h1>
        </div>
    </div>
</section>
<main class="content">
    <aside>
        <div class="card">
            <div class="card__content">
                <ul class="list">
                    <li class="list__item">
                        <a href="{{ '/pages/plugins' | relative_url }}">
                            All
                        </a>
                    </li>
                    <li class="list__item">
                        <a href="{{ '/pages/plugins/menu' | relative_url }}">
                            Menu
                        </a>
                    </li>
                    <li class="list__item">
                        <a href="{{ '/pages/plugins/editor' | relative_url }}">
                            Editor
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
    <div class="plugins">
        {% for plugin in site.plugins %}
            <div class="plugins__plugin">
                <div class="card">
                    <div class="card__header">
                        {{ plugin.name }}
                    </div>
                </div>
            </div>
        {% endfor %}
    </div>
</main>

