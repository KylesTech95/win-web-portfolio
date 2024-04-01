export default function(THREE,body,canvas,OrbitControls){
    // text geometry
    // enter code...

//____________________________________
    // radius, tube, radial segments, tubular segments, arc
    const tourusGeometry = new THREE.TorusGeometry(2.5,1.25,30,100,7)

    /*
    We need 4 elements to get started:
    
    1) A scene that will contain objects
    2) Some objects
    3) A camera
    4) A renderer
    
    */
    // 1)
    const scene = new THREE.Scene();
    const scene1 = new THREE.Scene();

    
    // To create the material, we use the MeshBasicMaterial class with one parameter: an object {} containing all the options.
    const material = new THREE.MeshBasicMaterial({color:`#902CEA`, wireframe:true})
    // To create the final mesh, we use the Mesh class and send the geometry and the material as parameters.
    const mesh = new THREE.Mesh(tourusGeometry,material)
    // console.log(mesh)
    
    // add opacity to mesh
    const addOpacity = (m) => {
        m.material.transparent=true;
        m.material.opacity=.5;
        return;
     } 
    //  addOpacity(param)
    // plug your mesh into the scene
    scene.add(mesh)

    // 2)
    // field of view (fov)(degree) & height and width aspect ratios
    // const body = document.querySelector('body')
    const aRatio = {
        height:document.body.clientHeight,
        width:document.body.clientWidth
    }
    const fov = 75;
    const camera = new THREE.PerspectiveCamera(fov,(aRatio.width/aRatio.height))
    camera.position.z = 100;  

    
     
    scene.add(camera)
    
    // 3 
    // const canvas = document.querySelector('.three-canvas')
    const renderer = new THREE.WebGLRenderer({
        canvas:canvas
    })
    renderer.setSize(aRatio.width,aRatio.height)
    // set background for canvas with .setClearColor( color, alpha)
    renderer.setClearColor( `#0A0A0A`, 1);
    
    const pointLight = new THREE.PointLight(0xff0000)
    const lightHelper = new THREE.PointLightHelper(pointLight)
    // scene.add(lightHelper)
    
    
    //conotrols
    const controls = new OrbitControls(camera,renderer.domElement)
    const addStar = () => {
        const starGeo = new THREE.SphereGeometry(0.25,25,25)
        const starMaterial  = new THREE.MeshBasicMaterial({color: '#EDE8BA'})
        const star = new THREE.Mesh(starGeo,starMaterial)

        const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(500));
        star.position.set(x,y,z);
        scene.add(star)
    }
    const addBox = () => {
        const boxGeometry = new THREE.BoxGeometry(1,1,1)
        const material2 = new THREE.MeshBasicMaterial({color:`#902CEA`, wireframe:false})
        const box = new THREE.Mesh(boxGeometry,material2)
        const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(150));
        box.position.set(x,y,z);

        box.position.z = 0;
        
        scene.add(box)
        let b = .0025

        function animateBox(){
            requestAnimationFrame(animateBox)
            box.rotation.x+=(((b+=.025)%.1)%.1)
            box.rotation.y+=(((b+=.025)%.1)%.1)
        }
        animateBox()
    }
    Array(100).fill().forEach(addBox)
    
    Array(500).fill().forEach(addStar)

    const direction = {
        up: false,
        down:true
    }
    // render animation
    const renderAnimation = () => {
        requestAnimationFrame( renderAnimation )
        // animation transform
        let c = .0025 // starting speed
        // 4 render
        mesh.rotation.x+=((c+=.0005)%.1)
        mesh.rotation.y+=((c+=.0005)%.1)
        // camera.position.z-=((c+=.025)%1)
        if(camera.position.z){
            if(direction.down==true){
                camera.position.z-=((.10%20)/4)
            }
            if(direction.up==true){
                camera.position.z+=((.10%100)/4)
            }

            // ultimatums
            if(camera.position.z<=20){
                direction.down=false;
                direction.up=true
            }
            if(camera.position.z>=50){
                direction.down=true;
                direction.up=false;
            }
        }
                

        
    
        // console.log(camera.position.z)
        renderer.render( scene,camera )
        // renderer.render( scene1,camera)
    }
    renderAnimation();
}
