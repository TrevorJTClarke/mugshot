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
    * Setup tooltips
    * Finish Runner
      * post reference/pre compare view
    * Finish Modal
      * Compare stats in title

  * AWS S3 Integration
    * Upload, Sync, Load/Save projects
  * Settings:
    * AWS:
      * KEY, Secret, region
      * Auto-sync project
    * Project
      * AWS:
        * region
        * bucket
        * Auto-sync


#### Wishlist

  * Github Integration
    * Project/User sharing (Auth + Sessions)
    * Run a repo
      * Choose branches to run between
  * Submit Jira ticket
    * https://developer.atlassian.com/jiradev/jira-apis/jira-rest-apis
        /jira-rest-api-tutorials/jira-rest-api-example-create-issue
  * Local no-server testing
  * Record User Actions


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
