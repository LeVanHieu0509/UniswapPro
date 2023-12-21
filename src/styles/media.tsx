export const breakpoints = {
  xs: 768,
  sm: 991,
  lg: 1024,
};

export const size = {
  xs: `${breakpoints.xs}px`,
  sm: `${breakpoints.sm}px`,
  lg: `${breakpoints.lg}px`,
};

export const device = {
  mobile: `(max-width: ${breakpoints.xs}px)`,
  tablet: `(min-width: ${breakpoints.xs + 1}px) and (max-width: ${breakpoints.lg})px`,
  desktop: `(min-width: ${breakpoints.lg + 1}px)`,
  noMobile: `(min-width: ${breakpoints.xs + 1}px)`,
  noDesktop: `(max-width: ${breakpoints.lg}px)`,
};
