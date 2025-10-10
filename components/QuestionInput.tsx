import { Question } from '@/types/questions';

interface QuestionInputProps {
  question: Question;
  value: string | number | string[];
  onChange: (value: string | number | string[]) => void;
  error?: string;
}

export function QuestionInput({ question, value, onChange, error }: QuestionInputProps) {
  const baseInputClass = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-600 ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  switch (question.type) {
    case 'text':
      return (
        <div>
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            className={baseInputClass}
            required={question.required}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );

    case 'number':
      return (
        <div>
          <input
            type="number"
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={question.placeholder}
            min={question.validation?.min}
            max={question.validation?.max}
            className={baseInputClass}
            required={question.required}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );

    case 'textarea':
      return (
        <div>
          <textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            rows={5}
            className={`${baseInputClass} resize-vertical min-h-[120px]`}
            required={question.required}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );

    case 'select':
      return (
        <div>
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClass}
            required={question.required}
          >
            <option value="">-- กรุณาเลือก --</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );

    case 'multiselect':
      return (
        <div>
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(value as string[])?.includes(option) || false}
                  onChange={(e) => {
                    const currentValues = (value as string[]) || [];
                    if (e.target.checked) {
                      onChange([...currentValues, option]);
                    } else {
                      onChange(currentValues.filter((v) => v !== option));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );

    default:
      return (
        <input
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={baseInputClass}
          required={question.required}
        />
      );
  }
}
