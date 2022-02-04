## Netlify
npm install -D @netlify/plugin-nextjs@latest  

netlify.toml:  

[[plugins]]  
package = "@netlify/plugin-nextjs"  

[build]
publish = ".next"


base:  
./

build:     
npm run build  

Publish directory:  
.next