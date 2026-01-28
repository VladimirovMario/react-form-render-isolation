import { useState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import SmallCircleLoader from './SmallCircleLoader';

function Form() {
  const formRef = useRef(null);
  const [key, setKey] = useState(0);

  async function handleSubmit(formData) {
    try {
      await new Promise((res) => setTimeout(res, 1000));
      setKey((key) => key + 1);
    } catch (error) {}
  }

  return (
    <form
      className="contact-form"
      ref={formRef}
      key={key}
      action={handleSubmit}
    >
      <fieldset>
        <legend>Optimized form</legend>
        <Input
          label="First name*"
          id="firstName"
          type="text"
          name="firstName"
        />
        <Input label="Last name*" id="lastName" type="text" name="lastName" />
        <Input label="E-mail*" id="email" type="email" name="email" />
        <div>
          <Submit />
        </div>
      </fieldset>
    </form>
  );
}

export default Form;

const Input = ({
  label = 'First name*',
  id = 'name',
  type = 'text',
  name = 'name',
  required,
}) => {
  const [value, setValue] = useState('');
  const onValueChange = (e) => setValue(e.target.value);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onValueChange}
        required={required}
      />
    </div>
  );
};

const Submit = () => {
  // The useFormStatus Hook only returns status information for a parent <form> and not for any <form>
  const { pending, data, method, action } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      {pending && <SmallCircleLoader />}
      {pending ? 'Submit...' : 'Submit'}
    </button>
  );
};
