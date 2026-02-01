import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/ui/Modal';
import { Tooltip } from '../components/ui/Tooltip';
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getEventBadgeClass = (type: string) => {
    switch (type) {
      case 'タスク':
        return styles.badgeBlue;
      case 'ミーティング':
        return styles.badgePurple;
      case '期限':
        return styles.badgeRed;
      default:
        return styles.badgeGray;
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'linear-gradient(135deg, #38b2ac, #319795)',
      'linear-gradient(135deg, #ed64a6, #d53f8c)',
      'linear-gradient(135deg, #a0522d, #8b4513)',
      'linear-gradient(135deg, #9f7aea, #805ad5)',
      'linear-gradient(135deg, #ecc94b, #d69e2e)',
      'linear-gradient(135deg, #4299e1, #3182ce)',
      'linear-gradient(135deg, #48bb78, #38a169)',
      'linear-gradient(135deg, #fc8181, #f56565)',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
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
        <div className={styles.stack}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>カレンダー</h1>
            <div className={styles.navigation}>
              <button className={styles.navButton} onClick={handlePrevMonth}>
                前月
              </button>
              <p className={styles.currentMonth}>
                {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
              </p>
              <button className={styles.navButton} onClick={handleNextMonth}>
                次月
              </button>
            </div>
          </div>

          <div className={styles.calendarCard}>
            <div className={styles.weekHeader}>
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
                  return (
                    <div
                      key={index}
                      className={`${styles.dayCell} ${day && isToday(day) ? styles.dayCellToday : ''}`}
                    >
                      {day && (
                        <>
                          <p
                            className={`${styles.dayNumber} ${isToday(day) ? styles.dayNumberToday : ''}`}
                          >
                            {day}
                          </p>
                          <div className={styles.eventList}>
                            {events.map((event) => (
                              <Tooltip
                                key={event.id}
                                label={`${event.title} - ${event.assignee}`}
                                placement="top"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  onClick={() => handleEventClick(event)}
                                >
                                  <span
                                    className={`${styles.eventBadge} ${getEventBadgeClass(event.type)}`}
                                  >
                                    {event.type}
                                  </span>
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

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="lg">
          <ModalHeader onClose={handleCloseModal}>イベント詳細</ModalHeader>
          <ModalBody>
            {selectedEvent && (
              <div className={styles.modalDetail}>
                <div className={styles.detailSection}>
                  <p className={styles.detailLabel}>タイトル</p>
                  <p className={styles.detailValue}>{selectedEvent.title}</p>
                </div>
                <div className={styles.detailSection}>
                  <p className={styles.detailLabel}>種類</p>
                  <span
                    className={`${styles.eventBadge} ${getEventBadgeClass(selectedEvent.type)}`}
                    style={{ width: 'fit-content' }}
                  >
                    {selectedEvent.type}
                  </span>
                </div>
                <div className={styles.detailSection}>
                  <p className={styles.detailLabel}>日付</p>
                  <p className={styles.detailValue}>{selectedEvent.date}</p>
                </div>
                <div className={styles.detailSection}>
                  <p className={styles.detailLabel}>担当者</p>
                  <div className={styles.assigneeRow}>
                    <div
                      className={styles.avatar}
                      style={{ background: getAvatarColor(selectedEvent.assignee) }}
                    >
                      {selectedEvent.assignee.charAt(0)}
                    </div>
                    <p className={styles.detailValue}>{selectedEvent.assignee}</p>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <button className={styles.buttonPrimary} onClick={handleCloseModal}>
              閉じる
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </Layout>
  );
};

export default Calendar;
