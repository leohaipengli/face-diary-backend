module.exports = {
  apps : [
    {
      name: "face-diary",
      script: "./app.js",
      watch: true,
      env: {
        "NODE_ENV": "development",
      }
    }
  ]
};