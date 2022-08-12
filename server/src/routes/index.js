import publicRoutes from "./public";
import systemRoutes from "./system";
import postRoutes from "./posts";

export default function applyRoutes(app) {
  postRoutes(app);
  systemRoutes(app);

  // Sempre a ultima linha da funcao
  publicRoutes(app);
}
