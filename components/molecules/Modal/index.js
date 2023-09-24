import { modal } from '../../../utils';
import styles from './Modal.module.css';

export default function Modal({ id, children, style }) {
  return (
    <div id={id} onDoubleClick={(e) => e.stopPropagation()} className="fixed top-0 left-0 hidden z-50 p-4 w-full h-full bg-black/40" onClick={(e) => modal.close(e, id)}>
      <div className={`relative mx-auto rounded-lg bg-white ${styles[style]} animate-pop`}>
        <span className="absolute top-px right-3.5 font-bold text-3xl md:text-4xl cursor-pointer" onClick={() => modal.hide(id)}>&times;</span>
        {children}
      </div>
    </div>
  );
}
