# Dodo Platform - Owner CMS Dashboard

Standalone, production-grade Next.js Owner CMS Dashboard for educational fee management platforms (Jodo Flex & FMS models).

## ✨ Features

- **Platform Overview**: Real-time KPI metrics (MRR, total institutions, active eNACH mandates, gross collections, growth trend).
- **Institution Management**: School & college onboarding, product activation (FMS, Flex eNACH, AutoPay, Virtual Accounts), commercial term adjustments, and bank verification.
- **SaaS Subscriptions**: Tiered subscription plans (Starter, Growth, Enterprise) with feature matrices and billing intervals.
- **Revenue & Commercial Billing**: Gross platform revenue ledger, advance adjustments, invoice status tracking, and payment gateway interchange rates.
- **Domestic Payment Rails**: RBI-compliant payment gateway rails (Razorpay, NPCI eNACH, Axis UPI AutoPay) with settlement cycle policies (T+1 / T+2).
- **Permissions & Security**: Role-based access control, operator provisioning with one-time TOTP MFA secret generation, edit/revoke operator actions, and cryptographic audit ledger.
- **Modern UI/UX**: Mint & pharmacy-inspired design system with pastel stat cards, animated collapsible sidebars, and dead-center viewport modals via React Portal.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

- **Standalone CMS Repository**: The dashboard is the home page at [http://localhost:3000](http://localhost:3000) (and [http://localhost:3000/owner](http://localhost:3000/owner)).
- **Monorepo / Full Platform**: When running the full multi-portal project, access the CMS console at [http://localhost:3000/owner](http://localhost:3000/owner) (root `/` is the public website).

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## 👤 Default Credentials

- **Root Owner**: `saumya@gmail.com`
- **Password**: `PlatformMaster2026!`
- **MFA Code**: `123456`
