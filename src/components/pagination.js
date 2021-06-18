const { Pagination } = require("react-bootstrap");

const createPagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let number = 1; number <= Math.ceil(totalPosts / postsPerPage); number++) {
    pageNumbers.push(
      <Pagination.Item 
      onClick={() =>paginate(number)}key={number} 
      active={number === currentPage} 
      activeLabel="">
        {number}
      </Pagination.Item>
    )
  }

  return (
    <>
      <Pagination>{pageNumbers}</Pagination>
    </>
  )
}

export default createPagination;