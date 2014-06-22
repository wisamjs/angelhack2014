


//left-hand object
var left = (function() {
    var left = [ [[],[]],[[],[]],[[],[]],[[],[]],[[],[]] ];
    var palm,
        palmWidth;

    return {
        setFinger: function( finger, fingerPos, valArray ){
            left[finger][fingerPos]= valArray;

        },
        getFinger: function(finger){
            return left[finger];
        },
        getPalm: function(){
        	return palm;
        },
        setPalm: function(val){
        	palm = val;
        },
        getPalmWidth: function(){
            return palmWidth;
        },
        setPalmWidth: function(val){
            palmWidth = val;
        },
        getMaxX:function(){
            return left[2][0];
        },
        getMinX: function(){
            return left[2][1];
        },
        getSlope: function(){
            return (this.getMaxX()[1] - this.getMinX()[1])/(this.getMaxX()[0] - this.getMinX()[0]);
        }
    };

}());

//right-hand object
var right = (function() {
    var right = [ [[],[]],[[],[]],[[],[]],[[],[]],[[],[]] ];
    var palm,
        palmWidth;

    return {
        setFinger: function( finger, fingerPos, valArray ){
            right[finger][fingerPos]= valArray;

        },
        getFinger: function(finger){
            return right[finger];
        },
        getPalm: function(){
        	return palm;
        },
        setPalm: function(val){
        	palm = val;
        },
        getPalmWidth: function(){
            return palmWidth;
        },
        setPalmWidth: function(val){
            palmWidth = val;
        }
    };

}());