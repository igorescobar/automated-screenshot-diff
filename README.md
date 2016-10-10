automated-screenshot-diff
=========================
[![NPM](https://nodei.co/npm/automated-screenshot-diff.png)](https://nodei.co/npm/automated-screenshot-diff/)

Continuous Safe Deployment Made Easy

## Why?
Although testing gains evidence in software development every day, it is still rare to find a test strategy that goes beyond functional testing. While layout testing remains forgotten by most, we all have seen cases where the application functionally works just fine but that button somehow got moved 2 pixels do the right or that table cell lost it's alignment and the client won't approved it. Manually testing each screen tends to be error prone since some changes are too small for a QA to notice (specially after seeing dozens of other screens) and it can take weeks depending on the system's size and complexity. Automated Screenshot Diff allows you and your team to extend test coverage up to the application layout, making sure yor're aware of any layout changes whether you use manual or automated testing strategies.

## How it Works?
It's simple. All you have to do is generate your system's screenshots with a simple naming convention:
Example:
```
SCENARIO_NAME-VERSION.png // login_screen-v1.png
```
Then `automated-screenshot-diff` will scan your screenshot's folder 
and calculate differences between your pre-production (stage) release and your production release. All generated image diffs will be
in the same directory as your screenshots. If you don't known how to gereate those screenshots, take a look at [examples folder](https://github.com/igorescobar/automated-screenshot-diff/tree/master/examples). 

You can also use this wrapper developed by @lisotton and use it to make easier to generate all those screenshots: [screenshot-crawller](https://github.com/lisotton/screenshot-crawler)

## Dependencies
  * [Node.JS](http://nodejs.org/)
  * [Cairo](http://cairographics.org)

## Installation (Mac)
```bash
$ xcode-select --install
// download and install XQuartz: http://xquartz.macosforge.org/downloads/SL/XQuartz-2.7.5.dmg
$ brew install cairo
$ export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/opt/X11/lib/pkgconfig
$ npm install -g automated-screenshot-diff
```
## Usage Examples
![Screenshot Example](https://raw.githubusercontent.com/igorescobar/automated-screenshot-diff/master/test/images/login_widget-v1.png)

#### To compare release v1 and v2.
```bash
$ automated-screenshot-diff compare --previous-release v1 --current-release v2 --source screenshots/
```
#### To compare release v1 and v2, ignoring not changed scenarios.
```bash
$ automated-screenshot-diff compare --previous-release v1 --current-release v2 --source screenshots/ --ignore-not-changed=true
```
#### To compare release v1 and v2, and saving the analysis as HTML.
```bash
$ automated-screenshot-diff compare -p v1 -c v2 -s screenshots/ -o html
```
#### To compare release v1 and v2, and saving the analysis as JSON.
```bash
$ automated-screenshot-diff compare -p v1 -c v2 -s screenshots/ -o json
```
#### To compare release v1 and v2, and saving the analysis as JSON and HTML.
```bash
$ automated-screenshot-diff compare -p v1 -c v2 -s screenshots/ -o json,html
```

## Demonstration
##### login_widget-v1.png
![login_widget-v1.png](https://raw.githubusercontent.com/igorescobar/automated-screenshot-diff/master/test/images/login_widget-v1.png)
##### login_widget-v2.png
![login_widget-v1.png](https://raw.githubusercontent.com/igorescobar/automated-screenshot-diff/master/test/images/login_widget-v2.png)
##### Perceptual Diff Between login_widget-v1.png and login_widget-v2.png
![login_widget-v1.png](https://raw.githubusercontent.com/igorescobar/automated-screenshot-diff/master/test/images/login_widget-v1-v2-diff.png)
##### HTML Ouput example
![v1-v3-diff.html](https://s11.postimg.org/61k207rhf/Screen_Shot_2016_10_10_at_19_01_42.png)
