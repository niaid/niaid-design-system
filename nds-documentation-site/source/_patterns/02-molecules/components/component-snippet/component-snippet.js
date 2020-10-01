(function($) {
    function initComponentSnippet(context = document) {
        $('.component--snippet__block__code__snippet').each(function() {
            var codeSnippet = $(this).find('pre').html().replace(/(\r\n|\n|\r)/gm, "");
            $(this).find('pre').empty();
            $(this).find('pre').text(process(codeSnippet));
        });

        // $('.component--snippet').find('.button--icon').on('click', function() {
        //     copyToClipboard($(this).parentsUntil('.component--snippet').parent().find('pre'));
        // });
    }

    function copyToClipboard($element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($element.text()).select();
        document.execCommand("copy");
        $temp.remove();
    }

    function process(str) {

        var div = document.createElement('div');
        div.innerHTML = str.trim();
    
        return format(div, 0).innerHTML;
    }
    
    function format(node, level) {
    
        var indentBefore = new Array(level++ + 1).join('  '),
            indentAfter  = new Array(level - 1).join('  '),
            textNode;
    
        for (var i = 0; i < node.children.length; i++) {
    
            textNode = document.createTextNode('\n' + indentBefore);
            node.insertBefore(textNode, node.children[i]);
    
            format(node.children[i], level);
    
            if (node.lastElementChild == node.children[i]) {
                textNode = document.createTextNode('\n' + indentAfter);
                node.appendChild(textNode);
            }
        }
    
        return node;
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initComponentSnippet = {
                attach: function(context) {
                    $('body', context).once('nds-component-snippet').each(function() {
                        initComponentSnippet(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initComponentSnippet();
        });
    }
})(jQuery);