const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const TOTAL_ITEMS = 1000000;
let items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i + 1,
  value: `Item ${i + 1}`,
}));

let selectedItems = new Set();
let sortedItems = [...items];

app.get("/items", (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;
  let filtered = sortedItems;

  if (search) {
    filtered = filtered.filter((item) =>
      item.value.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const end = start + Number(limit);
  res.json({
    items: filtered.slice(start, end),
    total: filtered.length,
    selected: Array.from(selectedItems),
  });
});

app.post("/select", (req, res) => {
  const { id, selected } = req.body;
  if (selected) {
    selectedItems.add(id);
  } else {
    selectedItems.delete(id);
  }
  res.json({ selected: Array.from(selectedItems) });
});

app.post("/sort", (req, res) => {
  sortedItems = req.body.items;
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server listen to 5000"));
