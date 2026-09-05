import { useState } from 'react'
import {
  Settings,
  Globe2,
  Bell,
  Shield,
  Users,
  MessageSquare,
  Save,
  RotateCcw,
  CheckCircle2,
  Lock,
  Eye,
  Flag,
  KeyRound,
  Clock3,
  Database,
  Server,
  AlertTriangle,
  ChevronRight
} from 'lucide-react'

/* =========================================================
   Toggle Component
========================================================= */

const Toggle = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
        enabled
          ? 'bg-slate-900 dark:bg-white'
          : 'bg-slate-200 dark:bg-slate-700'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 dark:bg-slate-900 ${
          enabled ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  )
}

/* =========================================================
   Settings Section
========================================================= */

const SettingsSection = ({ icon: Icon, title, description, children }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 p-5 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <Icon size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {children}
      </div>
    </section>
  )
}

/* =========================================================
   Setting Row
========================================================= */

const SettingRow = ({ title, description, children }) => {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-2xl">
        <h3 className="text-sm font-medium text-slate-800 dark:text-white">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  )
}

/* =========================================================
   Select Input
========================================================= */

const SelectInput = ({ value, onChange, children }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full min-w-45 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-slate-500"
    >
      {children}
    </select>
  )
}

/* =========================================================
   Input
========================================================= */

const TextInput = ({ value, onChange, placeholder, type = 'text' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full min-w-55 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-slate-500"
    />
  )
}

/* =========================================================
   Main Component
========================================================= */

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general')

  const [saved, setSaved] = useState(false)

  /* =====================================================
     General
  ===================================================== */

  const [siteName, setSiteName] = useState('Nexora')
  const [siteUrl, setSiteUrl] = useState('https://nexora.social')
  const [siteDescription, setSiteDescription] = useState(
    'A modern social platform built for meaningful connections.'
  )
  const [language, setLanguage] = useState('English')
  const [timezone, setTimezone] = useState('Asia/Dhaka')
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  /* =====================================================
     Notifications
  ===================================================== */

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [newUserNotification, setNewUserNotification] = useState(true)
  const [reportNotification, setReportNotification] = useState(true)
  const [securityNotification, setSecurityNotification] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  /* =====================================================
     Security
  ===================================================== */

  const [twoFactor, setTwoFactor] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState('30 minutes')
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5')
  const [passwordExpiration, setPasswordExpiration] = useState('90 days')

  /* =====================================================
     User Settings
  ===================================================== */

  const [allowRegistration, setAllowRegistration] = useState(true)
  const [emailVerification, setEmailVerification] = useState(true)
  const [usernameChange, setUsernameChange] = useState(false)
  const [profileVisibility, setProfileVisibility] = useState('Public')
  const [allowGuestViewing, setAllowGuestViewing] = useState(true)

  /* =====================================================
     Moderation
  ===================================================== */

  const [autoModeration, setAutoModeration] = useState(true)
  const [autoHideReported, setAutoHideReported] = useState(false)
  const [requirePostApproval, setRequirePostApproval] = useState(false)
  const [spamProtection, setSpamProtection] = useState(true)
  const [maxReports, setMaxReports] = useState('10')

  /* =====================================================
     Platform
  ===================================================== */

  const [allowComments, setAllowComments] = useState(true)
  const [allowSharing, setAllowSharing] = useState(true)
  const [allowMessaging, setAllowMessaging] = useState(true)
  const [imageUploads, setImageUploads] = useState(true)
  const [maxUploadSize, setMaxUploadSize] = useState('10 MB')
  const [defaultFeed, setDefaultFeed] = useState('Recommended')

  /* =====================================================
     Save Settings
  ===================================================== */

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset your changes?'
    )

    if (!confirmed) return

    setSiteName('Nexora')
    setSiteUrl('https://nexora.social')
    setSiteDescription(
      'A modern social platform built for meaningful connections.'
    )
    setLanguage('English')
    setTimezone('Asia/Dhaka')
    setMaintenanceMode(false)

    setEmailNotifications(true)
    setNewUserNotification(true)
    setReportNotification(true)
    setSecurityNotification(true)
    setWeeklyReport(true)
    setPushNotifications(true)

    setTwoFactor(false)
    setLoginAlerts(true)
    setSessionTimeout('30 minutes')
    setMaxLoginAttempts('5')
    setPasswordExpiration('90 days')

    setAllowRegistration(true)
    setEmailVerification(true)
    setUsernameChange(false)
    setProfileVisibility('Public')
    setAllowGuestViewing(true)

    setAutoModeration(true)
    setAutoHideReported(false)
    setRequirePostApproval(false)
    setSpamProtection(true)
    setMaxReports('10')

    setAllowComments(true)
    setAllowSharing(true)
    setAllowMessaging(true)
    setImageUploads(true)
    setMaxUploadSize('10 MB')
    setDefaultFeed('Recommended')
  }

  /* =====================================================
     Tabs
  ===================================================== */

  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: Globe2
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users
    },
    {
      id: 'moderation',
      label: 'Moderation',
      icon: Flag
    },
    {
      id: 'platform',
      label: 'Platform',
      icon: Settings
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-350">
        {/* =================================================
            Header
        ================================================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <Settings size={18} />
              </div>

              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Nexora Admin
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Manage your Nexora platform configuration, security, users and
              moderation preferences.
            </p>
          </div>

          {/* Save / Reset */}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {saved ? (
                <>
                  <CheckCircle2 size={17} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            Saved Message
        ================================================= */}

        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 size={18} />

            <span>Your settings have been successfully saved.</span>
          </div>
        )}

        {/* =================================================
            Settings Layout
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* =================================================
              Sidebar
          ================================================= */}

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 px-3 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Configuration
              </p>
            </div>

            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon
                const active = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                      active
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={17} />

                      {tab.label}
                    </span>

                    <ChevronRight
                      size={15}
                      className={`transition ${
                        active
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                )
              })}
            </nav>

            {/* System Status */}

            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  All Systems Operational
                </span>
              </div>

              <p className="mt-2 text-[10px] leading-4 text-slate-400">
                Last checked a few seconds ago
              </p>
            </div>
          </aside>

          {/* =================================================
              Content
          ================================================= */}

          <main className="min-w-0 space-y-6">
            {/* =================================================
                GENERAL
            ================================================= */}

            {activeTab === 'general' && (
              <>
                <SettingsSection
                  icon={Globe2}
                  title="General Information"
                  description="Basic information and identity of your Nexora platform."
                >
                  <SettingRow
                    title="Platform Name"
                    description="The name displayed throughout the platform."
                  >
                    <TextInput
                      value={siteName}
                      onChange={setSiteName}
                      placeholder="Nexora"
                    />
                  </SettingRow>

                  <SettingRow
                    title="Platform URL"
                    description="The primary URL of your social platform."
                  >
                    <TextInput
                      value={siteUrl}
                      onChange={setSiteUrl}
                      placeholder="https://nexora.social"
                    />
                  </SettingRow>

                  <SettingRow
                    title="Platform Description"
                    description="Short description used for metadata and SEO."
                  >
                    <textarea
                      value={siteDescription}
                      onChange={e => setSiteDescription(e.target.value)}
                      rows={3}
                      className="w-full min-w-55 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-slate-500 sm:min-w-[320px]"
                    />
                  </SettingRow>

                  <SettingRow
                    title="Default Language"
                    description="Default language for new visitors."
                  >
                    <SelectInput value={language} onChange={setLanguage}>
                      <option>English</option>
                      <option>Bangla</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </SelectInput>
                  </SettingRow>

                  <SettingRow
                    title="Timezone"
                    description="Timezone used for scheduled content and reports."
                  >
                    <SelectInput value={timezone} onChange={setTimezone}>
                      <option value="Asia/Dhaka">Asia/Dhaka</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="Asia/Singapore">Asia/Singapore</option>
                    </SelectInput>
                  </SettingRow>
                </SettingsSection>

                <SettingsSection
                  icon={Server}
                  title="Maintenance"
                  description="Temporarily restrict access while performing system maintenance."
                >
                  <SettingRow
                    title="Maintenance Mode"
                    description="When enabled, regular users will see a maintenance page."
                  >
                    <Toggle
                      enabled={maintenanceMode}
                      onChange={setMaintenanceMode}
                    />
                  </SettingRow>

                  {maintenanceMode && (
                    <div className="mx-5 mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-500/10">
                      <AlertTriangle
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                      />

                      <p className="text-xs leading-5 text-amber-700 dark:text-amber-400">
                        Maintenance mode is currently active. Users may not be
                        able to access normal platform features.
                      </p>
                    </div>
                  )}
                </SettingsSection>
              </>
            )}

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            {activeTab === 'notifications' && (
              <SettingsSection
                icon={Bell}
                title="Notification Preferences"
                description="Choose which notifications administrators should receive."
              >
                <SettingRow
                  title="Email Notifications"
                  description="Receive important platform notifications by email."
                >
                  <Toggle
                    enabled={emailNotifications}
                    onChange={setEmailNotifications}
                  />
                </SettingRow>

                <SettingRow
                  title="New User Alerts"
                  description="Notify administrators whenever a new user registers."
                >
                  <Toggle
                    enabled={newUserNotification}
                    onChange={setNewUserNotification}
                  />
                </SettingRow>

                <SettingRow
                  title="Report Notifications"
                  description="Get notified when new content reports are submitted."
                >
                  <Toggle
                    enabled={reportNotification}
                    onChange={setReportNotification}
                  />
                </SettingRow>

                <SettingRow
                  title="Security Alerts"
                  description="Receive alerts about suspicious login activity and security events."
                >
                  <Toggle
                    enabled={securityNotification}
                    onChange={setSecurityNotification}
                  />
                </SettingRow>

                <SettingRow
                  title="Weekly Analytics Report"
                  description="Receive a weekly summary of platform performance."
                >
                  <Toggle enabled={weeklyReport} onChange={setWeeklyReport} />
                </SettingRow>

                <SettingRow
                  title="Push Notifications"
                  description="Allow browser push notifications for admin events."
                >
                  <Toggle
                    enabled={pushNotifications}
                    onChange={setPushNotifications}
                  />
                </SettingRow>

                <SettingRow
                  title="Notification Email"
                  description="Email address used for administrative notifications."
                >
                  <TextInput
                    type="email"
                    value="admin@nexora.social"
                    onChange={() => {}}
                    placeholder="admin@nexora.social"
                  />
                </SettingRow>
              </SettingsSection>
            )}

            {/* =================================================
                SECURITY
            ================================================= */}

            {activeTab === 'security' && (
              <>
                <SettingsSection
                  icon={Shield}
                  title="Security Settings"
                  description="Protect administrator accounts and user sessions."
                >
                  <SettingRow
                    title="Two-Factor Authentication"
                    description="Require administrators to verify their identity with a second authentication factor."
                  >
                    <Toggle enabled={twoFactor} onChange={setTwoFactor} />
                  </SettingRow>

                  <SettingRow
                    title="Login Alerts"
                    description="Notify administrators when a new login is detected."
                  >
                    <Toggle enabled={loginAlerts} onChange={setLoginAlerts} />
                  </SettingRow>

                  <SettingRow
                    title="Session Timeout"
                    description="Automatically expire inactive admin sessions."
                  >
                    <SelectInput
                      value={sessionTimeout}
                      onChange={setSessionTimeout}
                    >
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>Never</option>
                    </SelectInput>
                  </SettingRow>

                  <SettingRow
                    title="Maximum Login Attempts"
                    description="Number of failed attempts before temporary account lock."
                  >
                    <SelectInput
                      value={maxLoginAttempts}
                      onChange={setMaxLoginAttempts}
                    >
                      <option value="3">3 attempts</option>
                      <option value="5">5 attempts</option>
                      <option value="10">10 attempts</option>
                    </SelectInput>
                  </SettingRow>

                  <SettingRow
                    title="Password Expiration"
                    description="Require administrators to change passwords periodically."
                  >
                    <SelectInput
                      value={passwordExpiration}
                      onChange={setPasswordExpiration}
                    >
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>180 days</option>
                      <option>Never</option>
                    </SelectInput>
                  </SettingRow>
                </SettingsSection>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <KeyRound size={19} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        Admin Security
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Your administrator account should use a strong password
                        and two-factor authentication whenever possible.
                      </p>

                      <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Lock size={14} />
                        Change Admin Password
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* =================================================
                USERS
            ================================================= */}

            {activeTab === 'users' && (
              <SettingsSection
                icon={Users}
                title="User Management"
                description="Control registration, profiles and user access preferences."
              >
                <SettingRow
                  title="Allow New Registrations"
                  description="Allow new users to create Nexora accounts."
                >
                  <Toggle
                    enabled={allowRegistration}
                    onChange={setAllowRegistration}
                  />
                </SettingRow>

                <SettingRow
                  title="Require Email Verification"
                  description="Users must verify their email address before accessing full features."
                >
                  <Toggle
                    enabled={emailVerification}
                    onChange={setEmailVerification}
                  />
                </SettingRow>

                <SettingRow
                  title="Allow Username Changes"
                  description="Allow users to change their username after registration."
                >
                  <Toggle
                    enabled={usernameChange}
                    onChange={setUsernameChange}
                  />
                </SettingRow>

                <SettingRow
                  title="Default Profile Visibility"
                  description="Visibility applied to newly created user profiles."
                >
                  <SelectInput
                    value={profileVisibility}
                    onChange={setProfileVisibility}
                  >
                    <option>Public</option>
                    <option>Followers Only</option>
                    <option>Private</option>
                  </SelectInput>
                </SettingRow>

                <SettingRow
                  title="Guest Content Viewing"
                  description="Allow visitors without an account to view public content."
                >
                  <Toggle
                    enabled={allowGuestViewing}
                    onChange={setAllowGuestViewing}
                  />
                </SettingRow>

                <SettingRow
                  title="Account Verification"
                  description="Allow administrators to manually verify trusted user accounts."
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <CheckCircle2 size={15} />
                    Manage Verification
                  </button>
                </SettingRow>
              </SettingsSection>
            )}

            {/* =================================================
                MODERATION
            ================================================= */}

            {activeTab === 'moderation' && (
              <>
                <SettingsSection
                  icon={Flag}
                  title="Content Moderation"
                  description="Configure automated moderation and reported content behavior."
                >
                  <SettingRow
                    title="Automatic Moderation"
                    description="Use automated rules to detect potentially harmful content."
                  >
                    <Toggle
                      enabled={autoModeration}
                      onChange={setAutoModeration}
                    />
                  </SettingRow>

                  <SettingRow
                    title="Auto-Hide Reported Content"
                    description="Automatically hide content after it receives enough reports."
                  >
                    <Toggle
                      enabled={autoHideReported}
                      onChange={setAutoHideReported}
                    />
                  </SettingRow>

                  <SettingRow
                    title="Require Post Approval"
                    description="Posts must be reviewed by moderators before appearing publicly."
                  >
                    <Toggle
                      enabled={requirePostApproval}
                      onChange={setRequirePostApproval}
                    />
                  </SettingRow>

                  <SettingRow
                    title="Spam Protection"
                    description="Detect repeated posts, suspicious links and spam behavior."
                  >
                    <Toggle
                      enabled={spamProtection}
                      onChange={setSpamProtection}
                    />
                  </SettingRow>

                  <SettingRow
                    title="Report Threshold"
                    description="Number of reports before content is automatically flagged for review."
                  >
                    <SelectInput value={maxReports} onChange={setMaxReports}>
                      <option value="3">3 reports</option>
                      <option value="5">5 reports</option>
                      <option value="10">10 reports</option>
                      <option value="20">20 reports</option>
                    </SelectInput>
                  </SettingRow>
                </SettingsSection>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <Flag size={19} className="text-slate-500" />

                    <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                      284
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Pending Reports
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <MessageSquare size={19} className="text-slate-500" />

                    <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                      1,842
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Moderated Items
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <Shield size={19} className="text-slate-500" />

                    <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                      97.8%
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Moderation Accuracy
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* =================================================
                PLATFORM
            ================================================= */}

            {activeTab === 'platform' && (
              <>
                <SettingsSection
                  icon={Settings}
                  title="Platform Features"
                  description="Enable or disable major Nexora social features."
                >
                  <SettingRow
                    title="Comments"
                    description="Allow users to comment on posts."
                  >
                    <Toggle
                      enabled={allowComments}
                      onChange={setAllowComments}
                    />
                  </SettingRow>

                  <SettingRow
                    title="Post Sharing"
                    description="Allow users to share posts with their followers."
                  >
                    <Toggle enabled={allowSharing} onChange={setAllowSharing} />
                  </SettingRow>

                  <SettingRow
                    title="Private Messaging"
                    description="Allow users to communicate through direct messages."
                  >
                    <Toggle
                      enabled={allowMessaging}
                      onChange={setAllowMessaging}
                    />
                  </SettingRow>

                  <SettingRow
                    title="Image Uploads"
                    description="Allow users to upload images to posts and profiles."
                  >
                    <Toggle enabled={imageUploads} onChange={setImageUploads} />
                  </SettingRow>

                  <SettingRow
                    title="Maximum Upload Size"
                    description="Maximum file size allowed for media uploads."
                  >
                    <SelectInput
                      value={maxUploadSize}
                      onChange={setMaxUploadSize}
                    >
                      <option>5 MB</option>
                      <option>10 MB</option>
                      <option>20 MB</option>
                      <option>50 MB</option>
                      <option>100 MB</option>
                    </SelectInput>
                  </SettingRow>

                  <SettingRow
                    title="Default Feed"
                    description="Default content feed shown to users."
                  >
                    <SelectInput value={defaultFeed} onChange={setDefaultFeed}>
                      <option>Recommended</option>
                      <option>Latest Posts</option>
                      <option>Following</option>
                      <option>Trending</option>
                    </SelectInput>
                  </SettingRow>
                </SettingsSection>

                {/* Platform Stats */}

                <SettingsSection
                  icon={Database}
                  title="Platform Information"
                  description="Current Nexora system information."
                >
                  <SettingRow
                    title="Database"
                    description="Primary database connection status."
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Connected
                    </span>
                  </SettingRow>

                  <SettingRow
                    title="API Server"
                    description="Nexora backend API health status."
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Operational
                    </span>
                  </SettingRow>

                  <SettingRow
                    title="Storage"
                    description="Current media storage provider."
                  >
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Cloud Storage
                    </span>
                  </SettingRow>

                  <SettingRow
                    title="Application Version"
                    description="Current Nexora platform version."
                  >
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      v1.0.0
                    </span>
                  </SettingRow>
                </SettingsSection>
              </>
            )}

            {/* =================================================
                Bottom Save
            ================================================= */}

            <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900/95">
              <div className="flex items-center gap-3">
                <div className="hidden h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 sm:flex dark:bg-slate-800 dark:text-slate-300">
                  <Settings size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    Configuration
                  </p>

                  <p className="text-xs text-slate-400">
                    Changes are applied after saving.
                  </p>
                </div>
              </div>

              <div className="flex w-full gap-2 sm:w-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:flex-none dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:flex-none dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  {saved ? (
                    <>
                      <CheckCircle2 size={16} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* =================================================
            Footer
        ================================================= */}

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row dark:border-slate-800">
          <p>© 2026 Nexora. Admin Control Center.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock3 size={13} />
              Asia/Dhaka
            </span>

            <span className="flex items-center gap-1.5">
              <Eye size={13} />
              Admin Only
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
