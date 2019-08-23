import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log("colors array on mount of ColorList: ", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log("colorToEdit from editColor function: ", colorToEdit)
  };

  const addColor = () => {
    setColorToAdd({...colorToAdd, id: Date.now()});
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, colorToAdd)
      .then(res => {
        console.log('POST (addColor) request response: ', res)
      })
      .catch(err => console.log("Error adding new color: ", err.response.status, err.response.statusText));
  }

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('PUT request response: ', res)
      })
      .catch(err => console.log("Error saving edited color: ", err.response.status, err.response.statusText));
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
  };

  const deleteColor = color => {
    // console.log("deleteColor function, color to be deleted: ", color);
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      console.log("response from deleteColor request: ", res);
      setColorToEdit(initialColor)
    })
    .catch(err => console.log("Could not delete color. Error: ", err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* STRETCH - ADD COLOR FORM */}
      <form onSubmit={
        colorToAdd !== initialColor ? addColor : null
        }>
          <legend>add new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setColorToAdd(initialColor)}>start over</button>
          </div>
        </form>

    </div>
  );
};

export default ColorList;
