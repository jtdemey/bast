import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  silent: true,
});

const router = express.Router();
const isProd = process.env.NODE_ENV === "production";

const ROUTES = [
  ["/", "home"],
  "/home",
  "/contact",
  "/events",
  "/welcome",
];

const sendHtmlFile = (res, fileName) => {
  if (isProd) {
    res.sendFile(path.join(process.cwd(), "dist", fileName));
    return;
  }
  res.sendFile(path.join(process.cwd(), "src", "pages", fileName));
};

const routeHtml = (endpoint, fileName = undefined) =>
  router.route(endpoint).get((_, res) => {
    res.redirect("https://johntorsten.com/bast");
    /*
    sendHtmlFile(
      res,
      `${fileName ? fileName : endpoint.replace("/", "")}.html`,
    );
    */
  });

ROUTES.forEach((route) =>
  Array.isArray(route) ? routeHtml(route[0], route[1]) : routeHtml(route),
);

export default router;
