import PropTypes from 'prop-types';

export function Cart({ width, height, color, fill, strokeWidth }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0265 5.85055C14.5414 5.85055 11.5528 5.85055 15.5751 5.85055C19.5973 5.85055 20.6993 5.85055 19.5973 11.3244C18.48 16.8741 17.3827 17.3097 13.5639 16.8741C7.45837 16.1775 7.84206 15.9843 6.52502 10.2145C4.8782 3 5.96972 3 2 3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 21C8.77614 21 9 20.7761 9 20.5C9 20.2239 8.77614 20 8.5 20C8.22386 20 8 20.2239 8 20.5C8 20.7761 8.22386 21 8.5 21Z"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 21C16.7761 21 17 20.7761 17 20.5C17 20.2239 16.7761 20 16.5 20C16.2239 20 16 20.2239 16 20.5C16 20.7761 16.2239 21 16.5 21Z"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Cart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  fill: PropTypes.string,
  strokeWidth: PropTypes.string,
};

Cart.defaultProps = {
  width: 24,
  height: 24,
  color: '#202025',
  fill: 'none',
  strokeWidth: '1.5'
};

