let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let envio = 0;
const ENVIO_GRATIS_DESDE = 50000;

function agregarCarrito(id){
  let producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  alert("Producto agregado al carrito");
}

function actualizarContador(){
  document.getElementById("contador").innerText = carrito.length;
}

function calcularEnvio(subtotal){
  if(subtotal >= ENVIO_GRATIS_DESDE){
    envio = 0;
  } else {
    envio = 3500;
  }
  return envio;
}

function calcularTotal(){
  let subtotal = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  let envio = calcularEnvio(subtotal);
  return {subtotal, envio, total: subtotal + envio};
}

actualizarContador();