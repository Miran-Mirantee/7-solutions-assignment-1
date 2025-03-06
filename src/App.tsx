import { useState, useRef, useEffect } from "react";
import data from "./data.json";

type Item = {
  type: string;
  name: string;
};

function App() {
  const [allItems, setAllItems] = useState<Item[]>(data);
  const [vegetable, setVegetable] = useState<Item[]>([]);
  const [fruit, setFruit] = useState<Item[]>([]);
  const vegetableRef = useRef<Item[]>(vegetable);
  const fruitRef = useRef<Item[]>(fruit);

  useEffect(() => {
    vegetableRef.current = vegetable;
  }, [vegetable]);

  useEffect(() => {
    fruitRef.current = fruit;
  }, [fruit]);

  // Move item from column back to the main list
  const returnToList = (
    item: Item,
    items: Item[],
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
  ) => {
    if (items.includes(item)) {
      setItems((prev) => prev.filter((i) => i !== item));
      setAllItems((prev) => [...prev, item]);
    }
  };

  // Move item from main list to Fruit or Vegetable column
  const moveToColumn = (item: Item) => {
    setAllItems((prev) => prev.filter((i) => i !== item));

    if (item.type === "Fruit") {
      setFruit((prev) => [...prev, item]);
      setTimeout(() => returnToList(item, fruitRef.current, setFruit), 5000); // use Ref to get the latest state
    } else {
      setVegetable((prev) => [...prev, item]);
      setTimeout(
        () => returnToList(item, vegetableRef.current, setVegetable),
        5000
      ); // use Ref to get the latest state
    }
  };

  const Column = ({
    header,
    items,
    setItems,
  }: {
    header: string;
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  }) => {
    return (
      <div className="column">
        <div className="header">{header}</div>
        <div className="content">
          {items.map((item) => (
            <button
              key={item.name}
              onClick={() => returnToList(item, items, setItems)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="list">
        {allItems.map((item) => (
          <button key={item.name} onClick={() => moveToColumn(item)}>
            {item.name}
          </button>
        ))}
      </div>
      <Column header="Fruit" items={fruit} setItems={setFruit} />
      <Column header="Vegetable" items={vegetable} setItems={setVegetable} />
    </div>
  );
}

export default App;
