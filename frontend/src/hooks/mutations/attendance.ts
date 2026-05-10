import { useCustomMutation } from '../useCustomMutation.ts';
import { bulkCreateAttendance } from '../../api/attendance/requests.ts';
import { toast } from 'sonner';

interface UseBulkCreateAttendanceProps {
  lessonId: number;
}

export const useBulkCreateAttendanceMutation = ({ lessonId }: UseBulkCreateAttendanceProps) => {
  return useCustomMutation({
    mutationFn: bulkCreateAttendance,
    invalidateQueryKeyOnSuccess: ['lessons', lessonId, 'students'],
    toastErrorMessage: 'Не удалось сохранить посещаемость',
    onSuccess: () => toast.success('Сохранено'),
  });
};
