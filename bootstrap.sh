#!/usr/bin/env bash

MANAGE="pipenv run python manage.py"

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     OS=Linux;;
    Darwin*)    OS=Mac;;
    CYGWIN*)    OS=Windows;;
    *)          echo "Unknown OS: ${unameOut}"
esac

# install dependencies
pipenv install

# Create and run migrations
${MANAGE} makemigrations
${MANAGE} migrate

# create super user
echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@mail.com', '1234')" | ${MANAGE} shell

# build ui core app
pushd frontend/core-app && npm install && npm run build && popd

# build ui public app
pushd frontend/public-app && npm install && npm run build && popd

# copy static files to server
${MANAGE} collectstatic --noinput

# Open Chrome
if [[ ${OS} == "Windows" ]]; then
    start chrome "http://localhost:8000"
elif [[ ${OS} == "Mac" ]]; then
    open -a "Google Chrome" http://localhost:8000
fi

# Run django dev server
${MANAGE} runserver