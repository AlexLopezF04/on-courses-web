# Guía de Despliegue en DigitalOcean - Proyecto OnCourses

Esta guía contiene la configuración y los pasos necesarios para desplegar el frontend de **OnCourses Web** en tu Droplet de **DigitalOcean**, alineado con tu dominio y estructura del pipeline de CI/CD.

---

## 🏗️ 1. Preparación del Servidor (Droplet)

Conéctate a tu Droplet mediante SSH desde tu terminal local:

```bash
# Acceder por SSH
ssh root@147.182.170.20

# Actualizar el sistema e instalar Nginx si no está instalado
apt update && apt upgrade -y
apt install nginx -y

# Asegurar que Nginx arranque automáticamente
systemctl start nginx
systemctl enable nginx

# Permitir tráfico Web en el Firewall
ufw allow 'Nginx Full'
```

---

## ⚙️ 2. Configuración de Nginx en la VM

Nginx servirá los archivos estáticos de tu React App y manejará el enrutamiento interno para evitar errores 404 al recargar páginas como `/admin` o `/login`.

1. Crea el archivo de configuración del sitio:
   ```bash
   nano /etc/nginx/sites-available/on-courses
   ```

2. Pega el siguiente bloque de configuración:
   ```nginx
   server {
       listen 80;
       server_name on-courses.uaeftt-ute.site 147.182.170.20;

       root /var/www/on-courses-frontend;
       index index.html;

       # Enrutamiento de React Router (Evita errores 404)
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Proxy opcional hacia Django si corre en la misma máquina o redirigido
       location /api/ {
           proxy_pass http://127.0.0.1:8000/api/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. Guarda (`Ctrl+O`, `Enter`) y sal (`Ctrl+X`).

4. Ejecuta los comandos para activar la configuración:
   ```bash
   # Habilitar el sitio enlazándolo a sites-enabled
   ln -s /etc/nginx/sites-available/on-courses /etc/nginx/sites-enabled/

   # Remover configuración por defecto si existe
   rm -f /etc/nginx/sites-enabled/default

   # Validar la sintaxis de Nginx
   nginx -t

   # Crear la carpeta de despliegue
   mkdir -p /var/www/on-courses-frontend

   # Reiniciar Nginx
   systemctl restart nginx

   # Asignar permisos de lectura a Nginx
   chown -R www-data:www-data /var/www/on-courses-frontend
   chmod -R 755 /var/www/on-courses-frontend
   ```

---

## 🤖 3. Despliegue Automatizado (GitHub Actions CI/CD)

El pipeline configurado en `.github/workflows/deploy.yml` compilará y subirá los archivos automáticamente al hacer push a la rama **`main`**.

Asegúrate de registrar las siguientes variables secretas en tu repositorio en GitHub (**Settings** ➔ **Secrets and variables** ➔ **Actions** ➔ **New repository secret**):

| Secret Name | Value | Description |
| :--- | :--- | :--- |
| **`VPS_HOST`** | `147.182.170.20` | La dirección IP pública de tu Droplet. |
| **`VPS_USER`** | `root` | El usuario SSH de tu Droplet (usualmente `root`). |
| **`VPS_KEY`** | `-----BEGIN OPENSSH PRIVATE KEY----- ...` | Copia la clave SSH privada que utilizas para conectarte a tu Droplet. |
| **`REACT_ENV`** | `VITE_API_URL=https://on-courses-api.uaeftt-ute.site/api` | Las variables de entorno de producción para el build de React. |

---

## 🔒 4. Habilitar HTTPS con SSL Certbot

Para habilitar HTTPS de forma gratuita para tu dominio `on-courses.uaeftt-ute.site`:

```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx -y

# Obtener e instalar el certificado para tu dominio
certbot --nginx -d on-courses.uaeftt-ute.site
```
*Sigue las instrucciones en la pantalla y selecciona la opción de redirigir todo el tráfico HTTP a HTTPS de forma automática.*
