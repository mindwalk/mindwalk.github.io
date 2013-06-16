# README

* Install Node.js
* `cd` into the project directory
* Run `npm install -g grunt-cli` to install grunt globally
* Run `npm install` to install all development dependencies

## Available Tasks

* To check all JavaScript files via JSHint, run `grunt`
* To run a webserver on port 8000 with the project, just run `grunt server`

## Adding a new browser dependency

* Add your dependency to `bower.json`
* Run `grunt vendor`
* Commit the new `bower.json` and vendor CSS and JS files.
