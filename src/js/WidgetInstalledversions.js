/*global $, FIDASHRequests, MashupPlatform */

/*
 * widget-installedversions
 * https://github.com/rockneurotiko/widget-installedversions
 *
 * Copyright (c) 2016 CoNWeT
 * Licensed under the Apache-2.0 license.
 */

/* exported WidgetInstalledversions */
var WidgetInstalledversions = (function () {

    "use strict";

    /*********************************************************
     ************************CONSTANTS*************************
     *********************************************************/

    var url = "http://130.206.84.4:11027/monitoring/regions/";
    var REST = 0;

    /*********************************************************
     ************************VARIABLES*************************
     *********************************************************/

    /********************************************************/
    /**********************CONSTRUCTOR***********************/
    /********************************************************/

    var WidgetInstalledversions = function WidgetInstalledversions() {

        // var regions = ["Budapest2",
        //                "Crete",
        //                "Lannion2",
        //                "PiraeusU",
        //                "Poznan",
        //                "Prague",
        //                "SaoPaulo",
        //                "SophiaAntipolis",
        //                "Spain2",
        //                "Trento2",
        //                "Vicenza",
        //                "Volos",
        //                "Zurich2"];
        this.regions = [];
    };

    /*********************************************************
     **************************PRIVATE*************************
     *********************************************************/

    var loadRegionVersions = function loadRegionVersions(region, f) {
        f = f || function () {};

        FIDASHRequests.get(url + region, function (err, data) {
            REST -= 1;
            if (err) {
                window.console.log(err);
                MashupPlatform.widget.log("The API seems down (Asking for region " + region + "): " + err.statusText);
                if (REST <= 0) {
                    f();
                }
                return;
            }

            var comps = data.components || [];

            if (comps.length === 0) {
                if (REST <= 0) {
                    f();
                }
                return;
            }

            var comp = comps[0];
            writeRegionRow(region, [comp.nova_version, comp.neutron_version, comp.cinder_version, comp.glance_version, comp.keystone_version, comp.ceilometer_version]);
            if (REST <= 0) {
                f();
            }
        });
    };


    var loadVersions = function loadVersions(f) {
        f = f || function () {};
        REST = this.regions.length;
        this.regions.forEach(function (region) {
            loadRegionVersions(region, f);
        });
    };

    var getRegionsMonitoring = function getRegionsMonitoring(f) {
        f = f || function () {};
        FIDASHRequests.get(url, function (err, data) {
            if (err) {
                window.console.log(err);
                MashupPlatform.widget.log("The API seems down (Asking for regions): " + err.statusText);
                return;
            }

            var regions = [];

            data._embedded.regions.forEach(function (region) {
                regions.push(region.id);
            });

            this.regions = regions;
            loadVersions.call(this, f);
            this.regions = $("#region_selector").val() || [];
        }.bind(this));
    };

    var writeRegionRow = function writeRegionRow(region, data) {
        var $tr = $("<tr></tr>");

        [region].concat(data).forEach(function (x) {
            $("<th>", {
                text: x
            }).appendTo($tr);
        });

        $tr.appendTo($("#versionsBody"));
    };


    var writeHeader = function writeHeader() {
        var createHeaderName = function createHeaderName(name, icon) {
            var icons = $("<i>", {
                class: "fa fa-" + icon
            });

            var $th = $("<th>", {
                text: name
            });

            if (!!icon) {
                $th.append(icons);
            }
            return $th;
        };

        var $tr = $("<tr></tr>");

        createHeaderName("Region").appendTo($tr);
        createHeaderName("Nova", "cogs").appendTo($tr);
        createHeaderName("Neutron", "exchange").appendTo($tr);
        createHeaderName("Cinder", "archive").appendTo($tr);
        createHeaderName("Glance", "cloud-upload").appendTo($tr);
        createHeaderName("Keystone P.", "key").appendTo($tr);
        createHeaderName("Ceilometer", "television").appendTo($tr);

        var $thead = $("<thead></thead>");
        //var $tfoot = $("<tfoot></tfoot>");

        $tr.appendTo($thead);
        //$tr.clone().appendTo($tfoot);

        $thead.appendTo($("#versions"));
        //$tfoot.appendTo($("#versions"));
    };

    // var fakeData = function fakeData() {
    //     var rand = function rand(m) {
    //         return Math.floor((Math.random() * m));
    //     };

    //     var createVersion = function createVersion() {
    //         return rand(4) + "." + rand(11) + "." + rand(50);
    //     };


    //     var regions = ["Budapest2",
    //                    "Crete",
    //                    "Lannion2",
    //                    "PiraeusU",
    //                    "Poznan",
    //                    "Prague",
    //                    "SaoPaulo",
    //                    "SophiaAntipolis",
    //                    "Spain2",
    //                    "Trento2",
    //                    "Vicenza",
    //                    "Volos",
    //                    "Zurich2"];

    //     regions.forEach(function (x) {
    //         writeRegionRow(x, [createVersion(), createVersion(), createVersion(), createVersion(), createVersion(), createVersion()]);
    //     });
    // };


    /******************************************************************/
    /*                 P U B L I C   F U N C T I O N S                */
    /******************************************************************/

    WidgetInstalledversions.prototype = {
        init: function () {
            writeHeader();
            $("<tbody>", {id: "versionsBody"}).appendTo("#versions");

            // fakeData();

            getRegionsMonitoring.call(this, function () {
                $('#versions').DataTable({
                    'paging':   false,
                    // "ordering": false,
                    'info':     false,
                    'destroy': true,
                    'searching': false,
                    'renderer': {
                        'header': "bootstrap"
		    }
                });
            });
        }
    };

    /****************************************/
    /************AUXILIAR FUNCTIONS**********/
    /****************************************/

    /* test-code */
    WidgetInstalledversions.prototype = {
    };

    /* end-test-code */

    return WidgetInstalledversions;

})();
