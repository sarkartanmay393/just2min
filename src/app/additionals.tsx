'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'
import { Switch } from '~/components/ui/switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Bell, BellOff, Download, Plus, Share2 } from 'lucide-react';

function urlBase64ToUint8Array(base64String: string) {
  console.log('base64String', base64String);
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+') // Correctly replace the URL-safe characters
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    await subscribeUser(sub)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('')
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  const toggleSubscription = async (checked: boolean) => {
    if (checked) {
      await subscribeToPush()
    } else {
      await unsubscribeFromPush()
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          {subscription ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          Push Notifications
        </CardTitle>
        <CardDescription>
          Manage your push notification settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="font-medium">
            {subscription ? 'Subscribed' : 'Not subscribed'}
          </span>
          <Switch
            checked={!!subscription}
            onCheckedChange={toggleSubscription}
          />
        </div>
        {subscription && (
          <form onSubmit={(e) => { e.preventDefault(); sendTestNotification(); }} className="mt-2 space-y-2">
            <Input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" className="w-full">Send Test Notification</Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {subscription
          ? "You are currently receiving push notifications."
          : "Enable push notifications to stay updated."}
      </CardFooter>
    </Card>
  )
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);


  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null // Don't show install button if already installed
  }

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault(); // Prevent the mini info bar from appearing on mobile
      setDeferredPrompt(event); // Save the event for triggering later
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      const { outcome } = await deferredPrompt.userChoice; // Wait for the user to respond to the prompt
      console.log('User response to the install prompt:', outcome);
      setDeferredPrompt(null); // Clear the prompt
    }
  };


  return (
    <Card className="">
      <CardHeader>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Download className="h-5 w-5" />
          Install App
        </h3>
      </CardHeader>
      <CardContent>
        <Button onClick={handleInstallClick} className="w-full">
          Add to Home Screen
        </Button>
        {isIOS && (
          <p className="text-sm text-muted-foreground">
            To install this app on your iOS device, tap the share button
            <Share2 className="inline-block h-4 w-4 mx-1" />
            and then "Add to Home Screen"
            <Plus className="inline-block h-4 w-4 mx-1" />.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default function Addtionals() {
  return (
    <div className='space-y-4 px-4 py-2 bg-blue-50'>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  )
}