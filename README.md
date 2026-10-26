# Dodo Platform - Owner CMS Dashboard

Standalone, production-grade Next.js Owner CMS Dashboard for educational fee management platforms (Jodo Flex & FMS models).

## 🚀 Features

- **Platform Overview**: Real-time KPI metrics (MRR, total institutions, active eNACH mandates, gross collections, growth trend).
- **Institution Management**: School & college onboarding, product activation (FMS, Flex eNACH, AutoPay, Virtual Accounts), commercial term adjustments, and bank verification.
- **Institution-wise Commercials**: Bespoke institution pricing agreements with 7 configurable commercial models (fixed fee, per-student, per-eNACH mandate, per-AutoPay mandate, per-debit, % collections, hybrid), provider cost tracking, and live contribution margin projections.
- **Segregated Payment Rails**: Dedicated operational reporting and separate KPIs for NPCI eNACH, UPI 2.0 AutoPay recurring mandates, and Instant One-Time UPI.
- **Sandbox-First AutoPay Architecture**: Complete in-memory simulation engine for NPCI eNACH and UPI AutoPay lifecycle without real money movement or live bank APIs.
- **Server-Side Authentication & Session Security**: Salted PBKDF2 (SHA-256) password verification, timing-safe comparisons, 256-bit cryptographically secure session tokens, and strict CSRF protection on mutating requests.
- **Payment Gateway Onboarding Checklist**: Structured 6-step verification gate and hard live execution lock protecting against premature live execution.
- **Revenue & Commercial Billing**: Gross platform revenue ledger, advance adjustments, invoice status tracking, and payment gateway interchange rates.
- **Permissions & Security**: Role-based access control, operator provisioning with one-time TOTP MFA secret generation, edit/revoke operator actions, and cryptographic audit ledger.
- **Modern UI/UX**: Mint & pharmacy-inspired design system with pastel stat cards, animated collapsible sidebars, and dead-center viewport modals via React Portal.

## 🔒 Security & Access Control

- **Server-Side Sessions**: 256-bit high-entropy random tokens with 8-hour expiry.
- **CSRF Defense**: Double-submit cookie & header token verification on mutating HTTP endpoints (`POST`, `PUT`, `PATCH`, `DELETE`).
- **Access Control Guard**: Strict `guardOwnerRoute` route middleware validating session tokens and verifying the `owner` role.
- **Isolated Sandbox**: All simulated transactions and mandates bear explicit `is_sandbox: true` and `SIMULATED (NO REAL MONEY MOVEMENT)` indicators.

## 🛠️ Provider-Independent AutoPay Interface

The server-side payment provider interface (`IAutoPayProvider`) supports 7 core lifecycle operations:
1. `initiateMandateRegistration(req)`: Customer NetBanking or UPI 2.0 mandate registration.
2. `getMandateStatus(mandateId)`: Mandate state querying.
3. `cancelMandate(mandateId, reason)`: Mandate cancellation.
4. `initiateRecurringDebit(req)`: Scheduled recurring collection with idempotency checks.
5. `getPaymentStatus(debitId)`: Transaction settlement inquiry.
6. `verifyAndProcessWebhook(payload, signature, headers)`: HMAC-SHA256 webhook validation.
7. `reconcileBatch(batchId, date)`: Daily settlement ledger reconciliation.

## 🚦 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

- **Standalone CMS Repository**: The dashboard is the home page at [http://localhost:3000](http://localhost:3000) (and [http://localhost:3000/owner](http://localhost:3000/owner)).
- **Monorepo / Full Platform**: When running the full multi-portal project, access the CMS console at [http://localhost:3000/owner](http://localhost:3000/owner).

## 🔑 Default Credentials

- **Root Owner**: `saumya@gmail.com`
- **Password**: `PlatformMaster2026!` (or `PlatformSecret2026!`)
- **MFA Code**: `123456`
