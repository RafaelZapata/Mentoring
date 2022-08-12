import Posts from "controllers/posts";
import Token from "utilities/token";

export default function routes(app) {
  app.get("/posts", Token.authorize, Posts.list);
  app.get("/posts/:id", Token.authorize, Posts.get);
  app.post("/posts", Token.authorize, Posts.insert);
  app.delete("/posts/:id", Token.authorize, Posts.delete);
  app.patch("/posts/:id", Token.authorize, Posts.update);
}
