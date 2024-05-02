FROM gcc:latest

COPY /src /usr/src/cpp_test

WORKDIR /usr/src/cpp_test

RUN g++ -o Test main.cpp

CMD [ "./Test" ]