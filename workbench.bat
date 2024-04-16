@echo off

:: Build the workbench docker container without using it directly.
:: This way we have the command line output of the build process
echo Build workbench image
docker build -f workbench.dockerfile .

:: Build the workbench docker container again, but with -q parameter.
:: The build is finished immediately, as everything is already in cache.
:: The result is the hash of the container, which is used to start it.
for /f %%i in ('docker build -q -f workbench.dockerfile .') do set CONTAINER_HASH=%%i

:: Create a timestamp to be able to start multiple workbenches parallel
set timestamp=%date%%time%
set timestamp=%timestamp:.=%
set timestamp=%timestamp::=%
set timestamp=%timestamp:,=%
set timestamp=%timestamp: =%

echo Start workbench container
docker run --rm ^
    --pull=never ^
    -v %cd%/../:/work ^
    -v //var/run/docker.sock:/var/run/docker.sock ^
    -v %USERPROFILE%:/root ^
    -w /work/k8s-escape-room ^
    -e KUBECONFIG=".kubeconfig" ^
    --network kind ^
    --pid host ^
    --name escape_room_workbench-%timestamp% ^
    -it %CONTAINER_HASH% %*
