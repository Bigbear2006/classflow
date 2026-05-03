import { Star, TrendingUp, Users, Zap } from 'lucide-react';

export const navLinkOptions = [
  {
    id: 'features',
    label: 'Возможности',
    icon: <Zap size={18} />,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    id: 'roles',
    label: 'Роли',
    icon: <Users size={18} />,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    id: 'how',
    label: 'Как работает',
    icon: <TrendingUp size={18} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    id: 'reviews',
    label: 'Отзывы',
    icon: <Star size={18} />,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];
