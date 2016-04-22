angular.module("mugtemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("alert.html","<div class=\"alert alert-{{alert.type}}\" ng-class=\"{\'has-icon\': alert.icon, \'has-action\': alert.action}\"><div class=\"alert-icon\" ng-if=\"alert.icon\"><i class=\"octicon octicon-{{alert.icon}}\"></i></div><div class=\"alert-title\">{{alert.title}}</div><div class=\"alert-action\" ng-if=\"alert.action\" ng-click=\"alert.action(this)\"><i class=\"octicon octicon-x\"></i></div></div>");
$templateCache.put("main.html","<div class=\"main-static\"><i class=\"main-icon octicon octicon-paintcan\"></i><div class=\"static-title\">Pick a project on the left, or create one!</div><button class=\"btn btn-create\" ng-click=\"createNewProject()\"><i class=\"octicon octicon-plus\"></i> New Project</button></div>");
$templateCache.put("modal.html","<div class=\"modal\"><div class=\"modal-header\"><!-- <i class=\"octicon octicon-alert\"></i> --><!-- <strong>Warning!</strong> 0.72% Diff Found in <strong>Project 1</strong> --><strong>{{viewer.title}}</strong><div class=\"modal-title\"><strong>{{activeItem.query}}</strong></div><!-- <div id=\"funTicketTime\" class=\"btn btn-create-ticket\"><i class=\"octicon octicon-checklist\"></i> Jira Ticket</div> --><div class=\"closer\" ng-click=\"close()\"><i class=\"octicon octicon-x\"></i></div></div><div class=\"modal-viewer\" ng-class=\"{\'modal-singleton\': !viewer.items }\"><div class=\"viewer-preview\"><div class=\"viewer-images\" ng-class=\"{\'viewer-overlay\': activeOption == \'overlay\', \'viewer-sides\': activeOption == \'sides\', \'viewer-singleton\': !viewer.items}\"><img class=\"viewer-image\" ng-src=\"{{compareItem.a}}\" src=\"images/broken.png\" style=\"opacity:{{opacityRange.inverse}}\"> <img class=\"viewer-image\" ng-src=\"{{compareItem.b}}\" src=\"images/broken.png\" style=\"opacity:{{opacityRange.amount}}\"> <img class=\"viewer-image\" ng-src=\"{{compareItem.c}}\" src=\"images/broken.png\" ng-if=\"activeOption != \'overlay\'\"></div></div><div class=\"viewer-meta\"><div class=\"meta-options\" ng-if=\"viewer.items\"><div class=\"slide-bar\" ng-show=\"activeOption == \'overlay\'\"><input type=\"range\" ng-model=\"opacityRange.amount\" min=\"0\" max=\"1\" step=\"0.02\" value=\"{{opacityRange.amount}}\" title=\"{{opacityRange.percent}}\"></div><button class=\"btn btn-option\" ng-click=\"optionMode(\'overlay\')\" ng-class=\"{\'btn-active\': activeOption == \'overlay\'}\"><i class=\"octicon octicon-color-mode\"></i></button> <button class=\"btn btn-option\" ng-click=\"optionMode(\'sides\')\" ng-class=\"{\'btn-active\': activeOption == \'sides\'}\"><i class=\"octicon octicon-three-bars\"></i></button></div><div class=\"meta-options\" ng-if=\"!viewer.items\"><div class=\"label label-default\"><i class=\"octicon octicon-history\"></i> {{activeItem.timestamp | timeAgo}}</div></div><div class=\"meta-title\">{{activeItem.name}}</div><div class=\"meta-subtitle\" ng-if=\"activeItem.query || activeItem.analysis\"><div class=\"label label-warning\" ng-if=\"activeItem.report.diff\"><i class=\"octicon octicon-versions\"></i> {{activeItem.report.diff}}% diff</div><div class=\"label label-success\" ng-if=\"activeItem.report.analysis\"><i class=\"octicon octicon-clock\"></i> {{activeItem.report.analysis}}ms</div><div class=\"label label-default\" ng-if=\"activeItem.status\" ng-class=\"{\'label-success\': activeItem.status == \'passed\', \'label-warning\': activeItem.status == \'warning\', \'label-error\': activeItem.status == \'failed\'}\"><i class=\"octicon\" ng-class=\"{\'octicon-diff-added\': activeItem.status == \'passed\', \'octicon-diff-ignored\': activeItem.status == \'warning\', \'octicon-diff-removed\': activeItem.status == \'failed\'}\"></i> {{activeItem.status}}</div><div class=\"label label-default\" ng-if=\"activeItem.query\"><i class=\"octicon octicon-code\"></i> {{activeItem.query}}</div><div class=\"label label-default\" ng-if=\"activeItem.viewport\"><i class=\"octicon\" ng-class=\"{ \'octicon-device-desktop\': activeItem.viewport == \'Desktop\', \'octicon-color-mode\': activeItem.viewport == \'Tablet\', \'octicon-device-mobile\': activeItem.viewport == \'Mobile\' }\"></i> {{activeItem.viewport}}</div></div></div></div><div class=\"modal-footer\" ng-if=\"viewer.items\"><div class=\"modal-action modal-action-left\" ng-if=\"viewer.items.length > 1\" ng-click=\"modalActionNav(\'left\')\"><i class=\"octicon octicon-chevron-left\"></i></div><div class=\"modal-action modal-action-right\" ng-if=\"viewer.items.length > 1\" ng-click=\"modalActionNav(\'right\')\"><i class=\"octicon octicon-chevron-right\"></i></div><div class=\"modal-carousel-wrap\"><ul class=\"modal-carousel\" style=\"width: {{((viewer.items.length + 1) * 160) + \'px\' || \'100%\'}} !important\"><li class=\"carousel-thumb\" ng-repeat=\"item in viewer.items\" ng-class=\"{ active: currentIndex == $index }\" ng-click=\"goToIndex($index)\"><!-- <i class=\"octicon\" ng-class=\"{\'octicon-tag\': item.type == \'reference\', \'octicon-check thumb-success\': item.status == \'passed\', \'octicon-alert thumb-warning\': item.status == \'warning\', \'octicon-stop thumb-error\': item.status == \'failed\'}\"></i> --><img ng-if=\"!item.remoteSource\" ng-src=\"screens/compare/{{project.id}}/{{item.source}}\" src=\"images/broken.png\"> <img ng-if=\"item.remoteSource\" ng-src=\"{{item.remoteSource}}\" src=\"images/broken.png\"></li></ul></div></div></div>");
$templateCache.put("preferences.html","<div class=\"preferences\"><div class=\"header\"><h1>Preferences</h1><button class=\"btn btn-right\" ng-click=\"save()\">Save</button></div><div class=\"settings-section\"><h4>AWS S3 Configuration</h4><div class=\"row\"><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\"><div class=\"form-group\"><label class=\"control-label\">Access Key ID</label><input type=\"text\" class=\"form-control\" ng-model=\"awsConfig.accessKeyId\"></div><div class=\"form-group\"><label class=\"control-label\">Secret Access Key</label><input type=\"password\" class=\"form-control\" ng-model=\"awsConfig.secretAccessKey\"></div><div class=\"form-group\"><label class=\"control-label\">Bucket</label><input type=\"text\" class=\"form-control\" ng-model=\"awsConfig.bucket\"></div><!-- <div class=\"form-group checkbox\">\n          <input type=\"checkbox\" class=\"form-control\" ng-model=\"awsConfig.autosync\">\n          <label class=\"control-label\">Auto-Sync Projects</label>\n        </div> --></div></div></div></div>");
$templateCache.put("preloader.html","<div class=\"sub-wrapper loader\"><div class=\"preloader loading\"><span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span> <span class=\"slice\"></span></div></div>");
$templateCache.put("projects.history.html","<div class=\"project-history\"><div class=\"filter-tabs tabs\" ng-if=\"historyItems.length > 0\"><button class=\"btn btn-tab\" ng-click=\"changeFilter(\'All\')\" ng-class=\"{\'tab-active\': activeFilter == \'All\'}\">All</button> <button class=\"btn btn-tab\" ng-click=\"changeFilter(\'Desktop\')\" ng-class=\"{\'tab-active\': activeFilter == \'Desktop\'}\">Desktop</button> <button class=\"btn btn-tab\" ng-click=\"changeFilter(\'Tablet\')\" ng-class=\"{\'tab-active\': activeFilter == \'Tablet\'}\">Tablet</button> <button class=\"btn btn-tab\" ng-click=\"changeFilter(\'Mobile\')\" ng-class=\"{\'tab-active\': activeFilter == \'Mobile\'}\">Mobile</button> <button class=\"btn btn-tab\" ng-click=\"changeFilter(\'passed\')\" ng-class=\"{\'tab-active\': activeFilter == \'passed\'}\">Passed</button> <button class=\"btn btn-tab\" ng-click=\"changeFilter(\'warning\')\" ng-class=\"{\'tab-active\': activeFilter == \'warning\'}\">Warning</button> <button class=\"btn btn-tab\" ng-click=\"changeFilter(\'failed\')\" ng-class=\"{\'tab-active\': activeFilter == \'failed\'}\">Failed</button></div><div class=\"banner-items\" ng-if=\"historyItems.length > 0\"><div class=\"row banner-item\" ng-repeat=\"item in historyItems | filter:activeFilterQuery\" ng-class=\"{\'banner-info\': item.type == \'reference\', \'banner-success\': item.status == \'passed\' && item.type != \'reference\', \'banner-warning\': item.status == \'warning\' && item.type != \'reference\', \'banner-error\': item.status == \'failed\' && item.type != \'reference\'}\"><div class=\"banner-status\"><i class=\"octicon\" ng-class=\"{\'octicon-tag\': item.type == \'reference\', \'octicon-check\': item.status == \'passed\', \'octicon-alert\': item.status == \'warning\', \'octicon-stop\': item.status == \'failed\'}\"></i></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><h5>Type: <strong>{{item.viewport}}</strong></h5><h2>{{item.name}}</h2><p title=\"{{item.timestamp | date:\'MM/dd/yy h:mma\'}}\">{{item.timestamp | timeAgo}}</p></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\" ng-if=\"item.type == \'compare\'\"><h5>Diff Threshold: <strong>{{item.report.diff}}</strong></h5><p class=\"meta-status\"><i class=\"octicon octicon-diff-added\" ng-class=\"{\'octicon-diff-added\': item.status == \'passed\', \'octicon-diff-ignored\': item.status == \'warning\', \'octicon-diff-removed\': item.status == \'failed\'}\"></i> {{item.status}}</p><p>Analysis: <strong>{{item.report.analysis}}ms</strong></p></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\" ng-if=\"item.type == \'reference\'\"><h5>ID: <strong>{{item.query}}</strong></h5><p class=\"meta-status\"><i class=\"octicon octicon-diff-modified\"></i> {{item.type}}</p><p>Batch: <strong>{{item.batch}}</strong></p></div><div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\"><div class=\"banner-preview\" ng-click=\"previewItem(item)\"><img ng-if=\"!item.remoteSource\" ng-src=\"screens/{{item.type}}/{{project.id}}/{{item.source}}\" title=\"screens/{{item.type}}/{{project.id}}/{{item.source}}\" src=\"images/broken.png\"> <img ng-if=\"item.remoteSource\" ng-src=\"{{item.remoteSource}}\" title=\"{{item.remoteSource}}\" src=\"images/broken.png\"></div></div></div></div><div class=\"row default-state\" ng-if=\"historyItems.length < 1\"><div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\"><p>No history yet! Click below to get started!</p><button class=\"btn btn-reference\" ui-sref=\"projects.runner({ id: project.id })\">Start Runner</button></div></div></div>");
$templateCache.put("projects.html","<div class=\"header\" ng-cloak><div class=\"details\"><h1>{{project.title}}</h1><h5>{{project.meta.url || \'Please setup a url!\'}}</h5></div><div class=\"tabs\"><button class=\"btn btn-tab\" ui-sref-active=\"tab-active\" ui-sref=\"projects.runner({ id: project.id })\">Runner</button> <button class=\"btn btn-tab\" ui-sref-active=\"tab-active\" ui-sref=\"projects.history({ id: project.id })\">History</button> <button class=\"btn btn-tab\" ui-sref-active=\"tab-active\" ui-sref=\"projects.settings({ id: project.id })\">Settings</button></div></div><div class=\"sub-wrapper\" ui-view></div>");
$templateCache.put("projects.runner.html","<div class=\"project-runner\"><div class=\"intro-static\" ng-if=\"(!hasSettings || !hasReference || !hasCompare) && !processing\"><i class=\"intro-icon octicon\" ng-class=\"{\'octicon-stop\': hasSettings == false, \'octicon-microscope\': hasReference == false && hasSettings == true, \'octicon-versions\': hasCompare == false && hasReference == true && hasSettings == true}\"></i><div class=\"static-title\" ng-if=\"!hasSettings\">Please finish configuring settings!</div><div class=\"static-title\" ng-if=\"!hasReference && hasSettings\">Start testing by creating a reference point.</div><div class=\"static-title\" ng-if=\"!hasCompare && hasReference && hasSettings\">Ready to run an image diff comparison?</div><button class=\"btn btn-create\" ui-sref=\"projects.settings({ id: project.id })\" ng-if=\"!hasSettings\">Change Settings</button> <button class=\"btn btn-create\" ng-click=\"newReference()\" ng-if=\"!hasReference && hasSettings\">Start</button> <button class=\"btn btn-create\" ng-click=\"newCompare()\" ng-if=\"!hasCompare && hasReference && hasSettings\">Run Compare</button></div><div class=\"runner-section\" ng-if=\"processing\"><div class=\"runner-loader\"><preloader></preloader><div class=\"loader-title\"><h2>{{progress.title}}</h2><small>{{progress.percent | number:0}}% Complete</small></div></div></div><div class=\"runner-section\" ng-if=\"hasSettings && hasReference && hasCompare && !processing\"><div class=\"runner-results\" ng-if=\"!processing\"><h3 class=\"section-title\">Results <button class=\"btn btn-right btn-section-header btn-section-offset\" ng-click=\"newCompare()\">Run Compare</button> <button class=\"btn btn-right btn-section-header\" ng-click=\"newReference()\">New Reference</button></h3><div class=\"statistics\" ng-if=\"activeData.success || activeData.error || activeData.warning\"><div class=\"stat-item stat-success\">{{activeData.success}} Passed</div><div class=\"stat-item stat-error\">{{activeData.error}} Failed</div><div class=\"stat-item stat-warning\">{{activeData.warning}} Warnings</div></div><div class=\"banner-items\" ng-if=\"batchItems.length > 0\"><div class=\"row banner-item banner-{{batch.type}} film-strip-wrap\" ng-repeat=\"batch in batchItems\" ng-click=\"previewBatch(batch.items)\" ng-if=\"batch.items.length > 0\"><div class=\"banner-status\"><i class=\"octicon\" ng-class=\"{\'octicon-check\': batch.type == \'success\', \'octicon-alert\': batch.type == \'warning\', \'octicon-stop\': batch.type == \'error\'}\"></i></div><div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\"><ul class=\"film-strip\"><li class=\"film-thumb\" ng-repeat=\"item in batch.items\"><img ng-if=\"!item.remoteSource\" ng-src=\"screens/compare/{{project.id}}/{{item.source}}\" src=\"images/broken.png\"> <img ng-if=\"item.remoteSource\" ng-src=\"{{item.remoteSource}}\" src=\"images/broken.png\"></li></ul></div></div></div></div></div></div>");
$templateCache.put("projects.settings.html","<div class=\"project-settings\"><h3>General Configuration</h3><div class=\"row\"><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\"><div class=\"form-group\"><label for=\"projectTitle\" class=\"control-label\">Title</label><input type=\"text\" class=\"form-control\" ng-model=\"project.title\" id=\"projectTitle\" placeholder=\"Project Title\"></div><div class=\"form-group\"><label for=\"projectUrl\" class=\"control-label\">Url</label><input type=\"text\" class=\"form-control\" ng-model=\"project.meta.url\" id=\"projectUrl\" placeholder=\"Project Url\"> <span id=\"helpBlock\" class=\"help-block\">Example: <em>https://google.com</em> or <em>http://localhost:3000/</em></span></div></div></div><h3 class=\"section-title\">Optional Details</h3><div class=\"row\"><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\"><div class=\"form-group\"><label class=\"control-label\">Ready Event (Screens are taken after this event is fired)</label><input type=\"text\" class=\"form-control\" ng-model=\"project.meta.readyEvent\" placeholder=\"Default: \'onload\'\"></div><div class=\"form-group\"><label class=\"control-label\">Delay Amount (In milliseconds)</label><input type=\"text\" class=\"form-control\" ng-model=\"project.meta.delay\" placeholder=\"Default: 500\"></div><div class=\"form-group\"><label class=\"control-label\">Diff Threshold <i class=\"octicon octicon-question tp-tooltip\"><div class=\"tooltip bottom\"><div class=\"tooltip-title\">Threshold Setting</div><div class=\"tooltip-body\">Define the maximum amount of difference that is acceptable for the project.<br><br><strong>Note:</strong> The default warning difference is between 0.05 and 2.05.</div></div></i></label><input type=\"text\" class=\"form-control\" ng-model=\"project.meta.misMatchThreshold\" placeholder=\"Default: 0.1\"></div><div class=\"form-group config-item\"><label class=\"control-label\">AWS Backup</label><button type=\"submit\" class=\"btn btn-used\" ng-if=\"hasAwsSettings\" ng-class=\"{\'btn-used-active\': project.meta.autoSyncAws == true }\" ng-click=\"project.meta.autoSyncAws = !project.meta.autoSyncAws\"><i class=\"octicon octicon-check\"></i> Auto-Sync</button> <button class=\"btn btn-sync\" ng-if=\"hasAwsSettings\" ng-click=\"syncNow()\" ng-class=\"{\'btn-sync-active\': syncing == true }\">Sync Now <i class=\"octicon octicon-sync\"></i></button> <button class=\"btn btn-sync\" ng-if=\"!hasAwsSettings\" ui-sref=\"preferences\" ng-class=\"{\'btn-sync-active\': true }\">Configure your AWS Settings</button></div></div></div><h3 class=\"section-title\">View Sizes <i class=\"octicon octicon-question tp-tooltip\"><div class=\"tooltip bottom\"><div class=\"tooltip-title\">Viewport Screen Sizes</div><div class=\"tooltip-body\">Define the height and width of the screens to capture.<br><br><strong>Note:</strong> Each size will capture all of the container selectors below.</div></div></i> <button class=\"btn btn-right btn-section-header\" ng-click=\"addViewport()\">Add New</button></h3><div class=\"row setting-item setting-title\" ng-if=\"project.viewports.length > 0\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><label for=\"projectTitle\" class=\"col-sm-2 control-label\">View Title</label></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label for=\"projectUrl\" class=\"control-label\">Screen Width</label></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label for=\"projectUrl\" class=\"control-label\">Screen Height</label></div><div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1\">&nbsp;</div></div><div class=\"row setting-item\" ng-repeat=\"viewport in project.viewports track by $index\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><input type=\"text\" class=\"form-control\" ng-model=\"viewport.name\" placeholder=\"Tablet, or iPhone_5\"></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><input type=\"text\" class=\"form-control\" ng-model=\"viewport.width\" placeholder=\"320\"></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><input type=\"text\" class=\"form-control\" ng-model=\"viewport.height\" placeholder=\"480\"></div><div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1 setting-edit\"><button type=\"submit\" class=\"btn btn-used\" title=\"{{(viewport.active)?\'Is Active\':\'Is Not Active\'}}\" ng-class=\"{\'btn-used-active\': viewport.active == true }\" ng-click=\"activateType(\'viewports\', $index)\"><i class=\"octicon octicon-check\"></i></button> <button type=\"submit\" class=\"btn btn-trash\" ng-click=\"deleteTypeItem(\'viewports\', $index)\"><i class=\"octicon octicon-trashcan\"></i></button></div></div><div class=\"row setting-item-null\" ng-if=\"project.viewports.length < 1\"><div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\"><p>No viewports specified yet! Click \"Add New\" to get started!</p></div></div><h3 class=\"section-title\">Selectors <i class=\"octicon octicon-question tp-tooltip\"><div class=\"tooltip bottom\"><div class=\"tooltip-title\">Capture Selectors</div><div class=\"tooltip-body\">Define the area to capture based on DOM selection strings, similar to jQuery selectors.<br>Options:<br><strong>Container, Hide, Remove</strong><br><br>Example:<br><strong>\"body .menu #menu-item-1\"</strong></div></div></i> <button class=\"btn btn-right btn-section-header\" ng-click=\"addSelector()\">Add New</button></h3><div class=\"row\" ng-if=\"project.selectors.length > 0\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><label for=\"projectTitle\" class=\"col-sm-2 control-label\">Query String</label></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><label for=\"projectUrl\" class=\"control-label\">Type</label></div><div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">&nbsp;</div></div><div class=\"row setting-item\" ng-repeat=\"selector in project.selectors track by $index\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><input type=\"text\" class=\"form-control\" ng-model=\"selector.query\" placeholder=\"body header .menu_item_1\"></div><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5 select\"><select class=\"form-control\" ng-model=\"selector.type\" ng-options=\"option for option in selectorTypes\"></select></div><div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2 setting-edit\"><button type=\"submit\" class=\"btn btn-used\" title=\"{{(selector.active)?\'Is Active\':\'Is Not Active\'}}\" ng-class=\"{\'btn-used-active\': selector.active == true }\" ng-click=\"activateType(\'selectors\', $index)\"><i class=\"octicon octicon-check\"></i></button> <button type=\"submit\" class=\"btn btn-trash\" ng-click=\"deleteTypeItem(\'selectors\', $index)\"><i class=\"octicon octicon-trashcan\"></i></button></div></div><div class=\"row setting-item-null\" ng-if=\"project.selectors.length < 1\"><div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\"><p>No selectors specified yet! Click \"Add New\" to get started!</p></div></div><h3 class=\"section-title\">Cookies <i class=\"octicon octicon-question tp-tooltip\"><div class=\"tooltip bottom\"><div class=\"tooltip-body\">All cookies will be stored before screens captured.</div></div></i> <button class=\"btn btn-right btn-section-header\" ng-click=\"addCookie()\">Add New</button></h3><div class=\"row\" ng-if=\"project.cookies.length > 0\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><label for=\"projectTitle\" class=\"col-sm-2 control-label\">Name</label></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label for=\"projectUrl\" class=\"control-label\">Value</label></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label for=\"projectUrl\" class=\"control-label\">Domain</label></div><div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1\">&nbsp;</div></div><div class=\"row setting-item\" ng-repeat=\"cookie in project.cookies track by $index\"><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><input type=\"text\" class=\"form-control\" ng-model=\"cookie.name\" placeholder=\"show_modal\"></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><input type=\"text\" class=\"form-control\" ng-model=\"cookie.value\" placeholder=\"true\"></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><input type=\"text\" class=\"form-control\" ng-model=\"cookie.path\" placeholder=\"sub.example.com\"></div><div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1 setting-edit\"><button class=\"btn btn-used\" title=\"{{(cookie.active)?\'Is Active\':\'Is Not Active\'}}\" ng-class=\"{\'btn-used-active\': cookie.active == true, \'btn-used-inactive\': cookie.active != true }\" ng-click=\"activateType(\'cookies\', $index)\"><i class=\"octicon octicon-check\"></i></button> <button type=\"submit\" class=\"btn btn-trash\" ng-click=\"deleteTypeItem(\'cookies\', $index)\"><i class=\"octicon octicon-trashcan\"></i></button></div></div><div class=\"row setting-item-null\" ng-if=\"project.cookies.length < 1\"><div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\"><p>No cookies specified yet! Click \"Add New\" to get started!</p></div></div><h3 class=\"section-title\">History</h3><div class=\"row\"><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\"><div class=\"form-group\"><label class=\"control-label full-label\">Remove all history data?</label><button class=\"btn btn-finish btn-remove\" ng-click=\"clearHistory()\">Clear History</button></div></div></div><!-- <div class=\"section-finish col-lg-3 col-md-3 col-sm-3 col-xs-3\">\n    <button type=\"submit\" class=\"btn btn-finish btn-save\" ng-click=\"save()\">Save</button>\n    <button type=\"submit\" class=\"btn btn-finish btn-cancel\" ng-class=\"{\'btn-active\': hasChanges == true }\" ng-click=\"cancelSave()\">Cancel</button>\n</div> --><!-- <hr> --><div class=\"row project-remove\"><h5 class=\"project-remove-title\">Would you like to remove this project completely?</h5><div class=\"form-group col-lg-12 col-md-12 col-sm-12 col-xs-12\"><button type=\"submit\" class=\"btn btn-finish btn-remove\" ng-click=\"deleteProject()\">Delete Project</button></div></div></div>");}]);