import { useState, useEffect } from "react";
import { Pagination } from "./Pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { fetchBacklog } from "../../data/fetchBacklog";
import { BacklogTaskList } from "./Backlog/Backlog";
import { useQuery } from "@tanstack/react-query";

export function PaginatedBackLog({ projectId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [backlogTasks, setBacklogTasks] = useState([]);

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePageSizeChanged(size) {
    setPageSize(size);
  }

  const {
    isPending,
    isError,
    data: fetchedBacklogTasks,
    error,
  } = useQuery({
    queryKey: ["backlogTasks", { projectId, currentPage, pageSize }],
    queryFn: () => fetchBacklog(projectId, currentPage, pageSize),
  });

  useEffect(() => {
    if (fetchedBacklogTasks) {
      if (currentPage > fetchedBacklogTasks.meta.pagination.pageCount) {
        setCurrentPage(fetchedBacklogTasks.meta.pagination.pageCount);
      }
      setBacklogTasks(fetchedBacklogTasks.data);
      setPageCount(fetchedBacklogTasks.meta.pagination.pageCount);
    }
  }, [currentPage, fetchedBacklogTasks]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <BacklogTaskList backlogTasks={backlogTasks} />
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
