import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ValidatedInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  formatValue?: (value: string) => string;
  maxLength?: number;
  min?: number;
  max?: number;
  validateOnChange?: boolean;
  validationFn?: (value: string) => string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required = false,
  className,
  formatValue,
  maxLength,
  min,
  max,
  validateOnChange = false,
  validationFn,
}) => {
  const [localError, setLocalError] = useState<string>("");
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  // Validação dinâmica
  useEffect(() => {
    if (validateOnChange && hasBeenTouched && validationFn) {
      const validationError = validationFn(value);
      setLocalError(validationError);
    }
  }, [value, validateOnChange, hasBeenTouched, validationFn]);

  // Limpa erro local quando erro externo é limpo
  useEffect(() => {
    if (!error) {
      setLocalError("");
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Aplica formatação se fornecida
    if (formatValue) {
      newValue = formatValue(newValue);
    }
    
    onChange(newValue);
  };

  const handleBlur = () => {
    setHasBeenTouched(true);
    if (validationFn) {
      const validationError = validationFn(value);
      setLocalError(validationError);
    }
  };

  const handleFocus = () => {
    setHasBeenTouched(true);
  };

  // Prioriza erro externo sobre erro local
  const displayError = error || localError;

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id} 
        className={cn(
          "text-blue-700",
          required && "after:content-['*'] after:ml-1 after:text-red-500"
        )}
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        max={max}
        className={cn(
          "bg-white border-2 transition shadow-sm",
          displayError 
            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
            : "border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200",
          className
        )}
        aria-invalid={!!displayError}
        aria-describedby={displayError ? `${id}-error` : undefined}
      />
      {displayError && (
        <p 
          id={`${id}-error`}
          className="text-sm text-red-500 font-medium"
          role="alert"
        >
          {displayError}
        </p>
      )}
    </div>
  );
};

export default ValidatedInput; 