# Security Rules by Language

## C / C++
- Buffer overflows: always validate buffer sizes, prefer `strncpy` / `snprintf` over unsafe equivalents
- Use-after-free: use smart pointers (`unique_ptr`, `shared_ptr`) instead of raw pointers
- Integer overflow: validate arithmetic before operations, use safe integer libraries
- Format string attacks: never pass user input directly to `printf` family
- Memory leaks: every `malloc`/`new` needs a matching `free`/`delete`; prefer RAII

## PHP
- Never use `eval()` with user input — remote code execution risk
- Avoid `system()`, `exec()`, `passthru()` with user-controlled data — command injection
- SQL: always use PDO/MySQLi with prepared statements
- File inclusion: validate paths strictly, never use user input in `include`/`require`
- Session: use `session_regenerate_id(true)` after login, set `HttpOnly` + `Secure` cookie flags

## JavaScript / TypeScript
- `innerHTML` / `document.write` with user data → XSS; use `textContent` or sanitize with DOMPurify
- `eval()`, `new Function()`, `setTimeout(string)` → never with user input
- Prototype pollution: validate object shapes, use `Object.create(null)` for maps
- Dependency risk: run `npm audit` regularly; pin versions in `package-lock.json`
- Secrets: never put API keys in frontend code; use environment variables server-side
- Node.js: validate/sanitize all inputs with Joi or Zod; use helmet.js for HTTP headers

## Python
- SQL injection: always use parameterized queries (`cursor.execute(sql, params)`)
- `pickle` / `yaml.load()` with untrusted data → arbitrary code execution; use `yaml.safe_load()`
- `subprocess` / `os.system` with user input → command injection; use `subprocess.run` with list args
- Path traversal: use `pathlib.Path.resolve()` and validate against a base path
- Secrets: use `python-dotenv` or environment variables, never hardcode

## Java
- SQL injection: use `PreparedStatement`, never string concatenation in queries
- Deserialization: avoid `ObjectInputStream` with untrusted data; use JSON with strict schemas
- XXE: disable external entity processing in XML parsers (`FEATURE_SECURE_PROCESSING`)
- Logging: never log passwords, tokens, or PII; use structured logging
- Cryptography: use `AES/GCM`, avoid `ECB` mode; use `BCrypt` for passwords, not `MD5`/`SHA-1`

## Kotlin
- Same as Java for backend concerns
- Android-specific: see `mobile-security.md`
- Avoid `!!` (non-null assertion) on user-provided or network data — use `?.let` or safe casts
- Coroutines: always use structured concurrency; cancel scopes properly to avoid leaks

## Swift
- Avoid `NSKeyedUnarchiver.unarchiveObject` with untrusted data → arbitrary code execution
- Use `CryptoKit` for cryptographic operations, not deprecated `CommonCrypto` directly
- Keychain for all sensitive storage; never `UserDefaults` for secrets
- Network: enforce `NSAppTransportSecurity` restrictions; never set `NSAllowsArbitraryLoads: true` in production
- iOS-specific: see `mobile-security.md`

## Dart / Flutter
- HTTP: use `https` only; implement certificate pinning with `HttpClient.badCertificateCallback`
- Secrets: use `flutter_secure_storage` for sensitive data, never `SharedPreferences`
- Serialization: validate JSON schemas strictly; avoid dynamic casting without null checks
- Dependencies: run `flutter pub audit` and review `pubspec.lock`

## C# / .NET / MAUI
- SQL: use Entity Framework parameterized queries or `SqlCommand` with parameters
- Deserialization: avoid `BinaryFormatter` (deprecated/removed in .NET 7+); use `System.Text.Json` with strict options
- Secrets: use `IConfiguration` + environment variables or Azure Key Vault; never `app.config` in source control
- MAUI: use `SecureStorage` for sensitive data, not `Preferences`
- LINQ: safe from injection by design, but validate inputs before use

## Go
- SQL: use `database/sql` with placeholders (`?` / `$1`), never `fmt.Sprintf` in queries
- Command injection: use `exec.Command(name, args...)` with separate args, never shell interpolation
- Goroutine leaks: always provide cancellation via `context.Context`
- Secrets: use environment variables or a secrets manager (Vault, AWS Secrets Manager)
- TLS: always use `tls.Config` with `MinVersion: tls.VersionTLS12`

## Rust
- Memory safety is enforced by the compiler — focus on:
- `unsafe` blocks: audit every `unsafe`; minimize scope and document invariants
- Integer overflow: use checked arithmetic (`checked_add`, `saturating_add`) in critical paths
- Dependency auditing: run `cargo audit` regularly
- Secrets: use `secrecy` crate to zero memory on drop; never log secret values
