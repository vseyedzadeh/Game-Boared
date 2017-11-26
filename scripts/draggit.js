


// function to shuffle the six images inside the section.
$(document).ready(
    function () {
        
        var a = $("#gameCanvas > img").remove().toArray();
        for (var i = a.length - 1; i >= 1; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var bi = a[i];
            var bj = a[j];
            a[i] = bj;
            a[j] = bi;
        }
        $("#gameCanvas").append(a);
    });


//function that makes the six images draggable and one div droppable

$(document).ready(
    function () {

        $('#geo1').draggable({
            
        });
        $('#geo2').draggable({
            revert: "invalid"
        });
        $('#geo3').draggable({
            revert: "invalid"
        });
        $('#geo4').draggable({
            revert: "invalid"
        });
        $('#geo5').draggable({
            revert: "invalid"
        });
        $('#geo6').draggable({
            revert: "invalid"
        });
        $('#dog1').draggable({
            revert: "invalid"
        });
        $('#dog2').draggable({
            revert: "invalid"
        });
        $('#dog3').draggable({
            revert: "invalid"
        });
        $('#dog4').draggable({
            revert: "invalid"
        });
        $('#dog5').draggable({
            revert: "invalid"
        });
        $('#dog6').draggable({
            revert: "invalid"
        });


        //makes the div droppable only for geo1 image
        $('#drop').droppable({
            accept: "#geo1",
            drop: function () {
                console.log(this);
                $(this).addClass('dropped');
                
            }


        });
     
    });
