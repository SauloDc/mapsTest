function createBorderColor(color) {
   let hsl = hexToHSL(color);  
   hsl[2] = hsl[2] - (hsl[2] * 0.3);
   let hex = HSLToHex(hsl[0], hsl[1], hsl[2]);

   return hex;
}

function hexToHSL(H) {
   // Convert hex to RGB first
   let r = 0, g = 0, b = 0;
   if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
   } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
   }
   // Then to HSL
   r /= 255;
   g /= 255;
   b /= 255;
   let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

   if (delta == 0)
      h = 0;
   else if (cmax == r)
      h = ((g - b) / delta) % 6;
   else if (cmax == g)
      h = (b - r) / delta + 2;
   else
      h = (r - g) / delta + 4;

   h = Math.round(h * 60);

   if (h < 0)
      h += 360;

   l = (cmax + cmin) / 2;
   s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
   s = +(s * 100).toFixed(1);
   l = +(l * 100).toFixed(1);

   return [h, s, l];
}

function HSLToHex(h, s, l) {
   s /= 100;
   l /= 100;

   let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

   if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
   } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
   } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
   } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
   } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
   } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
   }
   // Having obtained RGB, convert channels to hex
   r = Math.round((r + m) * 255).toString(16);
   g = Math.round((g + m) * 255).toString(16);
   b = Math.round((b + m) * 255).toString(16);

   // Prepend 0s, if necessary
   if (r.length == 1)
      r = "0" + r;
   if (g.length == 1)
      g = "0" + g;
   if (b.length == 1)
      b = "0" + b;

   return "#" + r + g + b;
}

export const mapPinIcon = (cor = null) => {
   let color = "#368c07";
   let borderColor = "#256205"
   if (cor != null) {
      color = cor;
      borderColor = createBorderColor(cor);
   }

   svg = `<svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      width="5.6444445mm"
      height="9.847393mm"
      viewBox="0 0 20 34.892337"
      id="svg3455"
      version="1.1"
      inkscape:version="0.91 r13725"
      sodipodi:docname="Map Pin.svg">
   <defs
      id="defs3457" />
   <sodipodi:namedview
      id="base"
      pagecolor="#ffffff"
      bordercolor="#666666"
      borderopacity="1.0"
      inkscape:pageopacity="0.0"
      inkscape:pageshadow="2"
      inkscape:zoom="12.181359"
      inkscape:cx="8.4346812"
      inkscape:cy="14.715224"
      inkscape:document-units="px"
      inkscape:current-layer="layer1"
      showgrid="false"
      inkscape:window-width="1024"
      inkscape:window-height="705"
      inkscape:window-x="-4"
      inkscape:window-y="-4"
      inkscape:window-maximized="1"
      fit-margin-top="0"
      fit-margin-left="0"
      fit-margin-right="0"
      fit-margin-bottom="0" />
   <metadata
      id="metadata3460">
      <rdf:RDF>
         <cc:Work
            rdf:about="">
         <dc:format>image/svg+xml</dc:format>
         <dc:type
            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
         <dc:title></dc:title>
         </cc:Work>
      </rdf:RDF>
   </metadata>
   <g
      inkscape:label="Layer 1"
      inkscape:groupmode="layer"
      id="layer1"
      transform="translate(-814.59595,-274.38623)">
      <g
         id="g3477"
         transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
         <path
            sodipodi:nodetypes="sscccccsscs"
            inkscape:connector-curvature="0"
            id="path4337-3"
            d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z"
            style="display:inline;opacity:1;fill:${color};fill-opacity:1;stroke:${borderColor};stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
         <circle
            r="3.0355"
            cy="288.25278"
            cx="823.03064"
            id="path3049"
            style="display:inline;opacity:1;fill:${borderColor};fill-opacity:1;stroke-width:0" />
      </g>
   </g>
   </svg>`;

   return svg;
}