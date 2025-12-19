'use client';

import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Zap,
  Save,
  Check,
  MessageSquare,
  Mail,
} from 'lucide-react';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'integrations', label: 'Integrations', icon: Zap },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences and configurations</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0">
          <nav className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-card-elevated rounded-xl border border-border p-6">
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Profile Settings</h2>
                  <p className="text-xs text-muted-foreground">Manage your personal information</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Christopher Hayes"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="christopher.hayes@itss.com"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                  <input
                    type="text"
                    defaultValue="Support Agent"
                    disabled
                    className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                  <input
                    type="text"
                    defaultValue="IT Support"
                    disabled
                    className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-muted-foreground"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Bell className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
                  <p className="text-xs text-muted-foreground">Choose what notifications you receive</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'New ticket assignments', desc: 'Get notified when a ticket is assigned to you', icon: MessageSquare },
                  { label: 'SLA warnings', desc: 'Receive alerts when tickets approach their deadline', icon: Shield },
                  { label: 'Email notifications', desc: 'Receive notifications via email', icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Security Settings</h2>
                  <p className="text-xs text-muted-foreground">Manage your account security</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm font-medium text-foreground mb-1">Password</p>
                  <p className="text-xs text-muted-foreground mb-3">Last changed 30 days ago</p>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    Change Password
                  </button>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm font-medium text-foreground mb-1">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground mb-3">Add an extra layer of security to your account</p>
                  <button className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors border border-green-500/30">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Palette className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
                  <p className="text-xs text-muted-foreground">Customize the look and feel</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Theme</p>
                  <div className="flex gap-3">
                    <button className="flex-1 p-4 bg-zinc-900 rounded-lg border-2 border-primary text-center">
                      <div className="text-sm font-medium text-white">Dark</div>
                    </button>
                    <button className="flex-1 p-4 bg-white rounded-lg border-2 border-transparent text-center hover:border-border">
                      <div className="text-sm font-medium text-black">Light</div>
                    </button>
                    <button className="flex-1 p-4 bg-gradient-to-r from-zinc-900 to-white rounded-lg border-2 border-transparent text-center hover:border-border">
                      <div className="text-sm font-medium text-foreground">System</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Integrations</h2>
                  <p className="text-xs text-muted-foreground">Connect external services</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Zoho Desk', status: 'Connected', statusColor: 'text-green-400' },
                  { name: 'Slack', status: 'Not connected', statusColor: 'text-muted-foreground' },
                  { name: 'Jira', status: 'Not connected', statusColor: 'text-muted-foreground' },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">{integration.name}</p>
                      <p className={`text-xs ${integration.statusColor}`}>{integration.status}</p>
                    </div>
                    <button className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">
                      {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-border flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
