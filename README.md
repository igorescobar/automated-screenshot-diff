automated-screenshot-diff
=========================

Continuous Safe Deployment Made Easy


## Why?

## How it Works?
It's simple. All you have to do it's generate your system's screenshots with a simple naming convention:
Exemple:
```
SCENARIO_NAME-VERSION.png // login_screen-v1.png
```
Then `automated-screenshot-diff` will scan your screenshots folder 
and calculate differences between your pre-production (stage) release and your production release.

## Dependencies
  * [NodeJS](http://nodejs.org/)
  * [PhantomJS](http://phantomjs.org)
  * [js-imagediff](https://github.com/HumbleSoftware/js-imagediff)
  * [node-canvas](https://github.com/LearnBoost/node-canvas)
  * [Cairo](http://cairographics.org)

## Instalation
```bash
$ npm install -g automated-screenshot-diff
```
## Usage Examples
![Screenshot Example](http://imageshack.us/a/img854/9624/87w6.png)

#### To compare release v1 and v2.
```bash
$ automated-screenshot-diff compare --previous-release v1 --current-release v2 --source screenshots/
```
#### To compare release v1 and v2, ignoring not changed scenarios.
```bash
$ automated-screenshot-diff compare --previous-release v1 --current-release v2 --source screenshots/ --ignore-not-changed=true
```

