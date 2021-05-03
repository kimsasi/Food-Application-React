import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const isNotEmpty = value => value.trim().length !== 0;
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

    const {
        value: enteredName,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        isValid: nameIsValid,
        reset: resetNameInput
    } = useInput(isNotEmpty);

    const {
        value: enteredPostal,
        hasError: postalInputHasError,
        valueChangeHandler: postalChangedHandler,
        inputBlurHandler: postalBlurHandler,
        isValid: postalIsValid,
        reset: resetPostalInput
    } = useInput(isFiveChars);

    const {
        value: enteredStreet,
        hasError: streetInputHasError,
        valueChangeHandler: streetChangedHandler,
        inputBlurHandler: streetBlurHandler,
        isValid: streetIsValid,
        reset: resetStreetInput
    } = useInput(isNotEmpty);

    const {
        value: enteredCity,
        hasError: cityInputHasError,
        valueChangeHandler: cityChangedHandler,
        inputBlurHandler: cityBlurHandler,
        isValid: cityIsValid,
        reset: resetCityInput
    } = useInput(isNotEmpty);


    let formIsValid = false;

    if (nameIsValid && postalIsValid && streetIsValid && cityIsValid) {
        formIsValid = true;
    }


    const confirmHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        });
        
        resetNameInput();
        resetPostalInput();
        resetStreetInput();
        resetCityInput();
    };

    const nameInputClasses = `${classes.control} 
    ${!nameInputHasError ? '' : classes.invalid
    }`;
    const postalInputClasses = `${classes.control} 
    ${!postalInputHasError ? '' : classes.invalid
    }`;
    const streetInputClasses = `${classes.control} 
    ${!streetInputHasError ? '' : classes.invalid
    }`;
    const cityInputClasses = `${classes.control} 
    ${!cityInputHasError ? '' : classes.invalid
    }`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                />
                {nameInputHasError && <p className="error-text">Please enter a valid name!</p>}
            </div>
            <div className={streetInputClasses}>
                <label htmlFor='street'>Street</label>
                <input
                    type='text'
                    id='street'
                    onChange={streetChangedHandler}
                    onBlur={streetBlurHandler}
                    value={enteredStreet}
                />
                {streetInputHasError && <p className="error-text">Please enter a valid street!</p>}
            </div>
            <div className={postalInputClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    type='text'
                    id='postal'
                    onChange={postalChangedHandler}
                    onBlur={postalBlurHandler}
                    value={enteredPostal}
                />
                {postalInputHasError && <p className="error-text">Please enter a valid postal! (5 characters long)</p>}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor='city'>City</label>
                <input
                    type='text'
                    id='city'
                    onChange={cityChangedHandler}
                    onBlur={cityBlurHandler}
                    value={enteredCity}
                />
                {cityInputHasError && <p className="error-text">Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
        </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;