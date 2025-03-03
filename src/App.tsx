import data from "./data.json";

const Column = ({ header }: { header: string }) => {
  return (
    <div className="column">
      <div className="header">{header}</div>
      <div className="content">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <div className="container">
        <div className="list">
          <button>1</button>
          <button>2</button>
          <button>3</button>
        </div>
        <Column header="Fruit" />
        <Column header="Vegetable" />
      </div>
    </>
  );
}

export default App;
