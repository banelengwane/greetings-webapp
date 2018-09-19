
document.eventListener('DOMContentLoaded', function(){
  let errorMsgElem = document.querySelector('.error');
  let successMsgElem = document.querySelector('.error');

  if(errorMsgElem.innerHTML !== '' || successMsgElem.innerHTML !== ''){
    setTimeout(function(){
      errorMsgElem.innerHTML = '';
      successMsgElem.innerHTML = '';
    }, 3000)
  }
});

function resetMe(){
  greeting.clean();
  numberOfGreetings.innerHTML = 0;
  document.getElementById('greetingArea').value = '';
}
resetBtn.addEventListener('click', resetMe);
