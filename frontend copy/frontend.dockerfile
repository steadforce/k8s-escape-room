# Use the official Nginx image from the Docker Hub
FROM nginx:latest

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the content of the current directory to /usr/share/nginx/html
COPY game/ /usr/share/nginx/html/game
COPY css/ /usr/share/nginx/html/css
COPY js/ /usr/share/nginx/html/js
COPY index.html /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container has started
CMD ["nginx", "-g", "daemon off;"]