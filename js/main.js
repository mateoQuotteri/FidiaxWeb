// FIDIAX — interacciones (menú, animaciones, pestañas, carrusel, WhatsApp)
document.addEventListener('DOMContentLoaded', () => {
  const numero = document.body.dataset.wa;

  /* Menú móvil */
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  if (burger && links) {
    const cerrar = () => { links.classList.remove('abierto'); burger.classList.remove('abierto'); burger.setAttribute('aria-expanded', false); document.body.classList.remove('nav-abierto'); };
    burger.addEventListener('click', () => {
      const abierto = links.classList.toggle('abierto');
      burger.classList.toggle('abierto', abierto);
      burger.setAttribute('aria-expanded', abierto);
      document.body.classList.toggle('nav-abierto', abierto);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrar));
  }

  /* Aparición al hacer scroll */
  const obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* Sello del hero: entra "estampándose" una vez */
  const sello = document.getElementById('sello');
  if (sello) requestAnimationFrame(() => setTimeout(() => sello.classList.add('estampar'), 250));

  /* Pestañas de servicios */
  document.querySelectorAll('.tabs').forEach(tabs => {
    const btns = tabs.querySelectorAll('.tabs__btn');
    const panels = tabs.querySelectorAll('.tabs__panel');
    btns.forEach((b, i) => b.addEventListener('click', () => {
      btns.forEach(x => { x.classList.remove('activo'); x.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('activo'));
      b.classList.add('activo'); b.setAttribute('aria-selected', 'true');
      panels[i].classList.add('activo');
    }));
  });

  /* Cómo trabajamos: la línea se completa paso a paso */
  const stepper = document.getElementById('stepper');
  if (stepper) {
    const pasos = stepper.querySelectorAll('.paso');
    const relleno = stepper.querySelector('.stepper__relleno');
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      so.disconnect();
      pasos.forEach((p, i) => setTimeout(() => {
        p.classList.add('activo');
        relleno.style.width = `${(i / (pasos.length - 1)) * 100}%`;
        if (p.classList.contains('final')) setTimeout(() => p.classList.add('sellado'), 200);
      }, i * 420));
    }), { threshold: 0.45 });
    so.observe(stepper);
  }

  /* Carrusel de opiniones */
  const car = document.getElementById('carrusel');
  if (car) {
    const tarjetas = [...car.children];
    const puntos = document.getElementById('puntos');
    const paso = () => tarjetas[0].getBoundingClientRect().width + parseFloat(getComputedStyle(car).columnGap || 24);
    tarjetas.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Ver opinión ${i + 1}`);
      b.addEventListener('click', () => car.scrollTo({ left: i * paso() }));
      puntos.appendChild(b);
    });
    const marcar = () => {
      const i = Math.round(car.scrollLeft / paso());
      puntos.querySelectorAll('button').forEach((b, j) => b.classList.toggle('activo', j === i));
    };
    car.addEventListener('scroll', () => requestAnimationFrame(marcar));
    marcar();
    const mover = dir => {
      const fin = car.scrollWidth - car.clientWidth - 4;
      if (dir > 0 && car.scrollLeft >= fin) car.scrollTo({ left: 0 });
      else car.scrollBy({ left: dir * paso() });
    };
    document.getElementById('prev')?.addEventListener('click', () => mover(-1));
    document.getElementById('next')?.addEventListener('click', () => mover(1));
    // Avance automático suave; se pausa al pasar el mouse o tocar
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pausa = false;
    ['mouseenter', 'touchstart', 'focusin'].forEach(ev => car.addEventListener(ev, () => pausa = true, { passive: true }));
    car.addEventListener('mouseleave', () => pausa = false);
    if (!quieto) setInterval(() => { if (!pausa && !document.hidden) mover(1); }, 5500);
  }

  /* Link activo en el menú */
  const navA = document.querySelectorAll('.nav__links a[href^="#"]');
  const no = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    navA.forEach(a => a.classList.toggle('activo', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => no.observe(s));

  /* Botones con mensaje de WhatsApp predefinido */
  document.querySelectorAll('[data-wa-msg]').forEach(a => {
    a.href = `https://wa.me/${numero}?text=${encodeURIComponent(a.dataset.waMsg)}`;
    a.target = '_blank'; a.rel = 'noopener';
  });

  /* Formulario -> WhatsApp */
  const form = document.getElementById('form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const nota = form.querySelector('.form__nota');
    const nombre = form.nombre.value.trim(), tema = form.tema.value, mensaje = form.mensaje.value.trim();
    if (!nombre || !mensaje) { nota.textContent = form.dataset.error; (nombre ? form.mensaje : form.nombre).focus(); return; }
    const texto = `${form.dataset.saludo}\n\nNombre: ${nombre}\n` + (tema ? `Consulta sobre: ${tema}\n` : '') + `Mensaje: ${mensaje}`;
    nota.textContent = form.dataset.ok;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
  });

  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
});

// Barra celeste de progreso de lectura
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.nav')) return;
  const barra = document.createElement('div');
  barra.className = 'progreso';
  document.body.appendChild(barra);
  const actualizar = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    barra.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
  };
  addEventListener('scroll', actualizar, { passive: true });
  actualizar();
});
