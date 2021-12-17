const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");



const router = express.Router();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    

    this.paths = {
      users: "/api/users",
      auth: "/api/auth",
      products: "/api/products",
      report: "/api/report",
    };

    this.database();
    this.middlewares();
    this.routes();
  }

  async database() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors({
      credentials: false,
    }));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use('/', router);
    }

  routes() {
    this.app.use(this.paths.products, require("../routes/product.routes"));
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.users, require("../routes/user.routes"));
    this.app.use(this.paths.report, require("../routes/report.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server run in port ${this.port}`);
    });
  }
}

module.exports = Server;
