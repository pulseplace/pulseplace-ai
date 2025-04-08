
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface FormFieldWithValidationProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  selectOptions?: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
}

const FormFieldWithValidation: React.FC<FormFieldWithValidationProps> = ({
  control,
  name,
  label,
  placeholder,
  description,
  type = 'text',
  selectOptions,
  required = false,
  disabled = false
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={`space-y-1 ${type === 'checkbox' ? 'flex flex-row items-start space-x-3 space-y-0' : ''}`}>
          {type === 'checkbox' ? (
            <>
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                  id={name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-medium">
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                {description && (
                  <p className="text-xs text-muted-foreground">{description}</p>
                )}
                {fieldState.error && (
                  <p className="text-xs font-medium text-destructive mt-1">{fieldState.error.message}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <FormLabel>
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                {fieldState.error && (
                  <p className="text-xs font-medium text-destructive">{fieldState.error.message}</p>
                )}
              </div>
              
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
              
              <FormControl>
                {type === 'textarea' ? (
                  <Textarea
                    {...field}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${fieldState.error ? 'border-destructive' : ''}`}
                  />
                ) : type === 'select' ? (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={disabled}
                  >
                    <SelectTrigger className={`${fieldState.error ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectOptions?.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${fieldState.error ? 'border-destructive' : ''}`}
                  />
                )}
              </FormControl>
            </>
          )}
          {type !== 'checkbox' && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default FormFieldWithValidation;
