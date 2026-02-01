import {
  Box,
  Button,
  Text,
  Badge,
  HStack,
  VStack,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Tooltip,
} from '@/src/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { calendarEvents } from '../lib/mockData';
import pageStyles from '../styles/pages/calendar.module.css';

const MotionDiv = motion.div;

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  assignee: string;
  type: 'タスク' | 'ミーティング' | '期限';
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
    openModal();
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'タスク':
        return 'blue';
      case 'ミーティング':
        return 'purple';
      case '期限':
        return 'red';
      default:
        return 'gray';
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
      <Box p={8}>
        <VStack spacing={6} align="stretch">
          <HStack style={{ justifyContent: 'space-between' }}>
            <Text fontSize="3xl" fontWeight="bold">
              カレンダー
            </Text>
            <HStack>
              <Button onClick={handlePrevMonth}>前月</Button>
              <Text className={pageStyles.monthNav}>
                {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
              </Text>
              <Button onClick={handleNextMonth}>次月</Button>
            </HStack>
          </HStack>

          <div className={pageStyles.calendarContainer}>
            <div className={pageStyles.weekDaysRow}>
              {weekDays.map((day) => (
                <div key={day} className={pageStyles.weekDay}>
                  {day}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <MotionDiv
                key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
                className={pageStyles.calendarGrid}
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
                      className={`${pageStyles.dayCell} ${day && isToday(day) ? pageStyles.today : ''}`}
                    >
                      {day && (
                        <>
                          <span
                            className={`${pageStyles.dayNumber} ${isToday(day) ? pageStyles.today : ''}`}
                          >
                            {day}
                          </span>
                          <VStack spacing={1} style={{ marginTop: 'var(--spacing-2)' }} align="stretch">
                            {events.map((event) => (
                              <Tooltip
                                key={event.id}
                                content={`${event.title} - ${event.assignee}`}
                                placement="top"
                              >
                                <MotionDiv
                                  whileHover={{ scale: 1.1 }}
                                  className={pageStyles.eventBadge}
                                  onClick={() => handleEventClick(event)}
                                >
                                  <Badge
                                    colorScheme={getEventBadgeColor(event.type)}
                                    style={{ width: '100%', textAlign: 'center', fontSize: 'var(--font-size-xs)' }}
                                  >
                                    {event.type}
                                  </Badge>
                                </MotionDiv>
                              </Tooltip>
                            ))}
                          </VStack>
                        </>
                      )}
                    </div>
                  );
                })}
              </MotionDiv>
            </AnimatePresence>
          </div>
        </VStack>

        <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
          <ModalHeader>イベント詳細</ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <ModalBody>
            {selectedEvent && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold" style={{ marginBottom: 'var(--spacing-1)' }}>
                    タイトル
                  </Text>
                  <Text>{selectedEvent.title}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" style={{ marginBottom: 'var(--spacing-1)' }}>
                    種類
                  </Text>
                  <Badge colorScheme={getEventBadgeColor(selectedEvent.type)}>
                    {selectedEvent.type}
                  </Badge>
                </Box>
                <Box>
                  <Text fontWeight="bold" style={{ marginBottom: 'var(--spacing-1)' }}>
                    日付
                  </Text>
                  <Text>{selectedEvent.date}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" style={{ marginBottom: 'var(--spacing-1)' }}>
                    担当者
                  </Text>
                  <HStack>
                    <Avatar size="sm" name={selectedEvent.assignee} />
                    <Text>{selectedEvent.assignee}</Text>
                  </HStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="primary" style={{ marginRight: 'var(--spacing-3)' }} onClick={closeModal}>
              閉じる
            </Button>
          </ModalFooter>
        </Modal>
      </Box>
    </Layout>
  );
};

export default Calendar;
