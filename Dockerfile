# Uses the node base image with the latest LTS version
FROM node:16.15.0
RUN mkdir -p /BUDA-frontend
WORKDIR /BUDA-frontend
# Informs Docker that the container listens on the 
# specified network ports at runtime
EXPOSE 3000
# Copies files from the local 
# directory to a new app directory on the container
COPY package.json .
COPY package-lock.json .

# Changes working directory to the new directory just created
# Installs npm dependencies on container

# Command container will actually run when called
RUN yarn build
COPY . .
CMD ["npm", "start"]