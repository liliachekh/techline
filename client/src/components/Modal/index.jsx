import PropTypes from 'prop-types';
import style from './modal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { modalAnimation } from '../../animation';

export function Modal({ header, text, onCloseModal, onSubmitModal, show, buttonClose}) {
  if (!show){
    return null;
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
              <p>{text}</p>
            </div>
            <div className={style.modal__btns}>
              <button className={`${style.modal__btn} ${style.submitBtn}`} onClick={onCloseModal}>{buttonClose}</button>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

Modal.defaultProps = {
    header: '',
    text: '',
    buttonClose: ''
};

Modal.propTypes = {
    header: PropTypes.string,
    text: PropTypes.string,
    buttonClose: PropTypes.string
};