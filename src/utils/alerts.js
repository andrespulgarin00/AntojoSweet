
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

export function ok (title){
return Swal.fire({
  title: title,
  icon: "success",
  draggable: true
});
}


export function errores (error, info){

return Swal.fire({
  icon: "error",
  title: error,
  text: info,
  
});
}

export function cerrar(){
let timerInterval;
return Swal.fire({
  title: "Auto close alert!",
  html: "I will close in <b></b> milliseconds.",
  timer: 200,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
   
  }
}).then((result) => {
    window.location.href="/index.html"
  
  if (result.dismiss === Swal.DismissReason.timer) console.log("I was closed by the timer");
});
}