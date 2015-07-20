angular.module("mugtemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("main.html","<div class=\"main-static\"><i class=\"main-icon octicon octicon-paintcan\"></i><div class=\"static-title\">Pick a project on the left, or create one!</div><button class=\"btn btn-create\" ng-click=\"createNewProject()\"><i class=\"octicon octicon-plus\"></i> New Project</button></div>");
$templateCache.put("preloader.html","<div class=\"sub-wrapper loader\"><div class=\"preloader loading\"><span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span></div></div>");
$templateCache.put("projects.history.html","<div class=\"project-history\"><div class=\"filter-tabs tabs\"><button class=\"btn btn-tab tab-active\">All</button> <button class=\"btn btn-tab\">Desktop</button> <button class=\"btn btn-tab\">Tablet</button> <button class=\"btn btn-tab\">Mobile</button></div><div class=\"banner-items\"><div class=\"row banner-item banner-success\"><div class=\"banner-status\"><i class=\"octicon octicon-check\"></i></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><h5>Type: <strong>Tablet</strong></h5><h2>body_tablet_0_1_56</h2><p>3 days ago (2/4/7 13:41)</p></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><h5>Diff Threshold: <strong>0.01</strong></h5><p class=\"meta-status\"><i class=\"octicon octicon-diff-added\"></i> Passed</p><p>Analysis: <strong>23ms</strong></p></div><div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\"><div class=\"banner-preview\"><img src=\"screens/reference/0_4_body_0_phone.png\"></div></div></div><div class=\"row banner-item banner-warning\"><div class=\"banner-status\"><i class=\"octicon octicon-alert\"></i></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><h5>Type: <strong>Tablet</strong></h5><h2>body_tablet_0_1_56</h2><p>3 days ago (2/4/7 13:41)</p></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><h5>Diff Threshold: <strong>0.01</strong></h5><p class=\"meta-status\"><i class=\"octicon octicon-diff-ignored\"></i> Warning</p><p>Analysis: <strong>23ms</strong></p></div><div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\"><div class=\"banner-preview\"><img src=\"screens/reference/0_4_body_2_tablet_h.png\"></div></div></div><div class=\"row banner-item banner-error\"><div class=\"banner-status\"><i class=\"octicon octicon-issue-opened\"></i></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><h5>Type: <strong>Tablet</strong></h5><h2>body_tablet_0_1_56</h2><p>3 days ago (2/4/7 13:41)</p></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><h5>Diff Threshold: <strong>0.01</strong></h5><p class=\"meta-status\"><i class=\"octicon octicon-diff-removed\"></i> Failed</p><p>Analysis: <strong>23ms</strong></p></div><div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\"><div class=\"banner-preview\"><img src=\"screens/reference/0_4_body_0_phone.png\"></div></div></div></div></div>");
$templateCache.put("projects.html","<div class=\"header\" ng-cloak><div class=\"details\"><h1>{{project.title}}</h1><h5>{{project.meta.url || \'Please setup a url!\'}}</h5></div><div class=\"tabs\"><button class=\"btn btn-tab\" ui-sref-active=\"tab-active\" ui-sref=\"projects.runner({ id: project.id })\">Runner</button> <button class=\"btn btn-tab\" ui-sref-active=\"tab-active\" ui-sref=\"projects.history({ id: project.id })\">History</button> <button class=\"btn btn-tab\" ui-sref-active=\"tab-active\" ui-sref=\"projects.settings({ id: project.id })\">Settings</button></div></div><div class=\"sub-wrapper\" ui-view></div>");
$templateCache.put("projects.runner.html","<div class=\"project-runner\"><!-- <div class=\"preloader loading\">\n    <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span>\n  </div>\n  <div class=\"loader-title\">\n    <h2>Creating The Magix</h2>\n    <small>63% Complete</small>\n  </div> --><h3 class=\"section-title\">Results <button class=\"btn btn-right btn-section-header\">Run New Test</button></h3><div class=\"statistics\"><div class=\"stat-item stat-success\">37 Passed</div><div class=\"stat-item stat-error\">14 Failed</div><div class=\"stat-item stat-warning\">2 Warnings</div></div><div class=\"filter-tabs tabs\"><button class=\"btn btn-tab tab-active\">All</button> <button class=\"btn btn-tab\">Desktop</button> <button class=\"btn btn-tab\">Tablet</button> <button class=\"btn btn-tab\">Mobile</button></div><div class=\"banner-items\"><div class=\"row banner-item banner-success film-strip-wrap\"><div class=\"banner-status\"><i class=\"octicon octicon-check\"></i></div><div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\"><ul class=\"film-strip\"><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_2_tablet_h.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_1_tablet_v.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_2_tablet_h.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_2_tablet_h.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_1_tablet_v.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li></ul></div></div><div class=\"row banner-item banner-warning film-strip-wrap\"><div class=\"banner-status\"><i class=\"octicon octicon-alert\"></i></div><div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\"><ul class=\"film-strip\"><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_1_tablet_v.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li></ul></div></div><div class=\"row banner-item banner-error film-strip-wrap\"><div class=\"banner-status\"><i class=\"octicon octicon-issue-opened\"></i></div><div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\"><ul class=\"film-strip\"><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_2_tablet_h.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_1_tablet_v.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li><li class=\"film-thumb\"><img src=\"screens/reference/0_4_body_0_phone.png\"></li></ul></div></div></div></div>");
$templateCache.put("projects.settings.html","<div class=\"project-settings\"><h3>General</h3><div class=\"row\"><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\"><div class=\"form-group\"><label for=\"projectTitle\" class=\"control-label\">Title</label><input type=\"text\" class=\"form-control\" ng-model=\"project.title\" id=\"projectTitle\" placeholder=\"Project Title\"></div><div class=\"form-group\"><label for=\"projectUrl\" class=\"control-label\">Url</label><input type=\"text\" class=\"form-control\" ng-model=\"project.meta.url\" id=\"projectUrl\" placeholder=\"Project Url\"> <span id=\"helpBlock\" class=\"help-block\">Example: <em>https://google.com</em> or <em>http://localhost:3000/</em></span></div></div></div><h3 class=\"section-title\">Page Details</h3><div class=\"row\"><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\"><div class=\"form-group\"><label class=\"control-label\">Ready Event (Screens are taken after this event is fired)</label><input type=\"text\" class=\"form-control\" ng-model=\"project.meta.readyEvent\" placeholder=\"Default: \'onload\'\"></div><div class=\"form-group\"><label class=\"control-label\">Delay Amount (In milliseconds)</label><input type=\"text\" class=\"form-control\" ng-model=\"project.meta.delay\" placeholder=\"Default: 500\"></div><div class=\"form-group\"><label class=\"control-label\">Diff Threshold (Percentage)</label><input type=\"text\" class=\"form-control\" ng-model=\"project.meta.misMatchThreshold\" placeholder=\"Default: 0.1\"></div></div></div><h3 class=\"section-title\">View Sizes <button class=\"btn btn-right btn-section-header\">Add New</button></h3><div class=\"row setting-item setting-title\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><label for=\"projectTitle\" class=\"col-sm-2 control-label\">View Title</label></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label for=\"projectUrl\" class=\"control-label\">Screen Width</label></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label for=\"projectUrl\" class=\"control-label\">Screen Height</label></div><div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1\">&nbsp;</div></div><div class=\"row setting-item\" ng-repeat=\"viewport in project.viewports\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><input type=\"text\" class=\"form-control\" ng-model=\"viewport.name\" placeholder=\"Tablet, or iPhone_5\"></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><input type=\"text\" class=\"form-control\" ng-model=\"viewport.width\" placeholder=\"320\"></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><input type=\"text\" class=\"form-control\" ng-model=\"viewport.height\" placeholder=\"480\"></div><div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1 setting-edit\"><button type=\"submit\" class=\"btn btn-used\" ng-class=\"{\'btn-used-active\': viewport.active == true }\"><i class=\"octicon octicon-check\"></i></button> <button type=\"submit\" class=\"btn btn-trash\"><i class=\"octicon octicon-trashcan\"></i></button></div></div><h3 class=\"section-title\">Selectors <button class=\"btn btn-right btn-section-header\">Add New</button></h3><div class=\"row\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><label for=\"projectTitle\" class=\"col-sm-2 control-label\">Query String</label></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><label for=\"projectUrl\" class=\"control-label\">Type</label></div><div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">&nbsp;</div></div><div class=\"row setting-item\" ng-repeat=\"selector in project.selectors\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><input type=\"text\" class=\"form-control\" ng-model=\"selector.query\" placeholder=\"body header .menu_item_1\"></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><select class=\"form-control\" ng-model=\"selector.type\" ng-options=\"option for option in selectorTypes\"></select></div><div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2 setting-edit\"><button type=\"submit\" class=\"btn btn-used\" ng-class=\"{\'btn-used-active\': selector.active == true }\"><i class=\"octicon octicon-check\"></i></button> <button type=\"submit\" class=\"btn btn-trash\"><i class=\"octicon octicon-trashcan\"></i></button></div></div><h3 class=\"section-title\">Cookies <button class=\"btn btn-right btn-section-header\">Add New</button></h3><div class=\"row\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><label for=\"projectTitle\" class=\"col-sm-2 control-label\">Cookie Name</label></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label for=\"projectUrl\" class=\"control-label\">Cookie Value</label></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label for=\"projectUrl\" class=\"control-label\">Cookie Domain</label></div><div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1\">&nbsp;</div></div><div class=\"row setting-item\" ng-repeat=\"cookie in project.cookies\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><input type=\"text\" class=\"form-control\" ng-model=\"cookie.name\" placeholder=\"show_modal\"></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><input type=\"text\" class=\"form-control\" ng-model=\"cookie.value\" placeholder=\"true\"></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><input type=\"text\" class=\"form-control\" ng-model=\"cookie.path\" placeholder=\"sub.example.com\"></div><div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1 setting-edit\"><button type=\"submit\" class=\"btn btn-used\" ng-class=\"{\'btn-used-active\': cookie.active == true }\"><i class=\"octicon octicon-check\"></i></button> <button type=\"submit\" class=\"btn btn-trash\"><i class=\"octicon octicon-trashcan\"></i></button></div></div><div class=\"section-finish col-lg-3 col-md-3 col-sm-3 col-xs-3\"><button type=\"submit\" class=\"btn btn-finish btn-save\" ng-click=\"save()\">Save</button> <button type=\"submit\" class=\"btn btn-finish btn-cancel\" ng-click=\"cancelSave()\">Cancel</button></div><hr><div class=\"row\"><h5 class=\"project-remove-title\">Would you like to remove this project completely?</h5><div class=\"form-group col-lg-12 col-md-12 col-sm-12 col-xs-12\"><button type=\"submit\" class=\"btn btn-finish btn-remove\" ng-click=\"deleteProject()\">Delete Project</button></div></div></div>");}]);