import style from './modal.module.scss';

export const modalProps = [
    {
        type: 'signIn',
        header: 'Thank you!',
        text: 'Registration successfully completed! Check your mail.',
        actions(onClose, onSubmit, className) {
            return (
                <div className={className}>
                    <button onClick={onClose} className={`${style.modal__btn} ${style.submitBtn}`}>Ok</button>
                </div>
            );
        },
    }
]