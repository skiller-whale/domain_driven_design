FROM gradle:8.13-jdk21

ARG EXERCISES_DIR=/app/exercises

# Install Bun
RUN apt update && apt install -y unzip
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH (from its default install location)
ENV PATH="/root/.bun/bin:$PATH"

RUN echo > /root/.bashrc

# Adds a custom command prompt to the docker container.
RUN echo "PS1='🐳\[\033[01;32m\]\u@:\[\033[01;34m\]\W\[\033[00m\] \$ '" >> /root/.bashrc

# Makes default `ls` display colors.
RUN echo "alias ls='ls --color=auto'" >> /root/.bashrc

# Install cryptr globally to support coach helper
RUN bun install -g cryptr

# Move to project directory
WORKDIR ${EXERCISES_DIR}

ENTRYPOINT ["/bin/bash"]
