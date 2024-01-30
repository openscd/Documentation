---
layout: guide
name: How to write a component
summary: Write a component
toc: true
---

When writing a good component, it's good to have a few things in mind. We follow the standards of [@open-wc](https://open-wc.org). On top of these standards, we have some custom standards to have a better and consistent way of working.

To get started right away, please check out the [starter component](https://github.com/openscd/oscd-component)

## Designing
Before start working on a new component, we can make use of [Figma](https://figma.com) to design the component. A figma organization is in place [here]().

## Development

### Coding
For a consistent development process, we have [EsLint](https://eslint.org/) in place.

### Styling
We make use of css variables. Basic variables can be seen [here](..).

## Testing
We can divide testing into 2 parts, unit testing and integration testing.
For unit testing, we use the `.spec.ts` files. For integration testing, we use the `.test.ts` files.
To unit test a component, we can create the component class as-is and test the exposed functions.
To integrate test a component, we can make a `fixture` from the webcomponent and test that `fixture`.
We also screenshot test each component.

## Demoing
For demoing the component, we make use of [Storybook](https://storybook.js.org/).
It's important to keep in mind that we only want to demo the current component in a story. Best way is to have a story for each variant. 
Let's say we have a custom element called my-button. This button can have 2 colors, primary and secondary. This button can also have the state `disabled`.
This means that we need 4 stories: `primary`, `primary/disabled`, `secondary` and `secondary/disabled`.


## Documentation

### Cem Analyzer
You can add comments to your component, so the Custom Element Manifest Analyzer ([CEM Analyzer](https://www.npmjs.com/package/@custom-elements-manifest/analyzer)) can generate docs from this.

CEM analyzer supports the following annotations:

|  |  |
|--|--|
|@slot [name] | Document the named slot on top of the class |
| @slot | Document the default slot on top of the class |
| @cssprop | Document the css property on top of the class |
| @event [name] | Document the events that can be fired from this component on top of the class |
| @prop [name] | Document the property |
| @internal / @ignore | Ignore these from CEM | 

Example:
```js
/**
 * @slot icon - You can place the icon for the button here
 * @slot - Default button slot
 * @cssprop --text-color - Controls the color of the button
 * @cssprop --background-color - Controls the background of the button
 * 
 * @event {click} clickEvent - Emits a click event when button is clicked
 *
 * @summary This is the `my-button` Component, which represents a styled button.
 * 
 * @tag my-button
 */
 @customElement('my-button')
 export class MyButton extends LitElement {
 
    /**
     * @prop {String} title - The title of the button. Showed when hovering over the button.
     */
    @property({
        type: String
    })
    title: string = '';
    
    render(): TemplateResult {
        return html`<button
            class="button button--primary"
            @click=${() => this.handleClick}
            title=${this.title}
            >
            <span slot="icon"></span>
            <slot></slot>
        </button>`;
    }

    private handleClick() {
        this.dispatchEvent(new CustomEvent('click');
    }

    static styles = css`
        .button {
            background: var(--background-color);
            color: var(--text-color);
        }
    `;
}
```
## Deploying
We deploy our components to [npmjs](https://npmjs.org). To test this locally, you can make use of [verdaccio](https://https://verdaccio.org/). Verdaccio is a local npm registry.
To make verdaccio work, just follow the installation process [here](https://verdaccio.org/docs/installation).
Next, create a `.npmrc` in your project root that points to your verdaccio registry.

Example:
```env
registry=http://localhost:4873
```

Now you can test your published component in a new project (just use `npm i [component_name] --regsitry=http://localhost:4873`

Storybook can be deployed to the GitHub Pages of the repository.

To do automatic deploys, you can check out the GitHub actions in [oscd-component](https://github.com/openscd/oscd-component/tree/main/.github/workflows).