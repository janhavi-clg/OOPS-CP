$repo = 'C:\Users\hp\.m2\repository'
$jarList = Get-ChildItem -Path $repo -Filter '*.jar' -Recurse | Select-Object -ExpandProperty FullName
$cp = ($jarList -join ';')

if (!(Test-Path "backend\target\classes")) {
    New-Item -ItemType Directory -Path "backend\target\classes" -Force | Out-Null
}

$mainFiles = Get-ChildItem -Path "backend\src\main\java" -Filter "*.java" -Recurse | Select-Object -ExpandProperty FullName
$testFiles = Get-ChildItem -Path "backend\src\test\java" -Filter "*.java" -Recurse | Select-Object -ExpandProperty FullName
$allFiles = $mainFiles + $testFiles

Write-Host "Compiling Java files with classpath..."
& javac -cp "$cp;backend\src\main\java" -d "backend\target\classes" $allFiles

if ($LASTEXITCODE -eq 0) {
    Write-Host "Compilation successful. Running VerifyAllModulesOOP..."
    $runCp = "backend\target\classes;$cp"
    & java -cp $runCp com.devtrack.VerifyAllModulesOOP
} else {
    Write-Host "Compilation failed with exit code $LASTEXITCODE"
}
