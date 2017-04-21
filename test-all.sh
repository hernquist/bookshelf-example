#!/bin/bash

yarn
dropdb books-authors
createdb books-authors
knex migrate:latest
npm start  # runs bookshelf seeds file
