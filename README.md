# Welcome to the Game Library API

## Description
This API is able to CRUD games and assign them a publisher.

The scheduled tasks has been developed as well to delete games or decrease a game's price.

You can find the assignment in the doc folder.

## What's needs to be done
If you want to contribute, you can:
- implement Exceptions to handle errors
- add params validators
- add extra checks before operations in the database
- add a proper api doc like swagger.

## Run the API
docker-compose up

## Run the tests
1 - enter in the api container

> docker container exec -it game-library-api_game-library-api_1 sh

2 - run e2e tests
> npm run test:e2e

## API DOC
### Get Health check
http://localhost:3001/health-check

### Get games
GET http://localhost:3001/games

Expected result:
```json
[
    {
        "id": "1",
        "title": "overwatch",
        "price": 50,
        "discount": null,
        "releaseDate": "2021-01-01T00:00:01.000Z",
        "publisher": {
            "id": "1",
            "name": "ubisoft",
            "siret": 99999,
            "phone": "0101010101"
        }
    },
    {
        "id": "2",
        "title": "league of legends",
        "price": 100,
        "discount": null,
        "releaseDate": "2021-02-01T00:00:01.000Z",
        "publisher": {
            "id": "2",
            "name": "riot",
            "siret": 88888,
            "phone": "0202020202"
        }
    }
]
```

### Get game
GET http://localhost:3001/games/:id

Expected result with id = 1:

```json
{
    "id": "1",
    "title": "overwatch",
    "price": 50,
    "discount": null,
    "releaseDate": "2021-01-01T00:00:01.000Z",
    "publisher": {
        "id": "1",
        "name": "ubisoft",
        "siret": 99999,
        "phone": "0101010101"
    }
}
```

### Get game publisher
GET http://localhost:3001/games/:id/publisher

Expected result with id 1:

```json
{
    "publisher": {
        "id": "1",
        "name": "ubisoft",
        "siret": 99999,
        "phone": "0101010101"
    }
}
```

### Post game
POST http://localhost:3001/games

BODY
```json
{
    "title": "dbz",
    "price": 100,
    "releaseDate": "2021-10-01 00:00:01"
}
```

Expected result:

```json
{}
```

### Patch game
PATCH http://localhost:3001/games/:id

BODY
```json
{
    "title": "lara croft",
    "price": 11,
    "releaseDate": "2021-02-01 00:00:01"
}
```

Expected result for id = 1:

```json
{
    "generatedMaps": [],
    "raw": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "Rows matched: 1  Changed: 1  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1
    },
    "affected": 1
}
```
### Put game publisher
PUT http://localhost:3001/games/:id/publisher/:publisherId

Expected result for id = 1 and publisherId = 2:

```json
{
    "id": "1",
    "title": "overwatch",
    "price": 50,
    "discount": null,
    "releaseDate": "2021-01-01T00:00:01.000Z",
    "publisher": {
        "id": "2",
        "name": "riot",
        "siret": 88888,
        "phone": "0202020202"
    }
}
```

### Delete game
DELETE http://localhost:3001/games/:id

Expected result for id = 1:

```json
{
    "raw": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    },
    "affected": 1
}
```