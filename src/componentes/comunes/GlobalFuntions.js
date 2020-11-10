import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const url = "http://127.0.0.1:83";

export const Success_Error_Mostrar = (titulo, msj, icon, cerrar) => {
    MySwal.fire({
        title: titulo,
        text: msj.toString(),
        icon: icon,
    });

    if(cerrar == 1) {
    setTimeout(() => {
        MySwal.close()
    }, 1200);
    }
}

export const CargandoSweet = (op,msj) => {
    if(op == 0) {
        MySwal.fire({
            title: msj,
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
            MySwal.showLoading();
            }
        });
    } else {
        MySwal.close();
    }
}

const data = [];
data['url'] = url;
data['Success_Error_Mostrar'] = Success_Error_Mostrar;
data['CargandoSweet'] = CargandoSweet;

export const globalFunctions = data;