import { useField, useFormikContext } from 'formik';
import { useEffect } from 'react';

const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (props.name === 'imageUrls' && props.value !== field.value) {
      setFieldValue(props.name, props.value || '');
    }
  }, [props.name, props.value, field.value, setFieldValue]);
    return (
        <>
            <label
                htmlFor={props.id}
                className={props.labelClass}>
                {label}
            </label>
            <input
                className={props.inputClass}
                type={props.type}
                placeholder={props.placeholder}
                id={props.id}
                {...field}
                value={field.value || ''}
                readOnly={props.name === '_id'}
                multiple={props.multiple}/>
            {meta.touched && meta.error
                ? <div
                    className={props.errorClass}>
                    {meta.error}
                </div>
                : null}
        </>
    )
}

export default Input