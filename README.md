# PsychoNet

Tool for monitoring the social media behavior of a psychologist's patients.

## Project

HTML base repository for any projects. Using the following technologies: HTML 5, JavaScript, jQuery, CSS3, SASS, Lando (Docker), NPM or Yarn and Gulp v.4.

### Installing dependencies

- You have to install [Lando](https://lando.dev/)

If Lando's tools does not work for you, there is another way. You must install the environment manually: XAMP, Node.JS, NPM or Yarn and Gulp CLI.

For more information visit:

- [XAMP](https://www.apachefriends.org/es/index.html)
- [Node and NPM](https://nodejs.org/es/)
- [Yarn](https://yarnpkg.com/es-ES/)
- [Gulp](https://gulpjs.com/)

**Notes:**
- If you work with Windows < 10. To execute the commands, I recommend installing [Cygwin](http://www.cygwin.com/).
- If you work with Windows 10. To execute the commands, I recommend installing [WSL 2 with Ubuntu](https://docs.microsoft.com/es-es/windows/wsl/install-win10).
- If you work with Windows 10. You need install the following package [win-node-env](https://www.npmjs.com/package/win-node-env).
- I recommend installing the following IDE for PHP Programming: [PHPStorm](https://www.jetbrains.com/phpstorm/) (recommended) or [Visual Studio Code](https://code.visualstudio.com/).

### Installing

1. Run `git clone git@github.com:El-caballo-de-Turing/html-psychonet.git html_psychonet`
2. Open the `public/.well-known/security.txt` and edit the canonical.
3. Open the `public/humans.txt` and edit the last update.
4. Open your terminal and browse to the root location of your project.
5. Run `$lando start`.
	- The project has a `.lando.yml` file with all the environment settings.
	- The command starts the installation process when it finishes, you can see all the URLs to access.
6. If required. Run: `$npm install --save-dev` or `$yarn install --dev`.
7. If required. Run: `$npm run prepare`.
8. If required. Run: `$npm run gulp:prod`.
9. End. Happy developing.

### Clarifications

1. It is very important that if you deploy the project to publish. The **DocumentRoot** on the VirtualHost has to point to the **public/** directory.

### Others clarifications

1. It is possible that on macOS the Gulp tasks do not run the correct form. In this case install NodeJS, NPM and Gulp-cli in your OS and execute the tasks outside the Docker containers.

## Finally

More information on the following commits. If required.

Greetings **[The Turing horse](https://github.com/orgs/El-caballo-de-Turing/repositories)**.
