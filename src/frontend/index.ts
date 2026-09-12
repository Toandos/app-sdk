export class AppFrontend {
    private constructor(private bridge: globalThis.Window["flutter_inappwebview"]) { }

    static init() {
        const bridge = window?.flutter_inappwebview;
        if(!bridge) {
            window.location.replace(`https://www.toando.de?open=${window.location.href}`)
        }
        return new AppFrontend(bridge);
    }
}