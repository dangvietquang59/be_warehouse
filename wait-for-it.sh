#!/bin/bash
# wait-for-it.sh: Wait for a service to be available before proceeding.

host="$1"
shift
cmd="$@"

until nc -z "$host" 5432; do
  echo "Waiting for database to be ready..."
  sleep 2
done

echo "Database is up - executing command"
exec $cmd
