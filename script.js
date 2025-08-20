function openTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function preselectService(serv) {
  openTab('reservar');
  document.getElementById('servicio').value = serv;
}

document.getElementById('formReserva').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    nombre: document.getElementById('nombre').value,
    telefono: document.getElementById('telefono').value.replace(/\D+/g, ''),
    correo: document.getElementById('correo').value,
    matricula: document.getElementById('matricula').value,
    modelo: document.getElementById('modelo').value,
    servicio_coche: document.getElementById('servicio').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value,
    servicio: "reserva"
  };
  try {
    const resp = await fetch("https://gonxo14.app.n8n.cloud/webhook/carwash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: data })
    });
    let txt = resp.ok ? "✅ Reserva enviada correctamente" : "❌ Error al enviar la reserva";
    try { const j = await resp.json(); if (j && j.mensaje) txt += `\n${j.mensaje}`; } catch {}
    document.getElementById("mensaje").innerText = txt;
  } catch(err) {
    document.getElementById("mensaje").innerText = "❌ Error de conexión";
  }
});