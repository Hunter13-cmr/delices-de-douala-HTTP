# Mobile Security Reference

## Android

### Secure Storage
- Use **Android Keystore System** for cryptographic keys — keys never leave secure hardware
- Use **EncryptedSharedPreferences** (Jetpack Security) for sensitive key-value data
- Use **Room + SQLCipher** for encrypted local databases
- Never store secrets in plain `SharedPreferences`, `files/`, or `databases/` without encryption

### Network Security
- Enforce **certificate pinning** via `network_security_config.xml` or OkHttp `CertificatePinner`
- Disable cleartext traffic in production: `android:usesCleartextTraffic="false"` in manifest
- Validate SSL certificates; never override `onReceivedSslError` to proceed

### Reverse Engineering Protection
- Enable **R8/ProGuard** in release builds for code obfuscation and shrinking
- Use **dexguard** (commercial) for stronger obfuscation if needed
- Detect root: use Play Integrity API (preferred over SafetyNet, deprecated)
- Avoid hardcoded API keys in Java/Kotlin source; use NDK with obfuscated native code if needed

### Data Leakage
- Set `android:allowBackup="false"` or use encrypted backup
- Clear sensitive fields on app backgrounding (`FLAG_SECURE` on sensitive Activities)
- Avoid logging sensitive data — strip logs in release builds

### IPC Security
- Declare explicit intents for internal components; use `exported="false"` on private components
- Validate all data received via `Intent` extras or `ContentProvider` queries
- Use `Binder` permissions for inter-process communication

### Biometrics
- Use `BiometricPrompt` API (AndroidX) — supports fingerprint, face, device credential
- Store crypto keys in Keystore, unlock via `BiometricPrompt.CryptoObject`

---

## iOS

### Secure Storage
- Use **Keychain Services** for tokens, passwords, certificates, and cryptographic keys
- Set correct `kSecAttrAccessible` value: prefer `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`
- Use **CryptoKit** for encryption; keys stored in Secure Enclave when possible
- Never store sensitive data in `UserDefaults`, `NSCache`, or plain files

### Network Security
- Enforce **App Transport Security (ATS)** — no exceptions in production
- Implement certificate pinning via `URLSession` delegate (`urlSession(_:didReceive:completionHandler:)`)
- Use `NSURLCredential` and validate server certificates explicitly

### Reverse Engineering Protection
- Enable **bitcode** (where supported) — Apple re-optimizes/obfuscates binary
- Use **Swift** over Objective-C where possible — harder to reverse engineer
- Detect jailbreak: check for Cydia, `/private/var/lib/apt`, `fork()` success, etc. (defense in depth only — not foolproof)
- Avoid hardcoded secrets; use remote config or server-side key delivery

### Data Leakage
- Implement `applicationWillResignActive` to blur/hide sensitive UI before screenshot
- Set `allowsBackup = false` in Info.plist if needed
- Opt out of iCloud backup for sensitive files via `URLResourceValues.isExcludedFromBackupKey`

### Biometrics
- Use **LocalAuthentication** framework (`LAContext.evaluatePolicy`)
- Combine with Keychain: store key protected by biometric authentication (`kSecAccessControlBiometryAny`)

---

## Flutter

### Secure Storage
- Use `flutter_secure_storage` — backed by Keychain (iOS) and Keystore (Android)
- Never use `SharedPreferences` for tokens, passwords, or PII

### Network
- Implement certificate pinning with `HttpClient`:
  ```dart
  httpClient.badCertificateCallback = (cert, host, port) => false; // deny bad certs
  ```
- Use `dio` with a custom interceptor + pinned certificate bytes

### Obfuscation
- Build with `--obfuscate --split-debug-info=<dir>` for release builds
- Store debug symbols securely for crash symbolication

### Platform Channels
- Validate all data received from native platform channels
- Don't expose sensitive native APIs unnecessarily through channels

---

## React Native

### Secure Storage
- Use `react-native-keychain` or `react-native-encrypted-storage`
- Never use `AsyncStorage` for sensitive data — it is unencrypted plain text

### Network
- Certificate pinning via `react-native-ssl-pinning` or custom native modules
- Avoid `fetch` without proper TLS validation in debug bridges

### JavaScript Bundle
- Enable Hermes engine (bytecode — harder to read than JS source)
- Use ProGuard/R8 on Android; Swift/bitcode protections on iOS still apply
- Never include secrets in the JS bundle — use a backend proxy or secure config

---

## Cross-Platform General Rules

1. **No hardcoded secrets** — no API keys, tokens, or passwords in source code or assets
2. **All network traffic over HTTPS** — enforce TLS 1.2+ minimum
3. **Dependency auditing** — regularly audit `pubspec.lock`, `package-lock.json`, `build.gradle` for known CVEs
4. **Sensitive UI protection** — hide sensitive content when app goes to background
5. **Input validation** — validate all data from external sources (network, deep links, IPC)
6. **Crash reporting** — ensure crash logs don't capture sensitive screen content or data
