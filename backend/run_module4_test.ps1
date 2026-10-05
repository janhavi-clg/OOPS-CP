$repo = 'C:\Users\hp\.m2\repository'
$jarList = Get-ChildItem -Path $repo -Filter '*.jar' -Recurse | Select-Object -ExpandProperty FullName
$cp = ($jarList -join ';')

if (!(Test-Path "backend\target\classes")) {
    New-Item -ItemType Directory -Path "backend\target\classes" -Force | Out-Null
}

$javaFiles = Get-ChildItem -Path "backend\src\main\java" -Filter "*.java" -Recurse | Select-Object -ExpandProperty FullName

Write-Host "Compiling Java files..."
javac -cp $cp -d "backend\target\classes" $javaFiles

if ($LASTEXITCODE -eq 0) {
    Write-Host "Compilation successful. Running VerifyModule4OOP..."
    $runCp = "backend\target\classes;$cp"
    java -cp $runCp com.devtrack.module4_projects.VerifyModule4OOP
} else {
    Write-Host "Compilation failed with exit code $LASTEXITCODE"
}
