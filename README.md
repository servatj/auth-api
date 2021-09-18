# BASIC AUTH SERVICE

This service will come in handy for testing or creating login with your UI.
## DEPS

```
docker run -d --name container_mongo2 -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=password \
      mongo
```

### Enviroment vars to make this work and keep you safe

```js 
- MONGO_URI= your mongo uri connection
- API_PORT= port number that you want to expose
- TOKEN_KEY= Token key to generat your token
```

## USAGE 

Ensure deps and env vars are already there before running this, you will need a docker mongo or any other mongo db.

```nmp run start```

