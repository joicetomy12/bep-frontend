Experience Platform
-------------------


### Getting Started

- First, install all dependencies with `yarn install`.
- Generate Next.js build `yarn build`.
- Start development server `yarn dev`.
- Navigate to [http://localhost:3000](http://localhost:3000) on your browser.

### Useful Commands
Following `yarn` command has been configured in `package.json`

- `yarn dev` - Start development server
- `yarn build` - Build app for deployment
- `yarn start` - Start production server 
- `yarn export` - Export production build
- `yarn lint` - Find and auto fix problems into the code

### ⊚ Deploy on Netlify

- On Netlify, Click on new site from git.
- Select Cloned Repository.
- Choose VCS.
- Add build command `next build && next export`.
- Add publish directory `out`.

### Dependencies:

  * [React](https://github.com/facebook/react)
  * [Next.js](https://github.com/zeit/next.js)
  * [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
  * [React-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
  * [D3](https://github.com/d3/d3)
  * [D3-ease](https://github.com/d3/d3-ease)
  * [Styled-Components](https://github.com/styled-components/styled-components)
  * [Mapbox-gl](https://github.com/mapbox/mapbox-gl-js)
  * [Popper.js](https://github.com/popperjs/popper-core)
  * [React-multi-carousel](https://github.com/YIZHUANG/react-multi-carousel)
  * [ESLint](https://github.com/eslint/eslint)
  * [ESLint](https://github.com/eslint/eslint)
  * [eslint-config-airbnb](https://github.com/airbnb/javascript)
  * [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security)
  * [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort#readme)
  * [Prettier](https://github.com/prettier/prettier)
  * [Husky](https://github.com/typicode/husky) & [Lint-Staged](https://github.com/okonet/lint-staged)


### Structure overview
```
├── README.md
├── package.json
├── pages
│   ├── _app.js
│   └── index.js
├── public
│   └── assets
├── src
│   ├── .data
│   ├── components
│   ├── config
│   ├── providers
│   ├── styles
└── .eslintignore
└── .eslintrc
└── .gitignore
└── .prettierignore
└── .prettierrc
└── yarn.lock
```
### Guidelines
- Keep components small 
- Make function very specific and small, a function should not go beyond 15 lines of code
- Keep components reusable 
- Follow Don't Repeat Yourself (DRY) 
- Comment only where necessary, make code clean
- Remove comment codes
- Name the component after the function
- Use capital component name and follow camelCase for other
- Follow the linting rules
- Run `yarn lint`, `yarn build` before pushing the code in remote repo
- Use `hooks` wherever needed
- Be careful while picking any `NPM` package, cross-check package updates, stars, developers etc.

### Event Categories
- campfireEvent
- brandStoreEvent
- classicEvent
- store
- people
