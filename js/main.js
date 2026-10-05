// FIDIAX — menú móvil + formulario de consultas que abre WhatsApp
(function () {
  var numero = document.body.getAttribute('data-wa'); // ej. 34614694939

  // Menú móvil
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      btn.setAttribute('aria-expanded', abierto);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('abierto'); btn.setAttribute('aria-expanded', false); });
    });
  }

  // Formulario -> WhatsApp con el mensaje armado
  var form = document.getElementById('form-consulta');
  if (form && numero) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = form.nombre.value.trim();
      var servicio = form.servicio.value;
      var mensaje = form.mensaje.value.trim();
      var error = form.querySelector('.form__error');
      if (!nombre || !mensaje) {
        error.textContent = form.getAttribute('data-error');
        (nombre ? form.mensaje : form.nombre).focus();
        return;
      }
      error.textContent = '';
      var saludo = form.getAttribute('data-saludo');
      var texto = saludo + '\n\n' +
        '*Nombre:* ' + nombre + '\n' +
        (servicio ? '*Consulta sobre:* ' + servicio + '\n' : '') +
        '*Mensaje:* ' + mensaje;
      window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }

  // Botones con mensaje predefinido (kits, servicios)
  document.querySelectorAll('[data-wa-msg]').forEach(function (a) {
    a.href = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(a.getAttribute('data-wa-msg'));
    a.target = '_blank'; a.rel = 'noopener';
  });

  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
