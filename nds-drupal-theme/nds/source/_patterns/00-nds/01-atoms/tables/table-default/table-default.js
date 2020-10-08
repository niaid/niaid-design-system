(function($) {
    function initTableDefault(context = document) {

        /* KEY
            Sorting: Add data-tablesort="true" to the <table> tag.
            Numeric Sort Support for a Column: Add data-column-num="true" to the <th> tag of the appropriate column.
        */

        $("table").each(function() {
            if ($(this).attr('nds-datatable') == 'true') {
                console.log('true');
                var defaultConfigs = {
                    "responsive": true,
                    "paging": false,
                    "info": false,
                    "autoWidth": false,
                    "searching": false
                };

                if (!($(this).attr('data-tablesort') == "true")) {
                    defaultConfigs['ordering'] = false;
                } else {
                    // Determine Column Type
                    var columns = [];

                    $(this).find('thead').find('th').each(function(i) {
                        if ($(this).attr('data-column-num') == "true") {
                            columns.push({ "type": "natural", "targets": i });
                        }
                    });

                    defaultConfigs['columnDefs'] = columns;
                }

                $(this).dataTable(defaultConfigs);
            }
        });
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initTableDefault = {
                attach: function(context) {
                    $("body", context).once('nds-table-default').each(function() {
                        initTableDefault(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initTableDefault();
        });
    }
})(jQuery);