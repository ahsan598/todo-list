pipeline {
    agent any
    
    tools {
        nodejs "NodeJS-24"
    }
    
    environment {
        DOCKER_IMAGE = 'username/todoapp'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/username/todolist.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry(credentialsId: 'docker-cred') {
                    sh '''
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop todoapp || true
                    docker rm todoapp || true
                    docker run -d -p 8000:8000 --name todoapp ${DOCKER_IMAGE}:latest
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 5
                    curl -f http://localhost:8000/todo
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker build images...'
            sh '''
            docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true
            docker image prune -f || true
            '''
        }
    }
}
