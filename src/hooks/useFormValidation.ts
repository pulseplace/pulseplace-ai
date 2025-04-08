
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface ValidationFeedback {
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
  errorCount: number;
  getFieldState: (fieldName: string) => {
    error: string | undefined;
    isDirty: boolean;
    isTouched: boolean;
  };
}

/**
 * A custom hook to provide enhanced form validation feedback
 * @param form The react-hook-form useForm object
 * @returns ValidationFeedback object with validation state and helpers
 */
export function useFormValidation(form: UseFormReturn<any>): ValidationFeedback {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Update errors state whenever form errors change
  useEffect(() => {
    const formErrors = form.formState.errors;
    const processedErrors: Record<string, string> = {};
    
    // Convert react-hook-form errors to a simpler object
    Object.keys(formErrors).forEach(key => {
      if (formErrors[key]?.message) {
        processedErrors[key] = formErrors[key]?.message as string;
      }
    });
    
    setErrors(processedErrors);
  }, [form.formState.errors]);
  
  const getFieldState = (fieldName: string) => {
    const fieldState = form.getFieldState(fieldName, form.formState);
    
    return {
      error: fieldState.error?.message,
      isDirty: fieldState.isDirty,
      isTouched: fieldState.isTouched
    };
  };
  
  return {
    isValid: form.formState.isValid,
    isSubmitting: form.formState.isSubmitting,
    isDirty: form.formState.isDirty,
    errors,
    errorCount: Object.keys(errors).length,
    getFieldState
  };
}

export default useFormValidation;
