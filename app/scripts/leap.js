'use strict'
var debug;
var gameBegan = false;

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
                    // left.setPalm(hand.palmPosition);
                    // left.setPalmWidth(frame.data.hands[0].palmWidth);
                    if (finger.extended){
                        left.setFinger(finger.type,0,finger.tipPosition);
                        left.setFinger(finger.type,1,finger.carpPosition);
                    }else{
                        left.setFinger(finger.type,[0,0,0])
                    }

                }else if (hand.type === "right"){
                    // right.setPalm(hand.palmPosition);
                     if (finger.extended){
                        right.setFinger(finger.type,0,finger.tipPosition);
                        right.setFinger(finger.type,1,finger.carpPosition);
                    }else{

                    }
                }

            } //for
            updateFingers();
            if (!gameBegan){
                init();
                gameBegan = true;
            }
            $('.finger1').text(left.getMaxX());


        });
        // if (frame.hands.length === 0){
        //      for (var i = 0, max = 5; i < max; i++){
        //         left.setFinger(i,[0,0,0]);
        //         $('.finger1').text(left.getFinger(0));

        //      }
        // }

    }).use('riggedHand',{scale:1.3, dotsMode: false})
        .connect()
});
