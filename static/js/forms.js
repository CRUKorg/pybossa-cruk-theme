(function(){
    var resource = location.pathname.split('/')[1];

    function makeSlug(text) {
        var not_valid_chars = /([$#%·~!¡?"¿'=)(!&\/|]+)/g;
        return text.toLowerCase().trim().replace(not_valid_chars, "").replace(/( )+/g, "");
    }

    if ( resource === 'project' ) {
        $("#name").bind('textchange', function (event, previousText) {
          $('#short_name').val(makeSlug($(this).val()));
        });

    }

    if ( resource === 'account' ) {
        $("#fullname").bind('textchange', function (event, previousText) {
          $('#name').val(makeSlug($(this).val()));
        });
    }


    // Added by Dryden for prolific academic work

    var url = window.location.href;
    var $controlGroups = $(".control-group");
    var $userNameRow = $($controlGroups[1]);
    if ( url.indexOf("prolific") > -1) {
        $controlGroups.hide();
        $userNameRow.show();
        $("form").submit(function (event) {
            if ( $("#name").val() != "") {
                $("#fullname, #email_addr, #password, #confirm").val( $("#name").val() );
                var newEmailAddress = $("#name").val() + "@prolific.com";
                $("#email_addr").val(newEmailAddress);
                return;
            }
            alert("please enter a your userid");
            event.preventDefault();
        });
    }

}());
