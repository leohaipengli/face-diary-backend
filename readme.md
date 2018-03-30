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
- Facebook login api  # postponed because of insecure http is forbidden.
- Diary retrieve api
    - update entry
- Immigrate to Typescript # seems complicated
