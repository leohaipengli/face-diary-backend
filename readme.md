# Face Diary
## About

Use your face to keep diary.

## Run

### deployed on Vagrant
Run the following command to deploy the app at port **37532**, but this port is already used by us, so you may need to change to another port.
```shell
$ vagrant up --provision
```
After that you can access the app by accessing that port on [CPU470](http://csil-cpu470.csil.sfu.ca:37532/).

Note that there app on this cpu470 server doesn't provide full features, see below.

### What's working and what's not
All the features except **Facebook** login work.
The reason why **Facebook** login doesn't work is their API for new app **doesn't support http protocol** which is believed insecure.

The full features of our app **can be accessed at an another server we have on AWS: [Face Diary](https://facediary.leoleo.win)**

### account with pre-loaded data
email: `asd@asd.ca`

password: `asdasd`

There are some data generated during the poster session provided by some guests and other group of people.

