#!/bin/bash

set -e

echo "QFS Production Deployment Script"
echo "=================================="

# Configuration
ENVIRONMENT=${1:-production}
DOCKER_REGISTRY=${DOCKER_REGISTRY:-docker.io}
IMAGE_NAME="qfs"
IMAGE_TAG=$(git rev-parse --short HEAD)

echo "Deploying QFS to $ENVIRONMENT environment"
echo "Image: $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG"

# Build Docker image
echo "Building Docker image..."
docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG .
docker tag $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG $DOCKER_REGISTRY/$IMAGE_NAME:latest

# Push to registry
echo "Pushing image to registry..."
docker push $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG
docker push $DOCKER_REGISTRY/$IMAGE_NAME:latest

# Deploy to Kubernetes
if [ "$ENVIRONMENT" = "production" ]; then
  echo "Deploying to Kubernetes..."
  kubectl apply -f kubernetes/deployment.yaml
  kubectl set image deployment/qfs-deployment qfs-app=$DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG
  kubectl rollout status deployment/qfs-deployment
fi

echo "Deployment completed successfully!"
echo "Application URL: https://qfs.yourdomain.com"
