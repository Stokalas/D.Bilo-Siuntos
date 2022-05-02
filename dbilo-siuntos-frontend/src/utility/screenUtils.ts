import { Theme } from '@mui/material';
import debounce from 'lodash/debounce';

export const handleResize = (theme: Theme, setIsMobile: (x: boolean) => void) => {
  const handleResize = debounce(
    () => setIsMobile(window.innerWidth < theme.breakpoints.values['sm']),
    100
  );
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
};
