/*
 * widget-installedversions
 * https://github.com/rockneurotiko/widget-installedversions
 *
 * Copyright (c) 2016 CoNWeT
 * Licensed under the Apache-2.0 license.
 */

/* globals WidgetInstalledversions */

window.onload = function () {
    "use strict";
    var versions = new WidgetInstalledversions();
    versions.init();
};
