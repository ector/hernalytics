FROM ubuntu:latest

WORKDIR /etc/app
# SHELL ["/bin/bash", "-c"]
COPY .  ./


RUN chmod +x ./scripts/terraform_install.sh && \
    chmod +x ./scripts/aws_install.sh && \
    chmod +x ./scripts/utils.sh && \
    chmod +x ./scripts/terraform_init.sh && \
    chmod +x ./scripts/static_analysis.sh && \
    chmod +x ./scripts/node_install.sh
# Set environment variables and install necessary packages (packages:  libterm-readline-perl-perl).
RUN apt-get update -y && \
    apt-get install -y apt-utils bash wget unzip curl zip git-core && \
    export DEBIAN_FRONTEND=noninteractive
RUN export PROJECT_DIR=$(pwd)

# Install it
RUN bash ./scripts/terraform_install.sh
RUN bash ./scripts/aws_install.sh
RUN bash ./scripts/node_install.sh

RUN echo $(aws --version)

EXPOSE 80
