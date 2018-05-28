#!/usr/bin/env bash

docker run --name huitparfait-db --rm --network=host -e POSTGRES_USER=huitparfait-db -e POSTGRES_PASSWORD=huitparfait-db -p 5432:5432 postgres:9-alpine
