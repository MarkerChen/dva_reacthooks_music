import dva from "dva";
import "./index.css";
import { createBrowserHistory } from "history";
import createLoading from "dva-loading";
// 1. Initialize
const app = dva({
  history: createBrowserHistory()
});
// 2. Plugins
app.use(createLoading());
// 3. Model
require("./models").default.forEach(m => app.model(m));

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
