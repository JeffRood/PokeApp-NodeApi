import Swal from "sweetalert2"

export class AlertHelpers{
  static sucessAlert(message: string){
    Swal.fire({
      icon: 'success',
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
  }

  static FaildAlert(message: string){
    Swal.fire({
      icon: 'error',
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
  }
}
