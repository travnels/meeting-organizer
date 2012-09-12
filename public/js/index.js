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

var secondsPerMinute = 60;
var secondsPerHour = 3600;

var events = [["Networking and Food"																						,"5:30-6:00"],
			  ["Announcements"      																						,"6:00-6:05"],
			  ["JMX by <a href='#speaker1' data-rel='dialog' data-transition='pop'>Jason Brown</a>"                         ,"6:05-7:00"],
			  ["Break"              																						,"7:00-7:15"],
			  ["High Performance Java by <a href='#speaker2' data-rel='dialog' data-transition='pop'>Simon Roberts</a>"      ,"7:16-8:45"],
			  ["Door Prizes"																								,"8:45-9:00"],
			  ["Networking at Ice House Tavern"																				,"9:00-10:00"]];


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



setInterval( function() {

    // Create a newDate() object and extract the minutes of the current time on the visitor's
    var hours = new Date().getHours();
    hours = (hours <= 12) ? hours : hours-12;
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var currentTimeInMinutes = (hours * secondsPerHour) + (minutes * secondsPerMinute)+ seconds;

    for (i = 0; i < events.length; i++)
    {
        var eventStartTime = getEventStartTimeInSeconds(events[i][1]);
        var eventEndTime = getEventEndTimeInSeconds(events[i][1]);
        var percentage = ((currentTimeInMinutes - eventStartTime) / (eventEndTime - eventStartTime)) * 100;

        if (percentage >= 100)
        {
            percentage = 100;
            //Turn progress bar red
            document.getElementById("divHoldingProgressBar"+i).outerHTML = getDivForEvent(i);
        }
        else if (percentage < 0)
        {
            percentage = 0;
        }

        //update progress bar
        document.getElementById("spanForProgressBar"+i).outerHTML = getSpanForEvent(i,percentage);
    }

    },1000);


    function getDivForEvent(index)
    {
        return "<div style='width: 100%;' class='meter red nostripes' id='divHoldingProgressBar"+index+"'>"+
            "<div style='float: left; width: 0'>"+events[index][0]+"</div>"+
            "<div style='float: right;'>"+events[index][1]+"</div>"+
            "<span id='spanForProgressBar"+index+"' style='width: 100%;z-index: -1;'></span>"+
            "<div style='text-align: center;'></div>"+
            "</div>";
    }

    function getSpanForEvent(index,percentage)
    {
        return "<span id='spanForProgressBar"+index+"' style='width: "+percentage+"%;z-index: -1;'></span>";
    }

    function getEventStartTimeInSeconds(timeString)
    {
        var startTimeString = timeString.split("-");
        var hoursAndMinutes = startTimeString[0].split(":");
        var startTimeInSeconds = (parseInt(hoursAndMinutes[0])*secondsPerHour)+(parseInt(hoursAndMinutes[1])*secondsPerMinute);
        return startTimeInSeconds;
    }

    function getEventEndTimeInSeconds(timeString)
    {
        var endTimeString = timeString.split("-");
        var hoursAndMinutes = endTimeString[1].split(":");
        var endTimeInSeconds = (parseInt(hoursAndMinutes[0])*secondsPerHour)+(parseInt(hoursAndMinutes[1])*secondsPerMinute);
        return endTimeInSeconds;
    }

});