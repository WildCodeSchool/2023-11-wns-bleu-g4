FROM ubuntu:latest
LABEL authors="chambrin"

ENTRYPOINT ["top", "-b"]