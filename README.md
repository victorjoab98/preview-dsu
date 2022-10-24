# Todo & Chat APP

## Next.js
## Typescript

To run the database application locally with docker-compose:

```
docker-compose up -d
```

- "-d" means **detached**

*MongoDB url local connection    
```
mongodb://localhost:27017/dsu-app-db
```

## Environment variables configuration

Rename **.env.template.** file to _.env._

## Re build node modules

```
yarn install
yarn dev
```

## Populate the database with test information

call:

```
  http://localhost:3000/api/seed/
```
