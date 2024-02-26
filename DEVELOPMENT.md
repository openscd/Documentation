# Development

This site is built using [Jekyll](https://jekyllrb.com).


## Local Development
If you want to develop locally, you first have to change some configuration.

In `_config.yaml` you can comment out the `url` and `baseurl` keys. These are needed for GitHub pages to create urls.

you can use the [Docker Compose](./docker-compose.yml) file.

```bash
docker-compose up -d
```

This runs the Jekyll engine and watches for any changes. After changing a file, you can simply reload the webbrowser to see the changes.

> **_NOTE:_**  Changes made to `_config.yaml` require a restart from docker-compose.


## Structure

### Includes
The includes folder contains HTML and MarkDown partials that can be reused and included into layouts.

### Layouts
The layouts folder contains the HTML layout for any page. To use a layout, you can add FrontMatter to a page or post specifying the layout (without extension).

```
---
layout: default
---
```
### Assets
The assets folder contains static assets that are loaded by layouts and/or pages.

### Collections
The collections folder contain collections that are used by Jekyll. If you want to add a new guide, simply create a new MarkDown file in `collections/_guides`.

### Pages
The pages folder contains static pages that are rendered by Jekyll into HTML. This folder can contain MarkDown files as well as HTML files.