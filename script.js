import * as THREE from "https://unpkg.com/three@0.167.1/build/three.module.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 45;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(
    Math.min(window.devicePixelRatio,2)
);
renderer.setClearColor(0x000000, 0);

document.getElementById("scene").appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 2));

const geometry = new THREE.BufferGeometry();

const particles = 16000;

const positions = [];
const colors = [];

for(let i = 0; i < particles; i++){

const t = Math.random() * Math.PI * 2;

// Distancia al centro del corazón
const r = Math.sqrt(Math.random());

const x =
    16 * Math.pow(Math.sin(t), 3) * r;

const y =
(
    13 * Math.cos(t)
    - 5 * Math.cos(2 * t)
    - 2 * Math.cos(3 * t)
    - Math.cos(4 * t)
) * r;

const z = (Math.random() - 0.5) * 7;

    positions.push(
        x,
        y,
        z
    );

    const c = 0.8 + Math.random()*0.2;

    colors.push(
        1,
        c*0.2,
        c*0.45
    );

}

geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions,3)
);

geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors,3)
);

const material = new THREE.PointsMaterial({

    size:0.18,

    vertexColors:true,

    transparent:true,

    opacity:1,

    depthWrite:false,

    blending:THREE.AdditiveBlending

});

const heart = new THREE.Points(geometry,material);

function ajustarEscala(){

    if(window.innerWidth < 600){

        heart.scale.set(0.85,0.85,0.85);

    }else if(window.innerWidth < 900){

        heart.scale.set(1,1,1);

    }else{

        heart.scale.set(1.2,1.2,1.2);

    }

}

ajustarEscala();

scene.add(heart);

function animate(){
    

    requestAnimationFrame(animate);

   heart.scale.set(1.2, 1.2, 1.2);

// Giro muy suave
heart.rotation.y += 0.0015;

// Ligera inclinación fija para apreciar el 3D
heart.rotation.x = THREE.MathUtils.degToRad(15);

    

    renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

    camera.aspect = window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

const frases = [

"❤️ Te quiero",

"✨ Feliz cumpleaños",

"🌹 Eres especial",

"💖 Nunca dejes de sonreír",

"🎂 Disfruta tu día",

"💕Siempre contigo",

"🌸 Que seas muy feliz",

"⭐ Eres increíble",

"💝 Mucha felicidad",

"🩷 Con mucho cariño",

"✨ Nunca cambies",

"🎉 Hoy es tu día"

];

function crearMensaje(){

    const mensaje = document.createElement("div");

    mensaje.className = "cascade";

    mensaje.innerText =
        frases[
            Math.floor(Math.random()*frases.length)
        ];

    mensaje.style.left =
        Math.random()*100+"vw";

    mensaje.style.animationDuration =
        8+Math.random()*10+"s";

    mensaje.style.fontSize =
        12+Math.random()*8+"px";

    mensaje.style.opacity =
        0.3+Math.random()*0.7;

    document.body.appendChild(mensaje);

    setTimeout(()=>{

        mensaje.remove();

    },18000);

}

setInterval(crearMensaje,450);

const starsGeometry = new THREE.BufferGeometry();

const stars = [];

for(let i=0;i<8000;i++){

    stars.push(

        (Math.random()-0.5)*180,

        (Math.random()-0.5)*180,

        (Math.random()-0.5)*80

    );

}

starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(stars,3)
);

const starsMaterial = new THREE.PointsMaterial({

    color:0xffffff,

    size:0.08,

    transparent:true,

    opacity:0.8,

    blending:THREE.AdditiveBlending,

    depthWrite:false

});

const starField = new THREE.Points(
    starsGeometry,
    starsMaterial
);

scene.add(starField);



