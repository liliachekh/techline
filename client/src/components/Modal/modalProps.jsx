export const modalProps = [
    {
        type: 'signIn',
        header: 'Thank you!',
        text: 'Our manager will contact you soon.',
        actions(onClose, onSubmit, className) {
        return (
            <div className={className}>
            <button onClick={onSubmit} className={`${style.modal__btn} ${style.submitBtn}`}>Continue shopping</button>
            <NavLink to="/cart" onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>
                View cart
            </NavLink>
            </div>
      );
    },
    }
]