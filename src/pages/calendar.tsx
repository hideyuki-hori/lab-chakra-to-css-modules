import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button, Card } from '../components/ui';
import { UserAvatar, Tooltip } from '../components/common';
import { ConfirmModal } from '../components/modal';
import { calendarEvents } from '../lib/mockData';
import styles from '../styles/pages/calendar.module.css';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  assignee: string;
  type: 'タスク' | 'ミーティング' | '期限';
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setSlideDirection(-1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setSlideDirection(1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter((event) => event.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const getEventBadgeClass = (type: string) => {
    switch (type) {
      case 'タスク':
        return styles.eventBadgeTask;
      case 'ミーティング':
        return styles.eventBadgeMeeting;
      case '期限':
        return styles.eventBadgeDeadline;
      default:
        return styles.eventBadgeTask;
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - firstDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <h1 className={styles.title}>カレンダー</h1>
            <div className={styles.navigation}>
              <Button variant="secondary" onClick={handlePrevMonth}>前月</Button>
              <span className={styles.monthLabel}>
                {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
              </span>
              <Button variant="secondary" onClick={handleNextMonth}>次月</Button>
            </div>
          </div>

          <div className={styles.calendarContainer}>
            <div className={styles.weekDays}>
              {weekDays.map((day) => (
                <div key={day} className={styles.weekDay}>
                  {day}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
                className={styles.calendarGrid}
                initial={{ opacity: 0, x: slideDirection * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection * -100 }}
                transition={{ duration: 0.3 }}
              >
                {calendarDays.map((day, index) => {
                  const events = day ? getEventsForDate(day) : [];
                  const isTodayCell = day !== null && isToday(day);
                  const cellClasses = [
                    styles.dayCell,
                    isTodayCell && styles.dayCellToday,
                  ].filter(Boolean).join(' ');
                  const numberClasses = [
                    styles.dayNumber,
                    isTodayCell && styles.dayNumberToday,
                  ].filter(Boolean).join(' ');

                  return (
                    <div key={index} className={cellClasses}>
                      {day && (
                        <>
                          <span className={numberClasses}>{day}</span>
                          <div className={styles.eventList}>
                            {events.map((event) => (
                              <Tooltip
                                key={event.id}
                                content={`${event.title} - ${event.assignee}`}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className={`${styles.eventBadge} ${getEventBadgeClass(event.type)}`}
                                  onClick={() => handleEventClick(event)}
                                >
                                  {event.type}
                                </motion.div>
                              </Tooltip>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => setIsModalOpen(false)}
          title="イベント詳細"
          confirmLabel="閉じる"
          showCancelButton={false}
        >
          {selectedEvent && (
            <div className={styles.modalContent}>
              <div className={styles.modalSection}>
                <span className={styles.modalLabel}>タイトル</span>
                <span className={styles.modalValue}>{selectedEvent.title}</span>
              </div>
              <div className={styles.modalSection}>
                <span className={styles.modalLabel}>種類</span>
                <span className={`${styles.eventBadge} ${getEventBadgeClass(selectedEvent.type)}`}>
                  {selectedEvent.type}
                </span>
              </div>
              <div className={styles.modalSection}>
                <span className={styles.modalLabel}>日付</span>
                <span className={styles.modalValue}>{selectedEvent.date}</span>
              </div>
              <div className={styles.modalSection}>
                <span className={styles.modalLabel}>担当者</span>
                <div className={styles.assigneeRow}>
                  <UserAvatar size="sm" name={selectedEvent.assignee} />
                  <span className={styles.modalValue}>{selectedEvent.assignee}</span>
                </div>
              </div>
            </div>
          )}
        </ConfirmModal>
      </div>
    </Layout>
  );
};

export default Calendar;
