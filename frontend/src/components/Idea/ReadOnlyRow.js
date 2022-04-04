import React from "react";

const ReadOnlyRow = ({ idea, handleEditClick, handleDeleteClick }) => {
  return (
    //title, user, content, thumbsup thumbsdown, academic year, document, craeted at, update at,
    // close date,category, comment
    <tr>
      <td>{idea.id}</td>
      <td>{idea.title}</td>
      <td>{idea.content}</td>
      <td>{idea.academicyear}</td>
      <td>{idea.document}</td>
      <td>{idea.createdate}</td>
      <td>{idea.tags}</td>

      <td>
        <button type="button" onClick={(event) => handleEditClick(event, idea)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(idea.id)}>
          Delete
        </button>
      </td>
      <td>
        <button type="button">Thumbs Up</button>
        <button type="button">Thumbs Down</button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
