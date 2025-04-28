import {
  Tag,
  Home,
  Inbox,
  Settings,
  SunMoon,
  TypeOutline,
  LockKeyholeIcon,
  Sun,
  Moon
} from 'lucide-react';
import { RiFontSans } from 'react-icons/ri';
import { RiFontSansSerif } from 'react-icons/ri';
import { RiFontMono } from 'react-icons/ri';

export const sidebarItems = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home
  },
  {
    title: 'Archived',
    url: '/dashboard/archived',
    icon: Inbox
  },
  {
    title: 'Tags',
    url: '',
    icon: Tag
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings
  }
];

export const settingsItems = [
  {
    id: 0,
    title: 'Color Themes',
    icon: SunMoon,
    href: 'color-theme'
  },
  {
    id: 1,
    title: 'Font Themes',
    icon: TypeOutline,
    href: 'font-theme'
  },
  {
    id: 2,
    title: 'Change Password',
    icon: LockKeyholeIcon,
    href: 'change-password'
  }
];

export const colorTheme = [
  {
    id: 0,
    title: 'Light Mode',
    desc: 'Pick a clean and classic light theme.',
    icon: Sun,
    value: 'light'
  },
  {
    id: 1,
    title: 'Dark Mode',
    desc: 'Select a sleek and modern dark theme.',
    icon: Moon,
    value: 'dark'
  },
  {
    id: 2,
    title: 'System',
    desc: "Adapts to your device's theme.",
    icon: SunMoon,
    value: 'system'
  }
];

export const fontTheme = [
  {
    id: 0,
    title: 'Sans-serif',
    desc: 'Clean and modern, easy to read.',
    icon: RiFontSans,
    value: 'sans'
  },
  {
    id: 1,
    title: 'Serif',
    desc: 'Classic and elegant for a timeless feel.',
    icon: RiFontSansSerif,
    value: 'serif'
  },
  {
    id: 2,
    title: 'Monospace',
    desc: 'Code-like, great for a technical vibe.',
    icon: RiFontMono,
    value: 'mono'
  }
];
