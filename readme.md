# Node.js Todo List App


### 🎯 Project Overview
A simple, containerized Todo List application built with **Node.js and Express**. This project demonstrates a complete DevOps workflow including **Docker** containerization and a CI/CD pipeline using **Jenkins**.

### 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: EJS, CSS
- **Testing**: Mocha, Chai, Supertest
- **DevOps**: Docker, Jenkins, Git

### ⚙️ Architect Diagram
![Architect Diagram](/assets/workflow.png)

---

### 📋 Prerequisites

Before you start, make sure you have installed:

| Tool        | Purpose                                                     | Documentation |
|-------------|-------------------------------------------------------------|---------------|
| **Node.js** | The runtime environment used to build and run the application | [Install Node.js](https://nodejs.org/en/download)           |
| **Docker**  | Builds and runs container images for application services | [Install Docker](https://docs.docker.com/engine/install/)       |
| **Jenkins** | The automation server that handles the CI/CD pipeline     | [Install Jenkins](https://www.jenkins.io/doc/book/installing/)  |


### 💻 How to Run Locally

```sh
# Clone the Repository
git clone https://github.com/ahsan598/todo-list-jenkins.git
cd todo-list-jenkins

# Install Dependencies
npm install

# Run the Application
npm start

# Access the app in your browser http://localhost:8000/todo
```
![ToDo](/assets/verify.png)


### 🔄 Jenkins CI/CD Pipeline

This project includes a Jenkinsfile that automates the deployment workflow.

**I. Pipeline Stages:**
1. **Checkout:** Pulls code from GitHub.
2. **Install Dependencies:** Runs `npm ci` for a clean install.
3. **Build Image:** Creates a Docker image with the build number tag.
4. **Push to Docker Hub:** Pushes the image to docker hub with image tag.
5. **Deploy:** Stops the old container and runs the new one automatically.
6. **Health Check:** Verifies that the app is responding correctly.

**II. Jenkins Requirements:**
1. **Plugins:** Docker Pipeline, NodeJS, Git.
2. **Credentials:** (Token) for Docker Hub access.
3. **Tools:** NodeJS configured in Global Tool Configuration.


### 🚀 Features
- **CRUD Operations**: Add, Edit, and Delete todo items.
- **Clean UI**: Server-side rendering using EJS templates.
- **Automated Testing**: Unit tests using Mocha, Chai, and Supertest.
- **Dockerized**: specific `Dockerfile` for production-ready container image.
- **CI/CD Ready**: Complete `Jenkinsfile` for automated build and deployment.


### 🏁 Summary

This hands-on project shows how to:

- **End-to-End Automation:** Built a complete CI/CD pipeline using Jenkins to automatically build, test, and deploy a Node.js application whenever code is pushed to GitHub.
- **Containerization Standard:** Dockerized the application to ensure consistency across environments, utilizing production-ready practices like non-root users and optimized image layers.
- **DevOps Best Practices:** Implemented secure credential management for Docker Hub, automated health checks for reliability, and integrated version control with dynamic image tagging.
