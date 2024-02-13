Set-PSDebug -Off

$currentDirectory = Get-Location
$parentDirectory = Split-Path -Path $currentDirectory -Parent

# Build the workbench docker container without using it directly.
# This way we have the command line output of the build process
Write-Output "Build workbench image"
docker build -f workbench.dockerfile .

# Build the workbench docker container again, but with -q parameter.
# The build is finished immediately, as everything is already in cache.
# The result is the hash of the container, which is used to start it.
$containerHash=""
docker build -q -f workbench.dockerfile . 2>$null | Tee-Object -Variable containerHash

# use only the last part of the output. Additional output can be ignored.
$containerHash = $containerHash.Substring($containerHash.Length - 64)

$timestamp = [DateTimeOffset]::Now.ToUnixTimeSeconds()

Write-Output "Start workbench container"
docker run --rm `
    --pull=never `
    -v ${parentDirectory}:/work `
    -v //var/run/docker.sock:/var/run/docker.sock `
    -v $env:USERPROFILE:/root `
    -w /work/kubernetes-escape-room `
    -e KUBECONFIG=".kubeconfig" `
    --network kind `
    --pid host `
    --name escape_room_workbench-${timestamp} `
    -it ${containerHash}
