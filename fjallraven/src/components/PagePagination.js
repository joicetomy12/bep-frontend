import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PagePagination = ({
  setCurPage,
  perPage,
  activePage,
  totalResults,
  setSearchInit
}) => {
  const pages = Math.ceil(totalResults / perPage);
  if (perPage >= totalResults) {
    setCurPage(1);
  }
  if (activePage > pages) activePage = pages;
  return (
    <div className={'page-pagination'}>
      {pages && pages > 0 && (
        <Pagination>
          {activePage > 1 && (
            <Pagination.Prev
              onClick={() => {
                setCurPage(activePage - 1);
                setSearchInit(false);
              }}
            />
          )}
          {activePage === 1 && <Pagination.Prev />}

          {pages === 2 ? (
            [1, 2].map(page => (
              <Pagination.Item
                key={page}
                active={activePage === page}
                onClick={() => {
                  setCurPage(page);
                  setSearchInit(false);
                }}
              >
                {page}
              </Pagination.Item>
            ))
          ) : (
            <Pagination.Item
              active={activePage === 1}
              onClick={() => {
                setCurPage(1);
                setSearchInit(false);
              }}
            >
              1
            </Pagination.Item>
          )}

          {pages >= 3 &&
            [2, 3].map(page => (
              <Pagination.Item
                key={page}
                active={activePage === page}
                onClick={() => {
                  setCurPage(page);
                  setSearchInit(false);
                }}
              >
                {page}
              </Pagination.Item>
            ))}

          {pages > 4 && activePage === 4 && (
            <Pagination.Item
              active={activePage === 4}
              onClick={() => {
                setCurPage(4);
                setSearchInit(false);
              }}
            >
              4
            </Pagination.Item>
          )}

          {activePage > 4 && <Pagination.Ellipsis />}

          {/*{activePage > 4 && (*/}
          {/*  <Pagination.Item>{activePage - 1}</Pagination.Item>*/}
          {/*)}*/}

          {activePage > 4 && activePage < pages - 1 && (
            <Pagination.Item
              active={true}
              onClick={() => {
                setCurPage(activePage);
                setSearchInit(false);
              }}
            >
              {activePage}
            </Pagination.Item>
          )}

          {/*{activePage > 4 && pages > activePage + 1 && (*/}
          {/*  <Pagination.Item>{activePage + 1}</Pagination.Item>*/}
          {/*)}*/}

          {pages > 4 && pages >= activePage + 2 && <Pagination.Ellipsis />}

          {pages > 4 && activePage === pages - 1 && (
            <Pagination.Item
              active={activePage === pages - 1}
              onClick={() => {
                setCurPage(pages - 1);
                setSearchInit(false);
              }}
            >
              {pages - 1}
            </Pagination.Item>
          )}

          {pages > 3 && (
            <Pagination.Item
              active={activePage === pages}
              onClick={() => {
                setCurPage(pages);
                setSearchInit(false);
              }}
            >
              {pages}
            </Pagination.Item>
          )}

          {activePage < pages && (
            <Pagination.Next
              onClick={() => {
                setCurPage(activePage + 1);
                setSearchInit(false);
              }}
            />
          )}
          {activePage === pages && <Pagination.Next />}
        </Pagination>
      )}
    </div>
  );
};

export default PagePagination;
