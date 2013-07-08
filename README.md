automated-screenshot-diff
=========================

Continuous Safe Deployment Made Easy

## How it Works?
It's simple. All you have to do is generate your system's screenshots with a simple naming convention:
Example:
```
SCENARIO_NAME-VERSION.png // login_screen-v1.png
```
Then `automated-screenshot-diff` will scan your screenshot's folder 
and calculate differences between your pre-production (stage) release and your production release. All generated image diffs will be
in the same directory as your screenshots. If you don't known how to gereate those screenshots, take a look at [examples folder](https://github.com/igorescobar/automated-screenshot-diff/tree/master/examples).

## Dependencies
  * [Node.JS](http://nodejs.org/)
  * [Cairo](http://cairographics.org)

## Instalation
```bash
$ npm install -g automated-screenshot-diff
```
## Usage Examples
![Screenshot Example](http://img580.imageshack.us/img580/5731/3bs.png)

#### To compare release v1 and v2.
```bash
$ automated-screenshot-diff compare --previous-release v1 --current-release v2 --source screenshots/
```
#### To compare release v1 and v2, ignoring not changed scenarios.
```bash
$ automated-screenshot-diff compare --previous-release v1 --current-release v2 --source screenshots/ --ignore-not-changed=true
```

## Demonstration
##### login_widget-v1.png
![login_widget-v1.png](http://img15.imageshack.us/img15/3887/bjwf.png)
##### login_widget-v2.png
![login_widget-v1.png](http://img823.imageshack.us/img823/3369/6ig7.png)
##### Perceptual Diff Between login_widget-v1.png and login_widget-v2.png
![login_widget-v1.png](http://img27.imageshack.us/img27/1710/7o7o.png)

