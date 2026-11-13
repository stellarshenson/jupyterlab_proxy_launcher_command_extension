# Acceptance Criteria - jupyterlab_proxy_launcher_command_extension

Command and dialog that open a jupyter-server-proxy port in a JupyterLab tab or a browser window.

## Authors

- `@kj` Konrad Jelen

## Proxy launcher `LAUNCH`

The proxy-launcher:open command, its dialog and the two targets

- log: 2026-11-13T09:19:32Z @kj category created

- [x] `ACC-LAUNCH-1-DIALOG` **Modal dialog** - HIGH; command opens a dialog titled Proxy Launcher with a port input, a path suffix input and an Open in new browser tab checkbox; a port outside 1-65535 shows Invalid Port and opens nothing
  - evidence: Galata 'should open proxy launcher dialog' and 'should validate port input' pass, ui-tests/tests/jupyterlab_proxy_launcher_command_extension.spec.ts
  - test: Galata: run the command, assert the three inputs; click Open with no port, assert Invalid Port
  - test-tags: E2E
  - log: 2026-11-13T09:19:32Z @kj added
  - log: 2026-11-13T09:26:47Z @kj closed: verified by Galata, 7 passed
- [x] `ACC-LAUNCH-2-LAB-TAB` **JupyterLab tab** - HIGH; checkbox off: a main-area tab holds an iframe whose src ends proxy/PORT/PATH under the base URL; tab label Proxy :PORT/PATH
  - evidence: Galata 'should take a port typed right after the shortcut and open a JupyterLab tab' passes: iframe src ends /proxy/8501/, label Proxy :8501
  - test: Galata: type 8501, Enter, assert iframe src ends /proxy/8501/ and tab label Proxy :8501
  - test-tags: E2E
  - log: 2026-11-13T09:19:33Z @kj added
  - log: 2026-11-13T09:26:48Z @kj closed: verified by Galata, 7 passed
- [x] `ACC-LAUNCH-3-BROWSER-TAB` **Browser tab** - HIGH; checkbox on: the same proxy address opens in a new browser window and no JupyterLab tab is added
  - evidence: Galata 'should open the proxied service in a new browser tab' passes: window.open got an address ending /proxy/8501/ and _blank, no iframe tab
  - test: Galata: record window.open, run with default_newBrowserTab true, click Open, assert the address ends /proxy/8501/, target _blank and no iframe tab
  - test-tags: E2E
  - log: 2026-11-13T09:19:33Z @kj added
  - log: 2026-11-13T09:25:30Z @kj edited test "Galata: run with default_newBrowserTab true, click Open, assert popup address ends /proxy/8501/ and no iframe tab" -> "Galata: record window.open, run with default_newBrowserTab true, click Open, assert the address ends /proxy/8501/, target _blank and no iframe tab"
  - log: 2026-11-13T09:26:48Z @kj closed: verified by Galata, 7 passed
- [x] `ACC-LAUNCH-4-PALETTE` **Command palette entry** - MEDIUM; Open Proxy Launcher is listed in the command palette, category Proxy
  - evidence: Galata 'should show command in command palette' passes
  - test: Galata: open the palette, search Open Proxy Launcher, assert the item is visible
  - test-tags: E2E
  - log: 2026-11-13T09:19:33Z @kj added
  - log: 2026-11-13T09:26:48Z @kj closed: verified by Galata, 7 passed
- [x] `ACC-LAUNCH-5-SHORTCUT` **Keyboard shortcut** - MEDIUM; Accel Shift P opens the dialog with the port input focused, so a typed port and Enter open the service
  - evidence: Galata 'should take a port typed right after the shortcut and open a JupyterLab tab' passes: port input focused after Control+Shift+P
  - test: Galata: press Control+Shift+P, assert port input focused, type 8501, Enter, assert the tab
  - test-tags: E2E
  - log: 2026-11-13T09:19:33Z @kj added
  - log: 2026-11-13T09:26:48Z @kj closed: verified by Galata, 7 passed
- [x] `ACC-LAUNCH-6-ARGS` **Command arguments** - MEDIUM; default_port, default_path and default_newBrowserTab pre-fill the dialog; title sets the JupyterLab tab label
  - evidence: Galata 'should pre-fill the dialog from command arguments' passes: inputs 8501 and api/docs, iframe src ends /proxy/8501/api/docs, label Streamlit App
  - test: Galata: execute with default_port 8501, default_path api/docs, title Streamlit App; assert input values, iframe src and tab label
  - test-tags: E2E
  - log: 2026-11-13T09:19:33Z @kj added
  - log: 2026-11-13T09:26:48Z @kj closed: verified by Galata, 7 passed

