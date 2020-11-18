import * as React from 'react';
import pages from '../../data/pages';
import { useLocation } from 'react-router-dom';

function useSegments() {
  const { pathname } = useLocation();

  const page = pages.find((page) => {
    console.log(page);
    return page?.segments?.find((segment) => segment.url === pathname);
  });

  return page.segments;
}
function usePage() {
  // const { pathname } = useLocation();
  // return pages.find((page) => {
  //   return '/' + page.id === pathname;
  // });
}

export { useSegments, usePage };
