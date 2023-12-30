import { SyntheticEvent } from 'react';

export const modal = {
  show: (id : string) => {
    const node = document.getElementById(id);
    if (node !== null) {
      node.style.display = 'flex';
    }
  },
  hide: (id : string) => {
    const node = document.getElementById(id);
    if (node !== null) {
      node.style.display = 'none';
    }
  },
  close: (e: SyntheticEvent, id : string) => {
    if (e.target === document.getElementById(id)) {
      const node = document.getElementById(id);
      if (node !== null) {
        node.style.display = 'none';
      }
    }
  },
};
