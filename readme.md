# Assignment 2 Backend
## Group
Farsos, Jason, Trevor, Asutin

## Dev config
install docker
set container type to linux during install

run npm install to install project packages 
create local .env file for dev use



## hosting config
app engine used for static backend hosting
docker used for appengine deployment
mongo atlas used for db instance


## project structure
db folder holds mongoose schema and data connector
Scripts folder holds service availability test
import.js loads data into atlas and should not be run unless using a new instance
index.js creates server/node app, connects to database and tests for availability
db name
    comp4513
collections are 
    movies
    movies-brief
    users

### api paths
Brief movies uses /api/brief
Full uses /api/movies
filter users /api/find
favorites uses /api/favorites




