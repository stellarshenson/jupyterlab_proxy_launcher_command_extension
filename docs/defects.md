# Defects - jupyterlab_proxy_launcher_command_extension

Bugs and regressions in the proxy launcher command extension.

## Authors

- `@kj` Konrad Jelen

## Proxy launcher `LAUNCH`

The proxy-launcher:open command, its dialog and the two targets

- log: 2026-11-13T09:19:33Z @kj category created

- [x] `DEF-LAUNCH-1-FOCUS` **Port input not focused** - MEDIUM; dialog opens with the Open button focused, not the port input; a port typed right after the shortcut goes nowhere and Enter shows Invalid Port; `src/index.ts`
  - evidence: Galata asserts the port input is focused after Control+Shift+P, then types 8501 and Enter and gets the tab; 7 Galata passed
  - repro: press Ctrl+Shift+P, type 8501, press Enter
  - test-tags: E2E
  - root-cause: 2026-11-13T09:19:33Z @kj Lumino sends after-attach to the body first; Dialog.onAfterAttach then focuses its default button, undoing the focus the body's onAfterAttach set
  - log: 2026-11-13T09:19:33Z @kj added
  - log: 2026-11-13T09:26:48Z @kj closed: fixed: showDialog gets focusNodeSelector for the port input; the body's onAfterAttach removed
- [x] `DEF-LAUNCH-2-DRAG` **Drag stops over the proxy iframe** - MEDIUM; dragging a splitter or a tab across an open proxy tab stops when the pointer enters the iframe; the iframe takes the pointer events; `src/index.ts`
  - evidence: Galata locates the iframe under .jp-ProxyLauncher-iframe.jp-IFrame; the JupyterLab rule body.lm-mod-override-cursor .jp-IFrame covers it during a drag; drag not exercised by a test
  - repro: open port in a JupyterLab tab, drag the left sidebar splitter to the right across the iframe
  - test-tags: E2E
  - root-cause: 2026-11-13T09:19:33Z @kj JupyterLab covers iframes during a drag only under the class jp-IFrame; the widget carries jp-ProxyLauncher-iframe alone
  - log: 2026-11-13T09:19:33Z @kj added
  - log: 2026-11-13T09:26:48Z @kj closed: fixed: ProxyIFrameWidget carries the class jp-IFrame
- [x] `DEF-LAUNCH-3-DEAD-VALID` **Unused isValid method** - MINOR; ProxyLauncherDialogBody.isValid has no caller and repeats the port range check in the command; `src/index.ts`
  - evidence: grep isValid src/ prints nothing; tsc build and 7 Galata passed
  - test-tags: MANUAL
  - repro: grep isValid src/
  - root-cause: 2026-11-13T09:19:33Z @kj validation was moved into the command's execute and the method was left behind
  - log: 2026-11-13T09:19:33Z @kj added
  - log: 2026-11-13T09:19:41Z @kj edited test-tags added "MANUAL"
  - log: 2026-11-13T09:26:48Z @kj closed: fixed: isValid deleted
- [-] `DEF-LAUNCH-4-SANDBOX` **Proxy iframe has no sandbox** - MINOR; the JupyterLab tab iframe is same-origin with no sandbox attribute, so the proxied page can script the JupyterLab page; `src/index.ts`
  - test-tags: MANUAL
  - repro: open a port in a JupyterLab tab, inspect the iframe attributes
  - log: 2026-11-13T09:19:33Z @kj added
  - log: 2026-11-13T09:19:41Z @kj edited test-tags added "MANUAL"
  - log: 2026-11-13T09:19:41Z @kj rejected: not fixed: the proxied page is the user's own service on the same origin, as jupyter-server-proxy serves it; a sandbox without allow-same-origin breaks its cookies and storage, and with allow-same-origin plus allow-scripts it restricts nothing

