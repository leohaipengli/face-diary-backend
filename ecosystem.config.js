module.exports = {
  apps : [
    {
      name: "face-diary",
      script: "./app.js",
      watch: true,
      env: {
        "PORT": 3001,
        "NODE_ENV": "development",
      }
    }
  ]
};