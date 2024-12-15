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
  - The exception here is your own local dev work. What you push up is for review by others before merging in.
- Do NOT commit node_modules - make sure [.gitignore](https://git-scm.com/docs/gitignore) is properly configured. Most scaffolds should handle this automatically.
- Repository authentication is either through logging in via [VSCode](https://code.visualstudio.com), [GitHub Desktop](https://desktop.github.com), or through [SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Development Stack

- Databases should be instantiated using a `docker-compose` file (unless the project is using SQLite)
- [Prisma](https://www.prisma.io) is required for use with all new projects involving a database

## Other

- Branches, PRs, and issues are reviewed as part of the mid semester and final presentations
- Server authentication for deployments is done through SSH
- SSH should be ED25519 (smaller, faster, and more secure than default)
- Avoid the use of large UI frameworks. Use something lightweight and functionality oriented like Headless UI or just build the component yourself.
- Students use LLMs at their own risk. They are ultimately responsible for the code they submit. If they can't verify the correctness of the code, they should be writing it themselves. Submitting output from an LLM that is incorrect is worse than incorrect code they wrote themselves. It is strongly recommended that students NOT attempt to use tools that they don't understand to generate code that they don't understand.
- Students MUST NOT create their own repositories.
- Students are responsible for learning how to use the tools. No one should be asking how to make a commit or push a branch at the end of the semester.
- Branches should be specific to an issue. Students should not be copy/pasting code between each others branches because it can complicate PRs and cause conflicts if not done correctly. Students should properly track which tasks are dependencies of other tasks, plan their timelines and work appropriately, and merge work into their dev as needed.
- Students should NOT be pushing up multiple versions of a branch with suffixes such as '-v2'. If a student has new work for a branch, they should just update that branch. If they have work for a different feature that depends on that branch, they should create a new branch off of the old branch with a new name and issue reference, and reference the old branch in the PR.
