import * as React from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const main = document.getElementsByClassName('main')[0];
    console.log('Scroll Effect');
    main.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
