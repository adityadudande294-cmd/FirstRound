import React, { useEffect, useRef } from 'react';
import {
  Award,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Crown,
  FileText,
  Megaphone,
  Sparkles,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { AppNotification, NotificationType } from '../types';

interface NotificationCenterProps {
  notifications: AppNotification[];
  unreadCount: number;
  readIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onNotificationClick: (notif: AppNotification) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  unreadCount,
  readIds,
  isOpen,
  onClose,
  onMarkRead,
  onMarkAllRead,
  onNotificationClick,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const readSet = new Set(readIds);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatTimeAgo = (dateStr: string) => {
    try {
      const now = new Date();
      const past = new Date(dateStr);
      const diffMs = now.getTime() - past.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch {
      return '';
    }
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'NEW_TEST':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'COMPETITION':
        return <Trophy className="w-4 h-4 text-purple-600" />;
      case 'LEADERBOARD':
        return <Crown className="w-4 h-4 text-emerald-600" />;
      case 'ACHIEVEMENT':
        return <Award className="w-4 h-4 text-amber-600" />;
      case 'ANNOUNCEMENT':
      default:
        return <Megaphone className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div
      ref={panelRef}
      id="notification-center-dropdown"
      className="fixed inset-x-3 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-96 max-w-[calc(100vw-1.5rem)] bg-surface border border-border rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-app-bg border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold text-text-primary tracking-tight">Notifications</h3>
          {unreadCount > 0 && (
            <span
              id="notification-unread-pill"
              className="px-2 py-0.5 bg-amber-500 text-slate-950 font-extrabold text-[10px] rounded-full"
            >
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              id="notification-mark-all-read-btn"
              onClick={onMarkAllRead}
              className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-1 transition-colors"
            >
              <Check className="w-3 h-3" />
              <span>Mark all read</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-text-secondary rounded-md hover:bg-surface-hover transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-10 px-6 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-surface-hover text-slate-400 flex items-center justify-center mx-auto">
              <Bell className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-800">You're all caught up.</p>
            <p className="text-[11px] text-text-muted max-w-xs mx-auto">
              Important updates will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notif) => {
            const isRead = readSet.has(notif.id);
            return (
              <div
                key={notif.id}
                id={`notification-item-${notif.id}`}
                onClick={() => {
                  if (!isRead) onMarkRead(notif.id);
                  onNotificationClick(notif);
                }}
                className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 group ${
                  isRead ? 'bg-surface hover:bg-app-bg/80 opacity-80 hover:opacity-100' : 'bg-amber-50/40 hover:bg-amber-50/80'
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                    isRead
                      ? 'bg-surface-hover border-border text-text-secondary'
                      : 'bg-surface border-amber-200 shadow-2xs'
                  }`}
                >
                  {getTypeIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4
                      className={`text-xs font-bold truncate ${
                        isRead ? 'text-slate-700' : 'text-text-primary font-extrabold'
                      }`}
                    >
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {formatTimeAgo(notif.createdAt)}
                    </span>
                  </div>

                  <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>

                  {notif.actionLabel && (
                    <div className="pt-0.5 flex items-center gap-1 text-[11px] font-bold text-sky-700 group-hover:text-sky-900">
                      <span>{notif.actionLabel}</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}
                </div>

                {/* Unread indicator dot */}
                {!isRead && (
                  <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5 ring-2 ring-amber-200" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
