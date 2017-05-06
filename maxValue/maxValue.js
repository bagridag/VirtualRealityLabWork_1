/**
 * Created by burcakagridag on 5.5.2017.
 */

var array = [{time:200}, {time:410}, {time:1000}, {time:1000.5}];

var key=[];
var value=[];
var max=0;

array.map(function(item){

    for(i in item)
    {
        key.push(i);
        value.push(item[i]);
    }

});

function getMaxOfArray() {
     max= Math.max.apply(null, value);
};

getMaxOfArray().apply();

function showResult() {

    x = document.getElementById("max")
    x.innerHTML = max;

}