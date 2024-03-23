# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Building for github pages

### script style

Just fire away and follow the instructions.
```
./release.sh
```

### manually

1. Commit all your changes and merge your feature branch into `master`:

```bash
git checkout master
git merge 1-some-feature-branch
```

2. Bump version in package.json. Choose one of the following commands based on the type of changes you've made:

```bash
npm version patch # for backward-compatible bug fixes
npm version minor # for backward-compatible new features
npm version major # for changes that break backward compatibility
```

This command will also create a new commit and tag with the new version number.

3. Build the release:

```bash
npm run release
```

4. Add the `docs` directory and commit the release. The commit message should include the new version number:

```bash
git add docs
git commit -m "Release v$(node -p -e "require('./package.json').version")"
```

5. Push the `master` branch and the new tag to the remote repository:

```bash
git push origin master
git push origin v$(node -p -e "require('./package.json').version")
```

6. Check the release at the following URL:
https://turbotobbe.github.com/twitch-overlays/

## Dev tips

* `import reactLogo from './assets/react.svg';`
* `const viteLogo = `${import.meta.env.BASE_URL}vite.svg`;`
