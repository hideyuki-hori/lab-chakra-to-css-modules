import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

const MotionCard = motion(Card);

interface StatCardProps {
  label: string;
  value: number | string;
  helpText?: string;
  trend?: 'increase' | 'decrease';
  icon?: IconType;
  iconColor?: string;
  isAnimated?: boolean;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  helpText,
  trend,
  icon,
  iconColor = 'primary.500',
  isAnimated = true,
  delay = 0,
}: StatCardProps) {
  const cardContent = (
    <CardBody>
      <Stat>
        <HStack mb={2}>
          {icon && <Icon as={icon} boxSize={5} color={iconColor} />}
          <StatLabel>{label}</StatLabel>
        </HStack>
        <StatNumber fontSize="3xl">{value}</StatNumber>
        {helpText && (
          <StatHelpText>
            {trend && <StatArrow type={trend} />}
            {helpText}
          </StatHelpText>
        )}
      </Stat>
    </CardBody>
  );

  if (isAnimated) {
    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        whileHover={{ scale: 1.02 }}
      >
        {cardContent}
      </MotionCard>
    );
  }

  return <Card>{cardContent}</Card>;
}
