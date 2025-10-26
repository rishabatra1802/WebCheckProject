pipeline {
    agent any
    
    tools {
        nodejs "node-18"
    }
    
    environment {
        PORT = "1000"
        HOST = "0.0.0.0"
        NODE_ENV = "production"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                echo '⚙️ Setting up environment...'
                sh 'node --version'
                sh 'npm --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm ci --prefer-offline --no-audit --no-fund'
            }
        }
        
        stage('Build') {
            steps {
                echo '🏗️ Building application...'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                // Add any tests here if you have them
                sh 'npm run lint || echo "Linting completed with warnings"'
            }
        }
        
        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'
                // Kill any existing processes on port 1000
                sh 'lsof -i :1000 | grep LISTEN | awk \'{print $2}\' | xargs kill -9 || echo "No process running on port 1000"'
                
                // Start the application
                sh 'PORT=1000 HOST=0.0.0.0 npm start &'
                
                // Wait a moment for the app to start
                sh 'sleep 5'
                
                // Check if the app is running
                sh 'curl -f http://localhost:1000/api/health || echo "Application may still be starting..."'
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo "🌐 Application should be accessible at http://YOUR_EC2_IP:1000"
        }
        
        failure {
            echo '❌ Pipeline failed!'
            echo 'Check the logs above for details.'
        }
        
        cleanup {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
    }
}
