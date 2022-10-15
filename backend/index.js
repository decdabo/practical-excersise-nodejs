const app = require('./app');

app.listen(process.env.PORT || 9000,() => {
  console.log('We are connected!')
});
