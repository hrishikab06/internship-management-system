# AWS Amplify & Cloud Deployment Guide

This project is now structured so that you can **directly deploy the web application to AWS Amplify** with zero extra setup.

---

## 🚀 1. Deploy to AWS Amplify (1-Click Setup)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add responsive web frontend and amplify build spec"
   git push origin main
   ```

2. **Open the AWS Console**:
   * Navigate to **[AWS Amplify Console](https://console.aws.amazon.com/amplify/)**.
   * Click **"Create new app"** (or **"Host web app"**).
   * Choose **GitHub** as your Git repository provider and click **Next**.
   * Select your repository and the `main` branch.

3. **Build Settings**:
   * Amplify will automatically detect the `amplify.yml` specification located at the root of the project!
   * Verify the build settings preview matches:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - cd frontend
             - npm ci --prefer-offline || npm install
         build:
           commands:
             - npm run build
       artifacts:
         baseDirectory: frontend/dist
         files:
           - '**/*'
     ```
   * Click **Save and Deploy**.

4. **Access your Live Site**:
   * In 1-2 minutes, AWS Amplify will complete the build and provide you with a live `https://main.xxxx.amplifyapp.com` public URL.
   * You can open this on any laptop, tablet, or phone for your college presentation.

---

## 💻 2. Testing Locally Before Deploying

You can run the web app right now locally:
```bash
cd frontend
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## 🛡️ Demo Accounts & Pre-loaded Portals
The app includes role-based dashboards configured for quick demonstration:
* **Student View**: Apply for top internship openings, track status cards (Applied, Interviews, Offers).
* **Mentor View**: View assigned students, evaluate performance with 1-5 star ratings and submit remarks.
* **Admin View**: Placement metrics (87.5% rate, registered students), add new users, and manage access.

---

## ☁️ 3. Optional: Running the Backend

If you want the Java backend live in the cloud as well:
* A `Dockerfile` is provided in [`internship-backend/Dockerfile`](file:///home/hrishi/Projects/internship-management-system-main/internship-backend/Dockerfile).
* You can deploy it to **AWS App Runner** or run it via Docker:
  ```bash
  cd internship-backend
  docker build -t internship-backend .
  docker run -p 8080:8080 internship-backend
  ```
