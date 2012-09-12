$(document).ready(function() {

    $(function() {
        $(".meter > span").each(function() {
            $(this)
                .data("origWidth", $(this).width())
                .width(0)
                .animate({
                    width: $(this).data("origWidth")
                }, 1200);
        });
    });

    setInterval(function() {
        var date = new Date(),
            seconds = date.getSeconds(),
            minutes = date.getMinutes(),
            hours = date.getHours();

        if (hours == 0)
            hours = 12; //account for 0 hour, which is 12
        else if (hours > 12)
            hours = hours - 12; //keep in 12 hour format

        $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds); //add leading 0
        $("#min").html(( minutes < 10 ? "0" : "" ) + minutes); //add leading 0
        $("#hours").html(hours);
    }, 1000);

});