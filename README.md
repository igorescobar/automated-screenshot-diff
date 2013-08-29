automated-screenshot-diff
=========================

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
#### To compare release v1 and v2, and saving the analysis as HTML.
```bash
$ automated-screenshot-diff compare -p v1 -c v2 -s screenshots/ -o html
```
#### To compare release v1 and v2, and saving the analysis as JSON.
```bash
$ automated-screenshot-diff compare -p v1 -c v2 -s screenshots/ -o json
```

## Demonstration
##### login_widget-v1.png
![login_widget-v1.png](http://img15.imageshack.us/img15/3887/bjwf.png)
##### login_widget-v2.png
![login_widget-v1.png](http://img823.imageshack.us/img823/3369/6ig7.png)
##### Perceptual Diff Between login_widget-v1.png and login_widget-v2.png
![login_widget-v1.png](http://img27.imageshack.us/img27/1710/7o7o.png)
##### HTML Ouput example
![v1-v3-diff.html](http://img90.imageshack.us/img90/782/ffp.png)
