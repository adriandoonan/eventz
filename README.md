# Eventz!

This is a project created as part of the Ironhack web development bootcamp. Its aim is to showcase creative and artistic events.

## Running locally

The project is built using react as a frontend and a mock API provided by [json-server](https://github.com/typicode/json-server) as the backend. For more information on the backend, see the related [event-backend github repository](https://github.com/adriandoonan/eventz-backend).

We build using vite so once you have cloned the project just `npm install` and `npm run dev` to get the site up an running on localhost.

## Tooling

A little list some of the tools we used

- Figma for initial designs and mockups
- React & React Router for SPA
- Open Props for css props
- JSDoc for code documentation

### Setting up vscode for Open Props

To make it easier to work with Open Props, you should install the [CSS Var Complete](https://marketplace.visualstudio.com/items?itemName=phoenisx.cssvar) extension for VS Code and add the following to your `.vscode/settings.json` file:

```json
// .vscode/settings.json file
{
    ...
  "cssvar.files": [
    "./node_modules/open-props/open-props.min.css",
    // if you have an alternative path to where your styles are located
    // you can add it in this array of files
    "assets/styles/variables.css"
  ],

  // Do not ignore node_modules css files, which is ignored by default
  "cssvar.ignore": [],

  // add support for autocomplete in JS or JS like files
  "cssvar.extensions": [
    "css", "scss", "postcss", "jsx", "tsx"
  ]
}
```

> Remember to only paste the part inside the curly braces! Check out [this youtube video](https://youtu.be/cq7c3tawEnI?si=nPR8iy0EKfHH0qLf&t=566) if you get stuck (it should start at around nine and a half minutes) but the rest is quite interesting too ;)

Once you have done that, restart VS Code and then, whenever you start writing `var(--...` you should get an autocomplete containing all the Open Props variables as well as any you have set in the `.scss` file itself.
