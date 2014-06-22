'use strict'
var debug;

$(document).ready(function(){



    //Leap.loop uses websockets

    Leap.loop(function(frame) {
        //for debug purposes
        debug = frame;
        var finger;

        frame.hands.forEach(function(hand, index) {

            //loop through each finger
            for (var i = 0, max = hand.fingers.length; i < max; i++){
                finger = hand.fingers[i];

                //save extended fingers x,y,z positions
                //Debug to console
                //console.log(finger);

                if (hand.type === "left"){
                    if (finger.extended){
                        left.setFinger(finger.type, finger.tipPosition);
                    }else{
                        left.setFinger(finger.type,[0,0,0])
                    }

                }else if (hand.type === "right"){
                     if (finger.extended){
                         right.setFinger(finger.type, finger.tipPosition);
                    }else{

                    }
                }

            } //for
            updateFingers();
            $('.finger1').text(left.getFinger(0));

        });
        if (frame.hands.length === 0){
             for (var i = 0, max = 5; i < max; i++){
                left.setFinger(i,[0,0,0]);
                $('.finger1').text(left.getFinger(0));

             }
        }

    }).use('screenPosition', {scale: 0.50});
});
