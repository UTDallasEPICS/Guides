# Cloning repositories

You will need to configure ssh in Ubuntu to use the same key pair that is configured in GitHub.

You can either copy the file over to the Ubuntu instance, or point it at the original file on the Windows side.

Whenever you see `<` and `>` in an example, those are often template indicators - you usually will not include them, they are meant to indicate a spot where you fill in a value specific to your use case.

If you want to copy the key over, you can use the `cp` command. When in WSL, your Windows filesystem can be accessed at `/mnt/c/Users/<your username>`.

Thus, you can copy the key as follows: `cp /mnt/c/Users/<your WINDOWS username>/.ssh/<name of the private key> ~/.ssh/<name of the private key>`.

You may get an error about the destination directory not existing. Make sure you are in the Ubuntu home folder (you can run `pwd` to see your current working directory, and `cd ~` to go to your home directory if you are not already there). Use `ls -al` to check if there is a `.ssh` folder - if not, then you will need to create it. You can do this with `mkdir ~/.ssh`.

This will copy the key to your Ubuntu home folder. After copying, we will need to update permissions. Run `chmod 600 ~/.ssh/<name of the private key>`.

If you don't want to bother copying, you can go straight to setting up the config file.

In WSL, run `nano ~/.ssh/config`. This will open the nano text editor.

You will add the following:

```text
Host github.com
  IdentityFile ~/.ssh/<name of the private key>
```

Hit `Ctrl+X` to exit nano. It will prompt you to save the file. Type `y` and hit enter to finish saving.

Note that if you didn't do the copy, instead of `~/.ssh/<name of the private key>` you will provide `/mnt/c/Users/<your WINDOWS username>/.ssh/<name of the private key>`.

You can either point the path at the copied key pair, or at the version sitting in Windows.

You should now be able to run `git clone`, `git pull`, etc.

To clone a repository, use `git clone ssh://git@github.com/UTDallasEpics/<your repository name>`. If this is your first time cloning from GitHub, it will prompt you to accept the fingerprint of the remote host. You will need to type `yes`.

## Setting up npm alias for pnpm

In a WSL terminal, run `nano ~/.bashrc`. Navigate to the bottom of this file and add `alias npm="pnpm"`. This will automatically replace `npm` with `pnpm` whenever you execute `npm` in the terminal.
