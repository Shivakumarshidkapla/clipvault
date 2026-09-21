FROM python:3.14-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create a dedicated non-root user
RUN useradd --uid 10001 --create-home --shell /usr/sbin/nologin appuser \
    && chown -R appuser:appuser /app

# Run the application without root privileges
USER 10001:10001

EXPOSE 8000

CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000" ]