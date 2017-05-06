sbVertexShader = [
    "varying vec3 vWorldPosition;",
    "void main() {",
    "  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
    "  vWorldPosition = worldPosition.xyz;",
    "  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}",
].join("\n");

sbFragmentShader = [
    "uniform vec3 topColor;",
    "uniform vec3 bottomColor;",
    "uniform float offset;",
    "uniform float exponent;",
    "varying vec3 vWorldPosition;",
    "void main() {",
    "  float h = normalize( vWorldPosition + offset ).y;",
    "  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( h, exponent ), 0.0 ) ), 1.0 );",
    "}",
].join("\n");




function addSkybox() {
    var uniforms = {
        topColor: {type: "c", value: new THREE.Color(0x0077ff)}, bottomColor: {type: "c", value: new THREE.Color(0xffffff)},
        offset: {type: "f", value: 500}, exponent: {type: "f", value: 1.5}
    }
    var skyGeo = new THREE.SphereGeometry(500, 32, 32);
    skyMat = new THREE.ShaderMaterial({vertexShader: sbVertexShader, fragmentShader: sbFragmentShader, uniforms: uniforms, side: THREE.DoubleSide, fog: false});
    skyMesh = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(skyMesh);
};





var container, stats;
var camera, controls, scene, renderer;
var geometry, material;
var meshes = [];


camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 500;

scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




document.getElementById("list").addEventListener("click", addCube);
document.getElementById("list").addEventListener("click", addBall);

function addCube() {

    var e = document.getElementById("list");
    if (e.selectedIndex > 0) {
        if ("AddCube" === e.options[e.selectedIndex].value) {
            var r = Math.random() + 0.5;


            var geometry = new THREE.CubeGeometry(100 * r, 100 * r, 100 * r);

            var material = new THREE.MeshBasicMaterial({
                color: 0x00FF00, wireframe: true,
                wireframeLinewidth: 2
            });
            var cube = new THREE.Mesh(geometry, material);

            cube.position.x = Math.random() * 200 - 100;
            cube.position.y = Math.random() * 100 - 50;
            cube.position.z = Math.random() * 50 - 25;
            cube.rotation.x = Math.random() * 2 * Math.PI;
            cube.rotation.y = Math.random() * 2 * Math.PI;
            cube.rotation.z = Math.random() * 2 * Math.PI;
            cube.scale.x = Math.random() * 2 + 1;
            cube.scale.y = Math.random() * 2 + 1;
            cube.scale.z = Math.random() * 2 + 1;
            cube.castShadow = true;
            cube.receiveShadow = true;
            meshes.push(cube);

            //scene is global
            scene.add(cube);
            e.selectedIndex = 0;
        }
    }
}


function addBall() {
    var e = document.getElementById("list");
    if (e.selectedIndex > 0) {
        if ("AddBall" === e.options[e.selectedIndex].value) {

            var geometry = new THREE.SphereBufferGeometry(25, 8, 4);
            var material = new THREE.MeshBasicMaterial();
            var ball = new THREE.Mesh(geometry, material);

            ball.position.x = Math.random() * 300 - 75;
            ball.position.y = Math.random() * 300 - 75;
            ball.position.z = Math.random() * 300 - 75;
            ball.scale.x = ball.scale.y = ball.scale.z = Math.random() * 3 + 1;

            meshes.push(ball);
            scene.add(ball);
            e.selectedIndex = 0;
        }
    }
}


var init = function () {



  //  renderer = new THREE.WebGLRenderer();


    for (var i = 0; i < meshes.length; i++) {
        console.log(i);
        scene.add(meshes[i]);
    }


};


var animate = function () {

    requestAnimationFrame(animate);

    for (var i = 0; i < meshes.length; i++) {
        console.log(i);
        //scene.add(meshes[i]);
        meshes[i].rotation.x = Date.now() * 0.0005 * (1 + i);
        meshes[i].rotation.y = Date.now() * 0.001 * (1 + i);
    }

    renderer.render(scene, camera);
    controls.update();
};

addSkybox();
init();
animate();


/*
 function addCube2() {

 var e = document.getElementById("list");
 if (e.selectedIndex > 0) {
 if ("AddCube" === e.options[e.selectedIndex].value) {
 var cube = new THREE.Mesh( geometry, material );
 meshes.push( cube );
 scene.add( cube );
 // render();
 }
 }
 }
 */


//var grid = camera.view.grid( {width: 2, divideX: 20, divideY: 10, opacity:0.25} );
