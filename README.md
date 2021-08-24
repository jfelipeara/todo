## Project
copy .env.example to .env
Remmeber to change the timezone in config/app
this project uses laravel sail, install everything as follows:
``` 
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/opt \
    -w /opt \
    laravelsail/php80-composer:latest \
    composer install --ignore-platform-reqs
```
start the server:
```
sail up -d
```
Run the following commands:
```
sail art migrate:fresh
sail art passport:install
sail art db:seed
sail npm i
sail npm run dev
sail art schedule:work
```


