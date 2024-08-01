# Python Image
FROM python:3.8-slim

# Set the working directory 
WORKDIR /app

# Copy the environment.yml file to /app in the docker container
COPY backend/requirements.txt .

COPY backend/checkpoints /app/checkpoints


# Install pip and any needed packages specified in requirements.txt
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Install PyTorch and related packages from the CPU-only index
RUN pip install --no-cache-dir \
    torch torchvision torchaudio \
    --index-url https://download.pytorch.org/whl/cpu

# Copy the rest of the application code 
COPY backend /app

# Expose the port the app runs on 
EXPOSE 5000

# Run the application
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
