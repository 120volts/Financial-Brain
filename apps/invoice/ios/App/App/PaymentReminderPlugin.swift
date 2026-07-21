import Capacitor
import UserNotifications

@objc(PaymentReminderPlugin)
final class PaymentReminderPlugin: CAPPlugin, CAPBridgedPlugin {
    let identifier = "PaymentReminderPlugin"
    let jsName = "PaymentReminder"
    let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "schedule", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "cancel", returnType: CAPPluginReturnPromise)
    ]

    private let center = UNUserNotificationCenter.current()
    @objc func schedule(_ call: CAPPluginCall) {
        let reminderID = call.getString("id", "")
        guard !reminderID.isEmpty else {
            call.unavailable("A reminder id is required.")
            return
        }

        center.requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
            if let error {
                call.unavailable(error.localizedDescription)
                return
            }
            guard granted else {
                call.resolve(["scheduled": false, "permission": "denied"])
                return
            }

            let notificationID = self.notificationID(reminderID)
            let intervalDays = min(365, max(1, call.getInt("intervalDays", 7)))
            let interval = TimeInterval(intervalDays * 24 * 60 * 60)
            self.center.getPendingNotificationRequests { pending in
                let existing = pending.first { $0.identifier == notificationID }
                let existingInterval = (existing?.trigger as? UNTimeIntervalNotificationTrigger)?.timeInterval
                let intervalMatches = existingInterval.map { abs($0 - interval) < 1 } ?? false
                if existing != nil && intervalMatches && !call.getBool("replace", false) {
                    call.resolve(["scheduled": true, "permission": "granted", "existing": true])
                    return
                }

                let content = UNMutableNotificationContent()
                content.title = call.getString("title", "Unpaid invoice reminder")
                content.body = call.getString("body", "An invoice still has a balance due.")
                content.sound = .default
                content.userInfo = ["invoiceId": call.getString("invoiceId", reminderID)]

                let trigger = UNTimeIntervalNotificationTrigger(
                    timeInterval: interval,
                    repeats: true
                )
                let request = UNNotificationRequest(
                    identifier: notificationID,
                    content: content,
                    trigger: trigger
                )

                self.center.removePendingNotificationRequests(withIdentifiers: [notificationID])
                self.center.add(request) { error in
                    if let error {
                        call.unavailable(error.localizedDescription)
                    } else {
                        call.resolve(["scheduled": true, "permission": "granted", "existing": false])
                    }
                }
            }
        }
    }

    @objc func cancel(_ call: CAPPluginCall) {
        let reminderID = call.getString("id", "")
        guard !reminderID.isEmpty else {
            call.unavailable("A reminder id is required.")
            return
        }
        let notificationID = notificationID(reminderID)
        center.removePendingNotificationRequests(withIdentifiers: [notificationID])
        center.removeDeliveredNotifications(withIdentifiers: [notificationID])
        call.resolve(["cancelled": true])
    }

    private func notificationID(_ reminderID: String) -> String {
        "invoice-payment-\(reminderID)"
    }
}
