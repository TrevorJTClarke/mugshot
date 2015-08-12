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
    * use diff threshold from settings

  * UI
    * Finish Runner
      * post reference/pre compare view
    * Finish Modal
      * Compare stats in title
    * Status Center (show syncing, paused, progress)
  * Project Setting AWS Auto-sync
  * AWS Project settings/history sync
  * clear history images
  * fix release dependencies


#### Wishlist

  * Selenium webdriver (IE, FF, SF, CH)
  * Submit Jira ticket
    * https://developer.atlassian.com/jiradev/jira-apis/jira-rest-apis
      /jira-rest-api-tutorials/jira-rest-api-example-create-issue
  * Amplitude Integration
  * Github Integration
    * Project/User sharing (Auth + Sessions)
    * Run a repo
      * Choose branches to run between
  * Local no-server testing
  * Record User Actions
  * Capture Console Logger


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
