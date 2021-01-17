## Installation

```js
yarn // installs all dependencies
```

## Usage

To run the app locally, enter the following in your terminal:

```js
yarn start // run locally for development
```

To package the app for release, enter the following in your terminal:

```js
yarn package
```
NOTE: the executable can be found in `release/SusmongusApp Setup {app_version}.exe`

## TODOs

- Calling `clear-sus` from `main.dev.ts` doesn't seem to work at the moment.
- For now, app icons in development default to the Electron app icon. However, they're correct after the app has been packaged.
