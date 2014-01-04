#!/usr/bin/env python
import netCDF4 as nc
from numpy import *
import sys
import math

width=495
height=309

filename=sys.argv[1]
varname=sys.argv[2]
digits=sys.argv[3]

filetype=filename[10:12]

numfmt="%."+digits+"f,"

ncfile = nc.Dataset(filename, 'r')

var=ncfile.variables[varname]

if filetype=="pp":
  vardata=list(var)
else:
  vardata=list(var[0])

print "{"

print "\"name\":\""+varname+"\","

if filetype=="pp":
  print "\"desc\":\""+getattr(var,"long_name")+"\","
else:
  print "\"desc\":\""+getattr(var,"description")+"\","
  
print "\"units\":\""+getattr(var,"units")+"\","

print "\"grid\":{"
print "  \"width\":%d," % width
print "  \"height\":%d," % height
print "  \"bounds\":[-2963997.87057,-1848004.2008,2964000.82884,1848004.09676],"
print "  \"proj4\":\"+proj=lcc +lon_0=4 +lat_0=47.5 +lat_1=47.5 +lat_2=47.5 +a=6370000. +b=6370000. +no_defs\""
print "},"

print "\"attribution\":\"ODC-By http://openmeteoforecast.org\","

print "\"data\":["
for y in range(height):
  line="["
  for x in range(width):
    val=vardata[y][x]
    if val==9.96921e+36 or math.isnan(val):
      line += "null,"
    else:
      line += numfmt % val
  line=line[:-1]+"]"
  if y<height-1:
    line+=","
  print line

print "]}"

ncfile.close()

