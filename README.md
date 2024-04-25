![Logo](admin/my-alarmviewer.png)
# ioBroker.my-alarmviewer

[![NPM version](https://img.shields.io/npm/v/iobroker.my-alarmviewer.svg)](https://www.npmjs.com/package/iobroker.my-alarmviewer)
[![Downloads](https://img.shields.io/npm/dm/iobroker.my-alarmviewer.svg)](https://www.npmjs.com/package/iobroker.my-alarmviewer)
![Number of Installations](https://iobroker.live/badges/my-alarmviewer-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/my-alarmviewer-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.my-alarmviewer.png?downloads=true)](https://nodei.co/npm/iobroker.my-alarmviewer/)

**Tests:** ![Test and Release](https://github.com/gokturk413/ioBroker.my-alarmviewer/workflows/Test%20and%20Release/badge.svg)

## my-alarmviewer adapter for ioBroker

My-Alarm adapter Viewer widget For Vis

## Developer manual
This section is intended for the developer. It can be deleted later.

### DISCLAIMER

Please make sure that you consider copyrights and trademarks when you use names or logos of a company and add a disclaimer to your README.
You can check other adapters for examples or ask in the developer community. Using a name or logo of a company without permission may cause legal problems for you.

### Getting started

You are almost done, only a few steps left:
1. Create a new repository on GitHub with the name `ioBroker.my-alarmviewer`
1. Initialize the current folder as a new git repository:  
    ```bash
    git init -b master
    git add .
    git commit -m "Initial commit"
    ```
1. Link your local repository with the one on GitHub:  
    ```bash
    git remote add origin https://github.com/gokturk413/ioBroker.my-alarmviewer
    ```

1. Push all files to the GitHub repo:  
    ```bash
    git push origin master
    ```
1. Add a new secret under https://github.com/gokturk413/ioBroker.my-alarmviewer/settings/secrets. It must be named `AUTO_MERGE_TOKEN` and contain a personal access token with push access to the repository, e.g. yours. You can create a new token under https://github.com/settings/tokens.

1. Head over to [widgets/my-alarmviewer.html](widgets/my-alarmviewer.html) and start programming!

### Best Practices
We've collected some [best practices](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) regarding ioBroker development and coding in general. If you're new to ioBroker or Node.js, you should
check them out. If you're already experienced, you should also take a look at them - you might learn something new :)

### Scripts in `package.json`
Several npm scripts are predefined for your convenience. You can run them using `npm run <scriptname>`
| Script name | Description |
|-------------|-------------|
| `test:package` | Ensures your `package.json` and `io-package.json` are valid. |
| `test` | Performs a minimal test run on package files. |
| `translate` | Translates texts in your adapter to all required languages, see [`@iobroker/adapter-dev`](https://github.com/ioBroker/adapter-dev#manage-translations) for more details. |
| `release` | Creates a new release, see [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage) for more details. |

### Publishing the widget
Using GitHub Actions, you can enable automatic releases on npm whenever you push a new git tag that matches the form 
`v<major>.<minor>.<patch>`. We **strongly recommend** that you do. The necessary steps are described in `.github/workflows/test-and-release.yml`.

Since you installed the release script, you can create a new
release simply by calling:
```bash
npm run release
```
Additional command line options for the release script are explained in the
[release-script documentation](https://github.com/AlCalzone/release-script#command-line).

To get your widget released in ioBroker, please refer to the documentation 
of [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Test the adapter manually on a local ioBroker installation
In order to install the adapter locally without publishing, the following steps are recommended:
1. Create a tarball from your dev directory:  
    ```bash
    npm pack
    ```
1. Upload the resulting file to your ioBroker host
1. Install it locally (The paths are different on Windows):
    ```bash
    cd /opt/iobroker
    npm i /path/to/tarball.tgz
    ```

For later updates, the above procedure is not necessary. Just do the following:
1. Overwrite the changed files in the adapter directory (`/opt/iobroker/node_modules/iobroker.my-alarmviewer`)
1. Execute `iobroker upload my-alarmviewer` on the ioBroker host

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (Kamran Mustafayev) initial release

## License
MIT License

Copyright (c) 2023 Kamran Mustafayev <gokturk413@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.