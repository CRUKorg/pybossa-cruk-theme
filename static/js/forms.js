(function(){
    var resource = location.pathname.split('/')[1];

    function makeSlug(text) {
        var not_valid_chars = /([$#%·~!¡?"¿'=)(!&\/|]+)/g;
        console.log( text.toLowerCase().trim().replace(not_valid_chars, "").replace(/( )+/g, "") );
        return text.toLowerCase().trim().replace(not_valid_chars, "").replace(/( )+/g, "");
    }

    if ( resource === 'project' ) {
        $("#name").on('keyup', function () {
          var text = $(this).val();
          $('#short_name').val(makeSlug($(this).val()));
        });
    }

    if ( resource === 'account' ) {
        $("#fullname").on('keyup', function () {
          var text = $(this).val();
          $('#name').val(makeSlug($(this).val()));
        });
    }


    // Added by Dryden for prolific academic work

    var url = window.location.href;
    var $controlGroups = $(".control-group");
    var $userNameRow = $($controlGroups[1]);
    if ( url.indexOf("prolific") > -1) {
        $controlGroups.hide();
        $("label[for='name']").text("Prolific Academic ID");
        $userNameRow.show();
        $("form").submit(function (event) {
            if ( $("#name").val() != "") {
                $("#fullname, #email_addr, #password, #confirm").val( $("#name").val() );
                $('#termsCheckbox').prop('checked', true);
                var newEmailAddress = $("#name").val() + "@prolific.com";
                $("#email_addr").val(newEmailAddress);
                return;
            }
            alert("please enter a your userid");
            event.preventDefault();
        });
    } else {
        $("form").submit(function (event) {
            if( $('#termsCheckbox').is(':checked') ) {
                return;
            } else {
                alert("please agree to the terms and conditions");
                event.preventDefault();
            }
        });

    }

}());
