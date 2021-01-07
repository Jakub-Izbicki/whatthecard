# Deploy to Heroku:

## I. Initial setup:

### 1. Login to heroku:
```
heroku login
```
### 2. Create heroku app (one time only):
```
heroku create -a what-the-card
```

### 3. Add necessary heroku buildpacks (one time only):
```
heroku buildpacks:add -a what-the-card heroku/nodejs
heroku buildpacks:add -a what-the-card https://github.com/heroku/heroku-buildpack-static
```


## II. Deploy application:

### 1. Set heroku app repo as git remote:
```
heroku git:remote -a what-the-card
```

### 2. Push code to heroku app repo (deploys immediately):
```
git push heroku master
```
