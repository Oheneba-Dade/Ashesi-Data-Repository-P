FROM --platform=linux/amd64 python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy application
COPY . .

# At the end of Dockerfile, after COPY . .
RUN python manage.py collectstatic --noinput

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Gunicorn command
CMD ["/usr/local/bin/gunicorn", "ADRP.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
