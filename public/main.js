const socket = io.connect();


async function chatData(e) {
    let email = document.getElementById('email');
    let mensaje = document.getElementById('mensaje');
    let input = { email: email.value, mensaje: mensaje.value }
    socket.emit('chat', input);
}

function render(data) {
    let html = data
        .map(function(elem) {
            return `<div><strong>${elem.email}</strong>
                    <em>${elem.mensaje}</em>
                    </div>`
        })
        .join(' ');

    document.getElementById("historial").innerHTML = html;

}

socket.on('historialChat', function(data) {
    render(data);
})