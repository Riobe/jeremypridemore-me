export const titleCase = string => string.charAt(0).toUpperCase() + string.slice(1)

export function controlFor(context, property) {
  return (function(event) {
    context.setState({
      [property]: event.target.value
    });
  });
};
