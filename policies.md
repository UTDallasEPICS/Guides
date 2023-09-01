# Policies

These are general policies to follow when working on your projects.

## Git/GitHub

- Branches:
  - All branches must be named with the syntax `dev/<studentName>/<issue#>`
  - All branches must be merged and cleaned out by the final presentation
  - All [feature branches](https://www.optimizely.com/optimization-glossary/feature-branch/) must stay updated (merge in changes from other branches)
- All tasks must have a GitHub issue created
- All GitHub pull requests (PRs) must link to issues that they close
- Do not create your own repositories/forks
- All projects must use GitHub Projects for their project planning
- Do NOT merge branches locally and then push them - push the branch and create a pull request
- Do NOT commit node_modules - make sure [.gitignore](https://git-scm.com/docs/gitignore) is properly configured. Most scaffolds should handle this automatically.
- Repository authentication is either through logging in via [VSCode](https://code.visualstudio.com), [GitHub Desktop](https://desktop.github.com), or through [SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Development Stack

- Web dev repositories must use either docker or pm2 for running server processes
- Databases should be instantiated using a `docker-compose` file
- [Prisma](https://www.prisma.io) is ***highly*** recommended for use with all new projects involving a database

## Other

- Branches, PRs, and issues are reviewed as part of the mid semester and final presentations
- Server authentication for deployments is done through SSH
- SSH should be ED25519 (smaller, faster, and more secure than default)
