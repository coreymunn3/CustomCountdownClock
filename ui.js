export class UI {
  constructor(){
    // modal elements
    this.modal = document.getElementById('modal');
    this.modalTriggerBtn = document.getElementById('modal-trigger');
    this.modalCloseBtn = document.getElementById('modal-close');
    this.modal_setTimerBtn = document.getElementById('set-timer');
    this.modal_eventInput = document.getElementById('event-input');
    this.modal_dateInput = document.getElementById('date-input');
    // app elements
    this.event = document.getElementById('event-display');
    this.hero = document.querySelector('.hero');
    this.notification = document.getElementById('notification-area');
    // background edit elements
    this.editBackgroundTriggerBtn = document.getElementById('bg-edit-trigger');
    this.editBackgroundField = document.getElementById('bg-edit-field');
    this.bgUrl = document.getElementById('bg-url');
    this.editBackgroundSubmitBtn = document.getElementById('bg-submit-url');
  }
  openModal(){
    this.modal.classList.add('is-active');
  }
  closeModal(){
    this.modal.classList.remove('is-active');
  }
  clearModalInputs(){
    this.modal_eventInput.value = '';
    this.modal_dateInput.value = '';
  }
  updateEventDisplay(eventName){
    this.event.textContent = eventName;
  }
  toggleBgEditField(){
    if(this.editBackgroundField.classList.contains('is-invisible')){
      this.editBackgroundField.classList.remove('is-invisible');
    }
    else {
      this.editBackgroundField.classList.add('is-invisible');
    }
  }
  updateHeroBackground(bgPath){
    this.hero.style.background = `url('${bgPath}') no-repeat center center/cover`;
  }
  validateInput(){
    if (this.modal_eventInput.value === '' || this.modal_dateInput.value === ''){
      return false;
    }
    else return true;
  }
  showNotification(className, message){
    this.notification.firstElementChild.classList.add(className);
    this.notification.firstElementChild.textContent = message;
    this.notification.style.transform = "translateY(-110px)";
    window.setTimeout( ()=> {this.notification.style.transform = "translateY(110px)"},3000);
  }
}