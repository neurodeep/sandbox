#!/bin/sh
# Archive and delete all logs one-by-one.
# Console command (non-verbose):
# for f in *.log; do tar -czf $f.tar.gz $f; rm $f; done
for f in *.log
do
  echo "Processing $f"
  tar -czf $f.tar.gz $f
  rm $f
done
echo "Done"
