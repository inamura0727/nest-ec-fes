import { IsNotEmpty, ValidationOptions } from 'class-validator';

export type CValidateOption = {
  propertyName: string;
  errorMessage?: string;
  validationOptions?: ValidationOptions;
};

const buildValidationOptions = (
  option: CValidateOption,
  defaultMessage: string,
): ValidationOptions => {
  let validationOptions: ValidationOptions = {};
  let prefixMessage = '';

  if (option.validationOptions) validationOptions = option.validationOptions;
  if (validationOptions.each) prefixMessage = 'それぞれの';

  validationOptions.message = option.errorMessage
    ? option.errorMessage
    : `${prefixMessage}${defaultMessage}`;
  return validationOptions;
};

export const CIsNotEmpty = (option: CValidateOption): PropertyDecorator => {
  return IsNotEmpty(
    buildValidationOptions(
      option,
      `${option.propertyName}は必ず指定してください`,
    ),
  );
};
