var lastRun;
var baseUrl="http://data.openmeteoforecast.org/";
var domain="eu12";
var run="???";
var frame="1";
var format="tif";
var param="???";
var args="";

function update_url () {
  var url=baseUrl+domain+"/"+param+"."+run+"_"+frame+".";

  var exportUrl=url+format+args;
//  var previewUrl=url+"png";

  $("#url").val(exportUrl);
  $("#dlbutton").attr("href",exportUrl);

//  $("#previewImg").attr("src", previewUrl);
}

function update_format (format) {
  
  args="";
  switch (format) {
    case "GeoTiff":
      window.format="tif";
      break;
    case "JSON":
      window.format="json";
      break;
    case "CSV":
      window.format="csv";
      break;
    case "GRIB":
      window.format="grb";
      break;
    case "NetCDF":
      window.format="nc";
      break;
    case "Shapefile":
      window.format="contour.shp";
      break;
    case "GeoJSON":
      window.format="contour.json";
      break;
  }

  if (format=="JSON"||format=="CSV") {
    var digits=window.prompt("Rounding : How many digits after the dot ?","0");
    if (digits!=null) {
      args="?digits="+digits;
    }
  }
  update_url();
}

function update_run (run) {
  window.run=run;
  update_url();
}

function update_frame (frame) {
  window.frame=frame;
  update_url();
}

function last_run(run) {
  var r = {};
  
  r.id=run;
  r.year=run.substring(0,4);
  r.month=run.substring(4,6);
  r.day=run.substring(6,8);
  r.hour=run.substring(8,10);
  
  r.time=Date.UTC(r.year,r.month,r.day,r.hour,0,0,0);
  
  lastRun=r;
  window.run=run;
}

function time_to_text(time) {
  var date=new Date(time);
  
  var y=date.getUTCFullYear();
  var m=strpad(date.getUTCMonth());
  var d=strpad(date.getUTCDate());
  
  var h=strpad(date.getUTCHours());
  var i=strpad(date.getUTCMinutes());
  
  return y+"-"+m+"-"+d+" "+h+":"+i+" UTC";
}

function strpad(val){
  return (!isNaN(val) && val.toString().length==1)?"0"+val:val;
}

$(document).ready(function() {
  
  $(".outformat a").attr("href","javascript:void(0)");
  $(".outformat a").click(function (){
    update_format(this.innerHTML);
  });  
  
  $("#runSelect").change(function (){
    update_run($(this).val());
  });
  $("#frameSelect").change(function (){
    update_frame($(this).val());
  });
  
  var option = "<option value=\""+lastRun.id+"\">"+time_to_text(lastRun.time)+"</option>";
  $("#runSelect").append(option);
  
  for (var i=1; i<73; i++) {
    var time = lastRun.time + i*3600000;
    option = "<option value=\""+i+"\">["+i+"] "+time_to_text(time)+"</option>";
    $("#frameSelect").append(option);
  }
  
  for (var i=0; i<eu12_raw_vars.length; i++) {
    var v=eu12_raw_vars[i];
    option = $("<option value=\""+i+"\">"+v.label+" ("+v.units+")</option>");
    option.attr("title", v.desc);
    if (v.dims != "2d") {
      option.attr("disabled", "disabled");
    }
    $("#eu12rawSelect").append(option);
  }
  $("#eu12rawSelect").change(function () {
    param="raw-"+eu12_raw_vars[$(this).val()].var;
    update_url();
  });
  
  for (var i=0; i<eu12_pp_vars.length; i++) {
    var v=eu12_pp_vars[i];
    option = $("<option value=\""+i+"\">"+v.label+" ("+v.units+")</option>");
    option.attr("title", v.desc);
    if (v.dims != "2d") {
      option.attr("disabled", "disabled");
    }
    $("#eu12ppSelect").append(option);
  }
  $("#eu12ppSelect").change(function () {
    param="pp-"+eu12_pp_vars[$(this).val()].var;
    update_url();
  });
  
  $("#url").change(function () {
    $("#dlbutton").attr("href",$(this).val());
  });

  update_url();
});
