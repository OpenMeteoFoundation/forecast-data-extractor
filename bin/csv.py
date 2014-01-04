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


print "# name:\t"+varname

if filetype=="pp":
  print "# desc:\t"+getattr(var,"long_name")
else:
  print "# desc:\t"+getattr(var,"description")
  
print "# units:\t"+getattr(var,"units")

print "# grid:"
print "#   width:\t%d" % width
print "#   height:\t%d" % height
print "#   bounds:\t-2963997.87057\t-1848004.2008\t2964000.82884\t1848004.09676"
print "#   proj4:\t+proj=lcc +lon_0=4 +lat_0=47.5 +lat_1=47.5 +lat_2=47.5 +a=6370000. +b=6370000. +no_defs"
print "# attribution:\tODC-By http://openmeteoforecast.org"
print "#"

for y in range(height):
  line=""
  for x in range(width):
    val=vardata[y][x]
    if val==9.96921e+36 or math.isnan(val):
      line += "null,"
    else:
      line += numfmt % val
  print line[:-1]

ncfile.close()

