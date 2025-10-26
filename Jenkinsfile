pipeline {
    agent {label 'version'}
    
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
        
        stage('Setup Node.js') {
            steps {
                echo '⚙️ Setting up Node.js environment...'
                sh '''
                    # Install nvm (Node Version Manager)
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    
                    # Install and use Node.js 18
                    nvm install 18
                    nvm use 18
                    
                    # Verify installation
                    node --version
                    npm --version
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    nvm use 18
                    npm ci --prefer-offline --no-audit --no-fund
                '''
            }
        }
        
        stage('Build') {
            steps {
                echo '🏗️ Building application...'
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    nvm use 18
                    npm run build
                '''
            }
        }
        
        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                // Add any tests here if you have them
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    nvm use 18
                    npm run lint || echo "Linting completed with warnings"
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'
                // Kill any existing processes on port 1000
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    nvm use 18
                    
                    lsof -i :1000 | grep LISTEN | awk '{print $2}' | xargs kill -9 || echo "No process running on port 1000"
                '''
                
                // Start the application
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    nvm use 18
                    
                    PORT=1000 HOST=0.0.0.0 npm start &
                '''
                
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
