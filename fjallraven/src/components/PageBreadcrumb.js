import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const PageBreadcrumb = ({ breadcrumbs, className }) => {
  let lastElement =
    breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs.pop() : null;
  return (
    <div className={'page-breadcrumb ' + className}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          {breadcrumbs.map(b => (
            <Breadcrumb.Item href={b.link} key={b.link}>
              {b.link === '/' ? 'Home' : b.label}
            </Breadcrumb.Item>
          ))}
          {lastElement && (
            <Breadcrumb.Item active>{lastElement.label}</Breadcrumb.Item>
          )}
        </Breadcrumb>
      )}
    </div>
  );
};

export default PageBreadcrumb;
