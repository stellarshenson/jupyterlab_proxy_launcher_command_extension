import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_proxy_launcher_command_extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_proxy_launcher_command_extension:plugin',
  description: 'Jupyterlab commands to launch jupyterlab proxy to a given port (modal window) and lauch it either as new jupyterlab tab or new browser tab',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_proxy_launcher_command_extension is activated!');
  }
};

export default plugin;
