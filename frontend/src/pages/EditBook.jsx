import { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isloading, setIsloading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useState(() => {
    setIsloading(true);
    axios
      .get(`http://localhost:9000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setIsloading(false);
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  }, []);

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setIsloading(true);
    axios
      .put(`http://localhost:9000/books/${id}`, data)
      .then(() => {
        setIsloading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsloading(false);
        alert("An error has happend");
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {isloading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500 ">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            ></input>
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500 ">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            ></input>
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500 ">Publish Year:</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            ></input>
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
            {" "}
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
