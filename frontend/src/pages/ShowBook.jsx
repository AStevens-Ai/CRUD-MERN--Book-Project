import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton className="text-4xl" />
      <h1 className="text-3xl my-4">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Date of creation</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Date of last update
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
