#!/bin/sh
COMMIT=$(git describe --all --long | cut -d "-" -f 3 | cut -d "g" -f 2)

echo "{
  \"commit\": \"${COMMIT}\"
}" > commit.json

