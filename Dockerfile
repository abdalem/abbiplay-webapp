FROM node:12.10.0

# install chrome for protractor tests
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
# COPY ./client/package.json /usr/src/app/package.json
# COPY ./client/package-lock.json /usr/src/app/package-lock.json
# RUN npm install
RUN npm install -g @angular/cli@8.3.3

# add app
COPY ./ /usr/src/app

# start app
CMD ng serve --host 0.0.0.0 --publicHost play.abbi-studio.local