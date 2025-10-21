#!/bin/bash

echo "QFS Health Check"
echo "================"

# Check application health
echo "Checking application health..."
HEALTH=$(curl -s http://localhost:3000/api/health)
echo "Health Status: $HEALTH"

# Check metrics
echo ""
echo "Checking metrics..."
METRICS=$(curl -s http://localhost:3000/api/metrics)
echo "Metrics: $METRICS"

# Check database connection
echo ""
echo "Checking database connection..."
psql -h localhost -U qfs_user -d qfs -c "SELECT 1" && echo "Database: OK" || echo "Database: FAILED"

# Check Redis connection
echo ""
echo "Checking Redis connection..."
redis-cli -h localhost ping && echo "Redis: OK" || echo "Redis: FAILED"

echo ""
echo "Health check completed!"
