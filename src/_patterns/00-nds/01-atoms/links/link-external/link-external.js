var moduleNDS_links = (function() {
    'use strict';

    const documentTypes = ['pdf', 'PDF', 'doc', 'docx', 'DOC', 'DOCX', 'ppt', 'PPT', 'pptx', 'PPTX', 'xls', 'XLS', 'xlsx', 'XLSX', 'zip', 'ZIP'];

    /* =================== PRIVATE METHODS ================= */
    // initLinkExternal - Adds external link icons to links that qualify as external.
    function initLinkExternal() {
        let externalLinks = document.querySelectorAll('a');
        for (var i = 0; i < externalLinks.length; i++) {
            if (externalLinks[i].innerHTML != "") {
                initDocumentLink(externalLinks[i]);
                let url = externalLinks[i].getAttribute('href');
                let hostname = externalLinks[i].hostname;
                let buttonclassname = externalLinks[i].classList.contains('button-nds') === true;
                let iconclassname = externalLinks[i].classList.contains('icon-nds') === true;
                if (url && hostname !== location.hostname && iconclassname !== true && buttonclassname !== true) {
                    url = url.toLowerCase();
                    if (((url.indexOf('http://') > -1) || (url.indexOf('https://')) > -1) && (url.indexOf('localhost:3002') <= 0))  {
                        externalLinks[i].setAttribute('target', '_blank');
                        if (externalLinks[i].closest('.global--footer')) {
                            externalLinks[i].classList.add('ext-link-footer');
                        }
                        var linkIcon = document.createElement('span');
                        linkIcon.setAttribute('focusable', "false");
                        linkIcon.setAttribute('role', "img");
                        linkIcon.setAttribute('class', "ext-link-icon");
                        linkIcon.setAttribute('aria-label', "(Link is external)");
                        externalLinks[i].appendChild(linkIcon);
                    }
                }
            }
        }
    }

    // initLinkExternalMailto - Adds envelope icons to mailto links.
    function initLinkExternalMailto() {
        let mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
        for (var i = 0; i < mailtoLinks.length; i++) {
            mailtoLinks[i].classList.add('link--external--mail');
        }
    }

    function initLinkExternalTelephone() {
        let telLinks = document.querySelectorAll('a[href^="tel:"]');
        for (var i = 0; i < telLinks.length; i++) {
            telLinks[i].classList.add('link--external--phone');
        }
    }

    // initDocumentLink - Helper function that determines if a document badge should be added to a link.
    function initDocumentLink(link) {
        let href = link.getAttribute('href');
        if (href !== null && href !== "/" && href !== "#") {
            href  = href.split('?')[0];
            for (let i = 0; i < documentTypes.length; i++) {
                if (href.indexOf('.' + documentTypes[i]) != -1) {
                    addDocumentBadge(link, documentTypes[i]);
                    return true;
                }
            }
        }
        return false;
    }

    // addDocumentBadge - Helper function that adds document badges to document links.
    function addDocumentBadge(link, type) {
        var badge = document.createElement('span');
        badge.setAttribute('class', "text-nds text--badge text--badge--document");
        badge.textContent = type.toUpperCase();
        link.insertAdjacentElement('afterend', badge);
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initLinkExternal();
        initLinkExternalMailto();
        initLinkExternalTelephone();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
        init: init
    };
}());