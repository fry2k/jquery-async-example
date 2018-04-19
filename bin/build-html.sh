#!/bin/bash

for FILE in src/*.html; do
    echo "File $FILE"
    HTML=`cat $FILE`

    for MATCH in `egrep -o '<!--inline:.+?-->' $FILE`
    do
        INLINE=$(echo $MATCH | sed -E "s/<!--inline:(.+)-->/\1/g")
        echo "inline $INLINE"
        CONTENT=`cat $INLINE`
        HTML=${HTML//$MATCH/$CONTENT}
    done

    RESULT="${FILE/src/dist}"
    echo -e "$HTML" > $RESULT
done