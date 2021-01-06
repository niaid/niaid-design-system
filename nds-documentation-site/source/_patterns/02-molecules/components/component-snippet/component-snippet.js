(function($) {
    function initComponentSnippet(context = document) {
        $('.component--snippet__block__code__snippet').each(function() {
            var codeSnippet = escapeHtml($(this).html());
            $(this).empty();
            $(this).append(codeSnippet);
            $(this).wrapInner('<pre><code class="language-markup"></code></pre>');
            var block = $(this).find('code');
            Prism.highlightElement(block[0]);
        });

        $('.component--snippet').find('.button--icon').on('click', function() {
            let $copyText = $(this).siblings('.component--snippet__button__copied');
            $copyText.css('opacity', 0);
            copyToClipboard($(this).parentsUntil('.component--snippet').parent().find('pre'));
            $copyText.css('opacity', 1);
            setTimeout(function() {
                $copyText.css('opacity', 0);
            }, 2000);
        });
    }

    function copyToClipboard($element) {
        const copyText = $element.text();
        const textArea = document.createElement('textarea');
        textArea.classList.add("hidden-textarea");
        textArea.textContent = copyText;
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }

    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;")
             .replace(/(^[ \t]*\n)/gm, "");
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