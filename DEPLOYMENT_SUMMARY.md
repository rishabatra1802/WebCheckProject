# WebCheck - Complete Deployment Solution

## Overview
I've successfully enhanced your WebCheck application with comprehensive deployment capabilities for EC2, including Jenkins CI/CD, Docker support, and systemd service management. The application will run on port 1000 as requested.

## 🚀 Deployment Features Added

### 1. **Jenkins CI/CD Pipeline**
- **File**: `Jenkinsfile`
- Automated pipeline with stages:
  - Checkout code
  - Install dependencies
  - Build application
  - Run tests
  - Deploy to port 1000
- Configured for Node.js 18

### 2. **Systemd Service**
- **File**: `webcheck.service`
- Runs application as a service
- Automatic restart on failure
- Configured for port 1000 and host 0.0.0.0

### 3. **Deployment Script**
- **File**: `deploy.sh`
- Automated deployment for EC2
- Installs dependencies and sets up service
- Configures systemd and starts application

### 4. **Docker Support**
- **File**: `Dockerfile`
- Multi-stage build for optimized image
- Standalone Next.js build
- Non-root user for security
- Health checks included

### 5. **Docker Compose**
- **File**: `docker-compose.yml`
- Simplified container management
- Port mapping to 1000
- Health checks configured

### 6. **Configuration Updates**
- **File**: `package.json` - Updated start script to use PORT and HOST
- **File**: `next.config.ts` - Added standalone output for Docker
- **File**: `app/api/health/route.ts` - Enhanced health endpoint with deployment info

## 📁 Files Created

```
webcheck/
├── Jenkinsfile                 # Jenkins CI/CD pipeline
├── Dockerfile                  # Docker image definition
├── docker-compose.yml          # Docker Compose configuration
├── webcheck.service            # Systemd service file
├── deploy.sh                   # Automated deployment script
├── DEPLOYMENT_GUIDE.md         # Complete deployment instructions
└── next.config.ts              # Updated for standalone builds
```

## 🎯 How to Deploy on EC2

### Option 1: Jenkins Deployment
1. Install Jenkins on your EC2 instance
2. Configure NodeJS tool named "node-18"
3. Create pipeline job pointing to your repository
4. Click "Build Now" - Jenkins will handle everything!

### Option 2: Direct EC2 Deployment
```bash
# Copy files to EC2
scp -i your-key.pem -r . ubuntu@your-ec2-ip:/home/ubuntu/webcheck

# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Run deployment script
cd /home/ubuntu/webcheck
chmod +x deploy.sh
sudo ./deploy.sh
```

### Option 3: Docker Deployment
```bash
# On EC2
cd /home/ubuntu/webcheck
docker build -t webcheck .
docker run -d -p 1000:1000 --name webcheck-app webcheck
```

### Option 4: Docker Compose
```bash
# On EC2
cd /home/ubuntu/webcheck
docker-compose up -d
```

## 🔧 Key Configuration Details

### Environment Variables
- **PORT**: 1000 (configurable)
- **HOST**: 0.0.0.0 (binds to all interfaces)
- **NODE_ENV**: production

### Security Group Requirements
In AWS EC2 console, add inbound rule:
- Type: Custom TCP
- Port: 1000
- Source: 0.0.0.0/0 (or your IP range)

### Service Management
```bash
# Check status
sudo systemctl status webcheck

# Start service
sudo systemctl start webcheck

# Stop service
sudo systemctl stop webcheck

# View logs
sudo journalctl -u webcheck -f
```

## 📊 Health Monitoring

Health endpoint available at:
```
GET http://your-ec2-ip:1000/api/health
```

Returns detailed deployment information:
```json
{
  "status": "ok",
  "message": "WebCheck API is running",
  "version": "1.0.0",
  "deployment": {
    "method": "EC2",
    "port": 1000,
    "host": "0.0.0.0"
  }
}
```

## 🛡️ Security Best Practices

1. **Firewall**: Restrict port 1000 access to necessary IPs
2. **Updates**: Regular system and dependency updates
3. **Monitoring**: Use CloudWatch for logs and metrics
4. **Backups**: Regular AMI snapshots of your EC2 instance

## 📈 Scaling Options

1. **Load Balancer**: Use AWS Application Load Balancer
2. **Auto Scaling**: Configure auto scaling groups
3. **Multiple Instances**: Deploy to multiple EC2 instances
4. **Container Orchestration**: Use ECS or EKS for containerized deployments

## 🎯 Ready for Production

Your WebCheck application is now production-ready with:
- Automated deployment via Jenkins
- Container support with Docker
- Service management via systemd
- Health monitoring endpoints
- Comprehensive documentation
- Security best practices

Simply click "Build Now" in Jenkins and your application will be deployed to EC2 running on port 1000 at 0.0.0.0:1000!

For detailed instructions, refer to `DEPLOYMENT_GUIDE.md`.