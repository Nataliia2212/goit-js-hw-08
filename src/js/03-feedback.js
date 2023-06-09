import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    mail: document.querySelector('input'),
    message: document.querySelector('textarea')
}
const STORAGE_KEY = "feedback-form-state";
const savedValue = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function savedForm() {
    if ( savedValue) {
        refs.mail.value = savedValue.mail || ''; 
        refs.message.value = savedValue.message || '';
    }
}
savedForm()

function onFormSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset()
    localStorage.removeItem(STORAGE_KEY);
    console.log(savedValue)
}

function onFormInput() {
    savedValue.mail = refs.mail.value;
    savedValue.message = refs.message.value;
   
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedValue)) 
}