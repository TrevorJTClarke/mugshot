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
      * Stats (pass/fail)
        * Images with click compare
  * Settings View
    * Credentials
    * Project file storage if no S3 Configs
  * Comparison View (project level)
    * Score pass/fail
    * Image Side by Side Comparison
    * Image Overlay Comparison
  * Remote Management
    * Upload to S3
    * Store config on S3
    * See all images per project


#### Wishlist

  * Run a local repo
    * Choose branches to run between
  * Github Integration



#### Helpful

gulp=spawn(process.env.SHELL, ['-c', 'cd ' + project.directory + ' && gulp'])
childProcess.execFileSync(process.env.SHELL, ['-i', '-c', 'launchctl setenv PATH "$PATH"'])
var gulpPath = path.join(__dirname, '../', 'node_modules', 'gulp', 'bin', 'gulp.js');
gulp=spawn(gulpPath, {cwd: project.directory});


.image-thumb {
    width: 580px;
    height: 500px;
    object-fit: contain;
    object-position: center;
}
