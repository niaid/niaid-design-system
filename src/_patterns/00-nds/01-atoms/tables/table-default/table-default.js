// Dependencies
//  - DataTables
//  - jQuery

var moduleNDS_tables = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initTableDefault - Initializes Datatables library.
    function initTableDefault() {

        /* KEY
            Sorting: Add data-tablesort="true" to the <table> tag.
            Numeric Sort Support for a Column: Add data-column-num="true" to the <th> tag of the appropriate column.
        */

        jQuery("table").each(function() {
            if (jQuery(this).attr('nds-datatable') == 'true') {
                var defaultConfigs = {
                    "responsive": true,
                    "paging": false,
                    "info": false,
                    "autoWidth": false,
                    "searching": false
                };

                if (!(jQuery(this).attr('data-tablesort') == "true")) {
                    defaultConfigs['ordering'] = false;
                } else {
                    // Determine Column Type
                    var columns = [];

                    jQuery(this).find('thead').find('th').each(function(i) {
                        if (jQuery(this).attr('data-column-num') == "true") {
                            columns.push({ "type": "natural", "targets": i });
                        }
                    });

                    defaultConfigs['columnDefs'] = columns;
                }

                jQuery(this).dataTable(defaultConfigs);
            }
            else {
                jQuery(this).wrap('<div class="table-nds--responsive-wrapper">');
            }
        });
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initTableDefault();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());