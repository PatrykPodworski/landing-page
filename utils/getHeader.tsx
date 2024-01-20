const getHeader = (name: string, headers: Headers) => {
  const header = headers.get(name);

  if (!header) {
    throw new MissingHeaderError(`Missing ${name} header`);
  }

  return header;
};

export class MissingHeaderError extends Error {}

export default getHeader;
