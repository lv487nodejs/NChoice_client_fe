FROM node:12.2.0-alpine as react_build 
#also say 
WORKDIR /app
#copy the react app to the container
COPY . /app/ 

# #prepare the contiainer for building react 
RUN npm install --silent
RUN npm run build 

#prepare nginx
FROM maksymsahan/nginx:reload

COPY --from=react_build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
