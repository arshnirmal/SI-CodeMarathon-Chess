import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "./App.css";
import RouterConfig from "./utils/router_config";
import store from "./utils/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    </>
  );
}

export default App;
