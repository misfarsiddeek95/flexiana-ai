# Production Deployment Guide for Flexiana AI

This guide outlines the step-by-step process to deploy the Flexiana AI application to a production environment (typically a Linux VPS like Ubuntu).

## 1. Prerequisites

Ensure your server has the following installed:
- **Node.js**: Version 20.x or higher (Application uses Node v20 types).
- **npm**: Comes with Node.js.
- **MySQL**: Production database (The schema is configured for MySQL).
- **Nginx**: As a reverse proxy.
- **PM2**: For process management (`npm install -g pm2`).
- **Certbot**: For SSL certificates (optional but recommended).

## 2. Server Setup & Installation

Cloning the repository and installing dependencies:

```bash
# Navigate to your web directory
cd /var/www

# Clone the repository
git clone <your-repo-url> flexiana-ai

# Enter the directory
cd flexiana-ai

# Install dependencies
npm install
```

## 3. Environment Configuration

Create a `.env` file in the root directory. This file should NOT be committed to version control.

```bash
nano .env
```

Add the following configuration. Replace placeholders with your actual production values.

```env
# Database Connection
# Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="mysql://flexiana_user:secure_password@localhost:3306/flexiana_db"

# NextAuth Configuration
# Run `openssl rand -base64 32` to generate a secure secret
NEXTAUTH_SECRET="your_generated_secure_random_string"
NEXTAUTH_URL="https://yourdomain.com"

# Email Configuration (SMTP)
# Used for the contact form functionality
SMTP_USER="your_email@gmail.com"
SMTP_PASS="your_app_specific_password"

# Site Configuration
# Used for SEO, Metadata, and Canonical URLs
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

> **Note**: The application is currently configured for Gmail SMTP. If using Gmail, ensure you use an **App Password**, not your login password.

## 4. Database Setup

The application uses Prisma with MySQL. You need to push the schema to your production database.

```bash
# Generate the Prisma Client
npx prisma generate

# Push the schema to the database (creates tables)
npx prisma db push

# (Optional) Seed the database with initial data if needed
npm run prisma:seed
```

> **Important**: If you are migrating existing data from SQLite (development) to MySQL, `db push` creates the structure. You would need a separate strategy to export/import data. For a fresh production setup, `db push` is sufficient.

## 5. Build the Application

Build the Next.js application for production.

```bash
npm run build
```

This command runs `prisma generate` internally (as defined in `package.json`) and builds the optimized application bundle.

## 6. Process Management with PM2

Use PM2 to keep the application running in the background.

```bash
# Start the application
pm2 start npm --name "flexiana-ai" -- start

# Save the PM2 list so it restarts on reboot
pm2 save
pm2 startup
```

## 7. Nginx Configuration

Configure Nginx to proxy requests to the Next.js application (running on port 3000 by default).

Create a new configuration file:
```bash
sudo nano /etc/nginx/sites-available/flexiana-ai
```

Add the following block:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/flexiana-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 8. SSL Configuration (HTTPS)

Secure your application with a free Let's Encrypt certificate.

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 9. Troubleshooting & Logs

- **Application Logs**: `pm2 logs flexiana-ai`
- **Nginx Logs**: `/var/log/nginx/error.log`
- **Database**: Check specific Prisma errors if the app fails to start.

## 10. Updating the Application

To deploy a new version:

```bash
cd /var/www/flexiana-ai
git pull origin main
npm install
npx prisma generate
npx prisma db push  # If there are schema changes
npm run build
pm2 restart flexiana-ai
```
