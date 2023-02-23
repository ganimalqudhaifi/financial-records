import { useContext } from 'react';
import { RootContext } from '../../../context';
import { closeModal, hideModal } from '../../../context/action/demoAction';
import styles from './Modal.module.css';

export default function Modal({ action, children, style }) {
  const { dispatch } = useContext(RootContext);
  return (
    <div id={action} className="fixed top-0 left-0 hidden z-50 w-full h-full bg-black/40" onClick={(e) => dispatch(closeModal(e, action))}>
      <div className={`relative mx-auto rounded-lg bg-white ${styles[style]} animate-pop`}>
        <span className="absolute top-px right-3.5 font-bold text-3xl md:text-4xl cursor-pointer" onClick={() => dispatch(hideModal(action))}>&times;</span>
        {children}
      </div>
    </div>
  );
}
