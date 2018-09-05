
document.eventListener('DOMContentLoaded', function(){
  let errorMsgElem = document.querySelector('.error');
  let successMsgElem = document.querySelector('.error');

  if(errorMsgElem.innerHTML !== '' || successMsgElem.innerHTML !== ''){
    setTimeout(function(){
      errorMsgElem.innerHTML = '';
      successMsgElem.innerHTML = '';
    }, 3000)
  }
})
