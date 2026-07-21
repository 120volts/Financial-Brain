import Capacitor
import MessageUI
import UIKit

@objc(NativeMailPlugin)
final class NativeMailPlugin: CAPPlugin, CAPBridgedPlugin, MFMailComposeViewControllerDelegate {
    let identifier = "NativeMailPlugin"
    let jsName = "NativeMail"
    let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "compose", returnType: CAPPluginReturnPromise)
    ]

    private var activeCall: CAPPluginCall?

    @objc func compose(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard MFMailComposeViewController.canSendMail() else {
                call.unavailable("Mail is not configured on this iPhone.")
                return
            }
            guard self.activeCall == nil else {
                call.unavailable("Another email is already being composed.")
                return
            }

            let composer = MFMailComposeViewController()
            composer.mailComposeDelegate = self
            composer.setToRecipients(call.getArray("to", []).compactMap { $0 as? String })
            composer.setCcRecipients(call.getArray("cc", []).compactMap { $0 as? String })
            composer.setBccRecipients(call.getArray("bcc", []).compactMap { $0 as? String })
            composer.setSubject(call.getString("subject", "Invoice"))
            composer.setMessageBody(call.getString("body", ""), isHTML: call.getBool("isHTML", true))

            for case let attachment as [String: Any] in call.getArray("attachments", []) {
                guard
                    let encoded = attachment["base64"] as? String,
                    let data = Data(base64Encoded: encoded),
                    let fileName = attachment["fileName"] as? String,
                    let mimeType = attachment["mimeType"] as? String
                else { continue }
                composer.addAttachmentData(data, mimeType: mimeType, fileName: fileName)
            }

            guard
                let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                let presenter = scene.windows.first(where: { $0.isKeyWindow })?.rootViewController
            else {
                call.unavailable("Unable to open the Mail composer.")
                return
            }
            self.activeCall = call
            presenter.present(composer, animated: true)
        }
    }

    func mailComposeController(
        _ controller: MFMailComposeViewController,
        didFinishWith result: MFMailComposeResult,
        error: Error?
    ) {
        let call = activeCall
        activeCall = nil
        controller.dismiss(animated: true) {
            if let error {
                call?.unavailable(error.localizedDescription)
                return
            }
            let resultName: String
            switch result {
            case .sent: resultName = "sent"
            case .saved: resultName = "saved"
            case .cancelled: resultName = "cancelled"
            case .failed: resultName = "failed"
            @unknown default: resultName = "unknown"
            }
            call?.resolve(["result": resultName])
        }
    }
}
