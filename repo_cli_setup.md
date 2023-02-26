# Cloning repositories

You will need to configure ssh in Ubuntu to use the same keypair that is configured in GitHub.

You can either copy the file over to the Ubuntu instance, or point it at the original file on the Windows side.

If you want to copy the key over, you can use the `cp` command. When in WSL, your Windows filesystem can be accessed at `/mnt/C/Users/<your username>`.

Thus, you can copy the key as follows: `cp /mnt/C/Users/<your username>/.ssh/<name of the private key> ~/.ssh/<name of the private key`

This will copy the key to your Ubuntu home folder. After copying, we will need to update permimssions. Run `chmod 600 /path/to/keyfile`.

If you don't want to bother copying, you can go straight to setting up the config file.

In WSL, run `nano ~/.ssh/config`. This will open the nano text editor. 

You will add the following:
```
Host github.com
  IdentityFile /path/to/your/private/keypair
```
You can either point the path at the copied keypair, or at the version sitting in Windows. 

# Setting up npm alias for pnpm

In a WSL terminal, run `nano ~/.bashrc`. Navigate to the bottom of this file and add `alias npm="pnpm"`. This will automatically replace `npm` with `pnpm` whenever you execute `npm` in the terminal.