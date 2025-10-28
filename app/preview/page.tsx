'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [theme, setTheme] = useState('light')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  const apiKeys = [
    { id: 1, name: 'Production API Key', key: 'sk_live_***************', created: '2024-01-15' },
    { id: 2, name: 'Development API Key', key: 'sk_test_***************', created: '2024-02-20' },
    { id: 3, name: 'Staging API Key', key: 'sk_stage_**************', created: '2024-03-10' },
  ]

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!')
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success('API key copied to clipboard')
  }

  const handleDeleteAccount = () => {
    toast.error('Account deletion cancelled')
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-bg-subtle p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-text">Settings</h1>
            <p className="text-text-muted">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-semibold">JD</span>
                </div>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardFooter>
          </Card>

          {/* Appearance Section */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="density">Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger id="density">
                    <SelectValue placeholder="Select density" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="radius">Border Radius</Label>
                <input
                  id="radius"
                  type="range"
                  min="0"
                  max="20"
                  defaultValue="8"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Adjust the roundness of corners
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency">Notification Frequency</Label>
                <Select defaultValue="realtime">
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly digest</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="2fa">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch
                  id="2fa"
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Generate Recovery Codes</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Recovery Codes</DialogTitle>
                    <DialogDescription>
                      Save these codes in a safe place. You can use them to access your
                      account if you lose your 2FA device.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="rounded-md bg-muted p-4 font-mono text-sm">
                    <div>1234-5678-9012-3456</div>
                    <div>2345-6789-0123-4567</div>
                    <div>3456-7890-1234-5678</div>
                    <div>4567-8901-2345-6789</div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => toast.success('Recovery codes copied')}>
                      Copy Codes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          {/* API Keys Section */}
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell className="font-medium">{apiKey.name}</TableCell>
                      <TableCell className="font-mono text-sm">{apiKey.key}</TableCell>
                      <TableCell>{apiKey.created}</TableCell>
                      <TableCell className="text-right">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyKey(apiKey.key)}
                            >
                              Copy
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy to clipboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Create New Key</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Create API Key</SheetTitle>
                    <SheetDescription>
                      Generate a new API key for your integrations
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="key-name">Key Name</Label>
                      <Input id="key-name" placeholder="My API Key" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="key-type">Key Type</Label>
                      <Select defaultValue="production">
                        <SelectTrigger id="key-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="production">Production</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="staging">Staging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      className="mt-4"
                      onClick={() => toast.success('API key created successfully')}
                    >
                      Generate Key
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </CardFooter>
          </Card>

          {/* Danger Zone Section */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-md border border-destructive bg-destructive/10 p-4">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove all your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        Delete Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

