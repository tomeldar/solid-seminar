#!/usr/bin/env bash
set -euo pipefail

NAME=solid-pg
IMAGE=postgres:16
USER=solid
PASS=solid
DB=solid
PORT=5432

if docker ps -a --format '{{.Names}}' | grep -q "^$NAME$"; then
  echo "Container $NAME already exists. Starting..."
  docker start $NAME
else
  echo "Creating and starting $NAME..."
  docker run --name $NAME \
    -e POSTGRES_USER=$USER \
    -e POSTGRES_PASSWORD=$PASS \
    -e POSTGRES_DB=$DB \
    -p $PORT:5432 -d $IMAGE
fi

echo "Postgres running on $PORT (user=$USER db=$DB)"
