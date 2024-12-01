type ClassNameInput = string | undefined | null | false;

export const classNameBuilder = (...classes: ClassNameInput[]): string => {
  return classes.filter(Boolean).join(' ');
};
