# Application Deployment Guide

This project uses GitHub Actions to automate the process of testing, building, and deploying Docker images of the server and client to Docker Hub. This guide explains how to set up and execute the CI/CD pipeline to ensure continuous deployment.

## Prerequisites

- **Docker Hub Account**: A Docker Hub account is required to push Docker images.
- **GitHub Repository**: The project is hosted on a GitHub repository with CI/CD workflows configured using GitHub Actions.
- **GitHub Secrets**: The following secrets must be added to the GitHub repository settings:
  - `DOCKERHUB_USERNAME`: Your Docker Hub username.
  - `DOCKERHUB_TOKEN`: An access token generated from Docker Hub for authentication.

## CI/CD Workflows

### 1. Build and Push Server

The **build and push production server to dockerhub** workflow is triggered manually via `workflow_call`. This workflow:

- Configures the environment to build multi-architecture Docker images (using QEMU and Buildx).
- Logs in to Docker Hub using the provided secrets.
- Builds the server image using the `Dockerfile.production`.
- Pushes the Docker image to Docker Hub with the specified tag.

### 2. Build and Push Client

The build and push production client to dockerhub workflow functions similarly to the server workflow but for the client. It follows the same steps for configuring the environment, logging in to Docker Hub, and building the client image.

### 3. Automated Test, Build, and Push

The **Test, compile and push client and server** to production workflow is triggered when changes are pushed to the main branch or manually via workflow_dispatch. This workflow performs the following actions:

- Runs an i18n parser for internationalization files.
- Runs Playwright tests to ensure the code stability.
- Upon successful tests, triggers the build workflows for both the server and the client, and pushes the Docker images to Docker Hub.

## GitHub Secrets Configuration

To configure the secrets required for Docker authentication:

1. Go to the Settings tab of your GitHub repository.
2. In the left sidebar, select Secrets and variables > Actions.
3. Add the following secrets:

- `DOCKERHUB_USERNAME`: Your Docker Hub username.
- `DOCKERHUB_TOKEN`: An access token generated from Docker Hub account.

## Deployment Instructions

To manually trigger the build and deployment workflows:

1. Go to the Actions tab of your GitHub repository.
2. Select the workflow you want to run (e.g., Test, compile and push client and server to production).
3. Click Run workflow and provide the necessary inputs if prompted (e.g., image name).
