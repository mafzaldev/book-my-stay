import { useParams } from "react-router-dom";

const BookRoom = () => {
  const { roomNo } = useParams();
  return <div>{roomNo}</div>;
};

export default BookRoom;
