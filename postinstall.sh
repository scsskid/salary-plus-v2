#!/bin/sh
COMMIT=$(git describe --all --long | cut -d "-" -f 3)

echo "{
  \"commit\": \"${COMMIT}\"
}" > commit.json
