# 📝 Node.js Todo List App

A simple, containerized Todo List application built with **Node.js and Express**. This project demonstrates a complete DevOps workflow including **Docker** containerization and a CI/CD pipeline using **Jenkins**.

## Architect Diagram
![Architect Diagram](/assets/workflow.png)


## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js (v5)
- **Frontend**: EJS, CSS
- **Testing**: Mocha, Chai, Supertest, NYC (Coverage)
- **DevOps**: Docker, Jenkins, Git

---

## 📋 Prerequisites

Before you start, make sure you have installed:
| Tool    | Purpose in Project                                                     | Documentation |
| ------- | ---------------------------------------------------------------------- | ------------- |
| Node.js | The runtime environment used to build the backend server (Express.js) and run the application logic nodejs​.            | [Node.js Installation](https://nodejs.org/en/download)   |
| Docker  | Used to containerize the application, ensuring it runs consistently across different environments by packaging the code and dependencies together docker​. | [Docker Installation](https://docs.docker.com/engine/install/)   |
| Jenkins | The automation server that handles the CI/CD pipeline, including checking out code, building Docker images, and deploying the container.                   | [Jenkins Docs](https://www.jenkins.io/doc/book/installing/)  |

---

## 💻 How to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/my-todolist.git
   cd my-todolist
   ```
2. Install Dependencies
   ```sh
   npm install
   ```
3. Run the Application
   ```sh
   npm start
   ```
4. Access the app in browser `http://localhost:8000/todo`

![ToDo](/assets/verify.png)


## 🔄 Jenkins CI/CD Pipeline
This project includes a Jenkinsfile that automates the deployment workflow.

**Pipeline Stages:**
1. **Checkout:** Pulls code from GitHub.
2. **Install Dependencies:** Runs npm ci for a clean install.
3. **Build Image:** Creates a Docker image with the build number tag.
4. **Push to Docker Hub:** Pushes the image to user/todolist (or your repo).
5. **Deploy:** Stops the old container and runs the new one automatically.
6. **Health Check:** Verifies that the app is responding correctly.

**Jenkins Requirements:**
1. **Plugins:** Docker Pipeline, NodeJS, Git.
2. **Credentials:** docker-cred (Username/Password) for Docker Hub access.
3. **Tools:** NodeJS-24 configured in Global Tool Configuration.


## 🚀 Features
- **CRUD Operations**: Add, Edit, and Delete todo items.
- **Clean UI**: Server-side rendering using EJS templates.
- **Input Validation**: Sanitization to prevent XSS attacks.
- **Automated Testing**: Unit tests using Mocha, Chai, and Supertest.
- **Dockerized**: specific `Dockerfile` for production-ready container image.
- **CI/CD Ready**: Complete `Jenkinsfile` for automated build and deployment.