'use strict'
var debug;


//left-hand object
var left = (function() {
    var left = [[],[],[],[],[]];

    return {
        setFinger: function( finger, valArray ){
            left[finger] = valArray;

        },
        getFinger: function(finger){
            return left[finger];
        }
    };

}());

//right-hand object
var right = (function() {
    var right = [[],[],[],[],[]];

    return {
        setFinger: function( finger, valArray ){
            right[finger] = valArray;

        },
        getFinger: function(finger){
            return right[finger];
        },
    };

}());

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
            if (finger.extended){
                //Debug to console
                console.log(finger);

                if (hand.type === "left"){

                    left.setFinger(finger.type, finger.tipPosition);

                }else if (hand.type === "right"){

                    right.setFinger(finger.type, finger.tipPosition);
                }
            }//if
        } //for

    });

}).use('screenPosition', {scale: 0.50});
