release: python manage.py makemigrations --no-input
release: python manage.py migrate --no-input
web: sh -c 'cd ./backend/ && exec gunicorn backend.wsgi --log-file -'
