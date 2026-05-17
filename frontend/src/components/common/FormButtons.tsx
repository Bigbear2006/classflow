interface FormButtonsProps {
  submitButtonText: string;
  submitButtonDisabled: boolean;
  onCancelButtonClick: () => void;
}

export const FormButtons = ({
  submitButtonText,
  submitButtonDisabled,
  onCancelButtonClick,
}: FormButtonsProps) => {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        disabled={submitButtonDisabled}
        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium"
      >
        {submitButtonText}
      </button>
      <button
        type="button"
        onClick={onCancelButtonClick}
        className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium"
      >
        Отмена
      </button>
    </div>
  );
};
