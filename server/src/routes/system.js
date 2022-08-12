import System from "controllers/system";

export default function routes(app) {
  app.post("/system/register", System.insert);
  app.post("/system/auth", System.auth);
}
