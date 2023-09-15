import PropTypes from 'prop-types';
import style from './modal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { modalAnimation } from '../../animation';

export function Modal({ data: { type, header, text, actions, icon } }) {

  function onCloseModal() {
    
  }

  function onSubmitModal() {
    // if (onDelete && typeof onDelete === 'function') {
    //   onDelete();
    // }
    onCloseModal();
  }

  return (
    <AnimatePresence>
      <>
        <div className={style.overlay} role="button" tabIndex={0} onClick={onCloseModal} onKeyDown={onCloseModal} />
        <motion.div {...modalAnimation} className={style.modal}>
          <div className={style.modal__container}>
            <div className={style.modal__header}>
              <h3 className={style.modal__title}>{header}</h3>
            </div>
            <div className={style.modal__text}>
              {icon && <div className={style.modal__icon}>
                {icon}
              </div>}
              <p>{text}</p>
            </div>
            {actions && actions(onCloseModal, onSubmitModal, style.modal__btns)}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

Modal.defaultProps = {
  data: {
    type: '',
    header: '',
    text: '',
    actions: null,
  },
};

Modal.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    header: PropTypes.string,
    text: PropTypes.string,
    actions: PropTypes.func,
  }),
};