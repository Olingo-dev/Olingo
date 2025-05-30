# Run air and npm in parallel
(
    cd ../src/
    exec air
) & 
(
    cd ../src/web/
    exec npm run dev
)
wait