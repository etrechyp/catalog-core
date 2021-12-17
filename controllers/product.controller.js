const { response } = require("express");
const axios = require("axios");
const { generateSC } = require("./auth.controller");
const { writeFile } = require("fs/promises");
const { dirname, join } = require("path");
const dayjs = require("dayjs");
const { fstat, read } = require("fs");


const getCatalog = (req, res = response) => {
  const catalogPath = join(__dirname, "../data/catalog.json");
  res.sendFile(catalogPath);
};

const putCatalog = async (req, res = response) => {
  const sellerCloudToken = req.get("token");

  await updateCatalog(sellerCloudToken);

  res.json({
    ok: true,
    message: "Full catalog updated",
  });
};

const updateCatalog = async (sellerCloudToken) => {
  const numberOfProducts = await getTotalNumberProducts(sellerCloudToken);
  const catalog = await getAndMergeCatalog(sellerCloudToken, numberOfProducts);
  const catalogPath = join(__dirname, "../data/catalog.json");
  const now = dayjs();
  const day = `${now.$D}-${now.$M}-${now.$y}T${now.$H}:${now.$m}`;

  const fileContents = {
    lastUpdated: day,
    catalog,
  };

  await writeFile(catalogPath, JSON.stringify(fileContents), {
    encoding: "utf8",
  });

  return catalog;
};

const getTotalNumberProducts = async (token) => {
  try {
    const response = await axios.get(
      "https://cf.api.sellercloud.com/rest/api/Catalog/GetAllByView?viewID=32&pageNumber=1&pageSize=1",
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        url: "/Catalog/GetAllByView?viewID=32&pageNumber=1&pageSize=1",
        baseURL: "https://cf.api.sellercloud.com/rest/api",
      }
    );

    return response.data.TotalResults;
  } catch (err) {
    return err;
  }
};

const getAndMergeCatalog = async (token, numberOfProducts) => {
  const pageSize = 50;
  const promises = [];
  const innerPromises = [];
  let catalog = [];

  for (let i = 1; i <= Math.ceil(numberOfProducts / pageSize); i++) {
    promises.push(
      axios.get(
        `https://cf.api.sellercloud.com/rest/api/Catalog/GetAllByView?viewID=32&pageNumber=${i}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
          url: "/Catalog/GetAllByView?viewID=32&pageNumber=1&pageSize=1",
          baseURL: `Catalog/GetAllByView?viewID=32&pageNumber=${i}&pageSize=50`,
        }
      )
    );
  }

  const promisesResponses = await Promise.all(promises);

  for (let page of promisesResponses) {
    catalog = [...catalog, ...page.data.Items];
  }

  return catalog;
};

const getBrands = async (req, res = response) => {
  const catalogPath = join(__dirname, "../brands.json");
  res.sendFile(catalogPath);
};


module.exports = {
  getCatalog,
  putCatalog,
  updateCatalog,
  getTotalNumberProducts,
  getAndMergeCatalog,
  getBrands
};
