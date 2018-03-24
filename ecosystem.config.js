module.exports = {
  apps : [
    {
      name: "face-diary",
      script: "./bin/www",
      watch: true,
      env: {
          "PORT": 3001,
          "NODE_ENV": "development"
      },
    }
  ]
};