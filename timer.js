// constants
const MILLI_IN_SEC = 1000;
const MILLI_IN_MIN = MILLI_IN_SEC * 60;
const MILLI_IN_HOUR = MILLI_IN_MIN * 60;
const MILLI_IN_DAY = MILLI_IN_HOUR * 24;
const MILLI_IN_YEAR = MILLI_IN_DAY * 365;

export class Timer {
  // eventually update to take in target date?
  constructor(){
    this.timerYears = document.getElementById('years');
    this.timerDays = document.getElementById('days');
    this.timerHours = document.getElementById('hours');
    this.timerMinutes = document.getElementById('minutes');
    this.timerSeconds = document.getElementById('seconds');
    this.target = '';
  }
  countdown() {
    setInterval( () => {
      let now = new Date().getTime();
      let remaining = this.target - now;
      // calculate amount of years and subtract that total time from the time remaining
      let calcYears = Math.floor(remaining / MILLI_IN_YEAR);
      remaining -= calcYears * MILLI_IN_YEAR;
      // calculate amount of days and subtract that total time from the time remaining
      let calcDays = Math.floor(remaining / MILLI_IN_DAY);
      remaining -= calcDays * MILLI_IN_DAY;
      // calculate amount of hours and subtract that total time from the time remaining
      let calcHours = Math.floor(remaining / MILLI_IN_HOUR);
      remaining -= calcHours * MILLI_IN_HOUR;
      // calculate amount of minutes and subtract that total time from the time remaining
      let calcMinutes = Math.floor(remaining / MILLI_IN_MIN);
      remaining -= calcMinutes * MILLI_IN_MIN;
      // remainder is expressed in seconds
      let calcSeconds = Math.floor(remaining / MILLI_IN_SEC);
    
    
      // update output
      this.timerYears.innerHTML = calcYears;
      this.timerDays.innerHTML = calcDays;
      this.timerHours.innerHTML = calcHours;
      this.timerMinutes.innerHTML = calcMinutes;
      this.timerSeconds.innerHTML = calcSeconds;
    },1000)
  }
  updateTarget(dt){
    this.target = new Date(dt).getTime()
  }
}