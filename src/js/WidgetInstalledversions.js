/*global $ */

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


    };

    /*********************************************************
     **************************PRIVATE*************************
     *********************************************************/

    /******************************************************************/
    /*                 P U B L I C   F U N C T I O N S                */
    /******************************************************************/

    WidgetInstalledversions.prototype = {
        init: function () {
            $('#versions').DataTable({
                "paging":   false,
                // "ordering": false,
                "info":     false,
                "search": false
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
