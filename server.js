const app = require("./src/app/app");
 
const port = process.env.PORT || 8080;
 
app.listen(port, () => {
  console.log(`--------------server running on port  ${port}--------`);
});