import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalcode: true,
    city: true,
  });

  const isEmpty = (value) => value.trim().length === 0;
  const isFiveChars = (value) => value.trim().length === 5;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalcode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmitData({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? '' : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputValidity.postalcode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalcode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
