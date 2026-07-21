import Capacitor

final class MainViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        // Capacitor 8 hides the Swift `bridge` accessor from Xcode 16's
        // generated interface, but the Objective-C runtime accessor remains.
        (value(forKey: "bridge") as? CAPBridgeProtocol)?.registerPluginInstance(NativeMailPlugin())
    }
}
