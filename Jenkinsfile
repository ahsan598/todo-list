pipeline {
    agent any
    
    tools {
        nodejs "NodeJS-24"
    }
    
    environment {
        NODE_ENV = 'development'
        DOCKER_IMAGE = 'username/todoapp'
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'docker.io'
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/your-username/my-todolist.git'
            }
        }

        stage('Pre-Install Validation') {
            parallel {
                stage('Validate package.json') {
                    steps {
                        sh '''
                            echo "Validating package.json..."
                            node -e "JSON.parse(require('fs').readFileSync('package.json'))"
                            echo "✅ package.json is valid"
                        '''
                    }
                }
                
                stage('Check Lock File') {
                    steps {
                        sh '''
                            echo "Checking for package-lock.json..."
                            if [ ! -f "package-lock.json" ]; then
                                echo "❌ package-lock.json not found!"
                                exit 1
                            fi
                            echo "✅ Lock file exists"
                        '''
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "Installing dependencies..."
                    npm ci
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh '''
                    echo "Running tests..."
                    npm test
                '''
            }
            post {
                always {
                    // Generate test reports
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }

        stage('Code Quality & Security') {
            parallel {
                stage('Security Audit') {
                    steps {
                        script {
                            sh '''
                                echo "Running npm audit..."
                                npm audit --audit-level=moderate || true
                            '''
                        }
                    }
                }
                
                stage('Dependency Check') {
                    steps {
                        sh '''
                            echo "Checking for outdated dependencies..."
                            npm outdated || true
                        '''
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        echo "Building Docker image..."
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }

        stage('Trivy Image Scan') {
            steps {
                script {
                    sh """
                        echo "Scanning Docker image with Trivy..."
                        trivy image --severity HIGH,CRITICAL --format table -o trivy-report.html ${DOCKER_IMAGE}:${DOCKER_TAG}
                        trivy image --severity HIGH,CRITICAL --format json -o trivy-report.json ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
            post {
                always {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'trivy-report.html',
                        reportName: 'Trivy Security Report'
                    ])
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred', url: "https://${DOCKER_REGISTRY}") {
                        sh """
                            echo "Pushing Docker images..."
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker push ${DOCKER_IMAGE}:latest
                        """
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    sh """
                        echo "Deploying application..."
                        docker stop todolist || true
                        docker rm todolist || true
                        docker run -d \\
                            -p 8000:8000 \\
                            --name todolist \\
                            --restart unless-stopped \\
                            ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sh '''
                        echo "Waiting for application to start..."
                        sleep 10
                        curl -f http://localhost:8000/todo || exit 1
                        echo "Application is healthy!"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
            emailext(
                subject: "Jenkins Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build succeeded. Check console output at ${env.BUILD_URL}",
                to: 'your-email@example.com'
            )
        }
        failure {
            echo '❌ Pipeline failed. Check logs.'
            emailext(
                subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build failed. Check console output at ${env.BUILD_URL}",
                to: 'your-email@example.com'
            )
        }
        always {
            echo 'Cleaning up Docker images...'
            sh """
                docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true
                docker system prune -f || true
            """
        }
    }
}
