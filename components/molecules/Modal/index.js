import { useContext } from 'react';
import { RootContext } from '../../../context';
import { closeModal, hideModal } from '../../../context/action/demoAction';
import styles from './Modal.module.css';

export default function Modal({ action, children, style }) {
  const { dispatch } = useContext(RootContext);
  return (
    <>
      <div id={action} className={styles.modal} onClick={(e) => dispatch(closeModal(e, action))}>
        <div className={styles[style]}>
          <span className={styles.close} onClick={() => dispatch(hideModal(action))}>&times;</span>
          {children}
        </div>
      </div>
    </>
  );
}
