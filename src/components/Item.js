import React from "react";

function Item({ item , onUpdateItem , onDeleteItem }) {
  console.log(item, 'the component is mounted')

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE',
    })
    .then((r) => r.json())
    .then(() => onDeleteItem(item))
  }

  const handleAddToCartClick = () => {
    item.isInCart = !item.isInCart
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(item)
    })
    .then((r) => r.json())
    .then((r) => {
      console.log(r, 'this is the response')
      onUpdateItem(r)
    })
  } 

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
