FROM python:3.9

COPY /src /usr/src

WORKDIR /usr/src

RUN pip install -r requirements.txt

CMD [ "python", "./main.py" ]