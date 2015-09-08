## App Direction

This app is focussed on delivering a simple UI to visual regression testing.

#### Abstract

  * Projects View
    * Add, View, Remove
    * Settings
      * Title
      * Setup cookies
      * Setup Selectors
      * Setup Hide/Removes
      * Events
      * Media Queries
      * Full page render
    * Runner View
      * Progress Bar
      * Intro
        * see last run (if any)
        * start new run
        * start reference
      * Stats (pass/fail)
        * Images with click compare
      * Checkout history
  * Comparison View (project level)
    * Score pass/fail
    * Image Side by Side Comparison
    * Image Overlay Comparison
  * Settings View
    * Credentials
    * Project file storage if no S3 Configs
  * Remote Management
    * Upload to S3
    * Store config on S3
    * See all images per project


#### TODO:

  * Backend
    * Setup control flow:
      * Get Webpage:
        1. set all cookies
        2. then refresh
        3. resize to fit dimensions
        4. take snapshot of whole page
        5. get all element dimensions and positions
        6. crop images to areas of elements
        7. if more sizes, repeat 3 - 5
    * build out Selenium within the browserDriver module
      * use diff threshold from settings
      * delete all $$hashKey references
    * fix release dependencies (for packaging)
  * Methods Notes:  
    * Optimizations: pageLoadTimeout, setScriptTimeout
    * For window sizing, getSize(), this will allow for pixel density calc
    * webdriver.WebElement.prototype.getDriver
    * webdriver.WebElement.prototype.getLocation

  * UI
    * Setup thumbnail for project main url (Sidepanel)

    element.sendKeys("text was",
      webdriver.Key.chord(webdriver.Key.CONTROL, "a"),
      "now text is");

  * Auto Install Items
    * imagemagick
    * Selenium (and drivers)
    * node dependencies?

#### Wishlist

  * (!!) Amplitude Integration
  * (!!) Submit Jira ticket
    * https://developer.atlassian.com/jiradev/jira-apis/jira-rest-apis
      /jira-rest-api-tutorials/jira-rest-api-example-create-issue
  * (!!) go back in history and view batch
  * (!!!) see results with historical graphs
  * (!!!) Capture Console Logger
  * (!!!) Github Integration
    * Project/User sharing (Auth + Sessions)
    * Run a repo
      * Choose branches to run between
  * (!!!!) Local no-server testing
  * (!!!!) Record User Actions
  * (!!!!) Modal with device view
  * (!!!!) auto-detect media queries

#### Jira Integration Notes

  * Need to create:
    * Login
    * Find Project Id, issuetype Id
    * Figure out how to attach screenshots hosted in S3


#### Helpful

gulp=spawn(process.env.SHELL, ['-c', 'cd ' + project.directory + ' && gulp'])
childProcess.execFileSync(process.env.SHELL, ['-i', '-c', 'launchctl setenv PATH "$PATH"'])
var gulpPath = path.join(__dirname, '../', 'node_modules', 'gulp', 'bin', 'gulp.js');
gulp=spawn(gulpPath, {cwd: project.directory});

https://discuss.atom.io/t/not-able-to-spawn-npm-modules-from-electron-package-in-os-x-solved/18905/4
I run 'which gulp' or something similar on the target computer

figure out where that executable is located

ensure its NOT in my PATH

then I test the command

then I know that the only way it could work is if its using my version

__dirname+'/../node/bin'


electron-packager . 'MyApp' --platform=darwin --arch=x64 --version=0.29.2 --ignore=node_modules/electron-* --ignore=node_modules/gulp* --ignore=bower_components --ignore=client && cp atom.icns 'MyApp-darwin-x64/MyApp.app/Contents/Resources/atom.icns'


var sheets = document.styleSheets;

for (var i = 0; i < sheets.length; i++) {
  var rules = sheets[i].cssRules;

  for (var i = 0; i < rules.length; i++) {
    if (rules[i].media) {
      console.log('rules[i].media', rules[i].media);
    }
  }
}


window.devicePixelRatio
