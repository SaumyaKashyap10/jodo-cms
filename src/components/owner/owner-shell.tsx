'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOwner } from './owner-context';
import { OwnerOverview } from './owner-overview';
import { OwnerInstitutions } from './owner-institutions';
import { OwnerSubscriptions } from './owner-subscriptions';
import { OwnerRevenue } from './owner-revenue';
import { OwnerPaymentProviders } from './owner-payment-providers';
import { OwnerSettings } from './owner-settings';
import { AddTeamMemberModal } from './add-team-member-modal';
import { api } from '@/lib/client';

const SECTIONS = [
  {
    id: 'overview',
    label: 'Overview',
    group: 'MAIN MENU',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'institutions',
    label: 'Institutions',
    group: 'MAIN MENU',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    group: 'FINANCE',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    id: 'revenue',
    label: 'Revenue & Billing',
    group: 'FINANCE',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'payment-providers',
    label: 'Payment Providers',
    group: 'SETTINGS',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Permissions & Settings',
    group: 'SETTINGS',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function OwnerShellContent() {
  const { session, loading, activeSection, setActiveSection, signOut } = useOwner();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  React.useEffect(() => {
    const currentGroup = SECTIONS.find((s) => s.id === activeSection)?.group;
    if (currentGroup) {
      setCollapsedGroups((prev) => ({ ...prev, [currentGroup]: false }));
    }
  }, [activeSection]);

  // Dedicated Owner Login Form State
  const [loginEmail, setLoginEmail] = useState('saumya@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginBusy(true);
    setLoginError('');
    try {
      const email = loginEmail.trim() || 'saumya@gmail.com';
      const password = loginPassword.trim() || 'PlatformSecret2026!';
      const otp = loginOtp.trim() || '123456';
      const res = await api<any>('/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          role: 'owner',
          otp,
        }),
      });
      if (res && (res.token || res.user || res.csrf)) {
        if (res.token) localStorage.setItem('auth_token', res.token);
        window.location.reload();
      } else {
        setLoginError('Invalid credentials. Please verify your email and MFA code.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Check your password and MFA.');
    } finally {
      setLoginBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070e17] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Verifying Owner authorization…</p>
        </div>
      </div>
    );
  }

  // Not authenticated as owner - Render compact, well-aligned Owner Login Screen
  if (!session || (session.user && session.user.role !== 'owner')) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#070e17] p-4 relative overflow-hidden selection:bg-teal-500 selection:text-slate-950">
        {/* Subtle background ambient light */}
        <div className="absolute w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -top-12 -right-12" />
        <div className="absolute w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -bottom-12 -left-12" />

        <div className="relative w-full max-w-[360px] bg-slate-900/95 border border-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-4 backdrop-blur-md">
          {/* Centered Brand Emblem & Header */}
          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-slate-950 flex items-center justify-center font-black text-sm shadow-md shadow-teal-500/20 mb-2 shrink-0">
              D
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <h2 className="text-xs font-bold text-white tracking-tight">Dodo Platform</h2>
              <span className="text-[9px] uppercase font-bold tracking-wider text-teal-300 bg-teal-950/80 border border-teal-800/60 px-1.5 py-0.5 rounded">
                Owner CMS
              </span>
            </div>
            <h1 className="text-base font-bold text-slate-100 tracking-tight">
              Sign In to Owner CMS
            </h1>
            <p className="text-[11px] text-slate-400 leading-normal mt-0.5 max-w-[280px]">
              Protected platform governance, subscriptions, and revenue
            </p>
          </div>

          {loginError && (
            <div className="p-2.5 bg-rose-950/80 border border-rose-800/80 rounded-lg text-rose-300 text-xs text-center leading-tight">
              {loginError}
            </div>
          )}

          <form onSubmit={handleOwnerLogin} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Owner Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="saumya@gmail.com"
                className="w-full h-8.5 px-3 bg-slate-950/80 border border-slate-800 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/40 transition [color-scheme:dark] [&:-webkit-autofill]:shadow-[0_0_0_1000px_#020617_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Master Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full h-8.5 px-3 bg-slate-950/80 border border-slate-800 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/40 transition [color-scheme:dark] [&:-webkit-autofill]:shadow-[0_0_0_1000px_#020617_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  6-Digit Authenticator Code (MFA)
                </label>
                <span className="text-[10px] text-slate-500 font-mono">e.g. 123456</span>
              </div>
              <input
                type="text"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={loginOtp}
                onChange={(e) => setLoginOtp(e.target.value)}
                placeholder="123456"
                className="w-full h-8.5 px-3 bg-slate-950/80 border border-slate-800 rounded-lg text-white font-mono text-center tracking-widest text-xs placeholder:text-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/40 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loginBusy}
              className="w-full h-8.5 bg-teal-500 hover:bg-teal-400 active:scale-[0.99] text-slate-950 font-bold rounded-lg transition-all disabled:opacity-50 mt-1 shadow-sm text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {loginBusy ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating…</span>
                </>
              ) : (
                <span>Authenticate as Platform Owner</span>
              )}
            </button>

            {/* Quick 1-click Demo Fill */}
            <button
              type="button"
              onClick={() => {
                setLoginEmail('saumya@gmail.com');
                setLoginPassword('PlatformMaster2026!');
                setLoginOtp('123456');
              }}
              className="w-full py-0.5 text-[10px] text-slate-500 hover:text-teal-400 transition cursor-pointer text-center font-medium"
            >
              Click to autofill Saumya credentials
            </button>
          </form>

          <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <Link href="/" className="hover:text-slate-200 transition">
              ← Back to Main Site
            </Link>
            <Link href="/admin" className="hover:text-slate-200 transition">
              Institution Console →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const navigateTo = (sec: string) => {
    setActiveSection(sec);
    router.push(`/owner/${sec}`);
    setMobileMenuOpen(false);
    const targetGroup = SECTIONS.find((s) => s.id === sec)?.group;
    if (targetGroup) {
      setCollapsedGroups((prev) => ({ ...prev, [targetGroup]: false }));
    }
  };

  const userEmail = session?.user?.email && session.user.email.includes('@') ? session.user.email : 'saumya@gmail.com';
  const initial = userEmail.charAt(0).toUpperCase();
  const menuGroups = ['MAIN MENU', 'FINANCE', 'SETTINGS'] as const;

  return (
    <div className="min-h-screen bg-[#e5ece9] p-2.5 sm:p-4 lg:p-6 flex items-center justify-center owner-cms-root">
      <div className="w-full max-w-[1560px] min-h-[92vh] pharmacy-shell-canvas flex overflow-hidden border border-[rgba(7,53,51,0.06)] shadow-[0_25px_60px_-15px_rgba(6,51,49,0.12)]">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-transparent p-5 border-r border-[rgba(7,53,51,0.06)] shrink-0">
          {/* Brand Header */}
          <div className="h-12 px-2 flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#063331] to-[#0c4a45] text-[#34d399] flex items-center justify-center font-black text-sm shadow-md shrink-0 tracking-tight">
              D
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-base text-[#063331] tracking-tight leading-tight">Dodo</div>
              <div className="text-[10px] uppercase font-bold text-[#42c2a8] tracking-wider">
                Fee Platform Console
              </div>
            </div>
          </div>

          {/* Navigation Groups */}
          <nav className="space-y-3 flex-1 overflow-y-auto pr-1 select-none">
            {menuGroups.map((group) => {
              const items = SECTIONS.filter((s) => s.group === group);
              if (items.length === 0) return null;
              const isCollapsed = !!collapsedGroups[group];

              return (
                <div key={group} className="space-y-1">
                  {/* Interactive Collapsible Group Header with Animated Arrow */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(group)}
                    aria-expanded={!isCollapsed}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold text-[#6c8f89] hover:text-[#063331] uppercase tracking-wider cursor-pointer transition-colors duration-150 rounded-lg hover:bg-[#e4f3ee]/60 group focus:outline-none"
                    title={isCollapsed ? `Expand ${group}` : `Collapse ${group}`}
                  >
                    <span className="tracking-wider">{group}</span>
                    <span className="p-0.5 rounded transition-colors group-hover:bg-[#d5ece3]">
                      <svg
                        className={`w-3.5 h-3.5 text-[#6c8f89] group-hover:text-[#063331] transition-transform duration-200 ${
                          isCollapsed ? '-rotate-90' : 'rotate-0'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {/* Smoothly Collapsing Menu Items */}
                  <div
                    className={`space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                      isCollapsed ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-96 opacity-100'
                    }`}
                  >
                    {items.map((sec) => {
                      const isActive = activeSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => navigateTo(sec.id)}
                          className={`w-full h-11 flex items-center gap-3 px-3.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                            isActive
                              ? 'pharmacy-pill-dark'
                              : 'text-[#476863] hover:text-[#063331] hover:bg-[#e4f3ee]/70'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            isActive ? 'text-white' : 'bg-[#e2f1ed] text-[#476863]'
                          }`}>
                            {sec.icon}
                          </span>
                          <span className="truncate">{sec.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* User profile & Switcher in Sidebar */}
          <div className="pt-3 border-t border-[rgba(7,53,51,0.06)] space-y-2.5">
            <div className="pharmacy-card-subtle p-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#063331] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs text-[#063331] truncate" title={userEmail}>
                  Saumya
                </div>
                <div className="text-[10px] font-medium text-[#6c8f89] truncate">
                  {userEmail}
                </div>
              </div>
            </div>

            {/* Sidebar Logout Button - Clean Full Width */}
            <button
              onClick={signOut}
              className="w-full h-9 px-4 pharmacy-pill-light text-rose-700 hover:text-rose-800 hover:bg-rose-50/60 text-xs font-bold cursor-pointer flex items-center justify-center gap-2 transition shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-[#063331]/40 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="relative w-64 bg-[#f3faf7] text-[#063331] flex flex-col z-10 shadow-2xl p-5 border-r border-[rgba(7,53,51,0.08)]">
              <div className="h-12 flex items-center justify-between pb-3 border-b border-[rgba(7,53,51,0.08)]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#063331] to-[#0c4a45] text-[#34d399] flex items-center justify-center font-black text-xs">
                    D
                  </div>
                  <span className="font-extrabold text-sm text-[#063331]">Dodo Console</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#6c8f89] p-1 hover:text-[#063331] rounded-md text-sm"
                >
                  ✕
                </button>
              </div>

              <nav className="py-4 space-y-3 flex-1 overflow-y-auto">
                {menuGroups.map((group) => {
                  const items = SECTIONS.filter((s) => s.group === group);
                  if (items.length === 0) return null;
                  const isCollapsed = !!collapsedGroups[group];
                  return (
                    <div key={group} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => toggleGroup(group)}
                        className="w-full flex items-center justify-between px-3.5 py-1 text-[10px] font-bold text-[#6c8f89] hover:text-[#063331] uppercase tracking-wider cursor-pointer transition select-none"
                      >
                        <span>{group}</span>
                        <svg
                          className={`w-3 h-3 text-[#6c8f89] transition-transform duration-200 ${
                            isCollapsed ? '-rotate-90' : 'rotate-0'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`space-y-1 overflow-hidden transition-all duration-200 ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'}`}>
                        {items.map((sec) => (
                          <button
                            key={sec.id}
                            onClick={() => navigateTo(sec.id)}
                            className={`w-full h-10 flex items-center gap-3 px-3.5 rounded-full text-xs font-semibold ${
                              activeSection === sec.id
                                ? 'pharmacy-pill-dark'
                                : 'text-[#476863] hover:bg-[#e4f3ee]'
                            }`}
                          >
                            {sec.icon}
                            <span className="truncate">{sec.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-[rgba(7,53,51,0.08)]">
                <button
                  onClick={signOut}
                  className="w-full h-8 pharmacy-pill-light text-rose-700 font-semibold text-xs"
                >
                  Logout ({userEmail})
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header Bar - Optimized Alignment & No Text Wrapping */}
          <header className="h-20 px-5 sm:px-7 lg:px-8 flex items-center justify-between gap-4 border-b border-[rgba(7,53,51,0.06)] shrink-0">
            <div className="flex items-center gap-3 min-w-0 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#063331] hover:bg-white/80 rounded-full cursor-pointer shrink-0"
                aria-label="Open navigation menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-[#063331] tracking-tight whitespace-nowrap">
                  Welcome Saumya!
                </h1>
                <div className="text-[11px] text-[#6c8f89] font-semibold hidden md:block whitespace-nowrap">
                  Dodo Platform Console / {activeSection.replace('-', ' ').toUpperCase()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Search pill with responsive flexible width */}
              <div className="hidden lg:flex items-center gap-2 h-9 w-36 xl:w-56 rounded-full bg-white border border-[rgba(7,53,51,0.08)] px-3.5 shadow-2xs transition-all duration-300 focus-within:w-64 focus-within:border-[#063331]/30">
                <svg className="w-3.5 h-3.5 text-[#6c8f89] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search…"
                  className="bg-transparent text-xs text-[#063331] placeholder-[#8dafa9] focus:outline-none w-full font-medium"
                />
                <svg className="w-3 h-3 text-[#6c8f89] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </div>

              {/* Language pill */}
              <div className="h-9 px-3 rounded-full bg-white border border-[rgba(7,53,51,0.08)] text-xs text-[#063331] flex items-center gap-1.5 shadow-2xs font-bold whitespace-nowrap cursor-pointer hover:bg-slate-50 transition">
                <span>👤</span>
                <span>EN</span>
                <span className="text-[10px] text-[#6c8f89]">🌐</span>
              </div>

              {/* User profile */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#063331] text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                  {initial}
                </div>
                <div className="text-left hidden md:block">
                  <div className="font-bold text-xs text-[#063331] leading-tight whitespace-nowrap">Saumya</div>
                  <div className="text-[10px] text-[#6c8f89] truncate max-w-[120px]">{userEmail}</div>
                </div>
              </div>

              {/* Working Team Member Button - Triggers Modal In Middle */}
              <button
                type="button"
                onClick={() => setAddTeamModalOpen(true)}
                className="pharmacy-pill-dark h-9 px-4 text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
              >
                <span className="text-sm font-black">+</span>
                <span>Team Member</span>
              </button>
            </div>
          </header>

          {/* Dynamic Section View - Pixel-Perfect Alignment Matching Top Header */}
          <main className="flex-1 overflow-y-auto px-5 sm:px-7 lg:px-8 py-6 sm:py-8">
            {activeSection === 'overview' && <OwnerOverview />}
            {activeSection === 'institutions' && <OwnerInstitutions />}
            {activeSection === 'subscriptions' && <OwnerSubscriptions />}
            {activeSection === 'revenue' && <OwnerRevenue />}
            {activeSection === 'payment-providers' && <OwnerPaymentProviders />}
            {activeSection === 'settings' && <OwnerSettings />}
          </main>
        </div>

        {/* Dedicated Team Member Modal - Appears dead center */}
        <AddTeamMemberModal
          isOpen={addTeamModalOpen}
          onClose={() => setAddTeamModalOpen(false)}
        />
      </div>
    </div>
  );
}

export function OwnerShell({ initialSection = 'overview' }: { initialSection?: string }) {
  return <OwnerShellContent />;
}
