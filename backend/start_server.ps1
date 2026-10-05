$repo = 'C:\Users\hp\.m2\repository'
$jarList = Get-ChildItem -Path $repo -Filter '*.jar' -Recurse | Where-Object { 
    $_.FullName -notmatch 'slf4j-api-1\.7\.36' -and 
    $_.FullName -notmatch 'javadoc' -and 
    $_.FullName -notmatch 'sources' 
} | Select-Object -ExpandProperty FullName
$cp = ($jarList -join ';')
$classPath = "backend\target\classes;$cp"

Write-Host "Starting DevTrack Spring Boot Backend on http://localhost:8080 ..."
& java -cp $classPath com.devtrack.DevTrackApplication
