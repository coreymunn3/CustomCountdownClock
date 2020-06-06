export class LocalStorage {
  constructor(){}
  store(key,val){
    localStorage.setItem(key,JSON.stringify(val));
  }
  retrieve(key){
    let val = JSON.parse(localStorage.getItem(key));
    return val
  }
}