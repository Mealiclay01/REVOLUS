#!/bin/bash

# pip install --no-cache-dir gunicorn
# export PATH="/home/appuser/.local/bin:$PATH"

gunicorn --bind 0.0.0.0:8000 backend.wsgi