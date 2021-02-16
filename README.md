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
NOTES
- The executable can be found in `./release/SusmongusApp Setup {app_version}.exe`.
- You must either run the [accompanying skill](https://github.com/aindaco1/susmongus-jovo) or use the Alexa skill (currently in beta) for the app to work since it relies on a lambda-generated six-digit code provided via Alexa to get past the login screen.
- App icons only bundles when the app is packaged -- the default Electron app icons are used in development (for now)
