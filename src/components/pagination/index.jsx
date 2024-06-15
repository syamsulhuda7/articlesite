import { useEffect, useState } from "react";

export default function Pagination({ sendData, sendPage }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(sendData.page);
  }, [sendData]);
  const handleprev = () => {
    if (page > 0) {
      setPage((page) => page - 1);
      sendPage((page) => page - 1);
    }
  };
  const handlenext = () => {
    setPage((page) => page + 1);
    sendPage((page) => page + 1);
  };
  return (
    <div className="flex gap-5 pt-5">
      <button onClick={handleprev} className="pagination">
        &laquo; Prev
      </button>
      <p>
        {page} of {sendData.totalPage}
      </p>
      <button onClick={handlenext} className="pagination">
        Next &raquo;
      </button>
    </div>
  );
}
