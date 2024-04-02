const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const Router = require("./routes/User");
const MemberRouter = require("./routes/Member");
const TeamRouter = require("./routes/Team");
app.use(cors());
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT || 4000;

app.use('/', Router)
app.use('/api/users', MemberRouter)
app.use('/api/team', TeamRouter)

mongoose.connect(process.env.MONGODB)
.then(()=>{
  console.log("Mongodb Connected");
})
.catch((err)=>{
  console.error(err);
})
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});