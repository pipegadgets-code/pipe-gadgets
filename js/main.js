let idioma = 'es';

const contenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const subtotalEl = document.getElementById("subtotal");
const envioEl = document.getElementById("envio");
const totalEl = document.getElementById("total");
const pagarBtn = document.getElementById("pagar");

function mostrarProductos(lista){
  if(!contenedor) return;
  contenedor.innerHTML="";
  lista.forEach(producto => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${producto.imagen}">
        <h3>${idioma==='es'?producto.nombre_es:producto.nombre_en}</h3>
        <p>$${producto.precio}</p>
        <button onclick="agregarCarrito(${producto.id})">
        ${idioma==='es'?'Agregar al carrito':'Add to Cart'}
        </button>
      </div>
    `;
  });
}

function mostrarCarrito(){
  if(!listaCarrito) return;
  listaCarrito.innerHTML="";
  carrito.forEach((prod, index) => {
    listaCarrito.innerHTML += `
      <div class="producto">
        <h3>${idioma==='es'?prod.nombre_es:prod.nombre_en}</h3>
        <p>$${prod.precio}</p>
        <button onclick="eliminar(${index})">${idioma==='es'?'Eliminar':'Remove'}</button>
      </div>
    `;
  });

  let totales = calcularTotal();
  subtotalEl.innerText = (idioma==='es'?'Subtotal: ':'Subtotal: ') + "$" + totales.subtotal;
  envioEl.innerText = (idioma==='es'?'Envío: ':'Shipping: ') + (totales.envio===0?'GRATIS':'$'+totales.envio);
  totalEl.innerText = (idioma==='es'?'Total: ':'Total: ') + "$" + totales.total;
  pagarBtn.href = "https://mpago.la/xxxxx"; // tu link de Mercado Pago
}

function eliminar(index){
  carrito.splice(index,1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  mostrarCarrito();
}

function cambiarIdioma(nuevo){
  idioma = nuevo;
  if(document.getElementById("hero-title")){
    document.getElementById("hero-title").innerText = idioma==='es'?'Tecnología que resalta':'Tech that stands out';
    document.getElementById("hero-subtitle").innerText = idioma==='es'?'Gadgets modernos para tu vida diaria':'Modern gadgets for your daily life';
  }
  if(document.getElementById("titulo-carrito")){
    document.getElementById("titulo-carrito").innerText = idioma==='es'?'Tu carrito':'Your Cart';
  }
  mostrarProductos(productos);
  mostrarCarrito();
}

mostrarProductos(productos);
mostrarCarrito();

document.getElementById("buscador")?.addEventListener("keyup", function(){
  let valor = this.value.toLowerCase();
  let filtrados = productos.filter(p => 
    (idioma==='es'?p.nombre_es:p.nombre_en).toLowerCase().includes(valor)
  );
  mostrarProductos(filtrados);
});