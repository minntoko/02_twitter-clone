import "./App.css";
import Sidevar from "./components/sidebar/Sidebar";
import Timeline from "./components/timeline/Timeline";

function App() {
  return (
    <div className="app">
      <Sidevar />
      {/* Timeline */}
      <Timeline />
    </div>
  );
}

export default App;
