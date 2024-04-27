#!/bin/bash

export $(cat ../.env | xargs) 2> /dev/null

python manage.py runserver 0.0.0.0:8080