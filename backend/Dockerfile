# Use an official Miniconda3 image 
FROM continuumio/miniconda3

# Set the working directory 
WORKDIR /app

# Copy the environment.yml file to /app in the docker container
COPY environment.yml .

COPY checkpoints /app/checkpoints

# Install the Conda env 
RUN conda env create -f environment.yml

# Make RUN commands use the new envi
SHELL ["conda", "run", "-n", "myenv", "/bin/bash", "-c"]

# Copy the rest of the application code 
COPY . .

# Expose the port the app runs on i
EXPOSE 5000

# Run the application 
CMD ["conda", "run", "--no-capture-output", "-n", "myenv", "gunicorn", "-b", "0.0.0.0:5000", "app:app"]
