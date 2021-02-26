    uniform float time;
    //
    varying vec2 vUv;
    varying float vElevation;
    varying float vDisplacement;
        
    float PI = 3.141592;

    float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}
  
    float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
      
    float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);
  
      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);
  
      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);
  
      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));
  
      vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
  
      return o4.y * d.y + o4.x * (1.0 - d.y);
    }
      
    float fbm(vec2 pos, float t){
      float r;
      r 	= 	noise( vec3( pos, t ) * 01.0 ) * 01.0000;
      r 	+= 	noise( vec3( pos, t ) * 02.0 ) * 00.5000;
      r 	+= 	noise( vec3( pos, t ) * 04.0 ) * 00.2500;
      r 	+= 	noise( vec3( pos, t ) * 08.0 ) * 00.1250;
      r 	+= 	noise( vec3( pos, t ) * 16.0 ) * 00.0625;
      return r / 1.9375;
   }
        
    void main(){
        vUv = uv;
        float t = time *.3;
        float t2 = time *.1;
        vec2 pos = vUv * 2.0;
        vec3 newPos = position;

        vec2 displacement = vec2(t,t2);
        float p = fbm(displacement + pos, t);
        vec2 pos2 = pos + vec2(p);

        
        float s = fbm( displacement * 5.0 + pos * 2.0, t * 1.32);

        float d = length( vUv - (0.5 ));
        float ratioElevation = pow( (1.0 - d), 5.0);
        vElevation = s + .2 + ratioElevation * .2;

        vElevation *= 1. - smoothstep(0.0, 0.5, length(uv - .5));
        newPos = position - normal * vElevation * 500.;


        newPos.y -= 150.0 * sin((uv.x-0.5) * PI * 1.5);
        newPos.z -= cos((uv.x-0.5) * PI * 2.5) * 100.0;

        gl_Position = projectionMatrix * modelViewMatrix * vec4 ( newPos, 1.0);

    }