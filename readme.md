# Face Diary
## About

Use your face to keep diary.

## Run

### install
```shell
$ npm install
```
### start server
development run on Linux or macOS
```shell
$ PORT=3001 DEBUG=face-diary:* npm run devstart
```
or on windows
```shell
$ set PORT=3001 DEBUG=face-diart:* & npm run devstart
```

note that the port number is set to 3001 to avoid confict of React server.

## API
See [here](https://csil-git1.cs.surrey.sfu.ca/CMPT470WindowsVista/face-diary/wikis/apis) for whole list 

## Todo
- Deployment
    - Deploy first to avoid image url problem
- Learn uploading image file, and serving
    - Combine upload & detect
        - Problem: localhost image url ?
    - File filter (size, type)
- Diary retrieve api
    - get list
    - get detail
    - new entry
    - update entry
    - delete entry
- Facebook login api  # postponed because of insecure http is forbidden.
- Immigrate to Typescript # seems complicated
