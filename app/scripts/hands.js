


//left-hand object
var left = (function() {
    var left = [ [[],[]],[[],[]],[[],[]],[[],[]],[[],[]] ];
    var palm,
        palmWidth;

    return {
        setFinger: function( finger, fingerPos, valArray ){

            if (valArray !== undefined){
                var tempArr=[];
                for (var i = 0 ; i< valArray.length; i++){
                    if (i === 0){
                        tempArr.push((1.7 * valArray[i]) + 300);
                    } else if (i === 1){
                        tempArr.push(valArray[i] + 200);
                    }else{
                        tempArr.push(valArray[i]);
                    }
                }

                left[finger][fingerPos]= tempArr;
            }

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
        },
        normalize: function(val, power){
            return val/power;
        }
    };

}());

//right-hand object
var right = (function() {
    var right = [ [[],[] ],[[],[]],[[],[]],[[],[]],[[],[]] ];
    var palm,
        palmWidth;

    return {
        setFinger: function( finger, fingerPos, valArray ){
            var tempArr=[];
            for (var i = 0 ; i< valArray.length; i++){
                tempArr.push(valArray[i] + 300);
            }

            right[finger][fingerPos]= tempArr;

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
        },
        getMaxX:function(){
            return right[2][0];
        },
        getMinX: function(){
            return right[2][1];
        },
        getSlope: function(){
            return (this.getMaxX()[1] - this.getMinX()[1])/(this.getMaxX()[0] - this.getMinX()[0]);
        }

    };

}());