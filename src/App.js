import "./App.css";
import Sidevar from "./components/sidebar/Sidebar";
import Timeline from "./components/timeline/Timeline";
import Widgets from "./components/widget/Widgets";

function App() {
  return (
    <div className="app">
      <Sidevar />
      <Timeline />
      <Widgets />
    </div>
  );
}

export default App;
