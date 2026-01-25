# jupyterlab_proxy_launcher_command_extension

[![GitHub Actions](https://github.com/stellarshenson/jupyterlab_proxy_launcher_command_extension/actions/workflows/build.yml/badge.svg)](https://github.com/stellarshenson/jupyterlab_proxy_launcher_command_extension/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/jupyterlab_proxy_launcher_command_extension.svg)](https://www.npmjs.com/package/jupyterlab_proxy_launcher_command_extension)
[![PyPI version](https://img.shields.io/pypi/v/jupyterlab-proxy-launcher-command-extension.svg)](https://pypi.org/project/jupyterlab-proxy-launcher-command-extension/)
[![Total PyPI downloads](https://static.pepy.tech/badge/jupyterlab-proxy-launcher-command-extension)](https://pepy.tech/project/jupyterlab-proxy-launcher-command-extension)
[![JupyterLab 4](https://img.shields.io/badge/JupyterLab-4-orange.svg)](https://jupyterlab.readthedocs.io/en/stable/)
[![Brought To You By KOLOMOLO](https://img.shields.io/badge/Brought%20To%20You%20By-KOLOMOLO-00ffff?style=flat)](https://kolomolo.com)

Launch jupyter-server-proxy connections to any port with a simple command. A modal dialog prompts for the target port, then opens the proxied service either as a new JupyterLab tab or in a separate browser window.

## Features

- **Port selection modal** - Simple dialog to specify the target port for proxy connection
- **Open in JupyterLab tab** - Launch proxied service embedded within JupyterLab
- **Open in browser tab** - Launch proxied service in a new browser window
- **Command palette integration** - Access proxy launcher via JupyterLab command palette

## Requirements

- JupyterLab >= 4.0.0
- jupyter-server-proxy

## Install

```bash
pip install jupyterlab_proxy_launcher_command_extension
```

## Uninstall

```bash
pip uninstall jupyterlab_proxy_launcher_command_extension
```
