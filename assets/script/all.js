(function ($) {
    "use strict"; // Start of use strict

    $(window).load(function () {
        // Page loader
        $("body").imagesLoaded(function () {
            $(".page-loader").delay(1000).fadeOut("slow");
        });

        $(window).trigger("scroll");
        $(window).trigger("resize");
    });

    $(document).ready(function () {
        $(window).trigger("resize");
        init_classic_menu();
        init_fullscreen_menu();
        init_side_panel();
        init_team();
        initPageSliders();
        init_map();
        init_wow();
    });

    $(window).resize(function () {
        init_classic_menu_resize();
        init_side_panel_resize()
        js_height_init();
        split_height_init();
    });


    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    } else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }

    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    } else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    } else {
        safariTest = false;
    }

    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }


    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */

    // Sections backgrounds

    var pageSection = $(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function (indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    // Function for block height 100%
    function height_line(height_object, height_donor) {
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }

    // Function equal height
    ! function (a) {
        a.fn.equalHeights = function () {
            var b = 0,
                c = a(this);
            return c.each(function () {
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function () {
            var b = a(this),
                c = b.data("equal");
            b.find(c).equalHeights()
        })
    }(jQuery);


    // Progress bars
    var progressBar = $(".progress-bar");
    progressBar.each(function (indx) {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
    });

    /* ---------------------------------------------
     Nav panel classic
     --------------------------------------------- */

    var mobile_nav = $(".mobile-nav");
    var desktop_nav = $(".desktop-nav");

    function init_classic_menu_resize() {

        // Mobile menu max height
        $(".mobile-on .desktop-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");

        // Mobile menu style toggle
        if ($(window).width() <= 1024) {
            $(".main-nav").addClass("mobile-on");
        } else
            if ($(window).width() > 1024) {
                $(".main-nav").removeClass("mobile-on");
                desktop_nav.show();
            }
    }

    function init_classic_menu() {


        // Navbar sticky

        $(".js-stick").sticky({
            topSpacing: 0
        });


        height_line($(".inner-nav > ul > li > a"), $(".main-nav"));
        height_line(mobile_nav, $(".main-nav"));

        mobile_nav.css({
            "width": $(".main-nav").height() + "px"
        });

        // Transpaner menu

        if ($(".main-nav").hasClass("transparent")) {
            $(".main-nav").addClass("js-transparent");
        }

        $(window).scroll(function () {

            if ($(window).scrollTop() > 10) {
                $(".js-transparent").removeClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo, .mobile-nav").addClass("small-height");
            } else {
                $(".js-transparent").addClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo, .mobile-nav").removeClass("small-height");
            }


        });

        // Mobile menu toggle

        mobile_nav.click(function () {

            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
            } else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");

                // Fix for responsive menu
                if ($(".main-nav").hasClass("not-top")) {
                    $(window).scrollTo(".main-nav", "slow");
                }

            }

        });

        desktop_nav.find("a:not(.mn-has-sub)").click(function () {
            if (mobile_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                mobile_nav.removeClass("active");
            }
        });


        // Sub menu

        var mnHasSub = $(".mn-has-sub");
        var mnThisLi;

        $(".mobile-on .mn-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");

        mnHasSub.click(function () {

            if ($(".main-nav").hasClass("mobile-on")) {
                mnThisLi = $(this).parent("li:first");
                if (mnThisLi.hasClass("js-opened")) {
                    mnThisLi.find(".mn-sub:first").slideUp(function () {
                        mnThisLi.removeClass("js-opened");
                        mnThisLi.find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                    });
                } else {
                    $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                    mnThisLi.addClass("js-opened");
                    mnThisLi.find(".mn-sub:first").slideDown();
                }

                return false;
            } else {

            }

        });

        mnThisLi = mnHasSub.parent("li");
        mnThisLi.hover(function () {

            if (!($(".main-nav").hasClass("mobile-on"))) {

                $(this).find(".mn-sub:first").stop(true, true).fadeIn("fast");
            }

        }, function () {

            if (!($(".main-nav").hasClass("mobile-on"))) {

                $(this).find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }

        });

    }

    /* ---------------------------------------------
     Team
     --------------------------------------------- */

    function init_team() {

        // Hover        
        $(".team-item").click(function () {
            if ($("html").hasClass("mobile")) {
                $(this).toggleClass("js-active");
            }
        });

    }

    const floatItems = $('.floatItems');
    $(window).on('scroll', function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            $(floatItems).css('display', 'block');
        } else {
            $(floatItems).css('display', 'none');
        }
    });

    const scrollTop = $('.scrollTop');
    $(scrollTop).on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0,
        }, 800);
        return false;
    });

    $(".jarallax").jarallax({
        speed: 0.1
    });

    [].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function () {
            img.removeAttribute('data-src');
        };
    });

    let perPage = 6;
    $('.pagination-container').each(function (idx) {
        let items = $(this).prev('.list-wrapper').find('.list-item');
        let numItems = items.length;
        items.slice(perPage).hide();
        $(this).pagination({
            items: numItems,
            itemsOnPage: 6,
            prevText: `<i class="fas fa-arrow-left"></i>`,
            nextText: `<i class="fas fa-arrow-right"></i>`,
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).fadeIn();
            }
        });
    })

    $('a[data-fancybox="gallery"]').fancybox({
        buttons: ["close"]
    });

    $('a').on('click', function (e) {
        if (this.hash != '') {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({ scrollTop: $(hash).offset().top }, 800);
            $('ul.nav-links').removeClass('active');
            $('body').removeClass('overflow-hidden');
        }
    })

})(jQuery); // End of use strict


/* ---------------------------------------------
 Sliders
 --------------------------------------------- */
function initPageSliders() {
    (function ($) {
        "use strict";

        // Fullwidth gallery
        $(".banner-gallery").owlCarousel({
            transitionStyle: "fade",
            autoPlay: 5000,
            slideSpeed: 700,
            singleItem: true,
            autoHeight: true,
            navigation: false,
            pagination: false
        });

    })(jQuery);
};


/* ---------------------------------------------
     Fullscreen menu
   --------------------------------------------- */

var fm_menu_wrap = $("#fullscreen-menu");
var fm_menu_button = $(".fm-button");

function init_fullscreen_menu() {

    fm_menu_button.click(function () {

        if ($(this).hasClass("animation-process")) {
            return false;
        } else {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active").css("z-index", "2001").addClass("animation-process");;

                fm_menu_wrap.find(".fm-wrapper-sub").fadeOut("fast", function () {
                    fm_menu_wrap.fadeOut(function () {
                        fm_menu_wrap.find(".fm-wrapper-sub").removeClass("js-active").show();
                        fm_menu_button.css("z-index", "1030").removeClass("animation-process");

                    });
                });

                if ($(".owl-carousel").lenth) {
                    $(".owl-carousel").data("owlCarousel").play();
                }

            } else {
                if ($(".owl-carousel").lenth) {
                    $(".owl-carousel").data("owlCarousel").stop();
                }
                $(this).addClass("active").css("z-index", "2001").addClass("animation-process");

                fm_menu_wrap.fadeIn(function () {
                    fm_menu_wrap.find(".fm-wrapper-sub").addClass("js-active");
                    fm_menu_button.removeClass("animation-process");
                });
            }

            return false;
        }

    });

    $("#fullscreen-menu").find("a:not(.fm-has-sub)").click(function () {

        if (fm_menu_button.hasClass("animation-process")) {
            return false;
        } else {
            fm_menu_button.removeClass("active").css("z-index", "2001").addClass("animation-process");

            fm_menu_wrap.find(".fm-wrapper-sub").fadeOut("fast", function () {
                fm_menu_wrap.fadeOut(function () {
                    fm_menu_wrap.find(".fm-wrapper-sub").removeClass("js-active").show();
                    fm_menu_button.css("z-index", "1030").removeClass("animation-process");

                });
            });

            if ($(".owl-carousel").lenth) {
                $(".owl-carousel").data("owlCarousel").play();
            }
        }
    });

    // Sub menu

    var fmHasSub = $(".fm-has-sub");
    var fmThisLi;

    fmHasSub.click(function () {

        fmThisLi = $(this).parent("li:first");
        if (fmThisLi.hasClass("js-opened")) {
            fmThisLi.find(".fm-sub:first").slideUp(function () {
                fmThisLi.removeClass("js-opened");
                fmThisLi.find(".fm-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
            });
        } else {
            $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
            fmThisLi.addClass("js-opened");
            fmThisLi.find(".fm-sub:first").slideDown();
        }

        return false;

    });

}


/* ---------------------------------------------
     Side panel
   --------------------------------------------- */

var side_panel = $(".side-panel");
var sp_button = $(".sp-button");
var sp_close_button = $(".sp-close-button");
var sp_overlay = $(".sp-overlay");

function sp_panel_close() {
    side_panel.animate({
        opacity: 0,
        left: -270
    }, 500, "easeOutExpo");
    sp_overlay.fadeOut();


    if ($(".owl-carousel").lenth) {
        $(".owl-carousel").data("owlCarousel").play();
    }
}

function init_side_panel() {
    (function ($) {
        "use strict";

        sp_button.click(function () {

            side_panel.animate({
                opacity: 1,
                left: 0
            }, 500, "easeOutExpo");

            setTimeout(function () {
                sp_overlay.fadeIn();
            }, 100);

            if ($(".owl-carousel").lenth) {
                $(".owl-carousel").data("owlCarousel").stop();
            }

            return false;

        });

        sp_close_button.click(function () {
            sp_panel_close();
            return false;
        });
        sp_overlay.click(function () {
            sp_panel_close();
            return false;
        });

        $("#side-panel-menu").find("a:not(.sp-has-sub)").click(function () {
            if (!($(window).width() >= 1199)) {
                sp_panel_close();
            }
        });


        // Sub menu

        var spHasSub = $(".sp-has-sub");
        var spThisLi;

        spHasSub.click(function () {

            spThisLi = $(this).parent("li:first");
            if (spThisLi.hasClass("js-opened")) {
                spThisLi.find(".sp-sub:first").slideUp(function () {
                    spThisLi.removeClass("js-opened");
                    spThisLi.find(".sp-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                });
            } else {
                $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                spThisLi.addClass("js-opened");
                spThisLi.find(".sp-sub:first").slideDown();
            }

            return false;

        });

    })(jQuery);
}

function init_side_panel_resize() {
    (function ($) {
        "use strict";

        if ($(window).width() >= 1199) {
            side_panel.css({
                opacity: 1,
                left: 0
            });
            $(".side-panel-is-left").css("margin-left", "270px");
            sp_button.css("display", "none");
            sp_close_button.css("display", "none");
        } else {
            side_panel.css({
                opacity: 0,
                left: -270
            });
            $(".side-panel-is-left").css("margin-left", "0");
            sp_button.css("display", "block");
            sp_close_button.css("display", "block");
        }

    })(jQuery);
}
/* ---------------------------------------------
 Height 100%
 --------------------------------------------- */
function js_height_init() {
    (function ($) {
        $(".js-height-full").height($(window).height());
        $(".js-height-parent").each(function () {
            $(this).height($(this).parent().first().height());
        });
    })(jQuery);
}




/* ---------------------------------------------
 Google map
 --------------------------------------------- */

var gmMapDiv = $("#map-canvas");

function init_map() {
    (function ($) {

        $(".map-section").click(function () {
            $(this).toggleClass("js-active");
            $(this).find(".mt-open").toggle();
            $(this).find(".mt-close").toggle();
        });


        if (gmMapDiv.length) {

            var gmCenterAddress = gmMapDiv.attr("data-address");
            var gmMarkerAddress = gmMapDiv.attr("data-address");


            gmMapDiv.gmap3({
                action: "init",
                marker: {
                    address: gmMarkerAddress,
                    options: {
                        icon: "images/map-marker.png"
                    }
                },
                map: {
                    options: {
                        zoom: 14,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.SMALL
                        },
                        zoomControlOptions: {
                            position: google.maps.ControlPosition.LEFT_TOP
                        },
                        mapTypeControl: false,
                        scaleControl: false,
                        scrollwheel: false,
                        streetViewControl: false,
                        draggable: true,
                        styles: [{ "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#d3d3d3" }] }, { "featureType": "transit", "stylers": [{ "color": "#808080" }, { "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }, { "color": "#b3b3b3" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": 1.8 }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "color": "#d7d7d7" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ebebeb" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#a7a7a7" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#efefef" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#696969" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "color": "#737373" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#d6d6d6" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, {}, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "color": "#dadada" }] }]
                    }
                }
            });
        }
    })(jQuery);
}


/* ---------------------------------------------
 WOW animations
 --------------------------------------------- */

function init_wow() {
    (function ($) {

        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 90,
            mobile: false,
            live: true
        });

        if ($("body").hasClass("appear-animate")) {
            wow.init();
        }

    })(jQuery);
}

/* ---------------------------------------------
 Split section
 --------------------------------------------- */

function split_height_init() {
    (function ($) {

        $(".ssh-table, .split-section-content").css("height", "auto");

        if ($(window).width() > 992) {
            $(".split-section").each(function () {
                var split_section_height = $(this).find(".split-section-content").innerHeight();
                $(this).find(".ssh-table").height(split_section_height);
            });
        }

    })(jQuery);
}
