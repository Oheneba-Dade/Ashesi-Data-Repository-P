FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["sh", "-c", "\
    echo 'Running migrations...' && \
    python manage.py makemigrations ADRP && \
    python manage.py migrate && \
    echo 'Re-balancing ADRP Stats...' && \
    python manage.py rebalancestats && \
    echo 'Starting server...' && \
    gunicorn ADRP.wsgi:application --bind 0.0.0.0:8000 --workers 4 \
"]