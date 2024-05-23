import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";
import { useState } from "react";
import Spinner from "../components/spinner";

const DeleteBook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const deleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:9000/books/${id}`)
      .then(() => {
        setLoading(false);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>{loading ? <Spinner /> : <Modal onClickHandler={deleteBook} />}</div>
  );
};

export default DeleteBook;
