import React, { useEffect, useState } from "react";
import axios from "axios";

const PAGE_SIZE = 20;

const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchItems(1, search);
  }, [search]);

  const fetchItems = async (page, search) => {
    const { data } = await axios.get("http://localhost:5000/items", {
      params: { page, limit: PAGE_SIZE, search },
    });
    if (page === 1) {
      setItems(data.items);
    } else {
      setItems((prev) => [...prev, ...data.items]);
    }
    setTotal(data.total);
    setSelectedItems(new Set(data.selected));
  };

  const handleSelect = async (id) => {
    const isSelected = selectedItems.has(id);
    const updatedSelection = new Set(selectedItems);
    isSelected ? updatedSelection.delete(id) : updatedSelection.add(id);
    setSelectedItems(updatedSelection);
    await axios.post("http://localhost:5000/select", {
      id,
      selected: !isSelected,
    });
  };

  const handleLoadMore = () => {
    if (items.length < total) {
      setPage((prev) => prev + 1);
      fetchItems(page + 1, search);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("text/plain");
    if (draggedIndex !== index) {
      const newItems = [...items];
      const [removed] = newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, removed);
      setItems(newItems);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="container m-2 ">
      <input
        className="form-control w-25 mb-1"
        type="text"
        placeholder="Введите поиск..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      <div className="table border border-primary pt-1">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="row mb-1 ps-2"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
          >
            <input
              type="checkbox"
              checked={selectedItems.has(item.id)}
              onChange={() => handleSelect(item.id)}
            />
            <span>{item.value}</span>
          </div>
        ))}
      </div>
      {items.length < total && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLoadMore}
        >
          Подгрузить еще данные
        </button>
      )}
    </div>
  );
};

export default App;
