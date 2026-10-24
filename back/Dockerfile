FROM php:8.3-apache

# Install system libraries required by PHP extensions.
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    unzip \
    libicu-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

# Configure GD for image support.
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg

# Install DOM separately before other extensions that depend on it.
RUN docker-php-ext-install dom

# Install the remaining PHP extensions.
RUN docker-php-ext-install -j"$(nproc)" \
    bcmath \
    gd \
    intl \
    mbstring \
    exif \
    pcntl \
    pdo_mysql \
    zip

# Install Composer from the official Composer image.
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Configure Apache to serve Laravel's public directory.
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri \
    -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf \
    && a2enmod rewrite headers

WORKDIR /var/www/html

# Copy dependency manifests first.
COPY composer.json composer.lock ./

# Install production dependencies without running Laravel scripts yet.
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts

# Copy the Laravel application.
COPY . .

# Include the Aiven CA certificate for secure MySQL connections.
COPY certs/ca.pem /etc/ssl/certs/aiven-ca.pem

ENV MYSQL_ATTR_SSL_CA=/etc/ssl/certs/aiven-ca.pem

# Generate the optimized autoloader and Laravel package manifest.
RUN composer dump-autoload \
    --no-dev \
    --optimize \
    --no-interaction \
    --no-scripts \
    && php artisan package:discover --ansi

# Create Laravel's writable directories and set permissions.
RUN mkdir -p storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80

CMD ["apache2-foreground"]

