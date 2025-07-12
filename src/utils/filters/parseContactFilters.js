const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return;

  const lower = value.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
};

const parseString = (str) => {
  if (typeof str !== 'string') return;
  const trimmed = str.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const parseContactFilters = ({ contactType, isFavourite }) => {
  const parsedType = parseString(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
