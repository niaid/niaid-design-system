// Functionality for Sticky Local Nav, NOT IN USE

// (function($) {
//     function initComponentStickybits(context = document) {
//         $(window).ready(function() {
//             stickybits(".component--accordion", { useStickyClasses: true, stickyBitStickyOffset: 24 });

//             const stickybitsInstancetoBeUpdated = stickybits(".component--accordion");
//             window.addEventListener('resize', function() {
//                 console.log('resize');
//                 stickybitsInstancetoBeUpdated.update({ useStickyClasses: true, stickyBitStickyOffset: 24 });
//             });
//         });
//     }

//     if (typeof Drupal !== 'undefined') {
//         // Define Drupal behavior.
//         (function($, Drupal) {
//             Drupal.behaviors.initComponentStickybits = {
//                 attach: function(context) {
//                     $('body', context).once('nds-component-stickybits').each(function() {
//                         initComponentStickybits(context);
//                     });
//                 },
//             };
//         })(jQuery, Drupal);
//     } else {
//         // If Drupal isn't loaded, add JS for Pattern Lab.
//         $(document).ready(function() {
//             initComponentStickybits();
//         });
//     }
// })(jQuery);