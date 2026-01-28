import { useState, useRef, useId } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';
import SmallCircleLoader from './SmallCircleLoader';
import { fieldValidation } from '../utils/fieldValidation';

function FeedBackForm() {
  const formRef = useRef(null);
  const toastId = useRef(null);
  const [key, setKey] = useState(0);

  const toastOptions = {
    autoClose: 5000,
    isLoading: false,
    closeButton: true,
  };

  async function handleSubmit(formData) {
    toastId.current = toast.loading('Loading...', {
      theme: 'colored',
      autoClose: false,
      draggable: true,
      position: 'bottom-center',
    });
    try {
      const data = Object.fromEntries(formData);
      // if any field is empty it is going to return true
      const hasEmptyField = Object.values(data).some(
        (field) => typeof field === 'string' && field.trim() === '',
      );

      if (hasEmptyField) {
        toast.update(toastId.current, {
          render: 'All fields are required!',
          type: 'warning',
          ...toastOptions,
        });
        return;
      }

      await new Promise((res) => setTimeout(res(data), 1000));

      toast.update(toastId.current, {
        type: 'success',
        render: 'Your message has been sent successfully.',
        ...toastOptions,
      });
      setKey((key) => key + 1);
    } catch (error) {
      const message =
        'Something went wrong. Please try again in a few moments.';
      toast.update(toastId.current, {
        type: 'error',
        render: message,
        ...toastOptions,
      });
    }
  }

  return (
    <form
      className="contact-form"
      ref={formRef}
      key={key}
      action={handleSubmit}
    >
      <fieldset>
        <legend>Feedback form</legend>
        <Input
          label="First name*"
          id="firstName"
          type="text"
          name="firstName"
          required
        />
        <Input
          label="Last name*"
          id="lastName"
          type="text"
          name="lastName"
          required
        />
        <Input
          label="E-mail*"
          id="email"
          type="email"
          name="email"
          placeHolder="Intentionally omit required"
        />
        <div>
          <Submit />
        </div>
      </fieldset>
    </form>
  );
}

export default FeedBackForm;

const Input = ({
  label = 'First name*',
  id = 'name',
  type = 'text',
  name = 'name',
  placeHolder,
  required,
}) => {
  const localId = useId();
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onValueChange = (e) => setValue(e.target.value);
  const validationError = fieldValidation(name, value);
  const showError = touched ? validationError : '';

  return (
    <div>
      <label htmlFor={id + localId}>
        {label}{' '}
        {showError && (
          <span style={{ color: 'red', marginLeft: '0.5rem' }}>
            {validationError}
          </span>
        )}
      </label>
      <input
        id={id + localId}
        type={type}
        name={name}
        value={value}
        onChange={onValueChange}
        placeholder={placeHolder}
        required={required}
        onBlur={() => setTouched(true)}
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
