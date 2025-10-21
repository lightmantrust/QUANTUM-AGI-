# QFS Production Deployment Guide

## Overview
This guide provides comprehensive instructions for deploying the Quantum Financial System (QFS) to production environments.

## Prerequisites
- Docker and Docker Compose
- Kubernetes cluster (for K8s deployment)
- PostgreSQL 16+
- Redis 7+
- Node.js 20+

## Environment Setup

### 1. Configure Environment Variables
Create a `.env.production` file with all required variables:

\`\`\`bash
cp .env.production.example .env.production
# Edit .env.production with your production values
\`\`\`

### 2. Database Setup
\`\`\`bash
# Create database
createdb qfs

# Run migrations
npm run migrate:prod
\`\`\`

### 3. Redis Setup
\`\`\`bash
# Start Redis
docker run -d -p 6379:6379 redis:7-alpine
\`\`\`

## Deployment Methods

### Docker Compose (Development/Staging)
\`\`\`bash
docker-compose -f docker-compose.yml up -d
\`\`\`

### Kubernetes (Production)
\`\`\`bash
# Create secrets
kubectl create secret generic qfs-secrets \
  --from-literal=database-url=$DATABASE_URL \
  --from-literal=redis-url=$REDIS_URL

# Deploy
kubectl apply -f kubernetes/deployment.yaml

# Check status
kubectl get deployments
kubectl get pods
\`\`\`

### Manual Deployment
\`\`\`bash
# Build
npm run build

# Start
npm start
\`\`\`

## Monitoring & Logging

### Health Checks
\`\`\`bash
curl http://localhost:3000/api/health
\`\`\`

### Metrics
\`\`\`bash
curl http://localhost:3000/api/metrics
\`\`\`

### Logs
\`\`\`bash
# Docker
docker logs qfs-app

# Kubernetes
kubectl logs deployment/qfs-deployment
\`\`\`

## Security Considerations

1. **Environment Variables**: Never commit `.env.production` to version control
2. **SSL/TLS**: Use HTTPS in production
3. **API Keys**: Rotate regularly and use secrets management
4. **Database**: Enable encryption at rest and in transit
5. **Network**: Use VPC and security groups to restrict access

## Scaling

### Horizontal Scaling
\`\`\`bash
kubectl scale deployment qfs-deployment --replicas=5
\`\`\`

### Load Balancing
Configure your load balancer to distribute traffic across replicas.

## Backup & Recovery

### Database Backup
\`\`\`bash
pg_dump qfs > qfs_backup.sql
\`\`\`

### Restore
\`\`\`bash
psql qfs < qfs_backup.sql
\`\`\`

## Troubleshooting

### Application won't start
- Check environment variables
- Verify database connectivity
- Review logs: `docker logs qfs-app`

### High latency
- Check network connectivity
- Monitor resource usage
- Review Corda node status

### Transaction failures
- Check blockchain network status
- Verify API keys and credentials
- Review transaction logs

## Support
For issues or questions, contact the QFS support team.
