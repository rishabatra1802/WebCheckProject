# WebCheck Deployment Guide for EC2

## Overview
This guide explains how to deploy the WebCheck application on an AWS EC2 instance using multiple deployment methods.

## Prerequisites
1. AWS EC2 instance (Ubuntu 20.04 or later recommended)
2. SSH access to the instance
3. Security group configured to allow inbound traffic on port 1000

## Deployment Options

### Option 1: Direct Deployment with Systemd Service

#### 1. Connect to your EC2 instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

#### 2. Clone or copy the application
```bash
# If using git:
git clone <your-repo-url> /home/ubuntu/webcheck
cd /home/ubuntu/webcheck

# Or copy files directly:
# scp -i your-key.pem -r . ubuntu@your-ec2-public-ip:/home/ubuntu/webcheck
```

#### 3. Run the deployment script
```bash
chmod +x deploy.sh
sudo ./deploy.sh
```

#### 4. Configure security group
In AWS EC2 console, ensure your security group allows inbound traffic on port 1000:
- Type: Custom TCP
- Port: 1000
- Source: 0.0.0.0/0 (or your specific IP range)

### Option 2: Docker Deployment

#### 1. Install Docker on EC2
```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install -y docker.io docker-compose

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu

# Logout and login again or run:
newgrp docker
```

#### 2. Build and run with Docker
```bash
# Navigate to project directory
cd /home/ubuntu/webcheck

# Build and run
docker build -t webcheck .
docker run -d -p 1000:1000 --name webcheck-app webcheck
```

#### 3. Or use Docker Compose
```bash
# Navigate to project directory
cd /home/ubuntu/webcheck

# Start with docker-compose
docker-compose up -d
```

### Option 3: Jenkins CI/CD Pipeline

#### 1. Install Jenkins on EC2 (if not already installed)
```bash
# Install Java
sudo apt update
sudo apt install -y openjdk-11-jdk

# Add Jenkins repository
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'

# Install Jenkins
sudo apt update
sudo apt install -y jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

#### 2. Configure Jenkins
1. Access Jenkins at `http://your-ec2-ip:8080`
2. Complete initial setup
3. Install NodeJS plugin
4. Configure NodeJS tool (name: "node-18")
5. Create a new pipeline job
6. Set pipeline definition to "Pipeline script from SCM"
7. Configure your repository

#### 3. Jenkins Pipeline Configuration
The Jenkinsfile is already included in the project. It will:
- Checkout code
- Install dependencies
- Build the application
- Run tests
- Deploy to port 1000

### Option 4: Manual Deployment

#### 1. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. Install and build the application
```bash
# Navigate to project directory
cd /home/ubuntu/webcheck

# Install dependencies
npm ci --prefer-offline --no-audit --no-fund

# Build the application
npm run build
```

#### 3. Configure environment and start
```bash
# Set environment variables
export PORT=1000
export HOST=0.0.0.0
export NODE_ENV=production

# Start the application
npm start &
```

## Managing the Application

### Using Systemd (Recommended for Option 1)
```bash
# Check status
sudo systemctl status webcheck

# Start service
sudo systemctl start webcheck

# Stop service
sudo systemctl stop webcheck

# Restart service
sudo systemctl restart webcheck

# View logs
sudo journalctl -u webcheck -f
```

### Using Docker
```bash
# Check status
docker ps

# View logs
docker logs webcheck-app

# Stop container
docker stop webcheck-app

# Start container
docker start webcheck-app

# Restart container
docker restart webcheck-app
```

### Using Docker Compose
```bash
# Navigate to project directory
cd /home/ubuntu/webcheck

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Start services
docker-compose up -d
```

## Health Checks

The application includes a health check endpoint at:
```
GET http://your-ec2-ip:1000/api/health
```

This returns:
```json
{
  "status": "ok",
  "message": "WebCheck API is running",
  "version": "1.0.0",
  "endpoints": {
    "analyze": "/api/analyze (POST)"
  }
}
```

## Security Considerations

1. **Firewall**: Only expose port 1000 to necessary IP ranges
2. **HTTPS**: Consider using a reverse proxy like Nginx with SSL termination
3. **Updates**: Regularly update system packages and application dependencies
4. **Monitoring**: Set up monitoring for application performance and errors

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill process using port 1000
   sudo lsof -i :1000 | grep LISTEN | awk '{print $2}' | xargs kill -9
   ```

2. **Permission denied**:
   ```bash
   # Ensure proper ownership
   sudo chown -R ubuntu:ubuntu /home/ubuntu/webcheck
   ```

3. **Build failures**:
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Application not accessible**:
   ```bash
   # Check if application is running
   curl -f http://localhost:1000/api/health
   
   # Check firewall rules
   sudo ufw status
   
   # Check security group settings in AWS console
   ```

### Logs

1. **Systemd logs**:
   ```bash
   sudo journalctl -u webcheck -f
   ```

2. **Docker logs**:
   ```bash
   docker logs webcheck-app -f
   ```

3. **Application logs**:
   Check Jenkins console output or Docker logs for application-specific errors.

## Scaling Considerations

For production use with higher traffic:

1. **Load Balancer**: Use AWS Application Load Balancer
2. **Multiple Instances**: Deploy to multiple EC2 instances
3. **Auto Scaling**: Configure auto scaling groups
4. **Database**: If adding persistent storage, use RDS
5. **Caching**: Implement Redis for caching if needed
6. **Monitoring**: Use CloudWatch for metrics and alerts

## Backup and Recovery

1. **Code Backup**: Store code in version control (GitHub, GitLab, etc.)
2. **Configuration Backup**: Backup environment files and service configurations
3. **AMI Backup**: Create AMI images of your EC2 instance periodically
4. **Automated Backups**: Set up automated backup scripts

## Cost Optimization

1. **Instance Type**: Use t3.micro or t3.small for low traffic
2. **Spot Instances**: Consider spot instances for development environments
3. **Auto Scaling**: Scale down during low traffic periods
4. **Monitoring**: Monitor resource usage to right-size instances

## Updating the Application

1. **With Jenkins**: Push changes to repository and trigger build
2. **Manual Update**:
   ```bash
   # Stop service
   sudo systemctl stop webcheck
   
   # Pull latest changes
   git pull origin main
   
   # Install/update dependencies
   npm ci
   
   # Build application
   npm run build
   
   # Start service
   sudo systemctl start webcheck
   ```

3. **Docker Update**:
   ```bash
   # Pull latest changes
   git pull origin main
   
   # Rebuild image
   docker build -t webcheck .
   
   # Stop and remove old container
   docker stop webcheck-app
   docker rm webcheck-app
   
   # Run new container
   docker run -d -p 1000:1000 --name webcheck-app webcheck
   ```

## Conclusion

Your WebCheck application is now ready for deployment on EC2! Choose the deployment method that best fits your infrastructure and operational requirements. The Jenkins pipeline provides automated CI/CD, Docker offers containerization benefits, and direct deployment gives you full control over the environment.

For any questions or issues, refer to the logs and troubleshooting section above.