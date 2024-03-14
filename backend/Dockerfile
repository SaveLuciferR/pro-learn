##########################################
# Composer

FROM composer:2.5.2 AS composer

COPY composer.json /app
COPY composer.lock /app

RUN composer install

COPY . /app/

# Composer
###########################################
# PHP

FROM php:8.1-apache

RUN a2enmod rewrite
RUN service apache2 restart

COPY . /var/www/html
COPY --from=composer /app/vendor /var/www/html/vendor

# PHP
##########################################