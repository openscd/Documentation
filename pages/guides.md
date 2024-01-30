---
layout: default
title: Guides
subtitle: Guides 
cover: solar
---

<section class="hero hero--landing">
    <div class="row">
        <div class="column column--1">
            <h1 class="title">
                Guides
            </h1>
        </div>
    </div>
</section>
<main class="content">
    <div class="guides">
        {% for guide in site.guides %}
            <div class="guide">
                <div class="card">
                    <div class="card__header">
                        <a href="{{ guide.url | relative_url }}">{{ guide.name }}</a>
                    </div>
                    <div class="card__content">
                        {{ guide.summary }}
                    </div>
                </div>
            </div>
        {% endfor %}
    </div>
</main>
