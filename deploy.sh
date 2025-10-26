#!/bin/bash

# WebCheck Deployment Script for EC2
# This script helps deploy the WebCheck application on an EC2 instance

set -e  # Exit on any error

echo "🚀 Starting WebCheck deployment..."

# Update system packages
echo "🔄 Updating system packages..."
sudo apt update -y

# Install Node.js and npm if not already installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js already installed"
fi

# Install Jenkins if needed (optional)
# Uncomment the following lines if you want to install Jenkins on the same instance
# echo "🔧 Installing Jenkins..."
# sudo apt install -y openjdk-11-jdk
# wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
# sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
# sudo apt update -y
# sudo apt install -y jenkins
# sudo systemctl enable jenkins
# sudo systemctl start jenkins

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /home/ubuntu/webcheck
sudo chown ubuntu:ubuntu /home/ubuntu/webcheck

# Clone or copy the application files
echo "📋 Copying application files..."
# If you're cloning from a repository:
# git clone <your-repo-url> /home/ubuntu/webcheck

# For now, we'll assume files are already in place
cd /home/ubuntu/webcheck

# Install dependencies
echo "📦 Installing application dependencies..."
npm ci --prefer-offline --no-audit --no-fund

# Build the application
echo "🏗️ Building application..."
npm run build

# Set up systemd service
echo "⚙️ Setting up systemd service..."
sudo cp webcheck.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable webcheck

# Start the service
echo "🚀 Starting WebCheck service..."
sudo systemctl restart webcheck

# Check service status
echo "🔍 Checking service status..."
sudo systemctl status webcheck || echo "Service may still be starting..."

# Wait a moment and test
sleep 10
echo "🧪 Testing application..."
curl -f http://localhost:1000/api/health || echo "Application may still be starting or check service status"

echo "✅ Deployment completed!"
echo "🌐 WebCheck should be accessible at http://YOUR_EC2_PUBLIC_IP:1000"
echo "📋 To check logs: sudo journalctl -u webcheck -f"
echo "🔄 To restart service: sudo systemctl restart webcheck"
