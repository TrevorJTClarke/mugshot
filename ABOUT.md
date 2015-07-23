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


#### Wishlist

  * AWS S3 Integration
  * Github Integration
    * Project/User sharing (Auth + Sessions)
    * Run a repo
      * Choose branches to run between
  * Submit Jira ticket
  * Local no-server testing
  * Record User Actions


#### TODO:

  * Backend
    * setup resemble.js https://www.npmjs.com/package/node-resemble-js
    * Setup reference Screenshots and storage

  * UI
    * Setup tooltips
    * Setup Runner
      * dynamic image sets
    * Finish Modal
      * Compare stats in title
    * Settings Save Validation


#### Helpful

gulp=spawn(process.env.SHELL, ['-c', 'cd ' + project.directory + ' && gulp'])
childProcess.execFileSync(process.env.SHELL, ['-i', '-c', 'launchctl setenv PATH "$PATH"'])
var gulpPath = path.join(__dirname, '../', 'node_modules', 'gulp', 'bin', 'gulp.js');
gulp=spawn(gulpPath, {cwd: project.directory});
