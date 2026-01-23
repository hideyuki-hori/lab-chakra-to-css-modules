import {
  Box,
  Button,
  Text,
  Flex,
  Badge,
  HStack,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Avatar,
  Tooltip,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { calendarEvents } from '../lib/mockData';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    onOpen();
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
          <HStack justify="space-between">
            <Text fontSize="3xl" fontWeight="bold">
              カレンダー
            </Text>
            <HStack>
              <Button onClick={handlePrevMonth}>前月</Button>
              <Text fontSize="xl" fontWeight="semibold" minW="200px" textAlign="center">
                {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
              </Text>
              <Button onClick={handleNextMonth}>次月</Button>
            </HStack>
          </HStack>

          <Box borderWidth="1px" borderRadius="lg" p={4} bg="white">
            <Flex mb={2}>
              {weekDays.map((day) => (
                <Box
                  key={day}
                  flex="1"
                  textAlign="center"
                  fontWeight="bold"
                  color="gray.600"
                  p={2}
                >
                  {day}
                </Box>
              ))}
            </Flex>

            <AnimatePresence mode="wait">
              <MotionFlex
                key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
                flexWrap="wrap"
                initial={{ opacity: 0, x: slideDirection * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection * -100 }}
                transition={{ duration: 0.3 }}
              >
                {calendarDays.map((day, index) => {
                  const events = day ? getEventsForDate(day) : [];
                  return (
                    <Box
                      key={index}
                      w="14.28%"
                      minH="100px"
                      p={2}
                      borderWidth="1px"
                      borderColor="gray.200"
                      bg={day && isToday(day) ? 'blue.50' : 'white'}
                      position="relative"
                    >
                      {day && (
                        <>
                          <Text
                            fontWeight={isToday(day) ? 'bold' : 'normal'}
                            color={isToday(day) ? 'blue.600' : 'gray.700'}
                            fontSize="sm"
                          >
                            {day}
                          </Text>
                          <VStack spacing={1} mt={2} align="stretch">
                            {events.map((event) => (
                              <Tooltip
                                key={event.id}
                                label={`${event.title} - ${event.assignee}`}
                                placement="top"
                              >
                                <MotionBox
                                  whileHover={{ scale: 1.1 }}
                                  cursor="pointer"
                                  onClick={() => handleEventClick(event)}
                                >
                                  <Badge
                                    colorScheme={getEventBadgeColor(event.type)}
                                    fontSize="xs"
                                    w="100%"
                                    textAlign="center"
                                  >
                                    {event.type}
                                  </Badge>
                                </MotionBox>
                              </Tooltip>
                            ))}
                          </VStack>
                        </>
                      )}
                    </Box>
                  );
                })}
              </MotionFlex>
            </AnimatePresence>
          </Box>
        </VStack>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
          size="lg"
        >
          <ModalOverlay />
          <ModalContent
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <ModalHeader>イベント詳細</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedEvent && (
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      タイトル
                    </Text>
                    <Text>{selectedEvent.title}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      種類
                    </Text>
                    <Badge colorScheme={getEventBadgeColor(selectedEvent.type)}>
                      {selectedEvent.type}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      日付
                    </Text>
                    <Text>{selectedEvent.date}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" mb={1}>
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
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                閉じる
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
};

export default Calendar;
