# BASIC AUTH SERVICE

This service will come in handy for testing or creating login with your UI.
## DEPS

```
docker run -d --name container_mongo2 -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=password \
      mongo
```

## USE 

```nmp run start```