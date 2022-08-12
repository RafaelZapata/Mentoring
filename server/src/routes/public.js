import Public from "controllers/public";

export default function routes(app) {
  app.get("/", Public.home);
  app.get("*", Public.notFound);
}
