FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy application
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Gunicorn command
CMD ["gunicorn", "ADRP.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
