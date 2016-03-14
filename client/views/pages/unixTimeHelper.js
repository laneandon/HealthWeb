unixTimeFromSecondToMillisecond = function(unixTime){
    var tempToTransform = unixTime.getTime() * 1000;
    if(tempToTransform < 64057795200000){
        //if earlier than A.D. 4000
        return new Date(tempToTransform);
    }
    return unixTime;
}