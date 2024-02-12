---
layout: default
title: Guides
subtitle: Guides 
cover: solar
---

<main class="content">
    <div class="guides">
        {% for guide in site.guides %}
            <div class="guide">
                <a class="card card--selectable" href="{{ guide.url || relative_url }}">
                    <div class="card__header">
                        {{ guide.title }}
                    </div>
                    <div class="card__sub-header">
                        <span>
                            <i class="material-symbols-outlined">schedule</i>
                            {{ guide.content | reading_time }}
                        </span>
                        <span>
                            {% for i in (1..guide.difficulty) %}
                                <i class="material-symbols-outlined">grade</i>
                            {% endfor %}
                        </span>
                    </div>
                    <div class="card__content">
                        {{ guide.summary }}
                    </div>
                </a>
            </div>
        {% endfor %}
    </div>
</main>
