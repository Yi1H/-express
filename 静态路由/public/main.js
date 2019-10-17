$(function() {
    var $h1 = $("h1");
    var $zip = $("input[name='zip']");
    $("form").on("submit", function(event) {
        // 禁止表单的默认提交
        event.preventDefault();
        var zipCode = $.trim($zip.val());
        $h1.text("Loading...");

        var request = $.ajax({
            url: "/" + zipCode,
            dataType: "json"
        });
        request.done(function(data) {
            var temperature = data.temperature;
            $h1.html("It is " + temperature + "° in " + zipCode + ".");
        });
        request.fail(function() {
            $h1.text("Error!");
        });
    });
});
