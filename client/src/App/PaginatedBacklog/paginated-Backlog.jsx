import { useState, useEffect } from "react";
import { Pagination } from "./Pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { fetchTasks } from "../../data/fetchTasks";
import { TaskList } from "./Backlog/Backlog";

export function PaginatedBackLog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [tasks, setTasks] = useState([]);

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePageSizeChanged(size) {
    setPageSize(size);
  }

  useEffect(() => {
    fetchTasks(currentPage, pageSize).then((fetchedTasks) => {
      if (currentPage > fetchedTasks.meta.pagination.pageCount) {
        setCurrentPage(fetchedTasks.meta.pagination.pageCount);
      }
      setTasks(fetchedTasks.data);
      setPageCount(fetchedTasks.meta.pagination.pageCount);
    });
  }, [currentPage, pageSize]);

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <TaskList tasks={tasks} />
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChanged={handlePageChanged}
        onPageSizeChanged={handlePageSizeChanged}
      />
    </>
  );
}
