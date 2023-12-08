import { SyntheticEvent } from 'react';

export const modal = {
  show: (id : string) => {
    document.getElementById(id).style.display = 'flex';
  },
  hide: (id : string) => {
    document.getElementById(id).style.display = 'none';
  },
  close: (e: SyntheticEvent, id : string) => {
    if (e.target === document.getElementById(id)) {
      document.getElementById(id).style.display = 'none';
    }
  },
};
