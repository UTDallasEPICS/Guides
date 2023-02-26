# What is Docker?

Docker allows us to run programs in isolation, as 'containers'. Think of them as lightweight versions of virtual machines, running only a few programs instead of EVERYTHING a normal computer does.

A Docker Image is a template. It contains all the information needed to reproducibly create a container. Containers do not preserve internal state - each instance of a container starts from 0.

Containers made from the same Image are identical copies of each other - you can have multiple instances running based on the same image.

Containers do not persist data - every time you run a container, it starts from 0. To persi st data between container instances, you need volumes.

Volumes are like virtual storage drives. They can replace part of the filesystem of a container. This means that when the container writes data, instead of ending up inside the container filesystem (and thus deleted if the container reboots), the data gets saved to the host.

Volumes can be attached to multple containers simultaneously, allowing for example multiple database containers to share one storage area for configuration files.

For Mac and Linux, setting up Docker is straightforward. For students usng Windows machines, you will need to setup WSL - Windows Subsystem for Linux.

# What is WSL?

WSL lets us easily run a Linux VM on Windows. We will use this both to allow Docker to run and to ensure a consistent development environment for everyone on a team.

You will install Docker on your Windows system, but clone your code, install node, etc inside of a Linux VM running in WSL.

# Pre-requisites

- Know how to use a terminal (Powershell, Bash)

# Notes

- Instead of installing `Ubuntu-22.04`, you can try setting up DistroD instead
- All of the Docker and WSL setup commands will be run in Windows

# Links

[Docker & WSL Instructions](https://docs.docker.com/desktop/windows/wsl/)

[Distrod](https://github.com/nullpo-head/wsl-distrod)
