import { Vector2 } from 'three';

export default {
    uniforms: {
        'tDiffuse': { value: null },
        'resolution': { value: new Vector2() },
        'time': { value: 0.0 },
        'resMultiplier': { value: 0.5 },
        'effectLength': { value: 7.0 },
        'mode': { value: 4 },
        'mixAmount': { value: 0.9 },
        'autoSwitch': { value: true },
        'curveScreen': { value: true }

    },
    vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}',
    ].join( '\n' ),
    fragmentShader: [
        'uniform vec2 resolution;',
        'uniform float time;',
        'uniform float resMultiplier;',
        'uniform float effectLength;',
        'uniform int mode;',
        'uniform float mixAmount;',
        'uniform bool autoSwitch;',
        'uniform bool curveScreen;',
        'uniform sampler2D tDiffuse;',
        'varying vec2 vUv;',

        'vec2 curve ( in vec2 uv ) {',
        '    uv = ( uv - 0.5 ) * 2.0;',
        '    uv *= 1.1;',
        '    uv.x *= 1.0 + pow( ( abs( uv.y ) / 5.0 ), 2.0 );',
        '    uv.y *= 1.0 + pow( ( abs( uv.x ) / 4.0 ), 2.0 );',
        '    uv  = ( uv / 2.0 ) + 0.5;',
        '    uv =  uv * 0.92 + 0.04;',
        '    return uv;',
        '}',


        'vec3 findClosest ( in vec3 ref, in int mode ) {',
        '    vec3 old = vec3 (100.0 * 255.0);',
        '    #define tryColor(new) old = mix (new, old, step (length (old-ref), length (new-ref)));',
        '    if ( mode == 1 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 (133.0,  59.0,  81.0));',
        '        tryColor (vec3 ( 80.0,  71.0, 137.0));',
        '        tryColor (vec3 (233.0,  93.0, 240.0));',
        '        tryColor (vec3 (  0.0, 104.0,  82.0));',
        '        tryColor (vec3 (146.0, 146.0, 146.0));',
        '        tryColor (vec3 (  0.0, 168.0, 241.0));',
        '        tryColor (vec3 (202.0, 195.0, 248.0));',
        '        tryColor (vec3 ( 81.0,  92.0,  15.0));',
        '        tryColor (vec3 (235.0, 127.0,  35.0));',
        '        tryColor (vec3 (241.0, 166.0, 191.0));',
        '        tryColor (vec3 (  0.0, 201.0,  41.0));',
        '        tryColor (vec3 (203.0, 211.0, 155.0));',
        '        tryColor (vec3 (154.0, 220.0, 203.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '    }',
        '    if ( mode == 2 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '        tryColor (vec3 (120.0,  41.0,  34.0));',
        '        tryColor (vec3 (135.0, 214.0, 221.0));',
        '        tryColor (vec3 (170.0,  95.0, 182.0));',
        '        tryColor (vec3 ( 85.0, 160.0,  73.0));',
        '        tryColor (vec3 ( 64.0,  49.0, 141.0));',
        '        tryColor (vec3 (191.0, 206.0, 114.0));',
        '        tryColor (vec3 (170.0, 116.0,  73.0));',
        '        tryColor (vec3 (234.0, 180.0, 137.0));',
        '        tryColor (vec3 (184.0, 105.0,  98.0));',
        '        tryColor (vec3 (199.0, 255.0, 255.0));',
        '        tryColor (vec3 (234.0, 159.0, 246.0));',
        '        tryColor (vec3 (148.0, 224.0, 137.0));',
        '        tryColor (vec3 (128.0, 113.0, 204.0));',
        '        tryColor (vec3 (255.0, 255.0, 178.0));',
        '    }',
        '    if ( mode == 3 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '        tryColor (vec3 (161.0,  77.0,  67.0));',
        '        tryColor (vec3 (106.0, 193.0, 200.0));',
        '        tryColor (vec3 (162.0,  86.0, 165.0));',
        '        tryColor (vec3 ( 92.0, 173.0,  95.0));',
        '        tryColor (vec3 ( 79.0,  68.0, 156.0));',
        '        tryColor (vec3 (203.0, 214.0, 137.0));',
        '        tryColor (vec3 (163.0, 104.0,  58.0));',
        '        tryColor (vec3 (110.0,  83.0,  11.0));',
        '        tryColor (vec3 (204.0, 127.0, 118.0));',
        '        tryColor (vec3 ( 99.0,  99.0,  99.0));',
        '        tryColor (vec3 (139.0, 139.0, 139.0));',
        '        tryColor (vec3 (155.0, 227.0, 157.0));',
        '        tryColor (vec3 (138.0, 127.0, 205.0));',
        '        tryColor (vec3 (175.0, 175.0, 175.0));',
        '    }',
        '    if ( mode == 4 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 ( 62.0, 184.0,  73.0));',
        '        tryColor (vec3 (116.0, 208.0, 125.0));',
        '        tryColor (vec3 ( 89.0,  85.0, 224.0));',
        '        tryColor (vec3 (128.0, 128.0, 241.0));',
        '        tryColor (vec3 (185.0,  94.0,  81.0));',
        '        tryColor (vec3 (101.0, 219.0, 239.0));',
        '        tryColor (vec3 (219.0, 101.0,  89.0));',
        '        tryColor (vec3 (255.0, 137.0, 125.0));',
        '        tryColor (vec3 (204.0, 195.0,  94.0));',
        '        tryColor (vec3 (222.0, 208.0, 135.0));',
        '        tryColor (vec3 ( 58.0, 162.0,  65.0));',
        '        tryColor (vec3 (183.0, 102.0, 181.0));',
        '        tryColor (vec3 (204.0, 204.0, 204.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '    }',
        '    if ( mode == 5 ) {',
        '        tryColor (vec3 ( 30.0,  30.0,  30.0));',
        '        tryColor (vec3 (  0.0, 170.0, 170.0));',
        '        tryColor (vec3 (170.0,   0.0, 170.0));',
        '        tryColor (vec3 (170.0, 170.0, 170.0));',
        '        tryColor (vec3 ( 85.0, 255.0, 255.0));',
        '        tryColor (vec3 (255.0,  85.0, 255.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '    }',
        '    if ( mode == 6 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 (  0.0,  25.0, 182.0));',
        '        tryColor (vec3 (  0.0, 180.0,  29.0));',
        '        tryColor (vec3 (  0.0, 182.0, 184.0));',
        '        tryColor (vec3 (196.0,  31.0,  12.0));',
        '        tryColor (vec3 (193.0,  43.0, 182.0));',
        '        tryColor (vec3 (193.0, 106.0,  21.0));',
        '        tryColor (vec3 (184.0, 184.0, 184.0));',
        '        tryColor (vec3 (104.0, 104.0, 104.0));',
        '        tryColor (vec3 ( 95.0, 110.0, 252.0));',
        '        tryColor (vec3 ( 57.0, 250.0, 111.0));',
        '        tryColor (vec3 ( 36.0, 252.0, 254.0));',
        '        tryColor (vec3 (255.0, 112.0, 106.0));',
        '        tryColor (vec3 (255.0, 118.0, 253.0));',
        '        tryColor (vec3 (255.0, 253.0, 113.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '    }',
        '    else if ( mode == 7 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '        tryColor (vec3 (255.0,   0.0,   0.0));',
        '        tryColor (vec3 (  0.0, 255.0,   0.0));',
        '        tryColor (vec3 (  0.0,   0.0, 255.0));',
        '        tryColor (vec3 (255.0, 255.0,   0.0));',
        '        tryColor (vec3 (  0.0, 255.0, 255.0));',
        '        tryColor (vec3 (255.0,   0.0, 255.0));',
        '        tryColor (vec3 (128.0,   0.0,   0.0));',
        '        tryColor (vec3 (  0.0, 128.0,   0.0));',
        '        tryColor (vec3 (  0.0,   0.0, 128.0));',
        '        tryColor (vec3 (128.0, 128.0,   0.0));',
        '        tryColor (vec3 (  0.0, 128.0, 128.0));',
        '        tryColor (vec3 (128.0,   0.0, 128.0));',
        '        tryColor (vec3 (128.0, 128.0, 128.0));',
        '        tryColor (vec3 (255.0, 128.0, 128.0));',
        '    }',
        '    else if ( mode == 8 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '        tryColor (vec3 (116.0,  67.0,  53.0));',
        '        tryColor (vec3 (124.0, 172.0, 186.0));',
        '        tryColor (vec3 (123.0,  72.0, 144.0));',
        '        tryColor (vec3 (100.0, 151.0,  79.0));',
        '        tryColor (vec3 ( 64.0,  50.0, 133.0));',
        '        tryColor (vec3 (191.0, 205.0, 122.0));',
        '        tryColor (vec3 (123.0,  91.0,  47.0));',
        '        tryColor (vec3 ( 79.0,  69.0,   0.0));',
        '        tryColor (vec3 (163.0, 114.0, 101.0));',
        '        tryColor (vec3 ( 80.0,  80.0,  80.0));',
        '        tryColor (vec3 (120.0, 120.0, 120.0));',
        '        tryColor (vec3 (164.0, 215.0, 142.0));',
        '        tryColor (vec3 (120.0, 106.0, 189.0));',
        '        tryColor (vec3 (159.0, 159.0, 150.0));',
        '    }',
        '    else if ( mode == 9 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '        tryColor (vec3 (152.0,  75.0,  67.0));',
        '        tryColor (vec3 (121.0, 193.0, 200.0));',
        '        tryColor (vec3 (155.0,  81.0, 165.0));',
        '        tryColor (vec3 (202.0, 160.0, 218.0));',
        '        tryColor (vec3 (202.0, 160.0, 218.0));',
        '        tryColor (vec3 (202.0, 160.0, 218.0));',
        '        tryColor (vec3 (202.0, 160.0, 218.0));',
        '        tryColor (vec3 (191.0, 148.0, 208.0));',
        '        tryColor (vec3 (179.0, 119.0, 201.0));',
        '        tryColor (vec3 (167.0, 106.0, 198.0));',
        '        tryColor (vec3 (138.0, 138.0, 138.0));',
        '        tryColor (vec3 (163.0, 229.0, 153.0));',
        '        tryColor (vec3 (138.0, 123.0, 206.0));',
        '        tryColor (vec3 (173.0, 173.0, 173.0));',
        '    }',
        '    else if ( mode == 10 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '        tryColor (vec3 (255.0,   0.0,   0.0));',
        '        tryColor (vec3 (  0.0, 255.0,   0.0));',
        '        tryColor (vec3 (  0.0,   0.0, 255.0));',
        '        tryColor (vec3 (255.0,   0.0, 255.0));',
        '        tryColor (vec3 (255.0, 255.0,   0.0));',
        '        tryColor (vec3 (  0.0, 255.0, 255.0));',
        '        tryColor (vec3 (215.0,   0.0,   0.0));',
        '        tryColor (vec3 (  0.0, 215.0,   0.0));',
        '        tryColor (vec3 (  0.0,   0.0, 215.0));',
        '        tryColor (vec3 (215.0,   0.0, 215.0));',
        '        tryColor (vec3 (215.0, 215.0,   0.0));',
        '        tryColor (vec3 (  0.0, 215.0, 215.0));',
        '        tryColor (vec3 (215.0, 215.0, 215.0));',
        '        tryColor (vec3 ( 40.0,  40.0,  40.0));',
        '    }',
        '    else if ( mode == 11 ) {',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '        tryColor (vec3 (  1.0,   3.0,  31.0));',
        '        tryColor (vec3 (  1.0,   3.0,  53.0));',
        '        tryColor (vec3 ( 28.0,   2.0,  78.0));',
        '        tryColor (vec3 ( 80.0,   2.0, 110.0));',
        '        tryColor (vec3 (143.0,   3.0, 133.0));',
        '        tryColor (vec3 (181.0,   3.0, 103.0));',
        '        tryColor (vec3 (229.0,   3.0,  46.0));',
        '        tryColor (vec3 (252.0,  73.0,  31.0));',
        '        tryColor (vec3 (253.0, 173.0,  81.0));',
        '        tryColor (vec3 (254.0, 244.0, 139.0));',
        '        tryColor (vec3 (239.0, 254.0, 203.0));',
        '        tryColor (vec3 (242.0, 255.0, 236.0));',
        '    }',
        '    else if ( mode == 12 ) {',
        '        tryColor (vec3 ( 41.0,  57.0,  65.0));',
        '        tryColor (vec3 ( 72.0,  93.0,  72.0));',
        '        tryColor (vec3 (133.0, 149.0,  80.0));',
        '        tryColor (vec3 (186.0, 195.0, 117.0));',
        '        tryColor (vec3 (242.0, 239.0, 231.0));',
        '    }',
        '    else if ( mode == 13 ) {',
        '        tryColor (vec3 ( 65.0,  49.0,  41.0));',
        '        tryColor (vec3 ( 93.0,  72.0,  93.0));',
        '        tryColor (vec3 ( 96.0,  80.0, 149.0));',
        '        tryColor (vec3 (126.0, 117.0, 195.0));',
        '        tryColor (vec3 (231.0, 234.0, 242.0));',
        '    }',
        '    else if ( mode == 14 ) {',
        '        tryColor (vec3 (156.0, 189.0,  15.0));',
        '        tryColor (vec3 (140.0, 173.0,  15.0));',
        '        tryColor (vec3 ( 48.0,  98.0,  48.0));',
        '        tryColor (vec3 ( 15.0,  56.0,  15.0));',
        '    }',
        '    else if ( mode == 15 ) {',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '        tryColor (vec3 (226.0, 226.0, 226.0));',
        '        tryColor (vec3 (198.0, 198.0, 198.0));',
        '        tryColor (vec3 (171.0, 171.0, 171.0));',
        '        tryColor (vec3 (145.0, 145.0, 145.0));',
        '        tryColor (vec3 (119.0, 119.0, 119.0));',
        '        tryColor (vec3 ( 94.0,  94.0,  94.0));',
        '        tryColor (vec3 ( 71.0,  71.0,  71.0));',
        '        tryColor (vec3 ( 48.0,  48.0,  48.0));',
        '        tryColor (vec3 ( 27.0,  27.0,  27.0));',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '    }',
        '    else if ( mode == 16 ) {',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '        tryColor (vec3 (198.0, 198.0, 198.0));',
        '        tryColor (vec3 (145.0, 145.0, 145.0));',
        '        tryColor (vec3 ( 94.0,  94.0,  94.0));',
        '        tryColor (vec3 ( 48.0,  48.0,  48.0));',
        '        tryColor (vec3 (  0.0,   0.0,   0.0));',
        '    }',
        '    else if ( mode == 17 ) {',
        '        tryColor (vec3 (255.0, 255.0, 255.0));',
        '        tryColor (vec3 (145.0, 145.0, 145.0));',
        '        tryColor (vec3 ( 48.0,  48.0,  48.0));',
        '    }',
        '    return old ;',
        '}',

        'float ditherMatrix (float x, float y) {',
        '    return mix(',
        '        mix(mix(mix(mix(mix(0.0,32.0,step(1.0,y)),mix(8.0,40.0,step(3.0,y)),step(2.0,y)),',
        '        mix(mix(2.0,34.0,step(5.0,y)),mix(10.0,42.0,step(7.0,y)),step(6.0,y)),step(4.0,y)),',
        '        mix(mix(mix(48.0,16.0,step(1.0,y)),mix(56.0,24.0,step(3.0,y)),step(2.0,y)),',
        '        mix(mix(50.0,18.0,step(5.0,y)),mix(58.0,26.0,step(7.0,y)),step(6.0,y)),step(4.0,y)),step(1.0,x)),',
        '        mix(mix(mix(mix(12.0,44.0,step(1.0,y)),mix(4.0,36.0,step(3.0,y)),step(2.0,y)),',
        '        mix(mix(14.0,46.0,step(5.0,y)),mix(6.0,38.0,step(7.0,y)),step(6.0,y)),step(4.0,y)),',
        '        mix(mix(mix(60.0,28.0,step(1.0,y)),mix(52.0,20.0,step(3.0,y)),step(2.0,y)),',
        '        mix(mix(62.0,30.0,step(5.0,y)),mix(54.0,22.0,step(7.0,y)),step(6.0,y)),step(4.0,y)),step(3.0,x)),step(2.0,x)),',
        '        mix(mix(mix(mix(mix(3.0,35.0,step(1.0,y)),mix(11.0,43.0,step(3.0,y)),step(2.0,y)),',
        '        mix(mix(1.0,33.0,step(5.0,y)),mix(9.0,41.0,step(7.0,y)),step(6.0,y)),step(4.0,y)),',
        '        mix(mix(mix(51.0,19.0,step(1.0,y)),mix(59.0,27.0,step(3.0,y)),step(2.0,y)),',
        '        mix(mix(49.0,17.0,step(5.0,y)),mix(57.0,25.0,step(7.0,y)),step(6.0,y)),step(4.0,y)),step(5.0,x)),',
        '        mix(mix(mix(mix(15.0,47.0,step(1.0,y)),mix(7.0,39.0,step(3.0,y)),step(2.0,y)),',
        '        mix(mix(13.0,45.0,step(5.0,y)),mix(5.0,37.0,step(7.0,y)),step(6.0,y)),step(4.0,y)),',
        '        mix(mix(mix(63.0,31.0,step(1.0,y)),mix(55.0,23.0,step(3.0,y)),step(2.0,y)),',
        '        mix(mix(61.0,29.0,step(5.0,y)),mix(53.0,21.0,step(7.0,y)),step(6.0,y)),step(4.0,y)),step(7.0,x)),step(6.0,x)),step(4.0,x)',
        '    );',
        '}',

        'vec3 dither ( in vec3 col, in vec2 uv, in int mode ) {',
        '    col *= 255.0;',
        '    col += ditherMatrix (mod (uv.x, 8.0), mod (uv.y, 8.0)) ;',
        '    col = findClosest (clamp (col, 0.0, 255.0), mode);',
        '    return col / 255.0;',
        '}',

        'vec3 getColorFX ( in int fx, in vec2 pos, in vec3 col ) {',
        '    fx = int( fract( float( fx ) * 1.61456 ) * 18.0 );',
        '    int temp = fx / 17;',
        '    fx -= temp * 17;',
        '    vec3 color = vec3( 0.0 );',
        '         if ( fx ==  0 ) color = dither( col, pos,  1 );',
        '    else if ( fx ==  1 ) color = dither( col, pos,  2 );',
        '    else if ( fx ==  2 ) color = dither( col, pos,  3 );',
        '    else if ( fx ==  3 ) color = dither( col, pos,  4 );',
        '    else if ( fx ==  4 ) color = dither( col, pos,  5 );',
        '    else if ( fx ==  5 ) color = dither( col, pos,  6 );',
        '    else if ( fx ==  6 ) color = dither( col, pos,  7 );',
        '    else if ( fx ==  7 ) color = dither( col, pos,  8 );',
        '    else if ( fx ==  8 ) color = dither( col, pos,  9 );',
        '    else if ( fx ==  9 ) color = dither( col, pos, 10 );',
        '    else if ( fx == 10 ) color = dither( col, pos, 11 );',
        '    else if ( fx == 11 ) color = dither( col, pos, 12 );',
        '    else if ( fx == 12 ) color = dither( col, pos, 13 );',
        '    else if ( fx == 13 ) color = dither( col, pos, 14 );',
        '    else if ( fx == 14 ) color = dither( col, pos, 15 );',
        '    else if ( fx == 15 ) color = dither( col, pos, 16 );',
        '    else if ( fx == 16 ) color = dither( col, pos, 17 );',
        '    else                 color = col;',
        '    return color;',
        '}',

        'vec3 getScreenOutput( in vec2 coord, in vec3 col, in float eLength ) {',
        '    int fx = int( time / eLength );',
        '    float frac = mod( time, eLength ) / eLength;',
        '    vec3 colorA = getColorFX( fx    , coord, col );',
        '    vec3 colorB = getColorFX( fx - 1, coord, col );',
        '    return mix( colorB, colorA, smoothstep( 0.7, 1.0, frac ) );',
        '}',

        'void main(void) {',
        '    vec2 uv = gl_FragCoord.xy / resolution.xy;',
        '    uv = ( curveScreen ) ? curve( uv ) : uv;',

        '    vec4 tex = texture2D( tDiffuse, uv );',
        '    vec2 coord = gl_FragCoord.xy * resMultiplier;',
        '    vec3 col = vec3( 0.0 );',
        '    if ( autoSwitch ) {',
        '        col = getScreenOutput( coord, tex.rgb, effectLength );',
        '    } else {',
        '        if ( mode > -1 && mode < 18 ) {',
        '            col = dither( tex.rgb, coord, mode );',
        '        } else {',
        '            col = tex.rgb;',
        '        }',
        '    }',
        '    vec3 color = mix( tex.rgb, col, mixAmount );',

        'if ( curveScreen ) {',
        '    float vig = ( 0.0 + 1.0 * 16.0 * uv.x * uv.y * ( 1.0 - uv.x ) * ( 1.0 - uv.y ) );',
        '    color *= vec3( pow( vig, 0.4 ) );',
        '    if (uv.x < 0.0 || uv.x > 1.0) { color *= 0.0; }',
        '    if (uv.y < 0.0 || uv.y > 1.0) { color *= 0.0; }',
        '}',

        '    gl_FragColor=vec4( color, 1.0 );',
        '}'

    ].join( '\n' ),
};
