import { useField } from 'formik';
import { PatternFormat } from "react-number-format";

const InputMasked = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={props.labelClass}>
        {label}
      </label>
      <PatternFormat
        className={props.inputClass}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        format={props.format}
        allowEmptyFormatting mask={props.mask}
        {...field} />
      {meta.touched && meta.error
        ? <div
          className={props.errorClass}>
          Complete the field in the given format
        </div>
        : null}
    </>
  )
}

export default InputMasked