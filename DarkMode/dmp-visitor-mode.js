jQuery(document).ready(function($){
    'use strict';
    dmp_visitor_init()

    if(displayDarkModeVisitor == "1"){
        // Display Switch
        if(dmp_get_from_storage()){
            dmp_visitor_dark_on()
            dmp_append_toggle_button(true)
        }else{
            dmp_append_toggle_button(false)
        }
    }

});

function dmp_get_from_storage(){
    'use strict';
    if(dark_mode_by_default == "1"){
        var dark_status = "1"
    }else{
        var dark_status = "0"
    }
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("dmp-storage-mode") != null)
        {
            dark_status = localStorage.getItem("dmp-storage-mode")
        }
    }
    return (dark_status == "1") ? true : false
}

function dmp_set_to_storage(is_dark){
    'use strict';
    var dark_status = (is_dark) ? "1" : "0"
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("dmp-storage-mode", dark_status);
    }
}

function dmp_append_toggle_button(is_dark){
    'use strict';
    if(floating_switch_style == "1"){
        dmp_append_toggle_1(is_dark)
    }else if(floating_switch_style == "2"){
        dmp_append_toggle_2(is_dark)
    }
}

function dmp_append_toggle_1(is_dark){
    'use strict';
    var checked_status = (is_dark) ? "checked" : ""

    jQuery("body").append("<div class=\"dmp-toggle-container\">\n" +
        "                      <div id=\"dmp-toggle-btn\" class=\"toggle-btn-1\">\n" +
        "                          <input type=\"checkbox\" "+checked_status+">\n" +
        "                          <span></span>\n" +
        "                      </div>\n" +
        "                  </div>")

    jQuery('#dmp-toggle-btn input:checkbox').change(
        function(){
            if (jQuery(this).is(':checked')) {
                dmp_set_to_storage(true)
                dmp_visitor_dark_on()
            }else{
                dmp_set_to_storage(false)
                dmp_visitor_dark_off()
            }
        });

}
function dmp_append_toggle_2(is_dark){
    'use strict';
    var checked_status = (is_dark) ? "checked" : ""

    jQuery("body").append("<div class=\"dmp-toggle-container\">\n" +
        "                      <div id=\"dmp-toggle-btn\" class=\"toggle-btn-2\">\n" +
        "                          <input type=\"checkbox\" "+checked_status+">\n" +
        "                          <span class=\"box\"></span>\n" +
        "                          <span class=\"spleft\">Light</span>\n" +
        "                          <span class=\"spright\">Dark</span>\n" +
        "                      </div>\n" +
        "                  </div>")

    jQuery('#dmp-toggle-btn input:checkbox').change(
        function(){
            if (jQuery(this).is(':checked')) {
                dmp_set_to_storage(true)
                dmp_visitor_dark_on()
            }else{
                dmp_set_to_storage(false)
                dmp_visitor_dark_off()
            }
        });

}

function dmp_visitor_init(){
    'use strict';
    if(floating_switch_position == "bottom_right"){
        var position_class = ".dmp-toggle-container{\n" +
            "                      position: fixed;\n" +
            "                      bottom: 50px;\n" +
            "                      right: 50px;\n" +
            "                  }";
    }else if(floating_switch_position == "bottom_left"){
        var position_class = ".dmp-toggle-container{\n" +
            "                      position: fixed;\n" +
            "                      bottom: 50px;\n" +
            "                      left: 50px;\n" +
            "                  }";
    }else{
        var position_class = ".dmp-toggle-container{\n" +
            "                      position: fixed;\n" +
            "                      bottom: 50px;\n" +
            "                      right: 50px;\n" +
            "                  }";
    }
    jQuery("body").prepend("<style>" +
        "                       :root {" +
        "                           --dmp_style_background: "+floating_switch_color+";" +
        "                       }" +
        "                       "+position_class+"" +
        "                       .frs-night-mode.frs-night-mode-normal-bg{" +
        "                           background: "+color_preset_background+" !important;" +
        "                       }" +
        "                       .frs-night-mode.frs-night-mode-black-bg{" +
        "                           background:#000 !important;" +
        "                       }" +
        "                       .frs-night-mode.frs-night-mode-normal-text{" +
        "                           color: "+color_preset_text+" !important;" +
        "                       }" +
        "                       .frs-night-mode.frs-night-mode-white-text{" +
        "                           color:#fff !important;" +
        "                       }" +
        "                       .frs-night-mode.frs-night-mode-link-text{" +
        "                           color: "+color_preset_link+" !important;" +
        "                       }" +
        "                       .frs-night-mode.frs-night-mode-image{" +
        "                           filter: brightness("+image_brightness_level+"%);" +
        "                       }" +
        "                   </style>")
    jQuery("html").show()
}

function dmp_visitor_dark_on(){
    'use strict';
    var frsNightMode = "frs-night-mode"
    var frsNightModeNormalBg = "frs-night-mode-normal-bg"
    var frsNightModeBlackBg = "frs-night-mode-black-bg"

    var frsNightModeNormalText = "frs-night-mode-normal-text"
    var frsNightModeWhiteText = "frs-night-mode-white-text"
    var frsNightModeLinkText = "frs-night-mode-link-text"

    var frsNightModeImage = "frs-night-mode-image"

    jQuery( "*" ).not('.dmp-toggle-container *').each(function() {
        if(jQuery(this).hasClass(frsNightMode)){


        }else{
            jQuery(this).addClass(frsNightMode);
            /* Replace Background */

            if(jQuery(this).css("background-image") == "none"){
                if(jQuery(this).css("background-color") == "rgb(255, 255, 255)"){ // Replace White Background
                    jQuery(this).addClass(frsNightModeBlackBg);
                }else if(jQuery(this).css("background-color") != "rgba(0, 0, 0, 0)"){ // Don't replace transparent
                    jQuery(this).addClass(frsNightModeNormalBg);
                }
            }

            /* Reduce Brightness */
            if(low_image_brightness == "1"){
                if(jQuery(this).is('img')){
                    jQuery(this).addClass(frsNightModeImage);
                }
            }

            /* Replace Text */
            if(jQuery(this).css("color") == "rgb(0, 0, 0)"){ // Replace Black Background
                jQuery(this).addClass(frsNightModeWhiteText);
            }else{
                jQuery(this).addClass(frsNightModeNormalText);
            }

            /* Replace Text Color */
            if(jQuery(this).is('a')){
                jQuery(this).addClass(frsNightModeLinkText);
            }

        }
    });


}

function dmp_visitor_dark_off(){
    'use strict';
    var frsNightMode = "frs-night-mode"

    jQuery( "*" ).each(function() {
        if(jQuery(this).hasClass(frsNightMode)){
            jQuery(this).removeClass(frsNightMode);
        }
    });

}


