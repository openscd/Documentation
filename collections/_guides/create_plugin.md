---
difficulty: 2
summary: Create a plugin for OpenSCD in just a couple of steps
title: How to write a plugin for OpenSCD
toc: true
layout: guide
cover: solar
---


This tutorial will explain on how to write a plugin for OpenSCD.

## Prerequisites
* Node ( LTS)
* Git
* An IDE

In this example, we will use the Lit framework ([https://lit.dev](https://lit.dev)) to create a plugin for OpenSCD. On top of the Lit framework, we make use of the standards provided by Open Web Components ([open-wc.org](https://open-wc.org/)).


# Scaffolding a new plugin
We can scaffold a new empty project by using the `@open-wc` init command.

{% highlight ts %}
npm init @open-wc
{% endhighlight %}

---

When prompted, choose the following:

`What would you like to do today?` › Scaffold a new project

`What would you like to scaffold?` › Web Component

`What would you like to add?` › Linting (eslint & prettier), Testing (web-test-runner), Demoing (storybook)

`Would you like to use typescript?` › Yes

`What is the tag name of your web component?` › oscd-my-new-plugin

---

After scaffolding is complete, the first thing that we need to do is to change the plugin class.

Open the `OscdMyNewPlugin.ts` file in the `src` folder and change the following line:

{% highlight ts %}
- export class OscdMyNewPlugin extends LitElement {
+ export default class OscdMyNewPlugin extends LitElement {
{% endhighlight %}

> Note the `default` keyword.

---

Now, the `src/oscd-my-new-plugin.ts` file needs to be changed:

{% highlight ts %}
- import { OscdMyNewPlugin } from './OscdMyNewPlugin.js';
+ import  OscdMyNewPlugin from './OscdMyNewPlugin.js';
{% endhighlight %}

> Note the removed brackets

---

The last thing we have to change, is the `src/index.ts` file.

{% highlight ts %}
- export { OscdMyNewPlugin } from  './OscdMyNewPlugin.js';
+ export * from './OscdMyNewPlugin.js';
{% endhighlight %}

> Note the asterisk on export

---

This change is making sure that the plugin is default exported, so that OpenSCD can dynamically import it correctly.

# Setting up property injection
In order to start displaying or editing the SCL file, we first need to add properties that will be injected into the plugin.

Inside the `OscdMyNewPlugin.ts` file, add the following code:

{% highlight ts %}
import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class OscdMyNewPlugin extends LitElement {

  @property({ type: Object }) 
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  @property({ type: String })
  locale!: string;

  ...
{% endhighlight %}

These properties will be injected into the Plugin from the OpenSCD host.

# Choosing the Plugin type
OpenSCD currently supports 2 different plugin types.
* Menu type plugins
* Editor type plugins

## Menu type plugins
---
Menu type plugins usually run on the background. They are displayed in the sidebar menu and are rendered at all times.
Example of menu type plugins are:
* Validators
* Generators

## Editor type plugins
---
Editor type plugins are displayed in the main Editor. An editor type plugin will be rendered when it's being activated by the Tab bar on top of OpenSCD.
Examples of editor type plugins are:
* Communication editor
* Substation editor
* Single Line Diagram

If you choose to make your plugin a Menu type plugin, you need to implement the `run` method in your plugin.

{% highlight ts %}
import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class OscdMyNewPlugin extends LitElement {

  @property({ type: Object }) 
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  @property({ type: String })
  locale!: string;

  async run(): Promise<void> {
	... Plugin implementation goes here
  }
  
{% endhighlight %}

If you choose to make your plugin an Editor type plugin, you need to implement the `render` function from Lit.

{% highlight ts %}
import { html, css, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

export default class OscdMyNewPlugin extends LitElement {

  @property({ type: Object }) 
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  @property({ type: String })
  locale!: string;

  render(): TemplateResult {
    return html`<div>My plugin works!</div>`;
  }
{% endhighlight %}

In this example, we'll choose for an editor type plugin.

# Adding functionality to the plugin

The SCL document can be traversed like any other HTMLElement. 
Let's say you want to list all the SubStations inside the plugin.
You can do so by using 

{% highlight ts %}
Array.from(doc.querySelectorAll('Substation')).map((substation) => substation.getAttribute('name'));
{% endhighlight %}

{% highlight ts %}
import { html, css, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

export default class OscdMyNewPlugin extends LitElement {

  @property({ type: Object }) 
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  @property({ type: String })
  locale!: string;

  renderSubstationNames(): TemplateResult {
    return html`<ul>
      ${Array
        .from(this.doc.querySelectorAll('Substation'))
        .map((substation) =>  substation.getAttribute('name'))
        .map((name) =>  html`<li>${name}</li>`)
      }</ul>`;
  }
  
  render(): TemplateResult {
    return html`<div>${this.renderSubstationNames()}</div>`;
  }
{% endhighlight %}

You can make the plugin as simple or difficult as you want.


# Building the plugin
After implementing your logic in the plugin, it's time to build the plugin.
Thankfully, the Open-WC standard provides us with npm scripts to easily build the plugin. 


{% highlight ts %}
npm run build
{% endhighlight %}

The script above creates the build output which can be hosted on GitHub for example. Just copy over the build directory and you're good to go.

---

And that's it! You just successfully created and built a plugin that can be used with OpenSCD.

In a different guide, we will cover more advanced things, like editing the SCL file.

> If you're looking for the full code of this guide, [you can find it here](https://github.com/openscd/oscd-plugin-template). This repository also has templates for other frameworks.