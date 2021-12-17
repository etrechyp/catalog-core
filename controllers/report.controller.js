const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const { rm } = require("fs/promises");

const sendReport = async (req, res = response) => {
  const { id } = req.params;

  res.download(path.join(__dirname, `../assets/${id}.pdf`));

  await rm(path.join(__dirname, `../assets/${id}.pdf`));
};

const generateReport = (req, res = response) => {
  const { products, total, lastUpdated } = req.body;
  const docId = uuidv4();
  const filePath = path.join(__dirname, `../assets/${docId}.pdf`);
  ejs.renderFile(
    path.join(__dirname, "../views", "report.ejs"),
    { products, total, lastUpdated },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        pdf
          .create(data, { format: "Letter", orientation: "portrait" })
          .toFile(filePath, async (err, response) => {
            if (err) res.send(err);
            else {
              console.log(`${docId} - ${Date.now()}`);
              res.status(200).json({
                ok: true,
                filename: `${docId}`,
              });
            }
          });
      }
    }
  );
};

module.exports = {
  sendReport,
  generateReport,
};
