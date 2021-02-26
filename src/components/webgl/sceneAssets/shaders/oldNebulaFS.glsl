precision highp float;


    varying vec2 vUv;
    varying float vElevation;

    uniform sampler2D texture1;
    uniform sampler2D texture2;

    float hue2rgb(float f1, float f2, float hue) {
        if (hue < 0.0)
        hue += 1.0;
        else if (hue > 1.0)
        hue -= 1.0;
        float res;
        if ((6.0 * hue) < 1.0)
        res = f1 + (f2 - f1) * 6.0 * hue;
        else if ((2.0 * hue) < 1.0)
        res = f2;
        else if ((3.0 * hue) < 2.0)
        res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
        else
        res = f1;
        return res;
    }

    vec3 hsl2rgb(vec3 hsl) {
        vec3 rgb;
    
        if (hsl.y == 0.0) {
          rgb = vec3(hsl.z); // Luminance
        } else {
          float f2;
    
          if (hsl.z < 0.5)
          f2 = hsl.z * (1.0 + hsl.y);
          else
          f2 = hsl.z + hsl.y - hsl.y * hsl.z;
    
          float f1 = 2.0 * hsl.z - f2;
    
          rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
          rgb.g = hue2rgb(f1, f2, hsl.x);
          rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
        }
        return rgb;
    }

    vec3 hsl2rgb(float h, float s, float l) {
        return hsl2rgb(vec3(h, s, l));
    }

    void main(){
        vec4 col = texture2D(texture1, vUv);
        vec4 col2 = texture2D(texture2, vUv);

        float hue = 100./360.;
        float saturation = vElevation;

        float darkborders = sin(vUv.x * 3.14) * sin(vUv.y * 3.14);
        float brightness = pow( darkborders * 0.2  + vElevation,6.5);
        
        vec3 col3 = hsl2rgb(hue, saturation, brightness);


        gl_FragColor = vec4(col3.r, col3.g, col3.b, length(col.rgb));

    }