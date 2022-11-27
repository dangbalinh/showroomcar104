import style from "./FormInput.module.css";
const FormInput = (pros) => {
    return (
        <div className="formInput">
            <input placeholder={pros.placeholder} />
        </div>
    );
}
export default FormInput;