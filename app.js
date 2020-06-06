import {Timer} from './timer.js';
import {UI} from './ui.js';
import {LocalStorage} from './local-storage.js';

const timer = new Timer();
const ui = new UI();
const ls = new LocalStorage();

const app = (function(timer, ui, ls) {
  let state = {
    event: '',
    date: '',
    path: '',
    DEFAULT: {
      event: "My Vacation",
      date: '01/01/2021',
      path: './img/bg.jpg'
    }
  };
  const loadEventListeners = function() {
    // DOM content loaded
    window.addEventListener('DOMContentLoaded',contentLoadEvent);
    // open modal event
    ui.modalTriggerBtn.addEventListener('click', openModalEvent);
    // close modal event 
    ui.modalCloseBtn.addEventListener('click',closeModelEvent);
    // set time
    ui.modal_setTimerBtn.addEventListener('click',setTimerEvent);
    // change background URL
    ui.editBackgroundTriggerBtn.addEventListener('click',insertBgEditFieldEvent);
    ui.editBackgroundSubmitBtn.addEventListener('click',submitBgEditUrlEvent);
  }

  // events
  const contentLoadEvent = function() {
    // STEP 1: LOAD LOCAL STORAGE
    // if nothing in storage, at all
    if(!ls.retrieve('event') && !ls.retrieve('date') && !ls.retrieve('path')){
      // set each item to state.DEFAULT
      ls.store('event',state.DEFAULT.event);
      ls.store('date', state.DEFAULT.date);
      ls.store('path', state.DEFAULT.path);
      // update state to match
      state.event = ls.retrieve('event');
      state.date = ls.retrieve('date');
      state.path = ls.retrieve('path');
    }
    else {
      // local storage is populated so load up state non-defaults with what's in storage
      state.event = ls.retrieve('event');
      state.date = ls.retrieve('date');
      state.path = ls.retrieve('path');
    }
    // STEP 2: load state settings into App
    // load event & background
    ui.updateEventDisplay(state.event);
    ui.updateHeroBackground(state.path);
    // load target date
    timer.updateTarget(state.date);

  }
  const openModalEvent = function() {
    ui.openModal();
  }
  const closeModelEvent = function () {
    ui.closeModal();
  }
  const setTimerEvent = function(e) {
    e.preventDefault();
    if (ui.validateInput()){
      // get values
      let newEvent = ui.modal_eventInput.value;
      let newDate = ui.modal_dateInput.value
      // update UI
      ui.updateEventDisplay(newEvent);
      timer.updateTarget(newDate);
      // set state
      state.event = newEvent;
      state.date = newDate;
      console.log(state);
      // update local storage
      ls.store('event',state.event);
      ls.store('date', state.date);
    }
    else {
      // notification pop up from bottom
      ui.showNotification('is-danger','Make sure to input BOTH Event Name and Event Date when Submitting a new Event!');
    }
    ui.clearModalInputs();
    ui.closeModal();
  }
  const insertBgEditFieldEvent = function () {
    ui.toggleBgEditField();
  }
  const submitBgEditUrlEvent = function () {
    // grab field contents as url string
    let newPath = ui.bgUrl.value;
    console.log(newPath);
    // change hero background css to be new path
    ui.updateHeroBackground(newPath);
    // update state
    state.path = newPath
    console.log(state);
    // update local storage
    ls.store('path',newPath);
    // toggle control off
    ui.toggleBgEditField();
  }
  // public methods
  return {
    init: function() {
      timer.countdown();
      loadEventListeners();
      console.log(state);
    }
  }
})(timer, ui, ls)

app.init();