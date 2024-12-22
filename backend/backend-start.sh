#!/bin/bash

# Navigate to the backend directory
cd ../backend

# Check if virtual environment exists; if not, create it
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv venv
fi

# Activate the virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run the backend server
echo "Starting backend server..."
python app.py