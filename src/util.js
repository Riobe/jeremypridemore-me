export const titleCase = string => string.charAt(0).toUpperCase() + string.slice(1)

export function controlFor(context, property) {
  return e => context.setState({ [property]: e.target.value });
};
