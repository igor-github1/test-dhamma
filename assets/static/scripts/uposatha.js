
var black = "../img/black.gif";
var white = "../img/white.gif";

var height=1;
var size = 50;
var i;
var currentDate  = new Date();
var x = currentDate;
currentDate.setTime(currentDate.getTime() + (currentDate.getTimezoneOffset()*60000));
var blueMoonDate = new Date(96, 1, 3, 16, 15, 0);
var lunarPeriod  = 29*(24*3600*1000) + 12*(3600*1000) + 44.05*(60*1000);
var moonPhaseTime = (currentDate.getTime() - blueMoonDate.getTime() - (60*1000)*(17*60+13)) % lunarPeriod;
var percentRaw = (moonPhaseTime / lunarPeriod);
var percent    = Math.round(100*percentRaw - 0.5) / 100 + 0.005;
var percentBy2 = Math.round(200*percentRaw - 0.5) + 0.5;
var left  = (percentRaw >= 0.5) ? black : white;
var right = (percentRaw >= 0.5) ? white : black;
var time = (lunarPeriod-moonPhaseTime)/(24*3600*1000);
var days = Math.round(time - 0.5);
var hours = Math.round((time-days)*24 - 0.5);
var minutes = Math.round(((time-days)*24 - hours)*60 - 0.5);

var moonPhaseTime2 = (currentDate.getTime() - blueMoonDate.getTime() - (60*1000)*(8*60+13) + (lunarPeriod/2)) % lunarPeriod;
var time2 = (lunarPeriod-moonPhaseTime2)/(24*3600*1000);
var days2 = Math.round(time2 - 0.5);
var hours2 = Math.round((time2-days2)*24 - 0.5);
var minutes2 = Math.round(((time2-days2)*24 - hours2)*60 - 0.5);

var time3 = moonPhaseTime2/(24*3600*1000);
var days3 = Math.round(time3 - 0.5);

document.write("<center>");

if (percentBy2 > 100) {
percentBy2 = percentBy2 - 100;
}
for (i = -(size-1); i < size; ++i) {
var wid=2*parseFloat(Math.sqrt((size*size)-(i*i)));
if (percentBy2 != 100)
document.write ("<img src="+left +" height=1 width="+(wid*((100-percentBy2)/100))+">");
if (percentBy2 != 0)
document.write("<img src="+right+" height=1 width="+(wid*((percentBy2)/100))+">");
document.write("<br>");
}
document.write("</center>");

